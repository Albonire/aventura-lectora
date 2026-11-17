// Mateo, "el Rastreador de Pistas" (character sheet of guide 2.1, figure 2): 11 years old, brown skin,
// curly black hair under a sky blue cap, lime green sweater with a yellow chest pocket, field notebook
// with a green back and a yellow pencil. Drawn in a 264 x 314 box, like Sofía.
// The head is written once: the full body and the face of the speech bubbles use the same shapes.

import { caja, circ, elip, girar, trasladar } from '../geometria';
import { linea as L, mancha as M, relleno as R, type Forma } from '../capas';

export const MATEO_ANCHO = 264;
export const MATEO_ALTO = 314;

const piernas: Forma[] = [
  R('M94 236L94 294L122 294L124 236Z', 'pantalon_mateo', { vol: 0.5, trama: true }),
  R('M128 236L130 294L158 294L156 236Z', 'pantalon_mateo', { vol: 0.5, trama: true }),
  L('M101 258C105 264 107 272 106 280', 'pantalon_mateo.sombra', 2.2, { op: 0.9, fino: true }),
  L('M137 258C141 264 143 272 142 280', 'pantalon_mateo.sombra', 2.2, { op: 0.9, fino: true }),
  R('M90 292L124 292C132 292 136 298 136 306L86 306C84 300 86 294 90 292Z', 'zapato', { vol: 0.5, brillo: 0.5 }),
  R('M128 292L162 292C170 292 174 298 174 306L124 306C122 300 124 294 128 292Z', 'zapato', { vol: 0.5, brillo: 0.5 }),
  L('M87 303L135 303', 'crema', 2.4, { op: 0.95 }),
  L('M125 303L173 303', 'crema', 2.4, { op: 0.95 }),
];

const cuello: Forma[] = [
  R('M114 144L114 166L138 166L138 144Z', 'piel_mateo', { vol: 0.5 }),
  M('M114 150C120 160 132 161 138 152L138 162C130 169 120 168 114 160Z', 'piel_mateo.sombra', 0.85),
];

// ribbed hem: short vertical lines
const costillas = (x0: number, x1: number, y0: number, y1: number): string => {
  let d = '';
  for (let x = x0; x <= x1; x += 6) d += `M${x} ${y0}L${x} ${y1}`;
  return d;
};

const torso: Forma[] = [
  R(
    'M98 160C82 164 76 190 78 240L170 240C172 198 166 168 152 160C140 170 110 170 98 160Z',
    'sueter',
    { vol: 0.6, trama: true },
  ),
  R('M100 158C112 176 138 176 150 158C140 168 110 168 100 158Z', 'lima_oscuro', { vol: 0.3, grosor: 3 }),
  R('M78.5 228L170.5 228L170 240L78 240Z', 'lima_oscuro', { vol: 0.3, grosor: 3 }),
  L(costillas(84, 166, 231, 238), 'lima_oscuro.sombra', 1.6, { op: 0.7, fino: true }),
  L('M92 196C98 206 100 218 98 226', 'sueter.sombra', 2.6, { op: 0.9, fino: true }),
  L('M154 196C152 208 154 220 158 226', 'sueter.sombra', 2.6, { op: 0.9, fino: true }),
  // yellow chest pocket with a stitch
  R('M112 182L134 182L134 196C134 202 129 205 123 205C117 205 112 202 112 196Z', 'amarillo', {
    vol: 0.4,
    grosor: 3,
    brillo: 0.3,
  }),
  L('M115 188L131 188', 'amarillo.trazo', 1.6, { dash: '3 2', op: 0.8, fino: true }),
];

// field notebook: green back, white page, rings on top; `fn` moves each shape to the pose
const libreta = (fn: (d: string) => string, x: number, y: number, ancho: number, alto: number): Forma[] => [
  R(fn(caja(x + 8, y + 6, ancho, alto, 4)), 'respaldo', { vol: 0.5, grosor: 3 }),
  R(fn(caja(x, y, ancho, alto, 4)), 'blanco', { vol: 0.35, grosor: 3 }),
  L(
    fn(
      `M${x + 10} ${y + 18}L${x + ancho - 10} ${y + 18}M${x + 10} ${y + 29}L${x + ancho - 10} ${y + 29}` +
        `M${x + 10} ${y + 40}L${x + ancho - 10} ${y + 40}M${x + 10} ${y + 51}L${x + ancho - 22} ${y + 51}`,
    ),
    'metal',
    3,
    { fino: true },
  ),
  L(
    fn(
      `M${x + 8} ${y - 6}L${x + 8} ${y + 6}M${x + 18} ${y - 6}L${x + 18} ${y + 6}M${x + 28} ${y - 6}L${x + 28} ${y + 6}` +
        `M${x + 38} ${y - 6}L${x + 38} ${y + 6}M${x + 48} ${y - 6}L${x + 48} ${y + 6}`,
    ),
    'tinta',
    3,
  ),
];

const lapiz = (fn: (d: string) => string): Forma[] => [
  R(fn(caja(-26, -5, 42, 10, 2)), 'amarillo', { vol: 0.5, grosor: 3, brillo: 0.4 }),
  R(fn(caja(-26, -5, 8, 10, 2)), 'coral_suave', { vol: 0.3, grosor: 3 }),
  R(fn('M16 -5L28 0L16 5Z'), 'crema', { vol: 0, grosor: 3 }),
  R(fn('M23 -2L28 0L23 2Z'), 'negro', { vol: 0, grosor: 1 }),
];

const brazo_escribe: Forma[] = [
  R('M150 164C170 168 184 190 190 216L170 224C164 206 156 194 146 186Z', 'sueter', { vol: 0.5, trama: true }),
  ...libreta((d) => girar(d, 9, 176, 210), 146, 178, 58, 66),
  R(circ(188, 238, 11), 'piel_mateo', { vol: 0.5, brillo: 0.5, grosor: 3.5 }),
  R(
    'M98 164C84 168 74 190 76 210C78 226 92 234 108 232L134 228L132 208L110 210C102 210 100 202 102 194L108 180Z',
    'sueter',
    { vol: 0.5, trama: true },
  ),
  L('M80 214C84 224 92 228 104 226', 'sueter.sombra', 2.4, { op: 0.85, fino: true }),
  ...lapiz((d) => trasladar(girar(d, 38, 0, 0), 140, 216)),
  R(circ(138, 218, 11), 'piel_mateo', { vol: 0.5, brillo: 0.5, grosor: 3.5 }),
];

const brazo_levanta: Forma[] = [
  ...libreta((d) => girar(d, -8, 74, 226), 42, 198, 46, 56),
  R('M98 164C80 170 72 196 70 222L90 228C92 208 98 192 106 182Z', 'sueter', { vol: 0.5, trama: true }),
  R(circ(80, 234, 11), 'piel_mateo', { vol: 0.5, brillo: 0.5, grosor: 3.5 }),
  R('M150 164C174 160 196 138 206 112L226 122C216 154 186 186 148 190Z', 'sueter', { vol: 0.5, trama: true }),
  L('M214 126C204 146 184 170 156 180', 'sueter.luz', 2.4, { op: 0.7, fino: true }),
  R(circ(218, 112, 12), 'piel_mateo', { vol: 0.5, brillo: 0.5, grosor: 3.5 }),
];

// curls that show around the cap: [cx, cy, r]
const rizos_atras: [number, number, number][] = [
  [74, 76, 15],
  [62, 94, 14],
  [62, 116, 13],
  [72, 134, 12],
  [186, 104, 10],
];
const rizos_frente: [number, number, number][] = [
  [100, 74, 11],
  [118, 68, 11],
  [138, 66, 11],
  [158, 70, 11],
  [174, 80, 10],
];

const cabeza: Forma[] = [
  ...rizos_atras.map(([cx, cy, r]) => R(circ(cx, cy, r), 'pelo_mateo', { vol: 0.5, brillo: 0.6, grosor: 3 })),
  R(
    'M66 102C66 62 96 44 126 44C158 44 182 66 182 102C182 136 156 156 126 156C92 156 66 136 66 102Z',
    'piel_mateo',
    { vol: 0.38, brillo: 0.35 },
  ),
  ...rizos_frente.map(([cx, cy, r]) => R(circ(cx, cy, r), 'pelo_mateo', { vol: 0.5, brillo: 0.6, grosor: 3 })),
  M('M64 90C98 68 152 70 184 86L184 96C150 82 100 82 66 100Z', 'piel_mateo.sombra', 0.6),
  R('M58 86C50 46 90 20 130 24C168 28 192 54 184 82C152 60 96 62 58 86Z', 'gorra', {
    vol: 0.6,
    brillo: 0.5,
    trama: true,
  }),
  L('M96 36C84 44 76 56 74 68', 'gorra.luz', 3, { op: 0.85 }),
  L('M130 25C128 40 130 54 134 66', 'gorra.sombra', 2, { op: 0.8, fino: true }),
  L('M156 32C166 40 172 50 174 62', 'gorra.sombra', 2, { op: 0.8, fino: true }),
  R('M144 64C176 54 212 64 222 84C200 94 170 92 148 80Z', 'cielo_claro', { vol: 0.5, brillo: 0.4 }),
  L('M156 72C176 68 198 72 212 80', 'cielo_claro.sombra', 2, { op: 0.7, fino: true }),
  R(circ(126, 23, 6), 'cielo_claro', { vol: 0.4, grosor: 3 }),
  // ear
  R('M72 102C60 100 56 116 64 124C68 128 74 126 76 122Z', 'piel_mateo', { vol: 0.4, grosor: 3.5 }),
  L('M66 108C62 112 63 118 67 120', 'piel_mateo.sombra', 2, { fino: true }),
  // face
  M(elip(108, 126, 11, 8), 'rubor'),
  M(elip(172, 122, 9, 7), 'rubor'),
  M(elip(130, 110, 5, 7), 'tinta', undefined, { temblor: 0.2 }),
  M(elip(164, 108, 5, 7), 'tinta', undefined, { temblor: 0.2 }),
  M(circ(131.8, 107, 1.9), 'blanco', undefined, { temblor: 0 }),
  M(circ(165.8, 105, 1.9), 'blanco', undefined, { temblor: 0 }),
  M(circ(128.8, 113, 1), 'blanco', 0.7, { temblor: 0 }),
  M(circ(162.8, 111, 1), 'blanco', 0.7, { temblor: 0 }),
  L('M120 97C124 91 132 91 138 96', 'pelo_mateo', 4, { temblor: 0.3 }),
  L('M156 94C160 89 168 89 174 94', 'pelo_mateo', 4, { temblor: 0.3 }),
  L('M150 114C156 116 156 122 150 124', 'piel_mateo.sombra', 3, { op: 0.95, temblor: 0.3 }),
  L('M130 131C147 145 164 143 164 129', 'tinta', 3.4, { temblor: 0.3 }),
];

export const MATEO: Record<'libreta' | 'levanta', Forma[]> = {
  libreta: [...piernas, ...cuello, ...torso, ...brazo_escribe, ...cabeza],
  levanta: [...piernas, ...cuello, ...torso, ...brazo_levanta, ...cabeza],
};

// head, neck and the top of the sweater: the face of the speech bubbles
export const MATEO_BUSTO: Forma[] = [...cuello, ...torso.slice(0, 2), ...cabeza];
