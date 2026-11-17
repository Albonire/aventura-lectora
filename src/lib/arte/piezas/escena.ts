// the countryside of the book: sky, hills, ground and the plants of Maripí (sugar cane and cacao).
// Three planes: the background (sun, clouds, hills) has no outline and light tones; the middle (plants)
// has a thin outline of its own dark tone; the front (characters) has the ink outline.
// Scenes are drawn in a 560 x 440 box; each plant in a 100 x 100 box with the ground at y = 100.

import { caja, circ, elip } from '../geometria';
import { linea as L, mancha as M, relleno as R, type Forma } from '../capas';
import type { Material } from '../paleta';

function rayos(cx: number, cy: number, r0: number, r1: number, n: number): string {
  let d = '';
  for (let i = 0; i < n; i += 1) {
    const a = (i * 2 * Math.PI) / n;
    d += `M${cx + Math.cos(a) * r0} ${cy + Math.sin(a) * r0}L${cx + Math.cos(a) * r1} ${cy + Math.sin(a) * r1}`;
  }
  return d;
}

export const SOL: Forma[] = [
  M(circ(486, 78, 78), 'halo'),
  L(rayos(486, 78, 46, 62, 12), 'amarillo', 5, { op: 0.8 }),
  R(circ(486, 78, 34), 'amarillo', { plano: 'fondo', vol: 0.5, brillo: 0.6 }),
];

export const NUBES: Forma[] = [
  R(
    'M60 96C52 78 70 64 86 72C92 52 124 52 130 74C148 70 158 90 146 100L66 100C62 100 60 98 60 96Z',
    'blanco',
    { plano: 'fondo', vol: 0.5 },
  ),
  R(
    'M300 62C296 50 308 42 318 48C324 36 344 38 346 52C356 50 362 62 354 68L306 68C302 68 300 66 300 62Z',
    'blanco',
    { plano: 'fondo', vol: 0.5 },
  ),
];

const LOMA_LEJANA = 'M0 330C90 268 190 300 290 286C390 272 470 250 560 282L560 440L0 440Z';
const LOMA_CERCANA = 'M0 372C120 336 240 362 340 350C430 340 500 330 560 344L560 440L0 440Z';

export const LOMAS: Forma[] = [
  R(LOMA_LEJANA, 'loma_clara', { plano: 'fondo' }),
  L('M30 322C110 296 190 312 270 300', 'loma_clara.sombra', 2.4, { op: 0.5, fino: true }),
  L('M300 296C380 282 450 268 530 280', 'loma_clara.sombra', 2.4, { op: 0.5, fino: true }),
  R(circ(118, 304, 17), 'hoja_media', { plano: 'fondo', vol: 0.5 }),
  R(circ(146, 300, 13), 'hoja_media', { plano: 'fondo', vol: 0.5 }),
  R(circ(430, 274, 16), 'hoja_media', { plano: 'fondo', vol: 0.5 }),
  R(LOMA_CERCANA, 'loma', { plano: 'fondo' }),
  M(LOMA_CERCANA, 'puntos', 0.7),
];

const SUELO_FORMA = elip(280, 404, 236, 22);
export const SUELO: Forma[] = [
  R(SUELO_FORMA, 'suelo', { plano: 'fondo', vol: 0.4 }),
  M(SUELO_FORMA, 'puntos', 0.8),
  M(elip(150, 413, 8, 3), 'arena', 0.9),
  M(elip(410, 410, 6, 2.4), 'arena', 0.9),
];

const memo = new Map<string, Forma[]>();
// the sky and the ground of a scene; the same list for the same choices, so it is painted once
export function fondo(opc: { sol?: boolean; nubes?: boolean; loma?: boolean } = {}): Forma[] {
  const { sol = true, nubes = true, loma = true } = opc;
  const clave = `${sol}${nubes}${loma}`;
  let lista = memo.get(clave);
  if (!lista) {
    lista = [...(sol ? SOL : []), ...(nubes ? NUBES : []), ...(loma ? LOMAS : []), ...SUELO];
    memo.set(clave, lista);
  }
  return lista;
}

// shadow that a standing figure throws on the ground: the light comes from the left, so it falls to the right
export function sombra_suelo(cx: number, cy: number, rx: number): Forma[] {
  return [M(elip(cx + rx * 0.12, cy, rx, Math.max(3, rx * 0.16)), 'tinta', 0.17, { temblor: 0.3 })];
}

// ---------- plants ----------

const NERV = 'hoja_oscura';

const MATA: Forma[] = [
  R('M50 100C30 96 14 76 20 52C40 58 52 78 50 100Z', 'hoja_media', { plano: 'medio', vol: 0.4 }),
  R('M50 100C46 70 56 44 78 34C86 60 74 88 50 100Z', 'hoja', { plano: 'medio', vol: 0.4 }),
  R('M50 100C54 84 68 72 88 72C86 90 70 100 50 100Z', 'hoja_oscura', { plano: 'medio', vol: 0.4 }),
  R('M50 100C44 88 30 82 14 86C20 98 34 102 50 100Z', 'hoja', { plano: 'medio', vol: 0.4 }),
  L('M50 98C42 82 32 68 24 56', `${NERV}.trazo`, 1.6, { op: 0.7, fino: true }),
  L('M50 98C52 76 62 56 74 42', `${NERV}.trazo`, 1.6, { op: 0.7, fino: true }),
];

const HOJAS: Forma[] = [
  R('M46 100C22 84 14 52 30 22C54 42 60 76 46 100Z', 'hoja_media', { plano: 'medio', vol: 0.4 }),
  L('M34 34C38 56 42 78 46 98', `${NERV}.trazo`, 1.8, { op: 0.7, fino: true }),
  R('M54 100C56 78 72 62 94 60C92 82 76 98 54 100Z', 'hoja', { plano: 'medio', vol: 0.4 }),
  L('M88 66C74 76 62 88 55 98', `${NERV}.trazo`, 1.8, { op: 0.7, fino: true }),
];

const PASTO: Forma[] = [
  R('M30 100C32 84 30 72 24 62C36 70 40 84 40 100Z', 'hoja_media', { plano: 'medio', vol: 0.3 }),
  R('M44 100C44 78 48 62 56 50C58 68 56 84 54 100Z', 'hoja', { plano: 'medio', vol: 0.3 }),
  R('M60 100C62 86 68 76 78 70C76 82 72 92 70 100Z', 'hoja_media', { plano: 'medio', vol: 0.3 }),
];

// sugar cane: a tall green stalk with dark nodes and long leaves that arch from the top
const CANA: Forma[] = [
  R('M44 100L44 24Q44 18 50 18Q56 18 56 24L56 100Z', 'hoja', { plano: 'medio', vol: 0.5, grosor: 2.2 }),
  L('M44 38L56 38M44 58L56 58M44 78L56 78', `${NERV}.trazo`, 2.4, { op: 0.9 }),
  L('M47 26L47 96', 'hoja.luz', 1.6, { op: 0.8, fino: true }),
  R('M50 24C34 4 8 6 -6 22C16 18 34 22 50 30Z', 'hoja_media', { plano: 'medio', vol: 0.4 }),
  R('M50 24C68 2 96 4 108 22C88 16 68 22 50 30Z', 'hoja_oscura', { plano: 'medio', vol: 0.4 }),
  R('M50 20C46 4 52 -10 64 -14C66 2 60 14 50 28Z', 'hoja', { plano: 'medio', vol: 0.4 }),
  L('M50 26C34 14 18 12 4 20', `${NERV}.trazo`, 1.4, { op: 0.7, fino: true }),
];

// cacao: a branch with a pod that has ridges, and two leaves
const CACAO: Forma[] = [
  L('M50 100L50 28', 'madera.trazo', 5),
  L('M50 100L50 28', 'madera', 2.5),
  R('M50 52C30 50 14 40 8 26C30 28 46 38 50 52Z', 'hoja_oscura', { plano: 'medio', vol: 0.4 }),
  R('M50 40C66 36 82 24 90 10C68 12 54 24 50 40Z', 'hoja_media', { plano: 'medio', vol: 0.4 }),
  R('M50 56C34 60 26 74 30 90C38 94 50 84 54 70Z', 'cacao', { plano: 'frente', grosor: 2.6, vol: 0.55, brillo: 0.5 }),
  L('M44 62C38 70 36 80 38 88', 'cacao.sombra', 1.8, { op: 0.9, fino: true }),
  L('M48 62C44 72 44 82 46 86', 'cacao.sombra', 1.8, { op: 0.9, fino: true }),
];

const FLOR_BASE = (mat: Material): Forma[] => [
  L('M50 100C50 84 50 70 50 56', 'hoja_oscura', 4),
  R('M50 84C40 82 34 74 34 66C44 68 50 74 50 84Z', 'hoja_media', { plano: 'medio', vol: 0.3 }),
  R(circ(50, 34, 9), mat, { plano: 'medio', vol: 0.5, brillo: 0.4 }),
  R(circ(36, 46, 9), mat, { plano: 'medio', vol: 0.5, brillo: 0.4 }),
  R(circ(64, 46, 9), mat, { plano: 'medio', vol: 0.5, brillo: 0.4 }),
  R(circ(42, 60, 9), mat, { plano: 'medio', vol: 0.5, brillo: 0.4 }),
  R(circ(58, 60, 9), mat, { plano: 'medio', vol: 0.5, brillo: 0.4 }),
  R(circ(50, 48, 7), mat === 'amarillo' ? 'coral' : 'amarillo', { plano: 'medio', vol: 0.4 }),
];

export const FLORES: Record<'coral' | 'amarillo' | 'violeta', Forma[]> = {
  coral: FLOR_BASE('coral'),
  amarillo: FLOR_BASE('amarillo'),
  violeta: FLOR_BASE('violeta'),
};

export const PLANTAS: Record<'mata' | 'hojas' | 'pasto' | 'cana' | 'cacao', Forma[]> = {
  mata: MATA,
  hojas: HOJAS,
  pasto: PASTO,
  cana: CANA,
  cacao: CACAO,
};

// ---------- pieces of the covers ----------

// ground of the two small scenes of the guide (440 x 400 box)
const SUELO_GUIA_FORMA = elip(220, 366, 186, 20);
export const SUELO_GUIA: Forma[] = [
  R(SUELO_GUIA_FORMA, 'suelo', { plano: 'fondo', vol: 0.4 }),
  M(SUELO_GUIA_FORMA, 'puntos', 0.8),
];

// sugar cane stalks of the cover of mission 2: [x, top of the stalk]
export const CANAS_PORTADA: Forma[] = [
  [452, 150],
  [484, 118],
  [516, 166],
].flatMap(([x, y]) => [
  R(`M${x - 7} 396L${x - 7} ${y + 4}Q${x - 7} ${y - 2} ${x} ${y - 2}Q${x + 7} ${y - 2} ${x + 7} ${y + 4}L${x + 7} 396Z`, 'hoja', {
    plano: 'medio',
    vol: 0.5,
    grosor: 2.2,
  }),
  L(`M${x - 7} ${y + 60}L${x + 7} ${y + 60}M${x - 7} ${y + 120}L${x + 7} ${y + 120}M${x - 7} ${y + 180}L${x + 7} ${y + 180}`, 'hoja_oscura.trazo', 3, {
    op: 0.9,
  }),
  L(`M${x - 3} ${y + 14}L${x - 3} 388`, 'hoja.luz', 2, { op: 0.8, fino: true }),
  R(`M${x} ${y + 8}C${x - 30} ${y - 24} ${x - 58} ${y - 16} ${x - 70} ${y + 6}C${x - 44} ${y - 2} ${x - 20} ${y + 6} ${x} ${y + 8}Z`, 'hoja_media', {
    plano: 'medio',
    vol: 0.4,
  }),
  R(`M${x} ${y + 8}C${x + 22} ${y - 30} ${x + 46} ${y - 28} ${x + 60} ${y - 8}C${x + 38} ${y - 12} ${x + 16} ${y - 2} ${x} ${y + 8}Z`, 'hoja_oscura', {
    plano: 'medio',
    vol: 0.4,
  }),
]);

// cream plate of the book cover, so the lime sweater and the plants stand out on the green
export const PLACA_TAPA: Forma[] = [
  R(caja(4, 52, 552, 384, 30), 'crema', { grosor: 4, vol: 0.25, temblor: 0.5 }),
  M(caja(4, 52, 552, 384, 30), 'puntos', 0.5),
];

// the tower of ideas of the final challenge, base at the bottom: [material, y, width]
export const PISOS_TORRE: [Material, number, number][] = [
  ['amarillo', 176, 168],
  ['vidrio', 250, 208],
  ['coral_suave', 324, 236],
];
export const TORRE_CENTRO = 436;

export function torre(): Forma[] {
  const c = TORRE_CENTRO;
  return [
    L(`M${c} 176L${c} 104`, 'tinta', 4),
    R(`M${c} 106L${c + 54} 122L${c} 140Z`, 'coral', { grosor: 3.5, vol: 0.5 }),
    ...PISOS_TORRE.map(([mat, y, ancho]) =>
      R(caja(c - ancho / 2, y, ancho, 70, 14), mat, { grosor: 4, vol: 0.5, brillo: 0.4, trama: true }),
    ),
    ...sombra_suelo(c + 6, 398, 124),
  ];
}

// the marks of the truth detector on the cover of mission 3
export const MARCAS_VERDAD: Forma[] = [
  R(circ(356, 130, 30), 'lima', { grosor: 4, vol: 0.55, brillo: 0.4 }),
  L('M343 131L353 141L371 120', 'tinta', 7),
  R(circ(536, 292, 26), 'blanco', { grosor: 4, vol: 0.4, brillo: 0.3 }),
];
