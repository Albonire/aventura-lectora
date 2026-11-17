// the only place where the colors of the illustrations are written.
// Every material has four tones that follow one rule, so all the art shares the same light:
//   luz    = base mixed with warm cream (the light is warm)
//   base   = the color of the style guide
//   sombra = base mixed with the ink slate (the shadow is cool)
//   trazo  = base mixed a lot with the ink slate (soft outline of the middle plane)
// Components never write a hex: they name a material ("piel_sofia") or a tone ("piel_sofia.sombra").

export const TINTA = '#1e293b';
export const CREMA = '#faf6ee';

// one light for the whole book: it comes from the top left.
// Unit vector that points TO the light. Lit sides look up and left, shadows fall down and right.
export const LUZ = { x: -Math.SQRT1_2, y: -Math.SQRT1_2 } as const;

// the second pass of the ink is a little off the first one, like a pen that is pressed twice
export const DESREGISTRO = { x: 0.7, y: 0.6 } as const;

// line widths by plane, in units of a viewBox that is about 300 wide
export const GROSOR = { personaje: 4, animal: 3.5, objeto: 3, medio: 2 } as const;

function a_rgb(hex: string): [number, number, number] {
  const n = Number.parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function mezclar(a: string, b: string, t: number): string {
  const x = a_rgb(a);
  const y = a_rgb(b);
  const c = x.map((v, i) => Math.round(v + (y[i] - v) * t));
  return `#${c.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

export interface Rampa {
  luz: string;
  base: string;
  sombra: string;
  trazo: string;
  // last stop of the volume gradient: between base and shadow
  medio: string;
}

interface Def {
  base: string;
  luz?: string;
  sombra?: string;
  trazo?: string;
}

function rampa(d: Def): Rampa {
  const sombra = d.sombra ?? mezclar(d.base, TINTA, 0.3);
  return {
    base: d.base,
    luz: d.luz ?? mezclar(d.base, CREMA, 0.5),
    sombra,
    trazo: d.trazo ?? mezclar(d.base, TINTA, 0.62),
    medio: mezclar(d.base, sombra, 0.35),
  };
}

const defs = {
  // people
  piel_sofia: { base: '#d9a273' },
  piel_mateo: { base: '#a9703f' },
  pelo_sofia: { base: '#6b3f26', luz: '#8a5636' },
  pelo_mateo: { base: '#111827', luz: '#3b4a63', sombra: '#0a0f1c' },
  chaqueta: { base: '#facc15' },
  pantalon_sofia: { base: '#1e3a8a', luz: '#3b5fc4' },
  sueter: { base: '#84cc16' },
  pantalon_mateo: { base: '#334155', luz: '#5b6b82' },
  gorra: { base: '#0284c7' },
  zapato: { base: '#0f172a', luz: '#3b4a63', sombra: '#070b14' },
  lazo: { base: '#f43f5e' },
  respaldo: { base: '#15803d' },
  // objects
  blanco: { base: '#ffffff', luz: '#ffffff', sombra: '#dbe3ee' },
  cielo: { base: '#0284c7' },
  vidrio: { base: '#bae6fd', luz: '#f0f9ff' },
  mango: { base: '#0369a1' },
  coral: { base: '#f43f5e' },
  coral_suave: { base: '#fda4af' },
  amarillo: { base: '#facc15' },
  lima: { base: '#84cc16' },
  cielo_claro: { base: '#38bdf8' },
  pizarra: { base: '#334155', luz: '#5b6b82' },
  crema: { base: '#faf6ee', luz: '#ffffff', sombra: '#e6dcc6' },
  arena: { base: '#ece5d6' },
  madera: { base: '#8b6b4a' },
  metal: { base: '#cbd5e1', luz: '#f8fafc', sombra: '#8b9bb0' },
  // animals
  pelaje: { base: '#e9c49f' },
  panza: { base: '#f7e6d0', luz: '#fffaf1' },
  caparazon: { base: '#4d7c0f' },
  lima_oscuro: { base: '#65a30d' },
  verde_claro: { base: '#a3e635' },
  negro: { base: '#111827', luz: '#3b4a63', sombra: '#0a0f1c' },
  // countryside
  hoja: { base: '#9ccf6a' },
  hoja_media: { base: '#7cb46b' },
  hoja_oscura: { base: '#5a9a4e' },
  loma_clara: { base: '#d9f0b5' },
  loma: { base: '#c2e59a' },
  suelo: { base: '#f1dfb4' },
  halo_sol: { base: '#fde68a' },
  cacao: { base: mezclar('#facc15', '#f43f5e', 0.42) },
  violeta: { base: '#a78bfa' },
  // medals: background and ribbon of each one, the outline is the "trazo" of the background
  med1_fondo: { base: '#ffedd5', trazo: '#c2410c' },
  med1_cinta: { base: '#fed7aa', trazo: '#c2410c' },
  med1_metal: { base: '#c2703d' },
  med2_fondo: { base: '#e0f2fe', trazo: '#0369a1' },
  med2_cinta: { base: '#bae6fd', trazo: '#0369a1' },
  med3_fondo: { base: '#ecfccb', trazo: '#4d7c0f' },
  med3_cinta: { base: '#d9f99d', trazo: '#4d7c0f' },
  med4_fondo: { base: '#ffe4e6', trazo: '#be123c' },
  med4_cinta: { base: '#fecdd3', trazo: '#be123c' },
  rojo_oscuro: { base: '#e11d48' },
} satisfies Record<string, Def>;

export type Material = keyof typeof defs;

export const materiales = Object.fromEntries(
  Object.entries(defs).map(([k, d]) => [k, rampa(d)]),
) as Record<Material, Rampa>;

export type Tono = 'luz' | 'base' | 'sombra' | 'trazo';

// "tinta", "crema", "piel_sofia" (base) or "piel_sofia.sombra"
export function color(ref: string): string {
  if (ref === 'tinta') return TINTA;
  if (ref === 'crema') return CREMA;
  const [m, t = 'base'] = ref.split('.');
  const r = materiales[m as Material];
  if (!r) throw new Error(`Material desconocido: ${ref}`);
  const v = r[t as Tono];
  if (!v) throw new Error(`Tono desconocido: ${ref}`);
  return v;
}

export const id_degradado = (m: Material) => `al-g-${m}`;
