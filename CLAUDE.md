# CLAUDE.md: Aventura lectora

Prototipo web de la experiencia gamificada "Aventura lectora" para los 13 estudiantes de 5.º de primaria de la Institución Educativa Jorge Eliécer Gaitán (Maripí, Boyacá, Colombia). Entregable académico de la Actividad 2.2 (Prototipado) del espacio Gamificación, Maestría en Tecnología e Innovación Educativa, Universidad Santo Tomás.

Docentes autoras (únicas): Luz Marina Castillo Cuadrado e Ingrid Yuliana González Flores. No se menciona a ninguna otra docente, ciudad ni colegio.

## Antes de escribir código
1. Lee `SPECS.md` completo. Es la especificación.
2. El contenido sale de `CONTENIDO.md`. Las referencias salen de `RECURSOS.md`. No inventes textos, preguntas, datos, enlaces ni citas. Los datos del grupo (diagnóstico del 5 de mayo de 2026, pilotaje) no se estiman.
3. Los personajes y el estilo de las ilustraciones siguen `gemini_notebook/01_guia_de_estilo.md`.
4. Al terminar un bloque de trabajo: commit, resumen de lo hecho y lista de pendientes para revisión.

## Comandos
- `pnpm install`
- `pnpm dev`
- `pnpm build`
- `pnpm test` (Vitest)
- `pnpm test:e2e` (Playwright + axe)
- `pnpm contenido` (regenera `CONTENIDO.md` desde los datos)

## Convenciones
- Archivos y carpetas en snake_case y minúsculas. Variables y funciones en snake_case salvo componentes React (PascalCase en el export).
- Iconos: Phosphor. Cero emojis en código, comentarios, commits e interfaz.
- Nunca uses la raya larga (em dash) en textos, comentarios ni commits. Usa dos puntos, coma o guion corto. Los diálogos de las lecturas van entre comillas.
- Nada de colores neón. Solo los tokens de `src/styles/design_tokens.css`.
- Textos de interfaz en español de Colombia, tuteo, mayúscula inicial solamente, sin flechas pegadas a los botones.
- Vocabulario de niño de 10 años en todo lo que leen los estudiantes: palabras de todos los días y frases cortas. Club de Detectives Lectores (no agencia), parte o misión (no estación), medalla y álbum (no insignia ni pasaporte), diploma (no certificado), torre de ideas y lo que pienso (no argumentos ni postura), dato real y chisme (no hecho comprobable ni rumor), revisar (no verificar), historia (no relato), mandar a otros (no reenviar). El villano es el Borracuentos. Los nombres técnicos del documento de diseño solo van en las páginas para docentes. `tests/unit/contenido.test.ts` lo vigila.
- Commits sin co-autor.

## Reglas de implementación
- Astro + islas React. JS solo donde hay interacción.
- La ruta tiene 6 estaciones (`src/config/paginas.ts`). Las estaciones 01 a 04 tienen siempre los mismos 4 pasos: abrir el caso, seguir las pistas, entrenar la lupa y cerrar el caso.
- Lecturas de 150 a 250 palabras (la fábula, máximo 200). Las pruebas lo verifican.
- Cada lectura y cada consigna lleva `ReadAloud` ("Escuchar con voz pausada", `rate` 0.9). Un `ReadAloud` suelto en Astro se hidrata con `client:idle` (no pinta nada en el servidor, así que `client:visible` nunca lo activaría).
- Una respuesta incorrecta nunca muestra solo "incorrecto": muestra la burbuja de Sofía con una pista que dice qué párrafo, línea o frase volver a leer. Cada pregunta trae al menos dos pistas.
- Escritura siempre guiada (frases iniciadoras, campos cortos). Nada de áreas de texto vacías sin guía.
- Las insignias se ganan por tareas (`src/lib/insignias.ts`, `marcar_tarea`).
- GSAP + ScrollTrigger solo en la tapa, dentro de `gsap.matchMedia()` respetando `prefers-reduced-motion` y el interruptor "Movimiento".
- Contenido visible sin JS. Las animaciones no ocultan texto por defecto.
- `localStorage` con prefijo `aventura_lectora:` y siempre en `try/catch`.
- Sin analítica, sin cookies de terceros, sin envío de datos (usuarios menores de edad).
- Excepción aprobada por las autoras: la voz natural de la lectura. Si la variable `PUBLIC_TTS_URL` está definida, `ReadAloud` pide el audio a un Worker propio de Cloudflare (`worker_tts/`) solo al tocar el botón y solo con el código (hash) del texto, nunca con datos ni escritura de los estudiantes. Sin la variable, o si el Worker falla, se usa la voz del aparato. No agregues otra llamada externa.
- Sin videos, podcasts ni recursos externos insertados: los celulares son compartidos y los datos, limitados.
- Papel solo donde el diagnóstico lo pide: la ficha "Libreta de campo de Mateo" (`/libreta`, media carta) para los 4 hogares sin datos móviles y el certificado. El resto es digital.
- Texto secundario con `stone-text`, nunca sobre verde ni sobre coral. El azul cielo y el coral fuertes no llevan texto encima: usa `sky-soft` y `coral-soft`.
- No uses `rounded-full` esperando 50px ni `p-4` esperando 4px: revisa `design_tokens.css`.

## Qué no hacer
- No publicar referencias con `verificado: false` en `src/data/referencias.ts`.
- No presentar los textos escritos para el prototipo como tradición oral recogida en Maripí.
- No copiar ilustraciones, logos ni composiciones de otros sitios. Ilustraciones propias en SVG.
- Arte pintado a mano: todo color del arte sale de `src/lib/arte/paleta.ts`, una sola luz arriba a la izquierda, y ningún componente define `id` ni `<defs>` (los degradados, tramas y el filtro viven en `pintura_defs.astro`, que se monta una vez en `base_layout.astro`). El filtro `al-pintado` solo va en escenas grandes y quietas, nunca en la tapa 3D, el sello ni lo que se anima. El arte decorativo lleva `aria-hidden`.
- No subir la carpeta `gemini_notebook/` al sitio publicado (son insumos de trabajo).
- Al escribir archivos, no uses secuencias `\uXXXX` dentro de comandos de shell: se convierten en el carácter real. Para rayas largas o marcas de acento en expresiones regulares, arma el carácter con `String.fromCharCode` o escribe el archivo con la herramienta de edición.
