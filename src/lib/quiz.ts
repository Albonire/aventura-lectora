import { barajar } from './semilla';
import type { Opcion } from './tipos';

export interface PreguntaBase {
  id: string;
  opciones: Opcion[];
  correcta: string;
  // graded hints of Sofía: each one more concrete than the one before
  pistas?: string[];
}

// options shuffled with a stable seed, so the order is the same on every visit
export function opciones_barajadas(pregunta: PreguntaBase, semilla: string): Opcion[] {
  return barajar(pregunta.opciones, `${semilla}:${pregunta.id}`);
}

export function es_correcta(pregunta: PreguntaBase, opcion_id: string): boolean {
  return pregunta.correcta === opcion_id;
}

export type Intentos = Record<string, string[]>;

export interface ResumenQuiz {
  total: number;
  resueltas: number;
  a_la_primera: number;
}

// a question is solved once the correct option was picked; "a la primera" counts the first try
export function resumir(preguntas: PreguntaBase[], intentos: Intentos): ResumenQuiz {
  let resueltas = 0;
  let a_la_primera = 0;
  for (const p of preguntas) {
    const lista = intentos[p.id] ?? [];
    if (lista.includes(p.correcta)) resueltas++;
    if (lista.length > 0 && lista[0] === p.correcta) a_la_primera++;
  }
  return { total: preguntas.length, resueltas, a_la_primera };
}

export function registrar_intento(
  intentos: Intentos,
  pregunta_id: string,
  opcion_id: string,
): Intentos {
  const previos = intentos[pregunta_id] ?? [];
  if (previos.includes(opcion_id)) return intentos;
  return { ...intentos, [pregunta_id]: [...previos, opcion_id] };
}

export interface PistaGraduada {
  texto: string;
  // 1 for the first hint
  numero: number;
  total: number;
}

const PISTA_GENERAL = 'Vuelve a leer el texto despacio y busca la frase que responde la pregunta.';

// hint for the question after its wrong tries: the first mistake gets the first hint,
// the second one a more concrete hint, and so on until the last hint, which stays
export function pista_para(
  pregunta: PreguntaBase,
  intentos_pregunta: readonly string[],
): PistaGraduada | null {
  if (intentos_pregunta.includes(pregunta.correcta)) return null;
  const fallos = intentos_pregunta.filter((op) => op !== pregunta.correcta).length;
  if (fallos === 0) return null;
  const pistas = pregunta.pistas?.length ? pregunta.pistas : [PISTA_GENERAL];
  const numero = Math.min(fallos, pistas.length);
  return { texto: pistas[numero - 1], numero, total: pistas.length };
}
