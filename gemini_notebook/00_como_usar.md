# Gemini Notebook para Aventura lectora: cómo usar esta carpeta

Contenido de la carpeta:

| Archivo | Para qué |
|---|---|
| `00_como_usar.md` | Este documento: flujo de trabajo, configuración y revisión. |
| `01_guia_de_estilo.md` | Bloque de estilo visual y ficha de personajes. Se pega dentro de los prompts. No se sube como fuente. |
| `02_prompts.md` | Configuración y prompt de cada formato de Studio, caso por caso, con el nombre del archivo que espera Claude Code. |
| `fuentes/` | Los textos que se suben como fuentes a cada cuaderno. |

---

## 1. Qué se genera y dónde va en el sitio

| Formato de Studio | Casos | Dónde se muestra en el sitio | ¿Se inserta? |
|---|---|---|---|
| Resumen en audio (podcast) | 1 a 5 | Sección `practica` del caso, arriba: "Escucha el repaso del caso". En el caso 5, en `desarrollo`: "Escucha el debate". | Sí: MP3 en el sitio, con transcripción. |
| Resumen en video | 1 a 5 | Sección `desarrollo` del caso. | Sí: subido a YouTube como no listado e insertado con youtube-nocookie. |
| Infografía | 1 a 5 | Sección `contenidos` del caso ("El caso en una imagen"), con versión en texto debajo. | Sí: imagen PNG convertida a WebP. |
| Tarjetas didácticas | 1 a 5 | Sección `practica`: mazo de tarjetas para voltear. | No se inserta: se copia el texto al JSON del sitio y lo muestra un componente propio. |
| Presentación | Docentes | Página `/docentes`, para la socialización (criterio 4 de la rúbrica). | Sí: PDF descargable. |
| Informes | Docentes | Página `/docentes`: guía para familias. | Se copia el texto al sitio. |
| Mapa mental | Docentes | Página `/docentes`: estructura del curso. | Sí: imagen (descargada o captura). |
| Cuestionario | No se usa | El sitio ya tiene cuestionarios propios. Los de Gemini solo se comparten por enlace y abren la app fuera del sitio. | No. |
| Tabla de datos | No se usa | | No. |

Todo lo que produce Gemini Notebook es un recurso propio del equipo hecho con una herramienta de IA (web 4.0). Cada pieza lleva en el sitio la etiqueta "Hecho con IA (Gemini Notebook) y revisado por el equipo".

## 2. Organización: 6 cuadernos

Un cuaderno por caso, para que la IA no mezcle historias entre casos, y uno para docentes.

| Cuaderno | Nombre sugerido | Fuentes |
|---|---|---|
| 1 | Aventura lectora - Caso 1 Leo y comprendo | `fuentes/caso_1_leo_y_comprendo.md` |
| 2 | Aventura lectora - Caso 2 El sendero de los textos | `fuentes/caso_2_sendero_de_los_textos.md` + texto de "El renacuajo paseador" (ver abajo) |
| 3 | Aventura lectora - Caso 3 Pregunto como detective | `fuentes/caso_3_pregunto_como_detective.md` |
| 4 | Aventura lectora - Caso 4 Detectives de noticias | `fuentes/caso_4_detectives_de_noticias.md` |
| 5 | Aventura lectora - Caso 5 Mi voz cuenta | `fuentes/caso_5_mi_voz_cuenta.md` |
| 6 | Aventura lectora - Docentes | `fuentes/docentes_propuesta_didactica.md`, `CONTENIDO.md`, `RECURSOS.md`, la guía del módulo (`Guia.pdf`), la ficha (`.docx`) y los dos enlaces del MEN (abajo) |

Cómo agregar fuentes: "Agregar fuentes" y luego subir el archivo. Si el archivo `.md` no se acepta, ábrelo, copia todo el texto y usa la opción de texto copiado.

Fuentes extra:
- Caso 2: copia el poema completo "El renacuajo paseador" desde la Biblioteca Virtual Miguel de Cervantes (https://www.cervantesvirtual.com/obra/el-renacuajo-paseador-1168925/) y agrégalo como texto copiado con el título "El renacuajo paseador - Rafael Pombo". Es de dominio público.
- Cuaderno de docentes: agrega como sitio web o PDF los Derechos Básicos de Aprendizaje de Lenguaje (https://www.colombiaaprende.edu.co/sites/default/files/files_public/2022-06/DBA_Lenguaje-min.pdf) y la página de los Estándares Básicos de Competencias (https://www.mineducacion.gov.co/1759/w3-article-340021.html).

Qué NO subir como fuente en los cuadernos de los casos:
- Los enlaces web de RECURSOS.md (Cultura Genial, Interland, Reinformados, etc.). Traen otras versiones de las historias y otros ejemplos, y la IA los mezcla con los del curso. Esos enlaces van en el sitio como recursos web aparte y cuentan para el 50/50.
- `01_guia_de_estilo.md`. Si se sube como fuente, los presentadores del podcast terminan hablando de colores y tipografías. El estilo va solo dentro de los prompts.
- Los ejemplos de preguntas del Icfes. El Icfes no autoriza transformar sus preguntas.

## 3. Flujo para cada formato

1. Abre el cuaderno del caso y marca solo las fuentes de ese caso.
2. En Studio, haz clic en el lápiz del formato (personalizar), no en el botón directo.
3. Elige las opciones que indica `02_prompts.md` (formato, idioma, estilo, orientación, etc.).
4. Pega el prompt. Si el cuadro corta el texto, usa la versión corta que viene debajo de cada prompt.
5. Genera, revisa con la lista de la sección 5 y regenera si hace falta.
6. Descarga desde el menú de tres puntos del resultado y renombra el archivo como indica `02_prompts.md`.

Límites: con la cuenta Pro caben de sobra los 5 podcasts en un día (Google indica 20 resúmenes en audio diarios en Pro). El control de duración (más corto, predeterminado, más largo) solo está documentado para audio en inglés, así que en español la duración se controla con el prompt y no está garantizada.

## 4. Archivos que espera Claude Code

Pásenle a Claude Code los archivos con estos nombres, en estas carpetas del repositorio:

```
public/media/audio/caso_1_podcast.mp3 ... caso_5_podcast.mp3
public/media/infografias/caso_1_infografia.png ... caso_5_infografia.png   (Claude Code genera la versión WebP)
public/media/docentes/socializacion.pdf
public/media/docentes/mapa_mental.png
src/data/transcripciones/caso_1_podcast.md ... caso_5_podcast.md
src/data/transcripciones/caso_1_video.md ... caso_5_video.md
src/data/multimedia.json          (IDs de YouTube, duraciones y fechas; ver SPECS.md sección 10)
src/data/actividades/unidad_N.json -> clave "tarjetas" con el texto de las tarjetas didácticas
src/content/docentes/guia_familias.md   (texto del informe)
```

Si la descarga del audio sale en WAV, conviértela a MP3 (mono, 96 kbps) antes de subirla. Por ejemplo, con Audacity o con `ffmpeg -i entrada.wav -ac 1 -b:a 96k caso_1_podcast.mp3`.

Videos: súbelos a YouTube como "No listado" y marca "Sí, es contenido creado para niños". Así el video no aparece en búsquedas y YouTube limita la publicidad personalizada. Copia el ID del video (lo que va después de `v=`) en `multimedia.json`.

Transcripciones:
- Video: usa los subtítulos automáticos de YouTube, corrígelos en YouTube Studio y copia el texto al `.md`.
- Audio: crea un cuaderno aparte llamado "Transcripciones", sube el MP3 como fuente y abre la fuente para ver su transcripción. Si tu versión no la muestra, pídele en el chat "Transcribe literalmente este audio". Revisa siempre el texto antes de copiarlo.

## 5. Lista de revisión antes de publicar

Contenido:
- [ ] Todo lo que dice coincide con la fuente del caso. No agregó datos, personajes ni finales distintos.
- [ ] No hay palabras en inglés ni referencias a "este documento", "las fuentes" o "el cuaderno".
- [ ] El vocabulario lo entiende un niño de 10 años.
- [ ] En los casos 1 a 4 el podcast no pasa de 8 minutos. Si se pasa, regenera o cambia al formato "Resumen" (una sola voz, menos de 2 minutos).

Imagen:
- [ ] Ortografía de cada palabra dentro de la imagen, con tildes y signos de apertura (¿ ¡). Los modelos de imagen suelen equivocarse aquí.
- [ ] Colores y personajes según `01_guia_de_estilo.md`. Si Sofía o Mateo salen muy distintos, regenera.
- [ ] Sin logos, marcas ni personajes conocidos (nada de Disney u otros).

Accesibilidad:
- [ ] Transcripción revisada para cada audio y video.
- [ ] Versión en texto de cada infografía (Claude Code la muestra debajo de la imagen).

Si una parte del texto dentro de una imagen o video sale con errores y no se corrige al regenerar, es mejor pedir menos texto en el prompt que corregir la imagen a mano.
