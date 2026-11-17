// makes src/assets/papel_grano.webp: a small tile of paper grain that repeats without a seam.
// Run once with `node scripts/generar_grano.mjs`; the result is saved in the repository.
import { Buffer } from 'node:buffer';
import process from 'node:process';
import { URL, fileURLToPath } from 'node:url';
import sharp from 'sharp';

const TAM = 128;
const CELDA = 16;

// small seeded generator, so the tile is always the same
function generador(semilla) {
  let s = semilla >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
const azar = generador(20260);

// coarse blotches: a random grid that wraps around, smoothly interpolated, so the tile has no seam
const n = TAM / CELDA;
const rejilla = Array.from({ length: n * n }, () => azar());
const suave = (t) => t * t * (3 - 2 * t);
function manchas(x, y) {
  const gx = x / CELDA;
  const gy = y / CELDA;
  const x0 = Math.floor(gx);
  const y0 = Math.floor(gy);
  const u = suave(gx - x0);
  const v = suave(gy - y0);
  const g = (i, j) => rejilla[(((j % n) + n) % n) * n + (((i % n) + n) % n)];
  const a = g(x0, y0) + (g(x0 + 1, y0) - g(x0, y0)) * u;
  const b = g(x0, y0 + 1) + (g(x0 + 1, y0 + 1) - g(x0, y0 + 1)) * u;
  return a + (b - a) * v;
}

const datos = Buffer.alloc(TAM * TAM * 4);
for (let y = 0; y < TAM; y += 1) {
  for (let x = 0; x < TAM; x += 1) {
    const fino = azar();
    const v = 0.65 * fino + 0.35 * manchas(x, y);
    const i = (y * TAM + x) * 4;
    // dark specks and light specks, in only a few levels of opacity so the file stays small
    if (v < 0.36) {
      datos[i] = 30;
      datos[i + 1] = 41;
      datos[i + 2] = 59;
      datos[i + 3] = v < 0.25 ? 12 : 6;
    } else if (v > 0.7) {
      datos[i] = 255;
      datos[i + 1] = 255;
      datos[i + 2] = 255;
      datos[i + 3] = v > 0.8 ? 40 : 18;
    }
  }
}

const info = await sharp(datos, { raw: { width: TAM, height: TAM, channels: 4 } })
  .webp({ lossless: true, effort: 6 })
  .toFile(fileURLToPath(new URL('../src/assets/papel_grano.webp', import.meta.url)));
process.stdout.write(`papel_grano.webp: ${info.size} bytes\n`);
