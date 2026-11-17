# Voz natural de Aventura lectora (Cloudflare Worker)

Da una voz natural a "Escuchar con voz pausada". Es opcional: sin `PUBLIC_TTS_URL` el sitio usa la voz del aparato.

## Qué hace
- Responde `GET /?h=<hash>` solo para los textos de `textos.json`. Cualquier otro código recibe 404, así nadie puede gastar la cuota con texto propio.
- Genera el audio una vez con Workers AI (`@cf/deepgram/aura-2-es`) y lo guarda en Workers KV.
- Si se acaba la cuota del día responde 503 y el sitio usa la voz del aparato.
- No recibe datos de los estudiantes: solo el código de una lectura.

## Puesta en marcha (una vez)
1. Cuenta gratuita de Cloudflare.
2. Desde esta carpeta: `npx wrangler kv namespace create AUDIOS` y pegar el `id` en `wrangler.toml`.
3. En `wrangler.toml`, poner en `ORIGENES` la dirección del sitio publicado (separadas por comas).
4. `npx wrangler deploy`. Copiar la dirección `https://....workers.dev`.
5. En Vercel, variable de entorno `PUBLIC_TTS_URL` con esa dirección, y volver a desplegar el sitio.
6. Escuchar las voces del modelo y, si otra suena mejor que `aquila`, cambiar `VOZ` en `index.ts` (la lista de voces no está confirmada en la documentación oficial: revisar la ficha del modelo).

## Cada vez que cambien las lecturas
```bash
pnpm build && pnpm preview
```
```bash
pnpm tts:textos http://localhost:4321
```
Luego `npx wrangler deploy` otra vez.

## Llenar la caché
El plan gratis da 10.000 Neurons al día (unos 3.600 caracteres). Con 24 textos y unos 7.800 caracteres, alcanza en 2 o 3 días:
```bash
pnpm tts:calentar https://TU-WORKER.workers.dev
```
Se detiene al primer 503; repetirlo cada día hasta que diga que todos están listos. Una lectura que nadie había pedido se genera cuando un estudiante la toca, si queda cuota.

## Pendiente de verificar con el servicio real
- Forma exacta de la salida de `env.AI.run` (el código acepta flujo, respuesta, bytes o base64).
- Campos de entrada opcionales (`speaker`, formato) y la lista de voces.
- Términos de uso comercial del modelo: para un prototipo académico no es problema; revisar la ficha oficial antes de otro uso.
