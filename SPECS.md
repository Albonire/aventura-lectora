# SPECS: Aventura lectora (sitio web del curso)

Documento maestro para construir con Claude Code el sitio del curso "Aventura lectora". Léelo completo antes de escribir código. Archivos del paquete:

| Archivo | Para qué sirve |
|---|---|
| `CLAUDE.md` | Reglas del proyecto (convenciones, comandos, qué no hacer). Va en la raíz del repo. |
| `SPECS.md` | Este documento: arquitectura, diseño, animaciones, componentes, fases y criterios de aceptación. |
| `CONTENIDO.md` | Todo el texto del curso: bienvenida, metodología, evaluación, las 5 unidades, lecturas, preguntas, claves de respuesta. Fuente de verdad del contenido. |
| `RECURSOS.md` | Recursos web (con enlace, estado de verificación y cita APA 7) y recursos propios, con el conteo 50/50. |
| `design_tokens.css` | Tokens del design system ya corregidos para Tailwind v4. |
| `REVISION_FICHA.md` | Hallazgos de la revisión de la ficha. No se implementa; sirve de contexto. |
| `gemini_notebook/` | Fuentes y prompts con los que el equipo genera en Gemini Notebook los podcasts, videos, infografías, tarjetas y la presentación. `01_guia_de_estilo.md` define también los personajes y el estilo de las ilustraciones del sitio. Claude Code no genera esos archivos: los recibe ya hechos (ver sección 9, multimedia). |

Regla de oro: el contenido sale de `CONTENIDO.md` y los enlaces de `RECURSOS.md`. Claude Code no inventa textos, preguntas, datos ni enlaces. Si falta algo, deja un marcador visible `[PENDIENTE: ...]` y lo reporta.

---

## 1. Contexto

- Entrega académica: Universidad Santo Tomás, Seminario de Profundización I: Innovación Didáctica, Módulo 3 "Diseño planeación didáctica". Actividad colaborativa, 35 % de la nota.
- Producto que se entrega: la URL pública del sitio.
- Público del curso: estudiantes de 5.º de primaria en Colombia (10 a 11 años). Público secundario: la docente evaluadora del seminario.
- Metáfora del curso: los estudiantes son "detectives de la lectura" y cada unidad es un caso. El sitio es un libro-expediente que se lee con scroll.
- Todo el curso es digital: ninguna actividad pide imprimir, recortar, colorear en papel ni entregar algo físico. Los productos se descargan como PDF desde el sitio y se entregan en la plataforma del curso (Classroom o Moodle). Las sesiones síncronas son por videollamada.

## 2. Requisitos que vienen de la guía y la rúbrica

El sitio tiene que demostrar cada criterio de la rúbrica. Esta tabla es obligatoria.

| Requisito | Fuente | Cómo lo cumple el sitio |
|---|---|---|
| Coherencia entre diseño instruccional y montaje (15 %) | Rúbrica criterio 1 | Cada página de unidad sigue exactamente los elementos de la ficha, en el mismo orden: imagen de la unidad, aprendizajes esperados, introducción, contenidos, desarrollo y materiales, actividades formativas, actividades sumativas. La página `/ficha` muestra la ficha completa con enlaces a cada sección del sitio. |
| Dominio del recurso donde se alojó (10 %) | Rúbrica criterio 2 | Botoneras claras (nav flotante, índice de casos, botones de unidad, "pasar la página"), imágenes y diagramas propios. El contenido vive en archivos MDX y JSON editables sin tocar componentes, para que cada integrante sepa modificar su unidad. |
| Recursos digitales y herramientas web 2.0/3.0/4.0 (15 %) | Rúbrica criterio 3 | Mezcla de interactivos propios dentro del sitio, recursos hechos con herramientas web 2.0 (Pixton, Padlet, Wordwall) insertados y un kit multimedia por caso hecho con inteligencia artificial en Gemini Notebook (web 4.0): podcast, video, infografía y tarjetas. Cada recurso lleva etiqueta visible con la herramienta usada. |
| Socialización del diseño didáctico (10 %) | Rúbrica criterio 4 | Página `/docentes` con la ruta de aprendizaje, el mapeo ADDIE (análisis, diseño, desarrollo, implementación, evaluación), rúbricas y créditos por integrante. |
| 50 % recursos de la web y 50 % elaborados por el equipo | Guía, paso a paso | Cada recurso tiene `tipo: "propio" | "web"`. La página `/docentes` calcula y muestra el conteo por unidad. |
| Referencias en APA 7 | Guía, recursos de consulta | Cada recurso web muestra su cita APA 7 (tooltip o pie). Página `/creditos` con la lista completa. |
| Responsable por unidad (nombre completo) | Ficha | Campo `responsable` en cada unidad, visible en su cierre y en `/creditos`. |
| Entregable = URL | Guía | Despliegue estático en Vercel o GitHub Pages (sección 15). |

## 3. Stack y decisiones técnicas

| Pieza | Elección | Por qué |
|---|---|---|
| Framework | Astro (última versión estable) con islas de React | Sitio de contenido, casi todo estático; React solo donde hay interacción. HTML liviano para computadores y celulares escolares de gama baja. |
| Estilos | Tailwind CSS v4 con `@tailwindcss/vite` y `design_tokens.css` | El design system ya viene en formato `@theme` de v4. |
| Contenido | Astro content collections (MDX para textos, JSON para actividades) | Los integrantes editan contenido sin tocar componentes. |
| Animación por scroll | GSAP 3 + ScrollTrigger (paquete `gsap` de npm) | GSAP es gratuito con todos sus plugins desde que Webflow lo adquirió. Funciona en todos los navegadores. |
| CSS scroll-driven (`animation-timeline`) | Solo mejora progresiva y detalles menores, siempre dentro de `@supports` | Firefox estable todavía lo tiene detrás de una bandera (junio 2026). No puede ser la base. |
| Smooth scroll (Lenis) | No usar por defecto | Scroll nativo: menos JS, mejor en equipos lentos, sin mareo. Solo si el equipo lo pide, desactivado en táctil y con reduced motion. |
| Arrastrar y soltar | `@dnd-kit/core` + `@dnd-kit/sortable` | Soporta teclado y lectores de pantalla. |
| Iconos | `@phosphor-icons/react` (y SVG inline en `.astro`) | Convención del equipo. Nada de emojis en la interfaz ni en el código. |
| Fuente | Inter autoalojada con `@fontsource-variable/inter` | Sin depender de Google Fonts; mejor privacidad para menores y carga más rápida. |
| Pruebas | Vitest (lógica) + Playwright con `@axe-core/playwright` (humo y accesibilidad) | |
| Audio | Elemento `<audio>` nativo con controles propios, archivos MP3 en `public/media/audio/`, `preload="none"` | Podcasts de Gemini Notebook sin depender de servicios externos. |
| Video | YouTube (no listado, marcado como contenido para niños) insertado con `youtube-nocookie.com` mediante `EmbedFrame` | Los MP4 pesan demasiado para servirlos desde el sitio. |
| Imágenes | `astro:assets` (`<Image>` / `<Picture>`) para convertir las infografías PNG a WebP y AVIF con `srcset` | Las infografías de Gemini salen en PNG grandes. |
| PDF | `jspdf` cargado con import dinámico solo al pulsar "Descargar PDF" | Los retos y el certificado se descargan como PDF para entregarlos en la plataforma, sin imprimir. |
| Gestor de paquetes | pnpm | |

Opcional para Claude Code: instalar las skills oficiales de GSAP con `npx skills add https://github.com/greensock/gsap-skills` antes de la fase 3.

## 4. Mapa del sitio

| Ruta | Contenido |
|---|---|
| `/` | Portada (carátula del curso), bienvenida, competencias, ruta de aprendizaje, cómo se evalúa, momentos síncronos y asíncronos, índice de los 5 casos. |
| `/unidad/1` a `/unidad/5` | Una página por unidad con la plantilla de la sección 5. Ruta dinámica `src/pages/unidad/[numero].astro`. |
| `/cierre` | Producto final "Expediente del detective lector", autoevaluación y certificado imprimible. |
| `/ficha` | La ficha de diseño completa, fila por fila, con enlace a la sección del sitio donde está montada cada fila. Pensada para la evaluadora. |
| `/docentes` | Ruta de aprendizaje, ADDIE, rúbricas de las actividades sumativas, conteo 50/50 por unidad, orientaciones para familias. |
| `/creditos` | Integrantes y responsables, referencias APA 7, licencias de ilustraciones y textos. |

Navegación entre unidades: al final de cada unidad, botón "Pasar la página" hacia la siguiente. Transición entre páginas con View Transitions (`@view-transition { navigation: auto; }`) como mejora progresiva.

## 5. Plantilla de una unidad (espejo de la ficha)

El orden de secciones es fijo porque el criterio 1 de la rúbrica compara ficha y montaje. Cada sección tiene un `id` estable para que `/ficha` enlace a ella.

| # | Sección (id) | Elemento de la ficha | Tratamiento |
|---|---|---|---|
| 1 | `portada` | Imagen de la unidad | Apertura de capítulo a pantalla completa, fijada con pin, número de caso grande e ilustración por capas (patrón P2). |
| 2 | `mision` | Aprendizajes esperados | Tarjeta blanca "Tu misión en este caso" con los aprendizajes en lenguaje para niños y, en letra pequeña, el DBA y estándar que respaldan (para docentes). |
| 3 | `introduccion` | Introducción a la unidad | Texto de lectura, ancho máximo 38rem. |
| 4 | `contenidos` | Contenidos / temáticas | Lista secuencial de pistas del caso (sí es secuencia, así que se numera). Cada ítem salta a su parte del desarrollo. |
| 5 | `desarrollo` | Desarrollo de temáticas y materiales | Secuencias didácticas con lecturas, cómics, videos y actividades. Aquí vive el momento firma de la unidad. |
| 6 | `practica` | Actividades formativas | Cuestionarios y juegos con retroalimentación inmediata. No califican. |
| 7 | `reto` | Actividades sumativas | Tarjeta "Reto del caso": título, duración, pasos, características del producto, criterios de evaluación, botón "Descargar PDF" y botón "Entregar en la plataforma" (enlace configurable). |
| 8 | `cierre-caso` | (cierre) | Insignia del caso, autoevaluación rápida, responsable de la unidad y botón "Pasar la página". |

Cada recurso dentro de la página lleva una etiqueta `ResourceTag`: "Hecho por el equipo" o "Recurso de la web", con herramienta usada y cita APA en un desplegable.

Ubicación del kit multimedia de Gemini Notebook en cada unidad (los archivos llegan en `public/media/` y `src/data/multimedia.json`):

| Pieza | Sección | Título en pantalla |
|---|---|---|
| Infografía | `contenidos`, debajo de la lista de pistas | "El caso en una imagen" |
| Video | `desarrollo`. Caso 1: después de la fábula (revela el final). Casos 2 a 5: al inicio del desarrollo | "Mira la explicación" |
| Podcast | `practica`, arriba. Caso 5: en `desarrollo`, antes del muro de debate | "Escucha el repaso del caso" / caso 5: "Escucha el gran debate" |
| Tarjetas | `practica`, después del cuestionario | "Tarjetas del detective" |

En `/docentes`: presentación de socialización (PDF), mapa mental (imagen) y guía para familias (texto). Si falta un archivo, la sección muestra `[PENDIENTE: ...]` y no rompe la página.

## 6. Concepto visual y narrativa

El sitio es un libro-expediente de papel. El scroll pasa las páginas. Una sola metáfora, sostenida en todo el sitio: lupa, pistas, casos, expediente, insignias.

- Portada: la tapa del libro "Aventura lectora" ocupa la pantalla. Al hacer scroll la tapa se abre y deja ver la página de bienvenida. Este es el momento memorable del sitio; el resto de la portada es tranquilo.
- Borde de páginas: en el costado derecho, un canto de libro con líneas finas que se va adelgazando según el progreso de lectura de la página. Reemplaza la barra de progreso genérica.
- Casos: cada unidad abre como un capítulo con su número grande (01 a 05; es una secuencia real).
- Ilustración: estilo papel recortado, formas planas, colores del sistema, sin sombras. Personajes de la historia (liebre, tortuga, renacuajo, lupa, libro) dibujados como SVG originales hechos con formas simples. Los detectives guía Sofía y Mateo, y todos los personajes, siguen la ficha fija de `gemini_notebook/01_guia_de_estilo.md` (ropa, colores, accesorios), la misma que usan los videos e infografías de Gemini Notebook, para que todo parezca del mismo libro. Para las personas se puede partir de Open Peeps (licencia CC0) ajustando la ropa y los colores a la ficha. No copiar ilustraciones, logo ni composiciones del sitio de MindMarket, del que salió la paleta.
- Tono del texto de interfaz: tuteo, frases cortas, verbos claros, mayúscula inicial solamente. Nada de rótulos en MAYÚSCULAS sostenidas, nada de flechas "→" pegadas a los botones.

## 7. Design system aplicado

Usa `design_tokens.css` tal cual. Resume las correcciones que ya trae respecto al original:

1. Contraste (WCAG 2.2 AA, calculado):
   - Tinta `#2c2e2a` sobre crema: 12.14:1. Texto principal.
   - Gris piedra `#80827f` sobre crema: 3.43:1. No sirve para texto normal. Se agrega `--color-stone-text: #5f615e` (5.53:1) para texto secundario; `#80827f` queda para bordes y decoración.
   - Blanco sobre coral: 2.72:1. Falla. Los botones coral llevan texto en tinta (5.05:1).
   - Azul cielo y coral sobre crema (2.45:1 y 2.40:1): nunca como color de texto ni de enlaces. Solo rellenos, puntos e ilustración.
   - Verde sobre crema (1.58:1): solo relleno o trazo decorativo, con texto en tinta encima (7.67:1).
2. Valores inválidos del `:root` original: `--section-gap: 80-120px`, `--card-padding: 20-21px` y `--element-gap: 17-21px` no son valores CSS válidos. Se reemplazan por `clamp()` y valores fijos.
3. Tailwind v4: redefinir `--radius-full: 50px` rompe `rounded-full` (los círculos grandes dejan de ser círculos) y `--radius-lg: 10px` cambia el significado de `rounded-lg`. Se renombran a radios semánticos (`--radius-card`, `--radius-pill`, `--radius-chip`, `--radius-illustration`). Las variables `--spacing-4`, `--spacing-20`, etc. pueden chocar con la escala por defecto (`p-4` debería ser 16px); se eliminan porque la escala base de 4px de Tailwind ya cubre esos valores. Verifica en el build que `p-4` = 16px.
4. Tipografía fluida: los tamaños display (140 a 144px) bajan con `clamp()` hasta 56px en un celular de 360px. El tracking va en `em` para que escale.
5. Texto de lectura para niños: 20px con interlineado 1.6 y ancho máximo de 38rem en las lecturas; 18px en el resto.
6. Contradicción del documento fuente: dice que el coral no debe ser color de CTA principal y a la vez describe un botón coral como la acción más visible. Decisión: el coral se usa solo para el botón del "Reto del caso" (acción sumativa); las demás acciones usan el botón claro con punto de color.
7. Superficies: crema como lienzo, blanco para tarjetas y nav, arena para zonas hundidas (por ejemplo, el área donde se escribe). Sin sombras ni degradados.
8. Foco visible: contorno de 3px en tinta con separación de 3px en todos los elementos interactivos.

Color por caso (solo decorativo, nunca como única señal de significado): caso 1 verde, caso 2 azul cielo, caso 3 amarillo sol, caso 4 coral, caso 5 verde con amarillo.

Componentes de interfaz base:
- `NavPill`: barra blanca flotante con radio de píldora. Izquierda: marca "Aventura lectora". Centro: cinco botones de caso (01 a 05) que muestran estado (sin empezar, en curso, resuelto). Derecha: botón circular verde de menú y botón "Seguir donde iba". En móvil se colapsa: marca + menú.
- Menú: índice de casos, enlaces a `/ficha`, `/docentes`, `/creditos` y tres interruptores de accesibilidad: "Movimiento", "Letra grande", "Leer en voz alta".
- `ContentCard`: blanco, radio 50px, padding 20 a 24px, sin sombra.
- `ButtonGhost`: fondo blanco, radio píldora, texto tinta 15px peso 500, punto de color a la derecha como señal de acción.
- `ButtonChallenge`: coral con texto tinta, solo en "Reto del caso".
- `FooterBand`: banda amarilla sol al final de cada página con créditos cortos y enlace a `/creditos`.

## 8. Patrones de scroll (GSAP ScrollTrigger)

Principios, en este orden de prioridad:
1. Nada de secuestrar el scroll. Los pines duran lo justo (máximo 150 % del alto de pantalla) y nunca durante una lectura larga.
2. El movimiento cuenta la historia o responde a una acción del estudiante. Prohibido el "fade up" genérico en cada sección y el hover animado en cada tarjeta.
3. Un momento firma por página (tabla de abajo). El resto quieto.
4. Todo se envuelve en `gsap.matchMedia()`: con `(prefers-reduced-motion: reduce)` o con el interruptor "Movimiento" apagado, cada patrón muestra su estado final estático y el contenido queda completo y legible.
5. Contenido primero: si JS falla, el HTML ya muestra todo. Las animaciones parten de estados que no ocultan texto por defecto (usar clases que se agregan solo cuando GSAP arranca).
6. Limpieza: cada isla usa `gsap.context()` o `useGSAP()` y revierte al desmontar. `ScrollTrigger.refresh()` después de cargar fuentes e imágenes.

Catálogo:

| Código | Patrón | Implementación |
|---|---|---|
| P1 | Tapa que se abre | Portada fijada con pin; la tapa rota en Y de 0 a -160 grados con `perspective` y `transform-origin: left`, `scrub: true`, `end: "+=120%"`. Debajo aparece la página de bienvenida. |
| P2 | Apertura de capítulo | Pin corto (`+=80%`). Capas de la ilustración con distinto `yPercent` (parallax de papel recortado). El número del caso se revela con máscara. |
| P3 | Lectura con pausas (scrollytelling) | Columna de texto a la izquierda, panel fijo (`position: sticky`) a la derecha. Cada párrafo con `data-paso` activa un estado del panel (ilustración, pregunta de pausa). Los párrafos con `data-pausa` muestran la pregunta; el estudiante puede responder o seguir, nunca se bloquea el scroll. En móvil el panel pasa a tarjeta intercalada después del párrafo. |
| P4 | Carrera ligada a la lectura (caso 1) | Una pista horizontal fija al pie mientras dura la fábula. La tortuga avanza de forma lineal con el progreso de la lectura. La liebre corre rápido hasta el párrafo 5, se queda dormida (marcas de sueño) en los párrafos 6 y 7, corre en el 8 y llega detrás. Un timeline con `scrub` que abarca la sección de la fábula. |
| P5 | Sendero horizontal (caso 2) | Sección fijada; la pista se traslada en X con tres estaciones (narrativo, informativo, instructivo). En pantallas menores de 768px se convierte en pila vertical con `matchMedia`. |
| P6 | Tres lupas en profundidad (caso 3) | Tres capas concéntricas (lo que dice, lo que sugiere, lo que pienso) que escalan y cambian de opacidad con el scroll, como bajar de nivel. |
| P7 | Periódico que se despliega (caso 4) | Paneles plegados que se abren con `rotateX` y `scaleY` al entrar. |
| P8 | Torre de argumentos (caso 5) | Cada bloque del argumento (opinión, razón, ejemplo, conclusión) cae y se apila cuando el estudiante lo completa. Responde a la acción, no al scroll. |
| P9 | Canto de páginas | Líneas en el borde derecho que se reducen con el progreso de la página (`ScrollTrigger` global con `onUpdate`). Decorativo y con `aria-hidden`. |
| P10 | Pasar la página | Botón al final de la unidad; transición entre páginas con View Transitions (mejora progresiva). |

Momento firma por página: portada P1, caso 1 P4, caso 2 P5, caso 3 P6, caso 4 P7, caso 5 P8, cierre: el certificado aparece con un sello que se estampa (animación única de 600ms al generar el certificado).

## 9. Componentes interactivos (islas React)

Todos: accesibles con teclado, etiquetas en español, retroalimentación en texto (el color nunca es la única señal), áreas táctiles de al menos 44x44px, estado guardado en `localStorage` con prefijo `aventura_lectora:` y envuelto en `try/catch`. Ningún componente envía datos a servidores.

| Componente | Qué hace | Criterios de aceptación |
|---|---|---|
| `QuizCard` | Preguntas de opción múltiple con retroalimentación por opción e intento de nuevo. Muestra el nivel de la pregunta (literal, inferencial, crítico). | Las opciones se barajan con semilla estable. Al responder se anuncia el resultado con `aria-live`. Resumen final con aciertos y botón "Repasar". |
| `WordSearch` | Sopa de letras generada desde una lista de palabras (JSON). | Generador determinista con semilla (misma sopa para toda la clase). Selección con arrastre de mouse y dedo, y alternativa con teclado (elegir inicio y fin). Lista de palabras encontradas. Pruebas unitarias del generador: todas las palabras caben y se pueden encontrar. |
| `QuestionWheel` | Ruleta SVG que gira y cae en una pregunta. | Con reduced motion, elige sin girar. Botón "Girar" y lista completa de preguntas accesible debajo. |
| `PredictionBoard` | Antes de leer: el estudiante escribe predicciones. Después de leer: las ve junto al texto y marca "acerté", "casi" o "cambió". | Persistencia local. Sin validación de contenido. |
| `ReadingWithPauses` | Lector del patrón P3 con pausas y preguntas. | Funciona sin JS como texto corrido con las preguntas intercaladas. |
| `RaceTrack` | Pista del patrón P4. | `aria-hidden`; texto alternativo en un párrafo oculto visualmente que describe la carrera. |
| `InferenceClues` | "Pistas del detective": una frase del texto, tres opciones de inferencia, explicación. | Mismo modelo de datos que `QuizCard`. |
| `SayingCard` | Tarjeta de refrán que se voltea y muestra preguntas de reflexión con un área de escritura. | Volteo con botón (no solo hover). |
| `TextHighlighter` | El estudiante marca partes del cuento con tres marcadores: inicio, nudo, desenlace. Luego pide "Revisar" y ve la clave por estrofa. Todo en pantalla, sin versión para imprimir. | Selección por estrofa o párrafo completo (más fácil para niños que seleccionar texto libre). Clave en JSON. Colores más patrón o etiqueta de texto para no depender del color. |
| `DragSort` | Clasificar tarjetas en cajas (tipos de texto, niveles de pregunta, hecho u opinión). | `@dnd-kit` con sensor de teclado. Botón "Revisar" con retroalimentación por tarjeta. |
| `StepOrderer` | Ordenar los pasos de un texto instructivo. | Lista ordenable con teclado. |
| `SourceDetector` | Tarjetas de titulares inventados con su ficha de fuente; el estudiante aplica la lista LUPA y decide "confío", "tengo que verificar" o "no confío". | Cada tarjeta muestra al final por qué. Todas las noticias llevan la marca visible "Noticia inventada para practicar". |
| `ArgumentBuilder` | Construye un texto de opinión con bloques (opinión, razón, ejemplo, segunda razón, conclusión) y conectores sugeridos. Vista previa del texto armado. | Descargar PDF. Dispara el patrón P8. |
| `ChallengeCard` | Tarjeta del reto sumativo con pasos, duración, producto, criterios, campos para responder dentro del sitio y entrega. | Los campos del reto se guardan en el navegador. "Descargar PDF" genera el archivo con `jspdf` (nombre del estudiante, caso, respuestas). "Entregar en la plataforma" abre `url_entrega` de `src/config/sitio.ts`; si está vacía, el botón muestra "Pídele a tu profe el enlace de entrega". |
| `BadgeTracker` | Insignias por caso resuelto y "pasaporte del detective" en el cierre. | Un caso se marca resuelto al completar su cuestionario formativo. |
| `Certificate` | Certificado descargable en PDF con el nombre que escribe el estudiante. | El nombre solo se guarda en el navegador. PDF con `jspdf`, fondo crema y sello del curso. |
| `EmbedFrame` | Inserta Wordwall, Genially, Canva, Padlet o YouTube (`youtube-nocookie.com`) con carga al hacer clic. | Muestra portada, título y cita APA antes de cargar. Enlace alternativo "Abrir en otra pestaña". `loading="lazy"` y `title` en el iframe. |
| `ReadAloud` | Botón "Escuchar" en cada lectura con `speechSynthesis`, voz `es-CO`, luego `es-419`, luego cualquier `es`. | Se oculta si el navegador no tiene la API. Botones pausar y detener. |
| `ResourceTag` | Etiqueta "Hecho por el equipo" o "Recurso de la web" con herramienta y cita APA. | Datos desde `recursos.json`. |
| `AudioPodcast` | Reproductor de los podcasts de Gemini Notebook: botón circular verde de reproducir y pausar, barra de progreso, velocidad 0.75x, 1x y 1.25x, duración y botón "Ver transcripción" que despliega el texto. | `preload="none"`. Controles accesibles con teclado y `aria-label`. La transcripción viene de `src/data/transcripciones/`. Lleva `AiLabel`. |
| `VideoOverview` | Video de Gemini Notebook alojado en YouTube, sobre `EmbedFrame`, con portada propia (captura del video o ilustración SVG del caso), duración y botón "Ver transcripción". | Carga solo al hacer clic, `youtube-nocookie.com`, parámetros `rel=0` y `modestbranding=1`. Lleva `AiLabel`. |
| `InfographicViewer` | Muestra la infografía del caso dentro de una tarjeta blanca de radio 50px; clic para ampliar en un diálogo; botón "Descargar imagen"; debajo, desplegable "Leer la infografía en texto". | `<Picture>` con WebP y AVIF. El `alt` es corto y el texto completo va en el desplegable (`texto_alternativo` de `multimedia.json`). Diálogo con `<dialog>` nativo, cierre con Escape. Lleva `AiLabel`. |
| `FlashcardDeck` | Mazo de "Tarjetas del detective": una tarjeta a la vez, botón "Voltear", anterior y siguiente, contador (3 de 12) y "Barajar". | Datos en la clave `tarjetas` de `unidad_N.json`. El volteo usa rotación en Y y se reemplaza por un cambio simple con reduced motion. El reverso se anuncia con `aria-live`. |
| `ExpedienteBuilder` | En `/cierre`, botón "Armar mi expediente": junta en un solo PDF la portada con el nombre, los cinco retos guardados en el navegador y la frase final. | Avisa qué retos faltan antes de generar el PDF. Usa `jspdf` con import dinámico. |
| `AiLabel` | Etiqueta pequeña "Hecho con IA (Gemini Notebook) y revisado por el equipo". | Texto en `stone-text` sobre la tarjeta; nunca solo un icono. |

## 10. Modelo de contenido

```
src/content/unidades/unidad_1.mdx ... unidad_5.mdx
  frontmatter:
    numero: 1
    titulo: "Leo y comprendo"
    titulo_caso: "El caso de la carrera"
    color: "fresh-grass"
    responsable: "[PENDIENTE: nombre completo]"
    imagen_portada: { src, alt, tipo: "propio" | "web", credito }
    aprendizajes_esperados: string[]
    referentes: { dba: string[], estandares: string[] }
    contenidos: { id, titulo }[]
    insignia: { nombre, descripcion }
  cuerpo MDX: introducción y desarrollo, usando los componentes de la sección 9.

src/data/actividades/unidad_1.json ... unidad_5.json
  quiz: { id, nivel, pregunta, opciones: {id, texto, retro}[], correcta }[]
  sopa, ruleta, pistas, clasificaciones, pasos, noticias, etc. según la unidad.

src/data/recursos.json
  { id, unidad, titulo, tipo: "propio" | "web", herramienta, url, licencia,
    apa, verificado: boolean, responsable, seccion_id }[]

src/data/multimedia.json
  { id, unidad (1 a 5 o "docentes"), tipo: "audio" | "video" | "infografia" | "presentacion" | "mapa_mental",
    titulo, archivo (ruta en public/media) | youtube_id, duracion ("5:40"), transcripcion (ruta .md),
    alt, texto_alternativo, herramienta: "Gemini Notebook", fecha_generacion, revisado_por }[]

src/data/actividades/unidad_N.json, clave nueva:
  tarjetas: { frente, reverso }[]     (texto copiado de las tarjetas didácticas de Gemini Notebook)

src/data/transcripciones/caso_N_podcast.md, caso_N_video.md
src/content/docentes/guia_familias.md

src/config/sitio.ts
  nombre_curso, grado, institucion, integrantes[], url_entrega, anio
```

Todo el texto de estos archivos se toma de `CONTENIDO.md` y `RECURSOS.md`.

## 11. Accesibilidad, rendimiento y privacidad

- WCAG 2.2 AA. HTML semántico, un solo `h1` por página, orden de encabezados correcto, `lang="es-CO"`.
- Imágenes con `alt` descriptivo; ilustraciones decorativas con `alt=""` o `aria-hidden`.
- Interruptores globales: "Movimiento" (apaga GSAP scrub y transiciones), "Letra grande" (sube la escala base 12.5 %) y "Leer en voz alta".
- Presupuesto: Lighthouse móvil 90 o más en rendimiento, 100 en accesibilidad. JS inicial de la portada por debajo de 120 KB comprimido. Imágenes en AVIF o WebP con `srcset`; ilustraciones en SVG.
- GSAP y ScrollTrigger se cargan solo en páginas que los usan.
- Multimedia: cada audio y video tiene transcripción revisada; los videos tienen subtítulos en español revisados en YouTube Studio; cada infografía tiene versión en texto. Los audios no se reproducen solos.
- Privacidad de menores: sin analítica, sin cookies de terceros, sin formularios que envíen datos, sin registro. Los videos de YouTube usan `youtube-nocookie.com` y cargan solo al hacer clic. Lo guardado vive en el navegador del estudiante.
- Funciona en Chrome, Edge, Safari y Firefox recientes, y en un Android de gama baja a 360px de ancho.

## 12. Estructura de carpetas

```
aventura_lectora/
  CLAUDE.md
  SPECS.md  CONTENIDO.md  RECURSOS.md  REVISION_FICHA.md
  astro.config.mjs
  package.json
  gemini_notebook/            fuentes y prompts (no se publican)
  public/
    favicon.svg
    img/unidades/
    media/audio/            caso_1_podcast.mp3 ... caso_5_podcast.mp3
    media/infografias/      caso_1_infografia.png ... caso_5_infografia.png
    media/docentes/         socializacion.pdf, mapa_mental.png
  src/
    config/sitio.ts
    content/unidades/unidad_1.mdx ... unidad_5.mdx
    content.config.ts
    data/actividades/unidad_1.json ... unidad_5.json
    data/recursos.json
    data/multimedia.json
    data/transcripciones/
    content/docentes/guia_familias.md
    styles/design_tokens.css
    styles/global.css
    layouts/base_layout.astro
    layouts/unidad_layout.astro
    components/ui/          nav_pill.astro, content_card.astro, footer_band.astro, resource_tag.astro ...
    components/islas/       quiz_card.tsx, word_search.tsx, question_wheel.tsx, drag_sort.tsx ...
    components/ilustraciones/ liebre.astro, tortuga.astro, renacuajo.astro, lupa.astro, libro.astro ...
    lib/scroll/             portada_tapa.ts, apertura_capitulo.ts, carrera.ts, sendero.ts ...
    lib/almacen.ts          lectura y escritura segura de localStorage
    lib/semilla.ts          aleatorio con semilla
    pages/index.astro
    pages/unidad/[numero].astro
    pages/cierre.astro  pages/ficha.astro  pages/docentes.astro  pages/creditos.astro
  tests/
    unit/  e2e/
```

Nombres de archivo en snake_case y minúsculas. Los componentes React se exportan con nombre en PascalCase dentro del archivo.

## 13. Fases de construcción

Claude Code trabaja una fase a la vez, hace commit al terminar cada una y se detiene para revisión humana.

### Fase 0: base
- Crear proyecto Astro con React, MDX, Tailwind v4, Inter autoalojada, `design_tokens.css`, Vitest, Playwright, ESLint y Prettier.
- `base_layout.astro` con `NavPill`, menú, interruptores de accesibilidad (sin lógica de animación aún), `FooterBand` y enlace "Saltar al contenido".
- Despliegue de prueba (sección 15).
- Aceptación: `pnpm build` sin errores; `p-4` mide 16px; el sitio abre en la URL de prueba.

### Fase 1: contenido estático completo
- Las 6 páginas y las 5 unidades con todo el texto de `CONTENIDO.md`, en el orden de la sección 5.
- `recursos.json` completo desde `RECURSOS.md`; `ResourceTag` en cada recurso.
- `/ficha`, `/docentes` (con conteo 50/50 calculado) y `/creditos`.
- Aceptación: cada fila de la ficha tiene su sección en el sitio y su enlace en `/ficha`; ningún texto inventado; todos los `[PENDIENTE]` listados en un reporte.

### Fase 2: interactivos
- Todos los componentes de la sección 9 con sus datos JSON.
- Pruebas unitarias: generador de sopa, barajado con semilla, corrección de `DragSort`, `TextHighlighter` y `QuizCard`, capa de `localStorage` con errores simulados.
- Aceptación: cada actividad se completa solo con teclado; las pruebas pasan.

### Fase 3: capa de scroll
- Patrones P1 a P10 con `gsap.matchMedia()` y el interruptor "Movimiento".
- Aceptación: con reduced motion activo no hay pines ni scrub y el contenido está completo; sin JS la página se lee entera; 60 fps en un portátil promedio; nada de saltos de layout al cargar (CLS menor a 0.1).

### Fase 4: ilustraciones y multimedia
- Ilustraciones SVG originales en estilo papel recortado para las 5 portadas de caso, la tapa del libro y los personajes, siguiendo la ficha de personajes de `gemini_notebook/01_guia_de_estilo.md`.
- Integrar el kit de Gemini Notebook con `AudioPodcast`, `VideoOverview`, `InfographicViewer` y `FlashcardDeck` en las secciones indicadas en la sección 5. Los archivos que aún no existan quedan como `[PENDIENTE]` visible sin romper la página.
- Comparar visualmente las infografías con la página: si el tono del fondo crema no coincide, ajustar el fondo de la tarjeta contenedora, nunca editar la imagen.
- La imagen del árbol de libros que está en la ficha (unidad 2) no se usa hasta que el equipo confirme su fuente y licencia; se reemplaza por una ilustración propia equivalente.
- Aceptación: todas las imágenes tienen `alt` o `aria-hidden`; créditos en `/creditos`; cada pieza de IA lleva `AiLabel`, transcripción o texto alternativo; el peso total de audio por página se carga solo al pulsar reproducir.

### Fase 5: calidad y entrega
- Pasar axe sin violaciones serias, Lighthouse según la sección 11, revisión en 360px, 768px y 1440px.
- Revisar que ningún texto de interfaz tenga raya larga (em dash) ni emojis.
- Aceptación: checklist de la sección 14 completo y URL final funcionando.

## 14. Checklist final

- [ ] Las 8 secciones de cada unidad existen en el orden de la ficha.
- [ ] Cada recurso tiene etiqueta propio/web, herramienta y cita APA.
- [ ] El conteo 50/50 de `/docentes` coincide con `recursos.json`.
- [ ] Responsables con nombre completo en las 5 unidades y en `/creditos`.
- [ ] Todos los enlaces web con `verificado: true` abren; los `false` no se publican o se muestran como "por confirmar".
- [ ] Reduced motion y el interruptor "Movimiento" funcionan en todas las páginas.
- [ ] Todas las actividades se completan con teclado y en celular.
- [ ] El PDF del reto de cada caso y el del certificado se descargan bien en computador y celular.
- [ ] Ninguna actividad pide imprimir, recortar, colorear en papel ni entregar algo físico.
- [ ] Cada caso tiene su podcast, video, infografía y tarjetas, con transcripción o texto alternativo y etiqueta de IA.
- [ ] Sin analítica, sin cookies de terceros, sin envío de datos.
- [ ] Lighthouse móvil: rendimiento 90 o más, accesibilidad 100.

## 15. Despliegue

Opción A (recomendada): Vercel, importando el repositorio de GitHub. Salida estática (`output: "static"`).
Opción B: GitHub Pages con la acción oficial de Astro; configurar `site` y `base` en `astro.config.mjs`.
El entregable para la guía es la URL pública final. Probarla en una ventana privada y en un celular antes de entregarla.

## 16. Pendientes que dependen del equipo

- Nombres completos de los responsables de cada unidad.
- Confirmar o reemplazar el video de la secuencia 2 del caso 1 (ver `REVISION_FICHA.md`).
- Crear en Pixton y Padlet (y si quieren en Wordwall) los recursos propios marcados como "herramienta web 2.0" en `RECURSOS.md` y pegar sus enlaces de inserción. Las infografías que antes iban en Canva ahora salen de Gemini Notebook.
- Revisar y ajustar los textos de `CONTENIDO.md`; son borradores para que el equipo los haga suyos.
- Confirmar la fuente de la imagen del árbol de libros o aceptar el reemplazo.
- Generar en Gemini Notebook el kit multimedia con `gemini_notebook/02_prompts.md`, revisarlo y dejar los archivos, las transcripciones y `multimedia.json` en las rutas de la sección 12.
- Configurar `url_entrega` con el enlace de Classroom o Moodle del curso.

---

## 17. Decisiones de septiembre de 2026 (cambios respecto a las secciones anteriores)

Estas decisiones se tomaron al construir el sitio y prevalecen sobre lo que diga el resto del documento.

1. Los videos de Gemini Notebook se sirven desde el sitio (AV1 en WebM y H.264 de respaldo, con póster y subtítulos), no desde YouTube. Cargan solo al pulsar reproducir. El video del caso 5 también existe.
2. Las herramientas externas se replican dentro del sitio, sin servidor: el cómic (Pixton) es un cómic en SVG recorrido por una cámara de viñetas; los muros de Padlet son `MuroDetective` (las notas viven en el navegador y se comparten con un enlace que las lleva dentro del fragmento `#`); la imagen de Canva es `LienzoDibujo`; el audio de Padlet es `GrabadoraVoz`.
3. La mecánica de cámara de la presentación de `trabajo2` (escenario fijo con `position: sticky`, zoom a cada viñeta y atenuación del resto, el scroll como única fuente de verdad) se replica en `CamaraVinetas` y se usa en el cómic del caso 2 y en la noticia del caso 4. Es una excepción a la regla de pines de 150 %: usa `position: sticky` (el scroll nativo no se captura), ofrece "Saltar esta parte", avanza también con clic y teclado, y con movimiento reducido muestra todo el contenido sin cámara.
4. El cuaderno de docentes de Gemini (presentación, mapa mental y guía para familias) no se hace. `/docentes` se arma con el texto de `CONTENIDO.md`, la rúbrica y el conteo 50/50 calculado desde `recursos.json`.
5. `/creditos` se reemplaza por `/referencias`, la última página del libro: lista APA 7 más créditos y declaración de IA. Solo aparecen las fuentes con enlace abierto y revisado.
6. La portada es la tapa del libro (P1) y una portadilla con los datos del seminario, la universidad, el equipo y la docente.
7. Las réplicas y los PDF usan solo tokens del design system. La grabadora de voz pide permiso de micrófono solo al pulsar (el encabezado `Permissions-Policy` de `vercel.json` lo permite únicamente para el propio sitio).
8. Responsables de las unidades (editable en `src/config/sitio.ts` y en el frontmatter de cada unidad): caso 1, Luz Marina Castillo Cuadrado; caso 2, Selene María Caballero Valle; caso 3, Ingrid Yuliana González Flores; caso 4, Maribel León Grillo; caso 5, Silvia Gabriela Rincón Pérez.
9. Las infografías de los casos 1, 2 y 3 se recortan para quitar márgenes vacíos que dejó Gemini (`scripts/procesar_media.sh`). El contenido de las imágenes no se toca.

## 18. Rediseño de septiembre de 2026: libro de curso (segunda revisión)

Tras la primera entrega, el sitio se sentía como una landing comercial (portada tipo SaaS, un solo molde de tarjeta repetido, casos de 25 000 px sin estructura) y el scroll decoraba en vez de guiar. Estas decisiones corrigen eso y prevalecen sobre las secciones 4 a 9 donde entren en conflicto.

1. **Cuatro páginas por caso.** Cada unidad se divide en las cuatro etapas que ya anunciaba la portada: `/unidad/N` (Abrir el caso: apertura, misión, introducción, contenidos y el recorrido de la infografía), `/unidad/N/pistas` (Seguir las pistas: desarrollo), `/unidad/N/lupa` (Entrenar la lupa: práctica), `/unidad/N/cerrar` (Cerrar el caso: reto y cierre). El orden y los `id` de la sección 5 se mantienen, así que `/ficha` sigue enlazando cada fila a su lugar exacto (con `ruta_seccion()` de `src/config/paginas.ts`). Cada unidad MDX vive dividida en `src/content/paginas/unidad_N/{abrir,pistas,lupa,cerrar}.mdx` (colección `paginas`), y recibe los datos de la unidad como prop `unidad` en vez de `frontmatter`.
2. **Marco de curso.** `NavPill`, `FooterBand` grande y el canto de páginas (P9) se reemplazan por `src/layouts/curso_layout.astro`: una barra fija angosta (`Cabecera`) con la ruta actual y el folio ("Página 2 de 4"), un índice del curso a la izquierda en escritorio y dentro del menú en celular (`IndiceCurso`), la hoja de la página como una tarjeta centrada sobre fondo arena, y un paginador con "Anterior" y "Siguiente" al final de cada página (`Paginador`). El progreso ahora registra páginas leídas (`paginas_leidas` en `src/lib/progreso.ts`), no solo casos.
3. **Portada y programa.** `/` queda solo para la tapa, la bienvenida y el índice del libro (con el estado de cada página). Las secciones de landing (competencias, cómo funciona, cómo se evalúa, síncrono/asíncrono, otros aspectos) se movieron a `/programa`.
4. **Letra y escala de libro de texto.** `@fontsource/andika` (SIL, OFL) para títulos y lecturas; Inter queda para la interfaz (botones, menús, tablas). Los títulos bajan de la escala de landing (36 a 140 px) a escala de libro (22 a 53 px). Los bloques de actividad (`Superficie` en `ui.tsx`, `BloqueCabecera` en Astro) llevan una pastilla con verbo e ícono Phosphor ("Lee", "Mira", "Escucha", "Practica", "Escribe", "Conversa", "Explora en la web", "Reto del caso": `src/lib/bloques.ts`) en vez de solo una etiqueta de texto. Los radios de tarjeta bajan de 50 px a 20 px (`--radius-card`).
5. **Scroll con sentido, no decorativo.** Se retiran los patrones P2 (apertura de capítulo con parallax), P5 (sendero horizontal fijado) y P6 (tres lupas con zoom): el contenido queda como bloques estáticos ilustrados (`sendero.astro`, `tres_lupas.astro`), igual de legibles con o sin JS. La cámara de viñetas (antes solo en el cómic del caso 2 y la noticia del caso 4) ahora también recorre la infografía de cada uno de los 5 casos (`InfographicViewer` usa `CamaraVinetas` con los focos definidos en `multimedia.json`), explicando cada parte de la imagen por separado en vez de mostrarla completa de una vez. La tapa (P1) se redibuja como un libro real que gira sobre su lomo en menos scroll (`+=90%` en vez de `+=120%`), sin ocupar toda la pantalla. La carrera de la fábula (P4) y la torre de argumentos (P8) se mantienen sin cambios porque responden a la lectura y a la acción del estudiante, no decoran.
