import { describe, expect, it, vi } from 'vitest';
import { hash_texto, normalizar_texto } from '../../src/lib/voz_hash';
import textos from '../../worker_tts/textos.json';
import { a_bytes, atender, responder_audio, type Entorno } from '../../worker_tts/index';

const LISTA = textos as Record<string, string>;
const hash_valido = Object.keys(LISTA)[0];

function entorno(opc: { guardado?: ArrayBuffer | null; ia?: () => Promise<unknown> } = {}) {
  const guardados = new Map<string, ArrayBuffer>();
  const ia = vi.fn(opc.ia ?? (async () => new Uint8Array(2000).buffer));
  const env: Entorno = {
    AI: { run: ia },
    AUDIOS: {
      get: vi.fn(async (k: string) => (opc.guardado !== undefined ? opc.guardado : (guardados.get(k) ?? null))),
      put: vi.fn(async (k: string, v: ArrayBuffer) => void guardados.set(k, v)),
    },
    ORIGENES: 'https://sitio.example',
  };
  return { env, ia, guardados };
}
const pedir = (h: string, extra: RequestInit = {}) =>
  new Request(`https://voz.example/?h=${h}`, { ...extra, headers: { Origin: 'https://sitio.example', ...(extra.headers ?? {}) } });

describe('hash de textos', () => {
  it('is the same for the same text with other spaces', () => {
    expect(hash_texto('Hola  mundo\n')).toBe(hash_texto(' Hola mundo'));
    expect(normalizar_texto(' a \n b ')).toBe('a b');
  });
  it('tells texts apart and always has the same length', () => {
    const a = hash_texto('Era día de molienda');
    expect(a).not.toBe(hash_texto('Era dia de molienda'));
    expect(a).toHaveLength(14);
  });
  it('has no collisions among the texts of the book', () => {
    const hashes = Object.entries(LISTA).map(([, t]) => hash_texto(t));
    expect(new Set(hashes).size).toBe(hashes.length);
    for (const [h, t] of Object.entries(LISTA)) expect(hash_texto(t)).toBe(h);
  });
  it('the list of texts is not empty and every text is a reading', () => {
    expect(Object.keys(LISTA).length).toBeGreaterThan(10);
  });
});

describe('Worker de la voz', () => {
  it('refuses a code that is not in the list and never calls the AI', async () => {
    const { env, ia } = entorno();
    const r = await atender(pedir('0000000000dead'), env);
    expect(r.status).toBe(404);
    expect((await atender(pedir('constructor'), env)).status).toBe(404);
    expect(ia).not.toHaveBeenCalled();
  });
  it('makes the audio once, keeps it, and later answers from KV', async () => {
    const { env, ia, guardados } = entorno();
    const r1 = await atender(pedir(hash_valido), env);
    expect(r1.status).toBe(200);
    expect(r1.headers.get('Content-Type')).toBe('audio/mpeg');
    expect(guardados.size).toBe(1);
    expect(ia).toHaveBeenCalledTimes(1);
    expect(ia.mock.calls[0][1]).toMatchObject({ text: LISTA[hash_valido] });
    const { env: env2, ia: ia2 } = entorno({ guardado: new Uint8Array(3000).buffer });
    expect((await atender(pedir(hash_valido), env2)).status).toBe(200);
    expect(ia2).not.toHaveBeenCalled();
  });
  it('answers 503 when the daily quota ends or the audio is empty', async () => {
    const { env } = entorno({ ia: async () => Promise.reject(new Error('limite')) });
    expect((await atender(pedir(hash_valido), env)).status).toBe(503);
    const { env: vacio } = entorno({ ia: async () => new Uint8Array(10).buffer });
    expect((await atender(pedir(hash_valido), vacio)).status).toBe(503);
  });
  it('only allows the origins of the site', async () => {
    const { env } = entorno();
    const bien = await atender(pedir(hash_valido), env);
    expect(bien.headers.get('Access-Control-Allow-Origin')).toBe('https://sitio.example');
    const mal = await atender(
      new Request(`https://voz.example/?h=${hash_valido}`, { headers: { Origin: 'https://otro.example' } }),
      env,
    );
    expect(mal.headers.get('Access-Control-Allow-Origin')).toBeNull();
    const post = await atender(pedir(hash_valido, { method: 'POST' }), env);
    expect(post.status).toBe(405);
  });
  it('serves a part of the audio when the player asks for a range', async () => {
    const audio = new Uint8Array(100).map((_, i) => i).buffer;
    const r = responder_audio(audio, 'bytes=10-19', {});
    expect(r.status).toBe(206);
    expect(r.headers.get('Content-Range')).toBe('bytes 10-19/100');
    expect(new Uint8Array(await r.arrayBuffer())[0]).toBe(10);
    expect(responder_audio(audio, 'bytes=500-600', {}).status).toBe(416);
    expect(responder_audio(audio, 'bytes=0-0', {}).status).toBe(206);
    expect(responder_audio(audio, null, {}).status).toBe(200);
  });
  it('understands the forms in which the AI can give the audio', async () => {
    const bytes = new Uint8Array([1, 2, 3]);
    expect(new Uint8Array(await a_bytes(bytes))).toEqual(bytes);
    expect(new Uint8Array(await a_bytes(new Response(bytes)))).toEqual(bytes);
    expect(new Uint8Array(await a_bytes(new Response(bytes).body))).toEqual(bytes);
    expect(new Uint8Array(await a_bytes({ audio: btoa('\u0001\u0002\u0003') }))).toEqual(bytes);
    await expect(a_bytes({ otro: 1 })).rejects.toThrow();
  });
});
