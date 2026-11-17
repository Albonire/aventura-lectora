// Cloudflare Worker of "Aventura lectora": gives a natural voice to the readings of the book.
// It only answers for the texts of textos.json (made by `pnpm tts:textos`), asked by their hash, so nobody can
// use the free quota with another text. Each reading is made once with Workers AI and kept in Workers KV.
// It never receives data of the students: the page only sends the code of a reading.
//
// Setup (once, from this folder): create the KV space with `npx wrangler kv namespace create AUDIOS`, write its
// id in wrangler.toml, and publish with `npx wrangler deploy`. Then put the address of the Worker in the
// PUBLIC_TTS_URL variable of the site.

import textos from './textos.json';

interface Kv {
  get(clave: string, tipo: 'arrayBuffer'): Promise<ArrayBuffer | null>;
  put(clave: string, valor: ArrayBuffer): Promise<void>;
}
interface Ia {
  run(modelo: string, entrada: Record<string, unknown>): Promise<unknown>;
}
export interface Entorno {
  AI: Ia;
  AUDIOS: Kv;
  // sites that can ask for audio, separated by commas (see wrangler.toml)
  ORIGENES: string;
}

const MODELO = '@cf/deepgram/aura-2-es';
// one of the Spanish voices of the model; listen to them and change it here if another one is better
const VOZ = 'aquila';
const VERSION = 'v1';

const LISTA = textos as Record<string, string>;

function cabeceras(origen: string | null, permitidos: string[]): Record<string, string> {
  const h: Record<string, string> = { Vary: 'Origin' };
  if (origen && permitidos.includes(origen)) h['Access-Control-Allow-Origin'] = origen;
  return h;
}

// the audio can come as a stream, a response, bytes or a base64 text, depending on the version of the model
export async function a_bytes(salida: unknown): Promise<ArrayBuffer> {
  if (salida instanceof Response) return salida.arrayBuffer();
  if (salida instanceof ReadableStream) return new Response(salida).arrayBuffer();
  if (salida instanceof ArrayBuffer) return salida;
  if (ArrayBuffer.isView(salida)) {
    const v = salida as Uint8Array;
    return v.buffer.slice(v.byteOffset, v.byteOffset + v.byteLength) as ArrayBuffer;
  }
  if (salida && typeof salida === 'object' && typeof (salida as { audio?: unknown }).audio === 'string') {
    const binario = atob((salida as { audio: string }).audio);
    const bytes = new Uint8Array(binario.length);
    for (let i = 0; i < binario.length; i += 1) bytes[i] = binario.charCodeAt(i);
    return bytes.buffer;
  }
  throw new Error('Salida de audio desconocida');
}

// answers with the whole audio or with the part that the player asks for (Safari needs ranges)
export function responder_audio(audio: ArrayBuffer, rango: string | null, extra: Record<string, string>): Response {
  const base = {
    ...extra,
    'Content-Type': 'audio/mpeg',
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'public, max-age=31536000, immutable',
  };
  const m = rango?.match(/^bytes=(\d*)-(\d*)$/);
  if (!m || (m[1] === '' && m[2] === '')) return new Response(audio, { status: 200, headers: base });
  const total = audio.byteLength;
  let ini = m[1] === '' ? Math.max(0, total - Number(m[2])) : Number(m[1]);
  let fin = m[1] === '' || m[2] === '' ? total - 1 : Math.min(Number(m[2]), total - 1);
  if (ini > fin || ini >= total) {
    return new Response(null, { status: 416, headers: { ...base, 'Content-Range': `bytes */${total}` } });
  }
  ini = Math.floor(ini);
  fin = Math.floor(fin);
  return new Response(audio.slice(ini, fin + 1), {
    status: 206,
    headers: { ...base, 'Content-Range': `bytes ${ini}-${fin}/${total}`, 'Content-Length': String(fin - ini + 1) },
  });
}

export async function atender(peticion: Request, env: Entorno): Promise<Response> {
  const permitidos = (env.ORIGENES ?? '').split(',').map((o) => o.trim()).filter(Boolean);
  const cors = cabeceras(peticion.headers.get('Origin'), permitidos);
  if (peticion.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: { ...cors, 'Access-Control-Allow-Methods': 'GET', 'Access-Control-Allow-Headers': 'Range' },
    });
  }
  if (peticion.method !== 'GET') return new Response('Metodo no permitido', { status: 405, headers: cors });

  const hash = new URL(peticion.url).searchParams.get('h') ?? '';
  const texto = Object.prototype.hasOwnProperty.call(LISTA, hash) ? LISTA[hash] : null;
  if (!texto) return new Response('No encontrado', { status: 404, headers: cors });

  const clave = `${VERSION}:${VOZ}:${hash}`;
  let audio = await env.AUDIOS.get(clave, 'arrayBuffer');
  if (!audio) {
    try {
      audio = await a_bytes(await env.AI.run(MODELO, { text: texto, speaker: VOZ }));
    } catch {
      // free quota of the day finished, or the service is down: the page falls back to the voice of the device
      return new Response('Servicio no disponible', { status: 503, headers: { ...cors, 'Retry-After': '3600' } });
    }
    if (audio.byteLength < 1000) return new Response('Audio vacio', { status: 503, headers: cors });
    await env.AUDIOS.put(clave, audio);
  }
  return responder_audio(audio, peticion.headers.get('Range'), cors);
}

export default {
  fetch: (peticion: Request, env: Entorno) => atender(peticion, env),
};
