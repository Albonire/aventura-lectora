// the animals of the fables, painted with the same light and pen as the guides (guide 2.1, figure 2).
// Each one has its own box: rabbit 136 x 184, tortoise 164 x 112, caterpillar 176 x 134.

import { circ, elip, escalar } from '../geometria';
import { linea as L, mancha as M, relleno as R, type Forma } from '../capas';

export const CONEJO_ANCHO = 136;
export const CONEJO_ALTO = 184;
export const TORTUGA_ANCHO = 164;
export const TORTUGA_ALTO = 112;
export const ORUGA_ANCHO = 176;
export const ORUGA_ALTO = 134;

const G = 3.5;

// the rabbit of the red scarf: sits and looks to the right
export const CONEJO: Forma[] = [
  R(circ(22, 146, 10), 'blanco', { grosor: 3, vol: 0.5 }),
  R('M58 52C48 24 52 4 64 6C76 8 80 32 76 54Z', 'pelaje', { grosor: G, vol: 0.5, trama: true }),
  R('M82 50C84 20 98 2 108 8C118 14 110 40 98 58Z', 'pelaje', { grosor: G, vol: 0.5, trama: true }),
  M('M62 44C58 28 60 16 65 14C70 18 70 32 68 46Z', 'coral_suave', 0.9),
  M('M89 46C91 26 99 16 103 18C108 22 103 36 96 48Z', 'coral_suave', 0.9),
  R(
    'M28 156C20 116 44 92 72 94C98 96 112 120 108 156C106 170 92 176 70 176C46 176 30 170 28 156Z',
    'pelaje',
    { grosor: G, vol: 0.6, trama: true, brillo: 0.3 },
  ),
  M(elip(80, 142, 17, 22), 'panza', 0.95),
  L('M42 120C46 126 44 132 39 134', 'pelaje.sombra', 2, { op: 0.8, fino: true }),
  L('M38 138C43 142 42 148 37 150', 'pelaje.sombra', 2, { op: 0.8, fino: true }),
  L('M52 106C56 112 55 118 51 121', 'pelaje.luz', 2, { op: 0.8, fino: true }),
  R('M62 176C62 166 76 162 92 164C106 166 112 172 110 176Z', 'pelaje', { grosor: G, vol: 0.5 }),
  R('M98 132C106 132 110 144 108 156C104 160 98 158 96 152Z', 'pelaje', { grosor: G, vol: 0.4 }),
  R(
    'M52 74C52 54 68 44 86 46C104 48 116 60 114 76C112 92 98 100 82 100C64 100 52 90 52 74Z',
    'pelaje',
    { grosor: G, vol: 0.45, brillo: 0.4 },
  ),
  // red scarf
  R('M56 96C72 108 98 106 110 94L114 106C100 120 68 122 52 108Z', 'coral', { grosor: G, vol: 0.5, trama: true }),
  R('M62 112L50 138L66 136L74 116Z', 'coral', { grosor: G, vol: 0.4 }),
  R(circ(66, 112, 6.5), 'rojo_oscuro', { grosor: 3, vol: 0.4 }),
  L('M60 108C70 112 90 112 104 104', 'coral.sombra', 1.8, { op: 0.8, fino: true }),
  // face
  M(elip(90, 84, 8, 5.5), 'rubor'),
  M(elip(96, 70, 4, 5.5), 'tinta', undefined, { temblor: 0.1 }),
  M(circ(97.4, 67.8, 1.5), 'blanco', undefined, { temblor: 0 }),
  R('M110 74L116 78L110 81Z', 'coral', { grosor: 2.5, vol: 0 }),
  L('M102 86C108 90 112 86 112 84', 'tinta', 3),
  L('M112 79C120 77 128 77 134 75', 'tinta', 1.4, { fino: true, temblor: 0.2 }),
  L('M112 82C120 84 128 86 134 88', 'tinta', 1.4, { fino: true, temblor: 0.2 }),
];

// the tortoise: lime body, dark shell with lighter plates and growth rings. Looks to the left.
const placa = (d: string): Forma[] => [
  R(d, 'lima_oscuro', { grosor: 3, vol: 0.5, brillo: 0.3 }),
];
const anillo = (d: string, cx: number, cy: number): Forma =>
  L(escalar(d, 0.55, cx, cy), 'lima_oscuro.sombra', 1.6, { op: 0.7, fino: true });
const P1 = 'M78 52L92 44L108 52L108 68L92 76L78 68Z';
const P2 = 'M54 64L66 58L74 66L72 80L54 80Z';
const P3 = 'M112 66L122 58L134 66L136 80L114 80Z';

export const TORTUGA: Forma[] = [
  R('M140 84L156 80L144 94Z', 'lima', { grosor: G, vol: 0.4 }),
  R('M52 84L74 84L74 98C74 104 68 106 62 106C56 106 52 102 52 98Z', 'lima', { grosor: G, vol: 0.5 }),
  R('M108 84L130 84L130 98C130 104 124 106 118 106C112 106 108 102 108 98Z', 'lima', { grosor: G, vol: 0.5 }),
  R('M36 72C46 74 52 82 52 90L40 92C34 88 30 82 30 76Z', 'lima', { grosor: G, vol: 0.4 }),
  R('M8 62C8 48 20 40 32 42C44 44 50 54 48 66C46 76 36 82 26 80C16 78 8 72 8 62Z', 'lima', {
    grosor: G,
    vol: 0.5,
    brillo: 0.4,
  }),
  R('M40 86C40 32 144 32 146 86Z', 'caparazon', { grosor: G, vol: 0.55, trama: true, brillo: 0.3 }),
  ...placa(P1),
  ...placa(P2),
  ...placa(P3),
  anillo(P1, 93, 60),
  anillo(P2, 65, 70),
  anillo(P3, 124, 71),
  R('M36 82L150 82C154 82 154 92 150 92L36 92C32 92 32 82 36 82Z', 'arena', { grosor: 3, vol: 0.4 }),
  M(elip(36, 68, 6, 4.5), 'rubor'),
  R(circ(24, 58, 6.5), 'blanco', { grosor: 2.5, vol: 0 }),
  M(circ(22.5, 58.5, 3.6), 'tinta', undefined, { temblor: 0 }),
  M(circ(23.6, 57, 1.2), 'blanco', undefined, { temblor: 0 }),
  L('M14 70C22 77 32 72 32 72', 'tinta', 3),
];

// the reading caterpillar: green body, black top hat with a red band and red bow tie. Looks to the left.
const segmentos: [number, number, number, 'lima' | 'verde_claro'][] = [
  [160, 108, 11, 'lima'],
  [140, 110, 14, 'verde_claro'],
  [118, 106, 16, 'lima'],
  [94, 110, 17, 'verde_claro'],
  [70, 106, 18, 'lima'],
];

export const ORUGA: Forma[] = [
  L('M66 122L66 130M92 126L92 132M118 122L118 130M140 123L140 130', 'tinta', 3),
  ...segmentos.map(([cx, cy, r, m]) =>
    R(circ(cx, cy, r), m, { grosor: G, vol: 0.55, brillo: 0.5, trama: r > 15 }),
  ),
  R(circ(44, 82, 27), 'verde_claro', { grosor: G, vol: 0.5, brillo: 0.5 }),
  R('M52 110L38 104L40 122Z', 'coral', { grosor: 3, vol: 0.4 }),
  R('M52 110L66 106L64 124Z', 'coral', { grosor: 3, vol: 0.4 }),
  R(circ(52, 112, 4.5), 'rojo_oscuro', { grosor: 3, vol: 0 }),
  // top hat, tilted
  R('M31 52L29 22Q29 18 33 18L55 18Q59 18 59 22L57 52Z', 'negro', { grosor: 3, vol: 0.6, brillo: 0.5 }),
  R('M29 41L58 41L58 49L29 49Z', 'coral', { grosor: 3, vol: 0.3 }),
  R('M18 52L70 52Q74 52 74 56Q74 60 70 60L18 60Q14 60 14 56Q14 52 18 52Z', 'negro', {
    grosor: 3,
    vol: 0.5,
    brillo: 0.3,
  }),
  M(elip(24, 92, 6, 4.5), 'rubor'),
  M(elip(60, 90, 6, 4.5), 'rubor'),
  R(circ(32, 78, 8.5), 'blanco', { grosor: 2.5, vol: 0 }),
  R(circ(52, 76, 8.5), 'blanco', { grosor: 2.5, vol: 0 }),
  M(circ(30, 76, 4.2), 'tinta', undefined, { temblor: 0 }),
  M(circ(50, 74, 4.2), 'tinta', undefined, { temblor: 0 }),
  M(circ(31.2, 74.4, 1.4), 'blanco', undefined, { temblor: 0 }),
  M(circ(51.2, 72.4, 1.4), 'blanco', undefined, { temblor: 0 }),
  L('M32 94C42 102 52 93 52 93', 'tinta', 3),
];
