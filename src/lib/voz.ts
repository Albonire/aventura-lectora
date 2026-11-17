// choosing the best Spanish voice of the device and cutting a text into sentences for the read aloud button.
// The voices come from the phone or the computer: the code can only pick the best one that is installed.

export interface VozBasica {
  name: string;
  lang: string;
}

const LATINOS = ['es-co', 'es-419', 'es-mx', 'es-us'];

// words in the name of a voice that tell it is a better one (neural, natural, enhanced) than the factory voice
const CALIDAD = /natural|neural|online|enhanced|premium|mejorada|siri|google/i;
// factory voices that sound robotic
const ROBOTICA = /compact|espeak|pico|festival|default|predeterminad/i;
// names of well known Latin American voices of the main systems
const CONOCIDAS = /paulina|monica|m[oó]nica|sabina|salome|salom[eé]|gonzalo|dalia|jorge|elena|catalina|ximena|valentina|marisol|lupe|jorge|diego|juan/i;

function codigo(v: VozBasica): string {
  return v.lang.replace('_', '-').toLowerCase();
}

export function puntaje_voz(v: VozBasica): number {
  const c = codigo(v);
  if (!c.startsWith('es')) return -1000;
  let p = 0;
  const idx = LATINOS.indexOf(c);
  if (idx >= 0) p += 40 - idx * 4;
  else if (c === 'es-es') p += 10;
  else p += 20;
  if (CALIDAD.test(v.name)) p += 30;
  if (CONOCIDAS.test(v.name)) p += 10;
  if (ROBOTICA.test(v.name)) p -= 40;
  return p;
}

// the voice with the best score; ties go to the name that comes first, so the choice is always the same
export function elegir_voz<T extends VozBasica>(voces: T[]): T | null {
  let mejor: T | null = null;
  let mejor_p = -Infinity;
  for (const v of voces) {
    const p = puntaje_voz(v);
    if (p < 0 && !codigo(v).startsWith('es')) continue;
    if (p > mejor_p || (p === mejor_p && mejor && v.name < mejor.name)) {
      mejor = v;
      mejor_p = p;
    }
  }
  return mejor;
}

// cuts a text after . ? ! : and line breaks, keeping the signs and not losing any word
export function partir_frases(texto: string): string[] {
  const limpio = texto.replace(/\s+/g, ' ').trim();
  if (!limpio) return [];
  const frases = limpio.match(/[^.?!:]+[.?!:]*["”»)]*\s*/g) ?? [limpio];
  return frases.map((f) => f.trim()).filter(Boolean);
}
