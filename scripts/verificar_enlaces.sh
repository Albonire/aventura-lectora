#!/usr/bin/env bash
# Comprueba los enlaces de recursos y referencias del sitio.
# Para cada enlace muestra el código HTTP, el título de la página y la cabecera que decide
# si puede mostrarse dentro de otra página (X-Frame-Options o frame-ancestors).
# Un 403 de Cloudflare o un captcha no prueba que el enlace esté roto: ábrelo en un navegador.
# Uso: scripts/verificar_enlaces.sh
set -u

raiz="$(cd "$(dirname "$0")/.." && pwd)"
agente="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"

comprobar() {
  local url="$1" tmp codigo titulo marco error
  tmp="$(mktemp -d)"
  codigo="$(curl -sS -L --max-time 25 --connect-timeout 10 -A "$agente" \
    -D "$tmp/cabeceras" -o "$tmp/cuerpo" -w "%{http_code}" "$url" 2>"$tmp/error")"
  titulo="$(grep -o -i -m1 '<title[^>]*>[^<]*</title>' "$tmp/cuerpo" 2>/dev/null |
    sed -E 's/<[^>]+>//g' | tr -d '\r\n' | cut -c1-90)"
  marco="$(grep -i -E '^(x-frame-options|content-security-policy)' "$tmp/cabeceras" 2>/dev/null |
    tr -d '\r' | grep -i 'frame' | tail -1 | cut -c1-100)"
  error="$(head -c 90 "$tmp/error" | tr '\n' ' ')"
  printf '[%s] %s\n    título: %s\n    marco: %s\n    error: %s\n' \
    "$codigo" "$url" "${titulo:-(sin título)}" "${marco:-ninguno}" "${error:-ninguno}"
  rm -rf "$tmp"
}
export -f comprobar
export agente

grep -ohE "https?://[^[:space:]\"'<>\`,)*]+" \
  "$raiz/src/data/recursos.json" "$raiz/src/data/referencias_extra.ts" \
  "$raiz/src/data/noticia_reto4.json" "$raiz/RECURSOS.md" |
  sed -E 's/[.;:]+$//' | sort -u |
  xargs -d '\n' -P 8 -I{} bash -c 'comprobar "$1"' _ {}
