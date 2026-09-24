# CLAUDE.md: Aventura lectora

Sitio web tipo libro, guiado por scroll, del curso "Aventura lectora" para estudiantes de 5.º de primaria (Colombia). Entregable académico: la URL pública del sitio.

## Antes de escribir código
1. Lee `SPECS.md` completo. Es la especificación.
2. El contenido sale de `CONTENIDO.md`. Los enlaces y citas salen de `RECURSOS.md`. No inventes textos, preguntas, datos, enlaces ni citas.
3. Los personajes y el estilo de las ilustraciones siguen `gemini_notebook/01_guia_de_estilo.md`, igual que los videos e infografías que el equipo genera en Gemini Notebook.
4. Trabaja por fases (SPECS.md sección 13). Al terminar cada fase: commit, resumen de lo hecho, lista de `[PENDIENTE]` y detente para revisión.

## Comandos
- `pnpm install`
- `pnpm dev`
- `pnpm build`
- `pnpm test` (Vitest)
- `pnpm test:e2e` (Playwright + axe)

## Convenciones
- Archivos y carpetas en snake_case y minúsculas. Variables y funciones en snake_case salvo componentes React (PascalCase en el export).
- Iconos: Phosphor. Cero emojis en código, comentarios, commits e interfaz.
- Nunca uses la raya larga (em dash) en textos, comentarios ni commits. Usa dos puntos, coma o guion corto.
- Nada de colores neón. Solo los tokens de `src/styles/design_tokens.css`.
- Textos de interfaz en español de Colombia, tuteo, mayúscula inicial solamente, sin flechas pegadas a los botones.
- Commits sin co-autor.

## Reglas de implementación
- Astro + islas React. JS solo donde hay interacción.
- GSAP + ScrollTrigger para el scroll. Todo dentro de `gsap.matchMedia()` respetando `prefers-reduced-motion` y el interruptor "Movimiento". CSS `animation-timeline` solo dentro de `@supports`.
- Sin secuestro de scroll, sin Lenis salvo pedido explícito.
- Contenido visible sin JS. Las animaciones no ocultan texto por defecto.
- `localStorage` con prefijo `aventura_lectora:` y siempre en `try/catch`.
- Sin analítica, sin cookies de terceros, sin envío de datos (usuarios menores de edad).
- Iframes externos solo con `EmbedFrame` (carga al hacer clic, `youtube-nocookie.com`).
- Multimedia de Gemini Notebook: no la generes ni la inventes. Usa solo los archivos de `public/media/`, `src/data/multimedia.json` y `src/data/transcripciones/`. Si falta uno, muestra `[PENDIENTE]`. Cada pieza lleva `AiLabel` y su transcripción o texto alternativo.
- Todo es digital: nada de "imprime", "recorta" o "colorea en papel". Los productos se descargan en PDF (`jspdf` con import dinámico) y se entregan en la plataforma (`url_entrega`).
- Texto secundario con `stone-text` (#5f615e), nunca `stone-gray` (#80827f) sobre crema. Botones coral con texto en tinta.
- No uses `rounded-full` esperando 50px ni `p-4` esperando 4px: revisa `design_tokens.css`.

## Qué no hacer
- No agregar recursos, videos o enlaces que no estén en `RECURSOS.md`.
- No publicar recursos con `verificado: false`; muéstralos como "por confirmar" o déjalos fuera.
- No copiar ilustraciones, logos ni composiciones de otros sitios. Ilustraciones propias en SVG o Open Peeps (CC0).
- No subir la carpeta `gemini_notebook/` al sitio publicado (son insumos de trabajo).
- No usar la imagen del árbol de libros de la ficha hasta que el equipo confirme fuente y licencia.
