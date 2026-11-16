// logic of the argument tower of the final challenge ("Mi voz cuenta en Maripí").
// Ten of the thirteen students wrote loose sentences when asked to justify an idea from scratch,
// so the tower never starts from an empty text area: every floor has sentence starters to pick.
import type { TorreGuardada } from './tipos';

export interface CampoTorre {
  id: string;
  iniciadores: string[];
  ejemplo: string;
}

export interface PisoTorre {
  id: string;
  nombre: string;
  funcion: string;
  pregunta: string;
  campos: CampoTorre[];
}

export const TORRE_VACIA: TorreGuardada = {
  situacion: '',
  iniciadores: {},
  textos: {},
  chequeo: [],
};

// a sentence needs a few words of the student's own after the starter
export const MINIMO_PALABRAS = 3;

export function contar_palabras(texto: string): number {
  return texto.trim().split(/\s+/).filter(Boolean).length;
}

export function iniciador_de(campo: CampoTorre, torre: TorreGuardada): string {
  const elegido = torre.iniciadores[campo.id];
  return elegido && campo.iniciadores.includes(elegido) ? elegido : campo.iniciadores[0];
}

export function campo_completo(campo: CampoTorre, torre: TorreGuardada): boolean {
  return contar_palabras(torre.textos[campo.id] ?? '') >= MINIMO_PALABRAS;
}

export function piso_completo(piso: PisoTorre, torre: TorreGuardada): boolean {
  return piso.campos.every((c) => campo_completo(c, torre));
}

export function torre_completa(pisos: PisoTorre[], torre: TorreGuardada): boolean {
  return pisos.every((p) => piso_completo(p, torre));
}

// starter plus what the student wrote, as one sentence that ends with a period
export function frase_de(campo: CampoTorre, torre: TorreGuardada): string {
  const cuerpo = (torre.textos[campo.id] ?? '').trim();
  if (!cuerpo) return '';
  const cierre = /[.!?]$/.test(cuerpo) ? '' : '.';
  return `${iniciador_de(campo, torre)} ${cuerpo}${cierre}`;
}

// the whole tower as a short text, from the base to the top
export function armar_torre(pisos: PisoTorre[], torre: TorreGuardada): string {
  return pisos
    .flatMap((p) => p.campos.map((c) => frase_de(c, torre)))
    .filter(Boolean)
    .join(' ');
}

export function chequeo_completo(puntos: { id: string }[], torre: TorreGuardada): boolean {
  return puntos.length > 0 && puntos.every((p) => torre.chequeo.includes(p.id));
}
