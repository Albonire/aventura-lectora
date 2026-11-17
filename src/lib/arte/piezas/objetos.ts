// objects of the book painted with the same light and pen as the characters:
// the open book, the family phone and the magnifying glass symbol of the club.

import { caja, circ } from '../geometria';
import { linea as L, mancha as M, relleno as R, type Forma } from '../capas';

export const LIBRO_ANCHO = 120;
export const LIBRO_ALTO = 88;
export const CELULAR_ANCHO = 96;
export const CELULAR_ALTO = 156;
export const LUPA_LADO = 64;

export const LIBRO: Forma[] = [
  R('M4 76L4 22Q34 12 60 26Q86 12 116 22L116 76Q86 66 60 80Q34 66 4 76Z', 'coral', {
    grosor: 3.5,
    vol: 0.5,
    trama: true,
  }),
  R('M12 68L12 16Q38 8 60 22Q82 8 108 16L108 68Q82 60 60 74Q38 60 12 68Z', 'blanco', { grosor: 3, vol: 0.4 }),
  M('M52 24L60 22L68 24L68 72L60 74L52 72Z', 'tinta', 0.1),
  L('M14 71Q38 63 60 77', 'metal', 1.6, { fino: true }),
  L('M60 77Q82 63 106 71', 'metal', 1.6, { fino: true }),
  L('M60 22L60 74', 'tinta', 3),
  L('M22 28Q36 24 50 31M22 39Q36 35 50 42M22 50Q36 46 50 53M70 42Q84 35 98 39M70 53Q84 46 98 50', 'metal', 3.5, {
    fino: true,
  }),
  R('M78 12L78 38L85 32L92 38L92 13Z', 'cielo', { grosor: 3, vol: 0.4, brillo: 0.3 }),
];

export const CELULAR: Forma[] = [
  R(caja(6, 4, 84, 148, 14), 'pizarra', { grosor: 3.5, vol: 0.45, brillo: 0.3 }),
  R(caja(14, 20, 68, 112, 5), 'blanco', { grosor: 3, vol: 0.2 }),
  L('M40 12L56 12', 'metal', 3, { fino: true }),
  M(circ(48, 142, 4), 'metal', 0.9),
  // a message with an author (blue) and a chain message (coral)
  R('M20 30L62 30C66 30 68 32 68 36L68 54C68 58 66 60 62 60L30 60L20 68Z', 'vidrio', { grosor: 2.6, vol: 0.4 }),
  L('M28 40L58 40M28 49L50 49', 'mango', 3),
  R('M76 78L34 78C30 78 28 80 28 84L28 102C28 106 30 108 34 108L66 108L76 116Z', 'coral_suave', {
    grosor: 2.6,
    vol: 0.4,
  }),
  L('M36 88L66 88M36 97L56 97', 'rojo_oscuro', 3),
];

export const LUPA_SIMBOLO: Forma[] = [
  L('M40 40L55 55', 'tinta', 13),
  L('M40 40L55 55', 'mango', 6.5),
  R(circ(27, 27, 21), 'cielo', { grosor: 4, vol: 0.6, brillo: 0.4 }),
  R(circ(27, 27, 14), 'vidrio', { grosor: 3, vol: 0.35 }),
  L('M18 24C19 20 22 17 26 16', 'blanco', 4),
];
