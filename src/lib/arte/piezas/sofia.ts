// Sofía, "la Guardiana de la Lupa" (character sheet of guide 2.1, figure 2): 10 years old, light brown skin,
// brown hair in a high ponytail with a red bow, yellow jacket with two buttons, dark blue pants and a sky blue
// magnifying glass. Drawn in a 264 x 314 box. The head is written once: the full body and the face of the
// speech bubbles (src/components/islas/personajes.tsx) use the same shapes.

import { circ, elip } from '../geometria';
import { linea as L, mancha as M, relleno as R, type Forma } from '../capas';

export const SOFIA_ANCHO = 264;
export const SOFIA_ALTO = 314;

const coleta: Forma[] = [
  R(
    'M94 52C82 22 44 22 40 54C14 68 10 106 30 130C18 148 28 172 52 174C42 162 48 150 58 144C76 132 78 108 66 94C62 76 72 60 94 52Z',
    'pelo_sofia',
    { vol: 0.6, brillo: 0.5, trama: true },
  ),
  L('M52 40C34 56 28 90 38 118', 'pelo_sofia.luz', 2.2, { op: 0.75, fino: true }),
  L('M70 34C54 46 48 66 52 88', 'pelo_sofia.luz', 2, { op: 0.6, fino: true }),
  L('M60 72C66 92 62 112 52 132', 'pelo_sofia.sombra', 2.2, { op: 0.8, fino: true }),
  L('M30 142C32 154 40 164 50 168', 'pelo_sofia.sombra', 2.2, { op: 0.8, fino: true }),
];

const piernas: Forma[] = [
  R('M94 238L94 294L122 294L124 238Z', 'pantalon_sofia', { vol: 0.5, trama: true }),
  R('M128 238L130 294L158 294L156 238Z', 'pantalon_sofia', { vol: 0.5, trama: true }),
  L('M101 262C105 268 107 274 106 280', 'pantalon_sofia.sombra', 2.2, { op: 0.9, fino: true }),
  L('M137 262C141 268 143 274 142 280', 'pantalon_sofia.sombra', 2.2, { op: 0.9, fino: true }),
  L('M96 284L121 284', 'pantalon_sofia.luz', 2, { op: 0.7, fino: true }),
  L('M132 284L157 284', 'pantalon_sofia.luz', 2, { op: 0.7, fino: true }),
  R('M90 292L124 292C132 292 136 298 136 306L86 306C84 300 86 294 90 292Z', 'zapato', { vol: 0.5, brillo: 0.5 }),
  R('M128 292L162 292C170 292 174 298 174 306L124 306C122 300 124 294 128 292Z', 'zapato', { vol: 0.5, brillo: 0.5 }),
  L('M87 303L135 303', 'crema', 2.4, { op: 0.95 }),
  L('M125 303L173 303', 'crema', 2.4, { op: 0.95 }),
  L('M101 294L109 298M109 294L101 298', 'crema', 1.4, { op: 0.8, fino: true }),
  L('M137 294L145 298M145 294L137 298', 'crema', 1.4, { op: 0.8, fino: true }),
];

const cuello: Forma[] = [
  R('M114 144L114 166L138 166L138 144Z', 'piel_sofia', { vol: 0.5 }),
  M('M114 150C120 160 132 161 138 152L138 162C130 169 120 168 114 160Z', 'piel_sofia.sombra', 0.85),
];

const torso: Forma[] = [
  R(
    'M100 160C84 164 76 188 76 242L170 242C170 198 166 170 152 160C140 168 112 168 100 160Z',
    'chaqueta',
    { vol: 0.6, trama: true },
  ),
  L('M96 206C102 214 104 226 102 240', 'chaqueta.sombra', 2.6, { op: 0.9, fino: true }),
  L('M154 200C150 214 152 228 157 240', 'chaqueta.sombra', 2.6, { op: 0.9, fino: true }),
  L('M126 178L126 242', 'chaqueta.trazo', 2.6, { op: 0.85 }),
  L('M80 232L168 232', 'chaqueta.trazo', 1.6, { dash: '4 3', op: 0.8, fino: true }),
  R('M104 160L126 178L112 190L97 166Z', 'chaqueta', { vol: 0.4, grosor: 3, brillo: 0.3 }),
  R('M148 160L126 178L140 190L155 166Z', 'chaqueta', { vol: 0.4, grosor: 3, brillo: 0.3 }),
  R(circ(136, 200, 4.5), 'blanco', { vol: 0.4, grosor: 2.5 }),
  R(circ(136, 220, 4.5), 'blanco', { vol: 0.4, grosor: 2.5 }),
  L('M134 198L138 202M138 198L134 202', 'tinta', 1.2, { fino: true }),
  L('M134 218L138 222M138 218L134 222', 'tinta', 1.2, { fino: true }),
];

const brazo_suelto: Forma[] = [
  R('M98 164C80 170 70 198 68 226L88 230C90 208 96 192 104 182Z', 'chaqueta', { vol: 0.5, trama: true }),
  L('M68 224L88 229', 'chaqueta.sombra', 3.5, { op: 0.9 }),
  L('M86 190C82 202 80 212 80 220', 'chaqueta.sombra', 2.4, { op: 0.85, fino: true }),
  R(circ(76, 238, 11), 'piel_sofia', { vol: 0.5, brillo: 0.5, grosor: 3.5 }),
  L('M81 245C85 243 87 241 87 237', 'piel_sofia.sombra', 2, { op: 0.9, fino: true }),
];

// handle of the magnifying glass: ink outline, colored core and a light line
const mango = (d: string, luz: string): Forma[] => [
  L(d, 'tinta', 13),
  L(d, 'mango', 6),
  L(luz, 'mango.luz', 2, { op: 0.9 }),
];

const lupa_grande: Forma[] = [
  R(circ(226, 118, 30), 'cielo', { vol: 0.6, brillo: 0.45 }),
  R(circ(226, 118, 21), 'vidrio', { vol: 0.35, grosor: 3 }),
  L('M213 112C214 107 218 104 224 103', 'blanco', 4.5),
  M(circ(237, 131, 2.4), 'blanco', 0.85),
];

const brazo_lupa: Forma[] = [
  R('M148 164C168 166 186 178 204 178L206 200C184 204 162 198 146 188Z', 'chaqueta', { vol: 0.5, trama: true }),
  L('M204 178L206 200', 'chaqueta.sombra', 3.5, { op: 0.9 }),
  L('M160 176C172 182 184 186 198 186', 'chaqueta.luz', 2.4, { op: 0.8, fino: true }),
  ...mango('M214 184L222 152', 'M213 178L219 161'),
  ...lupa_grande,
  R(circ(212, 190, 11.5), 'piel_sofia', { vol: 0.5, brillo: 0.5, grosor: 3.5 }),
];

const brazo_seniala: Forma[] = [
  ...mango('M70 250L56 274', 'M69 255L61 268'),
  R(circ(48, 286, 19), 'cielo', { vol: 0.6, brillo: 0.45 }),
  R(circ(48, 286, 12.5), 'vidrio', { vol: 0.35, grosor: 3 }),
  L('M42 283C43 280 45 278 48 278', 'blanco', 3),
  ...brazo_suelto.slice(0, -2),
  R(circ(76, 238, 11), 'piel_sofia', { vol: 0.5, brillo: 0.5, grosor: 3.5 }),
  R('M148 164C172 160 196 140 210 118L228 132C212 160 182 186 146 190Z', 'chaqueta', { vol: 0.5, trama: true }),
  L('M214 130C204 148 184 168 156 180', 'chaqueta.luz', 2.4, { op: 0.7, fino: true }),
  L('M226 116L238 100', 'tinta', 12),
  L('M226 116L238 100', 'piel_sofia', 5),
  R(circ(222, 122, 11), 'piel_sofia', { vol: 0.5, brillo: 0.5, grosor: 3.5 }),
];

const cabeza: Forma[] = [
  R(
    'M66 100C66 60 96 42 126 42C158 42 182 64 182 100C182 134 156 154 126 154C92 154 66 134 66 100Z',
    'piel_sofia',
    { vol: 0.38, brillo: 0.35 },
  ),
  R(
    'M64 110C54 66 84 32 126 34C164 36 190 64 184 100C178 84 166 72 150 68C134 86 106 96 82 96C74 99 68 104 64 110Z',
    'pelo_sofia',
    { vol: 0.6, brillo: 0.5, trama: true },
  ),
  M('M92 52C112 40 142 40 164 54C142 50 116 52 98 64Z', 'pelo_sofia.luz', 0.6),
  L('M126 38C108 46 92 62 86 86', 'pelo_sofia.sombra', 2, { op: 0.7, fino: true }),
  L('M142 40C126 52 114 68 108 88', 'pelo_sofia.sombra', 2, { op: 0.6, fino: true }),
  L('M168 54C160 60 156 66 154 70', 'pelo_sofia.sombra', 2, { op: 0.6, fino: true }),
  // red bow
  R('M88 46L70 34C66 44 68 54 74 60Z', 'lazo', { vol: 0.5, grosor: 3 }),
  R('M88 46L98 26C108 30 112 38 110 48Z', 'lazo', { vol: 0.5, grosor: 3 }),
  R(circ(89, 46, 6.5), 'rojo_oscuro', { vol: 0.4, grosor: 3 }),
  L('M82 45L75 40', 'rojo_oscuro', 1.8, { fino: true }),
  L('M96 41L102 33', 'rojo_oscuro', 1.8, { fino: true }),
  // ear
  R('M72 98C60 96 56 112 64 120C68 124 74 122 76 118Z', 'piel_sofia', { vol: 0.4, grosor: 3.5 }),
  L('M66 104C62 108 63 114 67 116', 'piel_sofia.sombra', 2, { fino: true }),
  // face
  M(elip(108, 124, 11, 8), 'rubor'),
  M(elip(172, 120, 9, 7), 'rubor'),
  M(elip(128, 108, 5, 7), 'tinta', undefined, { temblor: 0.2 }),
  M(elip(162, 106, 5, 7), 'tinta', undefined, { temblor: 0.2 }),
  M(circ(129.8, 105, 1.9), 'blanco', undefined, { temblor: 0 }),
  M(circ(163.8, 103, 1.9), 'blanco', undefined, { temblor: 0 }),
  M(circ(126.8, 111, 1), 'blanco', 0.7, { temblor: 0 }),
  M(circ(160.8, 109, 1), 'blanco', 0.7, { temblor: 0 }),
  L('M124 101C122 99 120 98 118 99', 'tinta', 1.8, { fino: true, temblor: 0.2 }),
  L('M158 99C156 97 154 96 152 97', 'tinta', 1.8, { fino: true, temblor: 0.2 }),
  L('M118 93C122 89 130 88 136 92', 'pelo_sofia', 3.2, { temblor: 0.3 }),
  L('M154 90C160 86 166 86 170 90', 'pelo_sofia', 3.2, { temblor: 0.3 }),
  L('M148 112C154 114 154 120 148 122', 'piel_sofia.sombra', 3, { op: 0.95, temblor: 0.3 }),
  L('M132 130C140 140 154 140 160 128', 'tinta', 3.2, { temblor: 0.3 }),
  L('M131 127L132 131', 'tinta', 1.6, { fino: true, temblor: 0 }),
  M(circ(150, 127, 1.1), 'piel_sofia.sombra', 0.9, { fino: true, temblor: 0 }),
  M(circ(156, 124, 1.1), 'piel_sofia.sombra', 0.9, { fino: true, temblor: 0 }),
  M(circ(144, 129, 1), 'piel_sofia.sombra', 0.9, { fino: true, temblor: 0 }),
];

export const SOFIA: Record<'lupa' | 'senala', Forma[]> = {
  lupa: [...coleta, ...piernas, ...cuello, ...torso, ...brazo_suelto, ...brazo_lupa, ...cabeza],
  senala: [...coleta, ...piernas, ...cuello, ...torso, ...brazo_seniala, ...cabeza],
};

// head, neck and the top of the jacket: the face of the speech bubbles
export const SOFIA_BUSTO: Forma[] = [...coleta, ...cuello, ...torso.slice(0, 1), ...torso.slice(5, 7), ...cabeza];
