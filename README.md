# Aventura lectora

Curso virtual de comprensión lectora y pensamiento crítico para 5.º de primaria (Colombia). Es un sitio tipo libro que se lee con scroll: una tapa que se abre, cinco casos (unidades), un cierre con expediente y certificado, y una última página de referencias en APA 7.

Entregable académico del Seminario de profundización I: Innovación didáctica (Maestría en Tecnología e Innovación Educativa, Universidad Santo Tomás). El producto que se entrega es la URL pública del sitio.

## Comandos

```bash
pnpm install
pnpm dev          # servidor de desarrollo en http://localhost:4321
pnpm build        # sitio estático en dist/
pnpm preview      # sirve dist/
pnpm test         # pruebas unitarias (Vitest)
pnpm test:e2e     # pruebas de humo y accesibilidad (Playwright y axe)
pnpm lint
```

Requiere Node 22.12 o superior y pnpm. La primera vez que se corren las pruebas e2e hay que instalar el navegador: `pnpm exec playwright install chromium`.

## Publicar en Vercel

1. En Vercel: Add New, Project, importar este repositorio de GitHub.
2. Vercel detecta Astro solo (el archivo `vercel.json` ya lo indica). No hace falta cambiar nada.
3. Deploy. La URL que se genera es la que se entrega.
4. Probar la URL en una ventana privada y en un celular antes de entregarla.

Alternativa gratuita sin Vercel: GitHub Pages con la acción oficial de Astro (hay que configurar `site` y `base` en `astro.config.mjs`).

## Dónde se edita cada cosa

| Qué | Dónde |
|---|---|
| Datos de la portada y nombres del equipo | `src/config/sitio.ts` |
| Datos de la unidad (título, misión, aprendizajes, DBA, insignia) | `src/content/unidades/unidad_N.mdx` (solo el frontmatter) |
| Texto y estructura de cada una de las 4 páginas del caso | `src/content/paginas/unidad_N/{abrir,pistas,lupa,cerrar}.mdx` |
| Orden y títulos de las 4 páginas, o enlaces directos a una sección | `src/config/paginas.ts` |
| Preguntas, sopa de letras, tarjetas, lecturas y demás actividades | `src/data/actividades/unidad_N.json` |
| Retos sumativos y sus rúbricas | `src/data/retos.json` |
| Recursos propios y de la web (y el conteo 50/50) | `src/data/recursos.json` |
| Podcasts, videos e infografías del curso | `src/data/multimedia.json`, `public/media/`, `src/assets/infografias/` |
| Transcripciones (los videos ya traen sus subtítulos en la imagen) | `src/data/transcripciones/` |
| Colores, radios y tipografía | `src/styles/design_tokens.css` |

El responsable de cada unidad se cambia en el frontmatter de su archivo `.mdx` (campo `responsable`). Los nombres válidos están en `src/config/sitio.ts`.

## Cómo está hecho

- Astro con islas de React solo donde hay interacción. Sitio 100 % estático.
- Tailwind CSS v4 con los tokens del design system.
- GSAP y ScrollTrigger para los patrones de scroll, siempre dentro de `gsap.matchMedia()`: respetan `prefers-reduced-motion` y el interruptor "Movimiento" del menú. Sin JavaScript, todo el contenido se lee igual.
- Todo lo que escribe el estudiante se guarda solo en su navegador (`localStorage` con prefijo `aventura_lectora:` e IndexedDB para la grabación de voz). Sin analítica, sin cookies de terceros y sin envío de datos.
- Los retos, el certificado y el expediente se descargan como PDF (jsPDF, cargado solo al pulsar el botón).
- Los archivos multimedia se procesan con `scripts/procesar_media.sh` (ffmpeg e ImageMagick). Los originales no están en el repositorio.

## Documentos de trabajo

`SPECS.md`, `CONTENIDO.md`, `RECURSOS.md`, `REVISION_FICHA.md` y `CLAUDE.md` son la especificación y el contenido fuente del curso. La carpeta `gemini_notebook/` guarda las fuentes y los prompts de Gemini Notebook; no se publica.
