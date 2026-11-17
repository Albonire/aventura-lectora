// prepares the crayon illustrations of the book from the originals in gemini_notebook/imagenes_origen/:
//   - the cover of the book (two sizes),
//   - the background of the diploma (faded on purpose, so the text can be read),
//   - the 19 sprites of the sheet, cut out with a transparent background.
// The results are saved in src/assets, so this only has to run when an original changes:
//   node scripts/preparar_imagenes.mjs [carpeta_para_revisar]
// With a folder, it also writes contact sheets of every sprite over the colors of the site, to check the edges.
import { Buffer } from 'node:buffer';
import { mkdirSync, rmSync } from 'node:fs';
import process from 'node:process';
import { URL, fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ruta = (r) => fileURLToPath(new URL(r, import.meta.url));
const ORIGEN = ruta('../gemini_notebook/imagenes_origen/');
const SALIDA = ruta('../src/assets/ilustraciones/');
const SPRITES = ruta('../src/assets/sprites/');
const REVISION = process.argv[2];

// cream of the site (--color-cream-paper) and how much of the drawing stays visible in the diploma (0 to 1)
const CREMA = { r: 250, g: 246, b: 238 };
export const INTENSIDAD_DIPLOMA = 0.26;

// names of the sprites, in reading order of the sheet (rows from top to bottom, left to right)
const NOMBRES = [
  'sofia_celebra', 'sofia_camina', 'sofia_parada', 'sofia_lupa',
  'mateo_celebra', 'mateo_camina', 'mateo_escribe', 'mateo_libreta',
  'conejo_corre', 'conejo_camina', 'conejo_celebra', 'conejo_guina',
  'conejo_frente', 'conejo_alegre', 'tortuga_libro', 'tortuga_celebra',
  'oruga_camina', 'oruga_guina', 'oruga_sombrero',
];

async function portada_y_diploma() {
  mkdirSync(SALIDA, { recursive: true });
  const tapa = sharp(`${ORIGEN}portada_tapa.webp`);
  for (const ancho of [480, 900]) {
    await tapa.clone().resize({ width: ancho }).webp({ quality: 62, effort: 6 }).toFile(`${SALIDA}tapa_portada_${ancho}.webp`);
  }
  // diploma: the drawing mixed with the cream of the page, so it works as a watermark
  const { data, info } = await sharp(`${ORIGEN}fondo_diploma.webp`).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const mezcla = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 3) {
    mezcla[i] = Math.round(CREMA.r + (data[i] - CREMA.r) * INTENSIDAD_DIPLOMA);
    mezcla[i + 1] = Math.round(CREMA.g + (data[i + 1] - CREMA.g) * INTENSIDAD_DIPLOMA);
    mezcla[i + 2] = Math.round(CREMA.b + (data[i + 2] - CREMA.b) * INTENSIDAD_DIPLOMA);
  }
  await sharp(mezcla, { raw: { width: info.width, height: info.height, channels: 3 } })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`${SALIDA}diploma_fondo.jpg`);
}

// ---------- sprites ----------

const FONDO = [250, 242, 231];
const TOLERANCIA = 12;
const DIST_MAX = 40;
// a closed piece of paper color is a hole only from this area and this mean distance to the paper color
const HUECO_MIN = 150;
const HUECO_DIST = 6;

function distancia(d, i) {
  return Math.hypot(d[i] - FONDO[0], d[i + 1] - FONDO[1], d[i + 2] - FONDO[2]);
}

// connected pieces of a boolean mask; returns a label per pixel (0 = none) and the list of pieces
function etiquetar(mascara, ancho, alto, radio) {
  const etiqueta = new Int32Array(ancho * alto);
  const piezas = [];
  const pila = [];
  for (let inicio = 0; inicio < mascara.length; inicio += 1) {
    if (!mascara[inicio] || etiqueta[inicio]) continue;
    const id = piezas.length + 1;
    const pieza = { id, area: 0, x0: ancho, y0: alto, x1: 0, y1: 0 };
    etiqueta[inicio] = id;
    pila.push(inicio);
    while (pila.length) {
      const p = pila.pop();
      const x = p % ancho;
      const y = (p - x) / ancho;
      pieza.area += 1;
      if (x < pieza.x0) pieza.x0 = x;
      if (x > pieza.x1) pieza.x1 = x;
      if (y < pieza.y0) pieza.y0 = y;
      if (y > pieza.y1) pieza.y1 = y;
      for (let dy = -radio; dy <= radio; dy += 1) {
        for (let dx = -radio; dx <= radio; dx += 1) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= ancho || ny >= alto) continue;
          const n = ny * ancho + nx;
          if (mascara[n] && !etiqueta[n]) {
            etiqueta[n] = id;
            pila.push(n);
          }
        }
      }
    }
    piezas.push(pieza);
  }
  return { etiqueta, piezas };
}

async function sprites() {
  const meta = await sharp(`${ORIGEN}hoja_sprites.webp`).metadata();
  // the left half of the sheet has the cream background
  const ancho = Math.floor(meta.width / 2) - 6;
  const alto = meta.height;
  const { data } = await sharp(`${ORIGEN}hoja_sprites.webp`)
    .extract({ left: 0, top: 0, width: ancho, height: alto })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // 1. the pixels of the paper color. Their pieces (the outside and the holes between arm and body) are removed.
  // The inside of the drawing (belly of the rabbit, page of the notebook) is lighter or whiter, so it stays.
  const es_fondo = new Uint8Array(ancho * alto);
  for (let p = 0; p < es_fondo.length; p += 1) es_fondo[p] = distancia(data, p * 3) <= TOLERANCIA ? 1 : 0;
  const fondos = etiquetar(es_fondo, ancho, alto, 1);
  // the outside of the drawing always goes; a closed piece (hole between an arm and the body) goes only when it is
  // big and really the color of the paper, so light parts of the drawing (belly, pages) are not taken for paper
  const suma = new Float64Array(fondos.piezas.length + 1);
  for (let p = 0; p < es_fondo.length; p += 1) {
    if (fondos.etiqueta[p]) suma[fondos.etiqueta[p]] += distancia(data, p * 3);
  }
  const quitar = new Uint8Array(ancho * alto);
  for (let p = 0; p < quitar.length; p += 1) {
    const pieza = fondos.piezas[fondos.etiqueta[p] - 1];
    if (!pieza || pieza.area <= 40) continue;
    const toca_borde = pieza.x0 === 0 || pieza.y0 === 0 || pieza.x1 === ancho - 1 || pieza.y1 === alto - 1;
    if (toca_borde || (pieza.area >= HUECO_MIN && suma[pieza.id] / pieza.area <= HUECO_DIST)) quitar[p] = 1;
  }

  // 2. soft edge: the pixels that touch the removed area get an alpha from their distance to the paper color,
  // and their color loses the paper that was mixed in (no cream halo over white or colored backgrounds)
  const rgba = Buffer.alloc(ancho * alto * 4);
  for (let p = 0; p < quitar.length; p += 1) {
    const x = p % ancho;
    const y = (p - x) / ancho;
    let cerca = false;
    if (!quitar[p]) {
      for (let dy = -2; dy <= 2 && !cerca; dy += 1) {
        for (let dx = -2; dx <= 2; dx += 1) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && ny >= 0 && nx < ancho && ny < alto && quitar[ny * ancho + nx]) {
            cerca = true;
            break;
          }
        }
      }
    }
    const o = p * 4;
    if (quitar[p]) continue;
    let a = 1;
    if (cerca) a = Math.min(1, Math.max(0, (distancia(data, p * 3) - TOLERANCIA) / (DIST_MAX - TOLERANCIA)));
    for (let c = 0; c < 3; c += 1) {
      const v = a > 0.04 ? (data[p * 3 + c] - FONDO[c] * (1 - a)) / a : data[p * 3 + c];
      rgba[o + c] = Math.max(0, Math.min(255, Math.round(v)));
    }
    rgba[o + 3] = Math.round(a * 255);
  }

  // 3. the sprites: separate pieces of the drawing that are close to each other belong together
  const visible = new Uint8Array(ancho * alto);
  for (let p = 0; p < visible.length; p += 1) visible[p] = rgba[p * 4 + 3] > 40 ? 1 : 0;
  const { etiqueta: de_cada_sprite, piezas } = etiquetar(visible, ancho, alto, 5);
  const grandes = piezas.filter((q) => q.area > 1500);
  if (grandes.length !== NOMBRES.length) {
    process.stderr.write(`Se esperaban ${NOMBRES.length} sprites y hay ${grandes.length}\n`);
    for (const q of grandes) process.stderr.write(`  ${q.x0},${q.y0} ${q.x1},${q.y1} area ${q.area}\n`);
    process.exit(1);
  }
  // reading order: rows by the middle of the box (rows are far apart), then left to right
  grandes.sort((a, b) => {
    const fa = Math.round((a.y0 + a.y1) / 2 / 150);
    const fb = Math.round((b.y0 + b.y1) / 2 / 150);
    return fa - fb || a.x0 - b.x0;
  });

  rmSync(SPRITES, { recursive: true, force: true });
  mkdirSync(SPRITES, { recursive: true });
  const hojas = [];
  for (let i = 0; i < grandes.length; i += 1) {
    const q = grandes[i];
    const margen = 3;
    const caja = {
      left: Math.max(0, q.x0 - margen),
      top: Math.max(0, q.y0 - margen),
      width: Math.min(ancho, q.x1 + margen + 1) - Math.max(0, q.x0 - margen),
      height: Math.min(alto, q.y1 + margen + 1) - Math.max(0, q.y0 - margen),
    };
    const archivo = `${SPRITES}${NOMBRES[i]}.webp`;
    // only this sprite: pieces of the neighbors that fall inside its box are made transparent
    const propio = Buffer.from(rgba);
    for (let p = 0; p < de_cada_sprite.length; p += 1) {
      if (de_cada_sprite[p] !== q.id) propio[p * 4 + 3] = 0;
    }
    const png = await sharp(propio, { raw: { width: ancho, height: alto, channels: 4 } }).extract(caja).png().toBuffer();
    await sharp(png).webp({ quality: 86, alphaQuality: 90, effort: 6 }).toFile(archivo);
    const info = await sharp(archivo).metadata();
    process.stdout.write(`${NOMBRES[i]}: ${info.width}x${info.height}\n`);
    hojas.push({ nombre: NOMBRES[i], png, ancho: caja.width, alto: caja.height });
  }

  if (REVISION) {
    mkdirSync(REVISION, { recursive: true });
    const fondos_sitio = { crema: '#faf6ee', blanco: '#ffffff', verde: '#84cc16', magenta: '#ff00ff', amarillo: '#facc15', cielo: '#bae6fd' };
    for (const [nombre, color] of Object.entries(fondos_sitio)) {
      const columnas = 5;
      const celda = 220;
      const filas = Math.ceil(hojas.length / columnas);
      const piezas_comp = [];
      for (let i = 0; i < hojas.length; i += 1) {
        const h = hojas[i];
        const k = Math.min(1, (celda - 20) / Math.max(h.ancho, h.alto));
        const redim = await sharp(h.png).resize({ width: Math.round(h.ancho * k), height: Math.round(h.alto * k) }).png().toBuffer();
        piezas_comp.push({ input: redim, left: (i % columnas) * celda + 10, top: Math.floor(i / columnas) * celda + 10 });
      }
      await sharp({ create: { width: columnas * celda, height: filas * celda, channels: 3, background: color } })
        .composite(piezas_comp)
        .png()
        .toFile(`${REVISION}/sprites_${nombre}.png`);
    }
  }
}

await portada_y_diploma();
await sprites();
process.stdout.write('Imagenes listas en src/assets\n');
