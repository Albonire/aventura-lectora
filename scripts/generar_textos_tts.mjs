/* global window, document */
// lists every text that has a "Escuchar con voz pausada" button and writes worker_tts/textos.json
// ({ hash: text }). The Worker only makes audio for these texts.
//
// It opens the built site (`pnpm build` and `pnpm preview` first), visits the pages, touches every button and
// records what the page would say. Texts that only appear after answering something are not found by this
// crawl: for them the page uses the voice of the device. Run it again when the readings change.
//
// Usage: node scripts/generar_textos_tts.mjs [http://localhost:4321]
// Needs a Chromium: set PW_CHROMIUM=/path/to/chromium if Playwright's own is not installed.
import { writeFileSync } from 'node:fs';
import process from 'node:process';
import { URL, fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import { hash_texto, normalizar_texto } from '../src/lib/voz_hash.ts';

const base = process.argv[2] ?? 'http://localhost:4321';
const PASOS = ['', '/pistas', '/lupa', '/cerrar'];
const RUTAS = [
  '/',
  '/agencia',
  ...[1, 2, 3, 4].flatMap((n) => PASOS.map((p) => `/unidad/${n}${p}`)),
  '/cierre',
];

const navegador = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM || undefined,
  args: ['--no-sandbox'],
});
const pagina = await navegador.newPage();
await pagina.addInitScript(() => {
  window.__dichos = [];
  window.speechSynthesis.speak = (frase) => window.__dichos.push(frase.text);
});

const textos = {};
for (const ruta of RUTAS) {
  await pagina.goto(base + ruta, { waitUntil: 'networkidle' });
  // scroll screen by screen so the islands that wake up when visible do it
  const alto = await pagina.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= alto; y += 500) {
    await pagina.evaluate((d) => window.scrollTo(0, d), y);
    await pagina.waitForTimeout(100);
  }
  const botones = pagina.getByRole('button', { name: 'Escuchar con voz pausada' });
  const n = await botones.count();
  for (let i = 0; i < n; i += 1) {
    await pagina.evaluate(() => (window.__dichos.length = 0));
    await botones.nth(i).scrollIntoViewIfNeeded();
    await botones.nth(i).click();
    const dicho = await pagina.evaluate(() => window.__dichos.join(' '));
    const texto = normalizar_texto(dicho);
    if (texto) textos[hash_texto(texto)] = texto;
    const detener = pagina.getByRole('button', { name: 'Detener' }).first();
    if (await detener.count()) await detener.click();
  }
  process.stdout.write(`${ruta}: ${n} botones\n`);
}
await navegador.close();

const salida = fileURLToPath(new URL('../worker_tts/textos.json', import.meta.url));
writeFileSync(salida, JSON.stringify(textos, null, 2) + '\n');
const caracteres = Object.values(textos).reduce((s, t) => s + t.length, 0);
process.stdout.write(`${Object.keys(textos).length} textos, ${caracteres} caracteres, en worker_tts/textos.json\n`);
