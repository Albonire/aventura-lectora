/* global fetch */
// asks the Worker for the audio of every text, one by one, so each one is made and kept in KV.
// The free plan of Workers AI lets about 3 readings be made per day: it stops at the first "not available"
// answer. Run it once a day until it says that every text is ready.
//
// Usage: node scripts/calentar_tts.mjs https://aventura-lectora-voz.TU-USUARIO.workers.dev
import { readFileSync } from 'node:fs';
import process from 'node:process';
import { URL, fileURLToPath } from 'node:url';

const direccion = (process.argv[2] ?? process.env.PUBLIC_TTS_URL ?? '').replace(/\/+$/, '');
if (!direccion) {
  process.stderr.write('Falta la direccion del Worker.\n');
  process.exit(1);
}
const textos = JSON.parse(
  readFileSync(fileURLToPath(new URL('../worker_tts/textos.json', import.meta.url)), 'utf-8'),
);

let listos = 0;
for (const [hash, texto] of Object.entries(textos)) {
  const r = await fetch(`${direccion}/?h=${hash}`, { headers: { Range: 'bytes=0-0' } });
  if (r.status === 503) {
    process.stdout.write(`Cuota del dia agotada. Listos ${listos} de ${Object.keys(textos).length}. Repite manana.\n`);
    process.exit(0);
  }
  if (!r.ok && r.status !== 206) {
    process.stderr.write(`Error ${r.status} con "${texto.slice(0, 40)}..."\n`);
    process.exit(1);
  }
  listos += 1;
}
process.stdout.write(`Los ${listos} textos estan listos.\n`);
