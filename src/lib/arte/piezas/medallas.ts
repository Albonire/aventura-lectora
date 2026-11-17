// the four medals of the album (guide 2.1, figure 3), drawn in a 120 x 136 box: a round medal with a pressed
// inner ring, a light specular line on the top left, and two ribbon tails with a fold.
// Each medal has its own pastel fill, outline and ribbon color; the icons keep the ink outline.

import { circ } from '../geometria';
import { linea as L, mancha as M, relleno as R, type Forma } from '../capas';
import type { Material } from '../paleta';

export const MEDALLA_ANCHO = 120;
export const MEDALLA_ALTO = 136;

const mat = (caso: number, parte: 'fondo' | 'cinta'): Material => `med${caso}_${parte}` as Material;

function icono(caso: number): Forma[] {
  switch (caso) {
    // Lupa de Bronce: plain magnifying glass
    case 1:
      return [
        L('M68 64L82 78', 'tinta', 8),
        L('M68 64L82 78', 'med1_metal', 3.5),
        R(circ(55, 51, 17), 'blanco', { grosor: 5, vol: 0.5, brillo: 0.4 }),
        L('M45 48C45 44 48 41 53 40', 'med1_cinta', 3.5),
      ];
    // Lupa de Plata: the glass finds what is between the lines
    case 2:
      return [
        L('M68 64L82 78', 'tinta', 8),
        L('M68 64L82 78', 'metal', 3.5),
        R(circ(55, 51, 17), 'blanco', { grosor: 5, vol: 0.5, brillo: 0.4 }),
        R(circ(55, 51, 7), 'cielo', { grosor: 3, vol: 0.5, brillo: 0.4 }),
      ];
    // Detector de Verdades: shield with a check mark
    case 3:
      return [
        R('M60 30L84 39L84 57C84 72 74 81 60 87C46 81 36 72 36 57L36 39Z', 'blanco', {
          grosor: 4,
          vol: 0.5,
          brillo: 0.4,
          trama: true,
        }),
        L('M47 57L56 66L74 46', 'lima_oscuro', 7),
        L('M47 57L56 66L74 46', 'verde_claro', 2.4, { op: 0.9, fino: true }),
      ];
    // Voz de Detective: megaphone
    default:
      return [
        R('M40 49L76 34L76 78L40 63Z', 'blanco', { grosor: 4, vol: 0.5, brillo: 0.4 }),
        R('M30 50L43 50L43 62L30 62Z', 'rojo_oscuro', { grosor: 4, vol: 0.5 }),
        L('M84 46Q92 56 84 66', 'tinta', 3.5),
        R('M48 66L52 80L61 80L58 69Z', 'blanco', { grosor: 3.5, vol: 0.4 }),
      ];
  }
}

export function medalla(caso: number): Forma[] {
  const n = caso >= 1 && caso <= 4 ? caso : 1;
  const fondo = mat(n, 'fondo');
  const cinta = mat(n, 'cinta');
  return [
    // ribbon tails with a fold line
    R('M42 94L30 132L46 122L56 132L60 98Z', cinta, { plano: 'medio', grosor: 3, vol: 0.5 }),
    R('M78 94L90 132L74 122L64 132L60 98Z', cinta, { plano: 'medio', grosor: 3, vol: 0.5 }),
    L('M44 102L39 120', `${fondo}.trazo`, 1.8, { op: 0.6, fino: true }),
    L('M76 102L81 120', `${fondo}.trazo`, 1.8, { op: 0.6, fino: true }),
    // the medal: a dark rim, a light pressed ring and the dashed ring
    R(circ(60, 56, 50), fondo, { plano: 'medio', grosor: 4, vol: 0.5, brillo: 0.5, trama: true }),
    L(circ(60, 56, 45), `${fondo}.luz`, 2, { op: 0.9, fino: true }),
    L(circ(60, 56, 41), `${fondo}.trazo`, 2.5, { dash: '6 5' }),
    ...icono(n),
    // specular line, top left
    L('M24 46C27 32 38 22 50 18', 'blanco', 3.5, { op: 0.9, fino: true }),
    M(circ(30, 36, 2), 'blanco', 0.9, { fino: true, temblor: 0 }),
  ];
}
