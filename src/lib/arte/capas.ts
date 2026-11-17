// turns a list of shapes into the layers of a painted piece. Astro and React draw the same layers,
// so every illustration of the book is built by the same rules (one light, one pen, one palette).
//
// Layers of a filled shape, from the bottom:
//   1. the whole shape in its shadow color (it is the dark rim)
//   2. optional hatching, in the rim only because the next layer covers the rest
//   3. the same shape a little smaller and moved toward the light, with the volume gradient
//   4. optional highlight: a smaller copy, still closer to the light
//   5. the ink outline, and a second thinner pass that is a little off (the pen pressed twice)
// Nothing here needs a clip path or an id: the smaller copies are checked to stay inside the shape.

import { DESREGISTRO, GROSOR, LUZ, TINTA, color, id_degradado, materiales, type Material } from './paleta';
import {
  alcance,
  aplanar,
  caja_limite,
  contenido,
  parsear,
  polo,
  principal,
  temblar,
  type Pt,
} from './geometria';

export const SEMILLA = 11;

export type Plano = 'fondo' | 'medio' | 'frente';
export type Detalle = 'completo' | 'reducido';

export interface Elemento {
  d: string;
  fill?: string;
  stroke?: string;
  sw?: number;
  op?: number;
  tr?: string;
  cls?: string;
  da?: string;
}

export interface Relleno {
  tipo?: 'relleno';
  d: string;
  mat: Material;
  // front shapes have an ink outline, middle ones a soft thin one, background ones none
  plano?: Plano;
  grosor?: number;
  // 0 to 1: how wide the dark rim on the shadow side is
  vol?: number;
  // 0 to 1: strength of the highlight
  brillo?: number;
  trama?: boolean;
  sin_contorno?: boolean;
  temblor?: number;
  op?: number;
  // drawn only in the complete detail
  fino?: boolean;
}

export interface Linea {
  tipo: 'linea';
  d: string;
  color: string;
  grosor: number;
  op?: number;
  temblor?: number;
  dash?: string;
  fino?: boolean;
}

export interface Mancha {
  tipo: 'mancha';
  d: string;
  // "rubor", "halo", "puntos", or a color reference like "piel_sofia.sombra" or "tinta"
  fill: string;
  op?: number;
  temblor?: number;
  fino?: boolean;
}

export type Forma = Relleno | Linea | Mancha;

export const relleno = (d: string, mat: Material, o: Omit<Relleno, 'd' | 'mat' | 'tipo'> = {}): Relleno => ({
  tipo: 'relleno',
  d,
  mat,
  ...o,
});
export const linea = (
  d: string,
  col: string,
  grosor: number,
  o: Omit<Linea, 'd' | 'color' | 'grosor' | 'tipo'> = {},
): Linea => ({ tipo: 'linea', d, color: col, grosor, ...o });
export const mancha = (
  d: string,
  fill: string,
  op?: number,
  o: Omit<Mancha, 'd' | 'fill' | 'op' | 'tipo'> = {},
): Mancha => ({ tipo: 'mancha', d, fill, op, ...o });

// fills that come from the shared definitions instead of a color
const RELLENOS: Record<string, string> = {
  rubor: 'url(#al-rubor)',
  halo: 'url(#al-halo)',
  puntos: 'url(#al-puntos)',
};

const r1 = (v: number) => Math.round(v * 10) / 10;
const matriz = (k: number, tx: number, ty: number) =>
  `matrix(${Math.round(k * 1000) / 1000} 0 0 ${Math.round(k * 1000) / 1000} ${r1(tx)} ${r1(ty)})`;

interface Copia {
  k: number;
  tx: number;
  ty: number;
  // how far toward the light the copy was moved
  m: number;
  poli: Pt[];
}

function copia(prin: Pt[], centro: Pt, k: number, m: number): Copia {
  const tx = centro[0] * (1 - k) + LUZ.x * m;
  const ty = centro[1] * (1 - k) + LUZ.y * m;
  return { k, tx, ty, m, poli: prin.map(([x, y]) => [k * x + tx, k * y + ty] as Pt) };
}

// the smaller copy that leaves the dark rim on the shadow side
export function sombrear(polis: Pt[][], vol: number): { copia: Copia; centro: Pt; rtl: number } | null {
  const prin = principal(polis);
  const { centro, radio } = polo(polis);
  if (radio < 4) return null;
  const rtl = alcance(prin, centro, LUZ);
  let a = 0.24 * vol;
  for (let i = 0; i < 7 && a >= 0.035; i += 1) {
    const c = copia(prin, centro, 1 - a, a * rtl * 0.92);
    if (contenido(c.poli, polis, 1.2)) return { copia: c, centro, rtl };
    a *= 0.8;
  }
  return null;
}

// a still smaller copy near the light, inside the first copy
export function brillar(
  prin: Pt[],
  interior: Copia,
  centro: Pt,
  rtl: number,
): Copia | null {
  const k2 = 0.34;
  for (const f of [0.75, 0.55, 0.35]) {
    const c = copia(prin, centro, k2, interior.m + f * (interior.k - k2) * rtl);
    if (contenido(c.poli, [interior.poli], 0.5)) return c;
  }
  return null;
}

function tono_amp(base: number, d: string, escala: number): number {
  const b = caja_limite(aplanar(parsear(d)));
  const tam = Math.max(b.ancho, b.alto);
  return base * escala * Math.min(1, Math.max(0.25, tam / 60));
}

function pintar_relleno(f: Relleno, completo: boolean, escala: number, out: Elemento[]) {
  const plano = f.plano ?? 'frente';
  const r = materiales[f.mat];
  const grosor =
    f.sin_contorno || plano === 'fondo'
      ? 0
      : (f.grosor ?? (plano === 'frente' ? GROSOR.personaje : GROSOR.medio));
  const contorno = grosor > 0 ? (plano === 'frente' ? TINTA : r.trazo) : undefined;
  const amp = tono_amp(f.temblor ?? (plano === 'frente' ? 0.9 : plano === 'medio' ? 0.6 : 0.7), f.d, escala);
  const d = temblar(f.d, amp, SEMILLA);
  const vol = f.vol ?? (plano === 'frente' ? 0.55 : plano === 'medio' ? 0.3 : 0);
  const grad = `url(#${id_degradado(f.mat)})`;
  const polis = aplanar(parsear(f.d));
  const sh = vol > 0 ? sombrear(polis, vol) : null;

  if (!sh) {
    out.push({ d, fill: grad, stroke: contorno, sw: contorno ? grosor : undefined, op: f.op });
  } else {
    out.push({ d, fill: r.sombra, op: f.op });
    if (f.trama && completo) out.push({ d, fill: 'url(#al-trama)', cls: 'trama' });
    out.push({ d, fill: grad, tr: matriz(sh.copia.k, sh.copia.tx, sh.copia.ty), op: f.op });
    if (f.brillo && f.brillo > 0 && completo) {
      const br = brillar(principal(polis), sh.copia, sh.centro, sh.rtl);
      if (br) {
        out.push({ d, fill: r.luz, op: Math.round(0.6 * f.brillo * 100) / 100, tr: matriz(br.k, br.tx, br.ty) });
      }
    }
    if (contorno) out.push({ d, stroke: contorno, sw: grosor });
  }
  if (completo && contorno && grosor >= 3.5) {
    out.push({
      d: temblar(f.d, amp, SEMILLA + 5),
      stroke: contorno,
      sw: r1(grosor * 0.45),
      tr: `translate(${r1(DESREGISTRO.x * escala)} ${r1(DESREGISTRO.y * escala)})`,
      op: 0.8,
    });
  }
}

const cache = new WeakMap<Forma[], Map<string, Elemento[]>>();

export function capas(formas: Forma[], opc: { detalle?: Detalle; escala?: number } = {}): Elemento[] {
  const detalle = opc.detalle ?? 'completo';
  const escala = opc.escala ?? 1;
  const clave = `${detalle}|${escala}`;
  const guardado = cache.get(formas)?.get(clave);
  if (guardado) return guardado;

  const completo = detalle === 'completo';
  const out: Elemento[] = [];
  for (const f of formas) {
    if (f.fino && !completo) continue;
    if (f.tipo === 'linea') {
      out.push({
        d: temblar(f.d, tono_amp(f.temblor ?? 0.5, f.d, escala), SEMILLA + 2),
        stroke: color(f.color),
        sw: f.grosor,
        op: f.op,
        da: f.dash,
      });
    } else if (f.tipo === 'mancha') {
      out.push({
        d: temblar(f.d, tono_amp(f.temblor ?? 0.5, f.d, escala), SEMILLA + 3),
        fill: RELLENOS[f.fill] ?? color(f.fill),
        op: f.op,
      });
    } else {
      pintar_relleno(f, completo, escala, out);
    }
  }
  if (!cache.has(formas)) cache.set(formas, new Map());
  cache.get(formas)?.set(clave, out);
  return out;
}

// every url(#...) that a list of shapes uses, to check them against the shared definitions
export function referencias(elementos: Elemento[]): string[] {
  const ids = new Set<string>();
  for (const e of elementos) {
    const m = e.fill?.match(/^url\(#([^)]+)\)$/);
    if (m) ids.add(m[1]);
  }
  return [...ids];
}
