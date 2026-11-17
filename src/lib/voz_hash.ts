// short code of a text, so the site can ask for the audio of a reading without sending the text itself.
// The same function is used by the page, by the script that lists the texts and by the Worker (worker_tts).

// every run of spaces and line breaks counts as one space, so the same reading always gives the same code
export function normalizar_texto(texto: string): string {
  return texto.replace(/\s+/g, ' ').trim();
}

// cyrb53: a small 53 bit hash, written in hexadecimal. It only has to tell apart the ~100 texts of the book.
export function hash_texto(texto: string): string {
  const t = normalizar_texto(texto);
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < t.length; i += 1) {
    const c = t.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 2654435761);
    h2 = Math.imul(h2 ^ c, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(14, '0');
}
