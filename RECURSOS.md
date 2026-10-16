# RECURSOS: Aventura lectora

Inventario de recursos. Lo que se publica sale de `src/data/recursos.json` (recursos y citas) y de `src/data/referencias_extra.ts` (fuentes de comprobación y referencias sin caso). Cada recurso lleva tipo (propio o web), herramienta, enlace, estado de verificación y cita APA 7.

## Estados

- Abierto: se abrió el enlace y se leyó el contenido.
- Encontrado: el enlace apareció en resultados de búsqueda con el título y la descripción esperados, pero no se abrió completo.
- Por confirmar: falta que el equipo elija el recurso exacto o compruebe el enlace.
- No usado: se revisó, pero no entra en el sitio.
- Retirado: el enlace ya no responde o el recurso se sustituyó.

En el JSON, `verificado: true` solo para "Abierto" y "Encontrado" después de que el equipo haga clic y confirme que carga. Los "Por confirmar" no se publican hasta completarlos. La última comprobación de cada enlace está en la sección 6.

---

## 1. Referentes curriculares (para docentes; no cuentan en el 50/50)

| Id | Recurso | Enlace | Estado |
|---|---|---|---|
| ref_dba | Derechos Básicos de Aprendizaje de Lenguaje, versión 2 (MEN) | https://www.colombiaaprende.edu.co/sites/default/files/files_public/2022-06/DBA_Lenguaje-min.pdf | Abierto (16/10/2026: responde 200) |
| ref_ebc | Estándares Básicos de Competencias (MEN), página de descarga | https://www.mineducacion.gov.co/1759/w3-article-340021.html | Abierto (16/10/2026: responde 200 y muestra el título) |
| decreto_1290 | Decreto 1290 de 2009 (MEN), página oficial | https://www.mineducacion.gov.co/1759/w3-article-187765.html | Abierto (16/10/2026: responde 200; la página indica actualización del 16/10/2024). Sirve para la escala de desempeños de `/docentes` |

APA 7:
- Ministerio de Educación Nacional. (2016). *Derechos básicos de aprendizaje: Lenguaje* (V.2). https://www.colombiaaprende.edu.co/sites/default/files/files_public/2022-06/DBA_Lenguaje-min.pdf
- Ministerio de Educación Nacional. (2006). *Estándares básicos de competencias en lenguaje, matemáticas, ciencias y ciudadanas*. https://www.mineducacion.gov.co/1759/w3-article-340021.html
- Ministerio de Educación Nacional. (2009). *Decreto 1290 de 2009: Por el cual se reglamenta la evaluación del aprendizaje y promoción de los estudiantes de los niveles de educación básica y media*. https://www.mineducacion.gov.co/1759/w3-article-187765.html

Hallazgo: las dos evidencias de aprendizaje de la unidad 2 de la ficha son textuales del DBA 6 de grado 4.º (página 22 del PDF). El DBA 6 de 5.º está en la página 26. Ver REVISION_FICHA.md.

---

## 2. Recursos de la web por unidad

Estado de cada enlace al 16/10/2026 (detalle en la sección 6). Las fechas de los módulos de Colombia Aprende son las que muestra cada página (05/08/2016). Si el portal declara otra fecha de publicación, se corrige aquí y en `recursos.json`.

### Caso 1. Leo y comprendo

| Id | Recurso | Uso | Enlace | Estado |
|---|---|---|---|---|
| w1_fabula | "La liebre y la tortuga: la fábula (con guía para padres y maestros)", Cultura Genial | Versión comparativa de la fábula y preguntas para conversar | https://www.culturagenial.com/es/la-liebre-y-la-tortuga/ | Abierto. HTTP 200. Autora: Catalina Arancibia Durán, publicado el 16/07/2025. No puede mostrarse dentro de otra página: se enlaza como actividad |
| w1_hipotesis | Colombia Aprende: "Proposición de hipótesis predictivas sobre un texto literario" | Práctica de predicción (antes de leer) | https://colombiaaprende.edu.co/contenidos-para-aprender/proposicion-de-hipotesis-predictivas-sobre-un-texto-literario | Abierto. HTTP 200; fecha de la página 05/08/2016. Módulo interactivo embebido |
| w1_video | "El mensaje oculto", canal Miss Edith (YouTube) | Preguntas de inferencia | https://www.youtube.com/watch?v=yVYG4uvefCQ | Abierto, por confirmar. oEmbed confirma título y canal; la página respondió 429. El 24/09 se abrió y carga. Pendiente: que el equipo confirme que es adecuado para 5.º (sección 5) |
| w1_happy | Canal Happy Learning Español | Alternativa al video de la ficha | https://www.youtube.com/@HappyLearningEs | No usado |

APA 7:
- Arancibia Durán, C. (2025). *La liebre y la tortuga: la fábula (con guía para padres y maestros)*. Cultura Genial. https://www.culturagenial.com/es/la-liebre-y-la-tortuga/
- Ministerio de Educación Nacional. (2016). *Proposición de hipótesis predictivas sobre un texto literario* [Recurso educativo digital]. Colombia Aprende. https://colombiaaprende.edu.co/contenidos-para-aprender/proposicion-de-hipotesis-predictivas-sobre-un-texto-literario
- Miss Edith. (2020, 26 de junio). *EL MENSAJE OCULTO* [Video]. YouTube. https://www.youtube.com/watch?v=yVYG4uvefCQ

### Caso 2. Descubro el sendero de los textos

| Id | Recurso | Uso | Enlace | Estado |
|---|---|---|---|---|
| w2_renacuajo | Guía "Un paseo diferente" (MinTIC, Colombia Programa), anexo 1 con el texto de "El renacuajo paseador" | Texto del cuento para leer y marcar inicio, nudo y desenlace | https://mintic.gov.co/colombiaprograma/847/articles-407418_recurso_1.pdf | Abierto. El PDF responde 200 (7,3 MB; el primer intento superó 25 s). Autora: Luz Manedy Parada Orozco, 2025. Licencia CC BY-NC-ND 4.0. El cuento es de Rafael Pombo (dominio público). Se enlaza; hoy no se comprobó si permite mostrarse dentro de otra página |
| w2_pombo_bio | Rafael Pombo, Biografías y Vidas | Fuente del texto informativo "¿Quién fue Rafael Pombo?" | https://www.biografiasyvidas.com/biografia/p/pombo_rafael.htm | Abierto. HTTP 200; autores Tomás Fernández y Elena Tamaro; publicado en 2004. Se muestra dentro de la página |
| w2_textos_info | Colombia Aprende: "Construcción de textos informativos" | Ampliación del texto informativo | https://colombiaaprende.edu.co/contenidos-para-aprender/construccion-de-textos-informativos | Abierto. HTTP 200; fecha de la página 05/08/2016. Módulo embebido |
| w2_cervantes | "El renacuajo paseador", Biblioteca Virtual Miguel de Cervantes | No se usa | https://www.cervantesvirtual.com/obra/el-renacuajo-paseador-1168925/ | No usado. Responde 403 (Cloudflare). El texto viene de la guía de MinTIC |
| w2_happy_tipos | Video de Happy Learning Español sobre tipos de texto | No se usa | Canal de Happy Learning (ver caso 1) | No usado |

La guía de MinTIC aparecía dos veces en esta lista (como "w2_mintic_guia" y como "w2_renacuajo"); se unificó en w2_renacuajo.

APA 7:
- Parada Orozco, L. M. (2025). *Un paseo diferente* [Guía didáctica]. Banco Virtual de Recursos de Colombia Programa. https://mintic.gov.co/colombiaprograma/847/articles-407418_recurso_1.pdf
- Fernández, T., y Tamaro, E. (2004). *Rafael Pombo*. Biografías y Vidas. https://www.biografiasyvidas.com/biografia/p/pombo_rafael.htm
- Ministerio de Educación Nacional. (2016). *Construcción de textos informativos* [Recurso educativo digital]. Colombia Aprende. https://colombiaaprende.edu.co/contenidos-para-aprender/construccion-de-textos-informativos

Dominio público: Rafael Pombo murió en 1912, así que su obra ya es de dominio público en Colombia. El sitio puede mostrar el texto completo con la cita de la fuente de donde se copió. La guía de MinTIC tiene licencia CC BY-NC-ND 4.0, que prohíbe crear obras derivadas: el sitio toma de ella solo el texto del cuento, que es de dominio público, y lo cita. Conviene que el equipo confirme que las actividades del sitio no copian la guía.

### Caso 3. Pregunto como detective

| Id | Recurso | Uso | Enlace | Estado |
|---|---|---|---|---|
| w3_colombia_aprende | Colombia Aprende: "Comprensión de diversos tipos de texto" | Práctica adicional de comprensión | https://colombiaaprende.edu.co/contenidos-para-aprender/comprension-de-diversos-tipos-de-texto | Abierto. HTTP 200; fecha de la página 05/08/2016. Módulo embebido |
| w3_extra | Colombia Aprende: "Reconocimiento de los argumentos básicos de un texto" | Práctica del nivel crítico: reconocer los argumentos de un texto | https://colombiaaprende.edu.co/contenidos-para-aprender/reconocimiento-de-los-argumentos-basicos-de-un-texto | Abierto. HTTP 200; fecha de la página 05/08/2016. Módulo embebido |
| w3_literarios | Colombia Aprende: "Comprensión de diversos tipos de textos literarios" | Práctica con textos literarios, como el cuento del caso | https://colombiaaprende.edu.co/contenidos-para-aprender/comprension-de-diversos-tipos-de-textos-literarios | Abierto. HTTP 200; fecha de la página 05/08/2016. Módulo embebido |
| w3_icfes | Icfes, "Ejemplos de preguntas Saber 5.º Lenguaje" (2015) | Ya no se usa | https://www.icfes.gov.co/documents/20143/489407/Ejemplos%20de%20preguntas%20saber%205%20lenguaje%202015%20v3.pdf | Retirado. Responde 404 el 16/10/2026. Lo sustituye w3_literarios |

La sugerencia anterior de un juego de Wordwall para este caso se descartó: Wordwall no permite mostrarse dentro de otra página (frame-ancestors 'self').

APA 7:
- Ministerio de Educación Nacional. (2016). *Comprensión de diversos tipos de texto* [Recurso educativo digital]. Colombia Aprende. https://colombiaaprende.edu.co/contenidos-para-aprender/comprension-de-diversos-tipos-de-texto
- Ministerio de Educación Nacional. (2016). *Reconocimiento de los argumentos básicos de un texto* [Recurso educativo digital]. Colombia Aprende. https://colombiaaprende.edu.co/contenidos-para-aprender/reconocimiento-de-los-argumentos-basicos-de-un-texto
- Ministerio de Educación Nacional. (2016). *Comprensión de diversos tipos de textos literarios* [Recurso educativo digital]. Colombia Aprende. https://colombiaaprende.edu.co/contenidos-para-aprender/comprension-de-diversos-tipos-de-textos-literarios

### Caso 4. Detectives de noticias

| Id | Recurso | Uso | Enlace | Estado |
|---|---|---|---|---|
| w4_noticia | Colombia Aprende: "Presentación de una noticia" | Estructura de la noticia | https://colombiaaprende.edu.co/contenidos-para-aprender/presentacion-de-una-noticia | Abierto. HTTP 200; fecha de la página 05/08/2016. Módulo embebido |
| w4_reinformados | Reinformados (la diaria, con Plan Ceibal y Google News Initiative) | Actividades sobre opiniones, información confiable, engañosa o falsa, y noticias | https://ver.ladiaria.com.uy/reinformados/ | Abierto. HTTP 200; fecha de la página 25/03/2021. Se muestra dentro de la página. Licencia por confirmar (sección 6) |
| w4_laberinto | "El laberinto de la información" (EduCaixa, con Maldita.es y Verificat), juego en Genially | Juego sobre hechos, opiniones y desinformación | https://educaixa.org/es/-/recurso/laberinto-informacion | Abierto el 24/09 en un navegador. El 16/10 el juego en Genially responde 200 y se muestra dentro de la página; la página de EduCaixa responde 403 (Cloudflare). Pendiente: abrir el enlace de EduCaixa en un navegador |
| w4_interland | Interland, Sé genial en Internet (Google) | No se usa | https://beinternetawesome.withgoogle.com/interland/ | No usado. Responde X-Frame-Options: DENY |
| w4_chequeado | "Infodemia en la escuela" (Chequeado, con UNESCO) | No se usa | https://chequeado.com/infodemiaenlaescuela/ | No usado. Responde 200 el 16/10/2026 |

Noticia del reto (no es un recurso del caso, pero se publica con su fuente):

| Id | Recurso | Uso | Enlace | Estado |
|---|---|---|---|---|
| noticia_reto4 | "¡De Bogotá al espacio! 300 niños enviarán sus sueños en un cohete", City TV Noticias (25/09/2026) | Noticia del reto del caso 4 (`src/data/noticia_reto4.json`) | https://citytv.eltiempo.com/programas/citynoticias-del-mediodia/de-bogota-al-espacio-300-ninos-enviaran-sus-suenos-en-un-cohete_95642 | Abierto el 25/09/2026. HTTP 200 el 16/10/2026; el título coincide. Se muestra en la página del reto con su fuente |

APA 7:
- la diaria. (2021). *Reinformados* [Recursos educativos]. https://ver.ladiaria.com.uy/reinformados/
- EduCaixa. (2024). *El laberinto de la información: Actividad para fomentar la alfabetización mediática en el aula primaria* [Recurso educativo interactivo]. https://educaixa.org/es/-/recurso/laberinto-informacion
- Ministerio de Educación Nacional. (2016). *Presentación de una noticia* [Recurso educativo digital]. Colombia Aprende. https://colombiaaprende.edu.co/contenidos-para-aprender/presentacion-de-una-noticia
- Espinosa Mejía, Á. (2026, 25 de septiembre). *¡De Bogotá al espacio! 300 niños enviarán sus sueños en un cohete*. City TV Noticias. https://citytv.eltiempo.com/programas/citynoticias-del-mediodia/de-bogota-al-espacio-300-ninos-enviaran-sus-suenos-en-un-cohete_95642

### Caso 5. Mi voz cuenta

| Id | Recurso | Uso | Enlace | Estado |
|---|---|---|---|---|
| w5_punto_vista | Colombia Aprende: "Justificación del punto de vista" | Argumentar una opinión | https://colombiaaprende.edu.co/contenidos-para-aprender/justificacion-del-punto-de-vista | Abierto. HTTP 200; fecha de la página 05/08/2016. Módulo embebido |
| w5_debate | Colombia Aprende: "Justificación de opiniones en un debate" | Preparar el muro de debate | https://colombiaaprende.edu.co/contenidos-para-aprender/justificacion-de-opiniones-en-un-debate | Abierto. HTTP 200; fecha de la página 05/08/2016. Módulo embebido |
| w5_argumentativos | Colombia Aprende: "Producción de textos argumentativos" | Escribir el texto de opinión | https://colombiaaprende.edu.co/contenidos-para-aprender/produccion-de-textos-argumentativos | Abierto. HTTP 200; fecha de la página 05/08/2016. Módulo embebido |

APA 7 (mismo formato para los tres):
- Ministerio de Educación Nacional. (2016). *Justificación del punto de vista* [Recurso educativo digital]. Colombia Aprende. https://colombiaaprende.edu.co/contenidos-para-aprender/justificacion-del-punto-de-vista
- Ministerio de Educación Nacional. (2016). *Justificación de opiniones en un debate* [Recurso educativo digital]. Colombia Aprende. https://colombiaaprende.edu.co/contenidos-para-aprender/justificacion-de-opiniones-en-un-debate
- Ministerio de Educación Nacional. (2016). *Producción de textos argumentativos* [Recurso educativo digital]. Colombia Aprende. https://colombiaaprende.edu.co/contenidos-para-aprender/produccion-de-textos-argumentativos

### Fuentes de comprobación del texto (fuera del conteo)

| Id | Recurso | Uso | Enlace | Estado |
|---|---|---|---|---|
| banrep_pombo | Pombo, R., "El renacuajo paseador", en *Cuentos pintados* (PDF), Biblioteca Luis Ángel Arango, Banco de la República | Comparar el texto de los 54 versos (`/unidad/2/pistas`) | https://babel.banrepcultural.org/digital/api/collection/p17054coll10/id/2720/download | Verificado el 25/09/2026 (`referencias_extra.ts`). El 16/10 no se pudo reabrir desde el entorno: error de certificado en curl, también con el paquete de confianza del proxy. Pendiente: abrirlo en un navegador |
| banrep_enc | Red Cultural del Banco de la República, Enciclopedia: Rafael Pombo | Segunda fuente de los datos biográficos (`/unidad/2/pistas`) | https://enciclopedia.banrepcultural.org/Rafael_Pombo | Verificado el 25/09/2026 (`referencias_extra.ts`). El 16/10 responde con un captcha de Radware Bot Manager. Pendiente: abrirlo en un navegador |

APA 7:
- Pombo, R. (s. f.). *El renacuajo paseador*. En *Cuentos pintados* [Archivo PDF]. Biblioteca Luis Ángel Arango, Banco de la República. https://babel.banrepcultural.org/digital/api/collection/p17054coll10/id/2720/download
- Red Cultural del Banco de la República. (s. f.). Rafael Pombo. En *Enciclopedia*. https://enciclopedia.banrepcultural.org/Rafael_Pombo

### Ilustración del sitio (no cuenta en el 50/50)

| Id | Recurso | Licencia | Enlace | Estado |
|---|---|---|---|---|
| il_openpeeps | Open Peeps, Pablo Stanley | CC0 | https://www.openpeeps.com/ | No usado. Las ilustraciones del sitio son propias (SVG). No aparece en `/referencias` |

### Revisados y no usados

- Happy Learning Español (w1_happy, w2_happy_tipos): no hay un video de comprensión lectora que encaje; no se usa.
- Biblioteca Cervantes Virtual (w2_cervantes): responde 403 a la verificación automática.
- Chequeado (w4_chequeado) e Interland (w4_interland): no se usan (sección 2).
- Wordwall: no permite mostrarse dentro de otra página.
- Padlet: responde 403 a la verificación automática. Sus muros se replicaron dentro del sitio.
- Pixton: responde 200, pero el cómic está hecho dentro del sitio.

---

## 3. Recursos propios (elaborados por el equipo)

Los recursos propios se agrupan en tres por caso (una fila de la ficha = un recurso): material central, kit multimedia hecho con IA y kit de práctica.

| Id | Caso | Recurso | Herramienta | Dónde vive |
|---|---|---|---|---|
| p1_fabula | 1 | Adaptación de "La liebre y la tortuga" con lectura con pausas y pista de carrera | Sitio (Astro, React y GSAP) | Sitio |
| p1_multimedia | 1 | Kit multimedia: infografía "Leo como detective", video, podcast de repaso y tarjetas | Gemini Notebook (IA, web 4.0) | Sitio (MP3, video, imagen y JSON) |
| p1_practica | 1 | Sopa de letras, tablero de predicciones, pistas del detective, tarjeta de refrán, ruleta y cuestionario | Sitio (React) | Sitio |
| p2_modelos | 2 | Cómic "Tres textos, tres misiones", texto informativo sobre Pombo e instructivo del separador | Sitio (cámara de viñetas en SVG; réplica de un cómic de Pixton) | Sitio |
| p2_multimedia | 2 | Kit multimedia: infografía "El sendero de los textos", video, podcast y tarjetas | Gemini Notebook (IA, web 4.0) | Sitio (MP3, video, imagen y JSON) |
| p2_practica | 2 | Resaltador de inicio, nudo y desenlace, ordenador de pasos, clasificador de textos, lienzo de dibujo y cuestionario | Sitio (React; el lienzo es una réplica de Canva) | Sitio |
| p3_cuento | 3 | Cuento original "Los libros viajeros de la vereda" | Sitio | Sitio |
| p3_multimedia | 3 | Kit multimedia: infografía "Las tres lupas", video, podcast y tarjetas | Gemini Notebook (IA, web 4.0) | Sitio (MP3, video, imagen y JSON) |
| p3_practica | 3 | Semáforo de preguntas, cuestionario y muro para intercambiar preguntas | Sitio (React; el muro es una réplica de Padlet) | Sitio |
| p4_noticia | 4 | Noticia inventada pieza por pieza y clasificador de hecho u opinión | Sitio (cámara de viñetas y React) | Sitio |
| p4_multimedia | 4 | Kit multimedia: infografía "La lista LUPA", video, podcast y tarjetas | Gemini Notebook (IA, web 4.0) | Sitio (MP3, video, imagen y JSON) |
| p4_detector | 4 | Detector de fuentes y cuestionario | Sitio (React) | Sitio |
| p5_modelo | 5 | Modelo de texto de opinión | Sitio | Sitio |
| p5_multimedia | 5 | Kit multimedia: infografía "La torre del argumento", video, podcast en formato debate y tarjetas | Gemini Notebook (IA, web 4.0) | Sitio (MP3, video, imagen y JSON) |
| p5_practica | 5 | Constructor de argumentos, clasificador de conectores, cuestionario, muro de debate y grabadora de voz | Sitio (React; el muro y la grabadora son réplicas de Padlet) | Sitio |

Fuera del conteo, por ser evaluación, decoración o material para docentes: retos sumativos, rúbricas, certificado, portadas ilustradas de los casos y `/docentes`. La presentación, la guía para familias y el mapa mental del cuaderno de Gemini no se hicieron (SPECS, sección 17).

---

## 4. Conteo 50/50

| Caso | Propios | Web | Estado |
|---|---|---|---|
| 1 | p1_fabula, p1_multimedia, p1_practica | w1_fabula, w1_hipotesis, w1_video | Falta que el equipo confirme el video (sección 6) |
| 2 | p2_modelos, p2_multimedia, p2_practica | w2_renacuajo, w2_pombo_bio, w2_textos_info | Enlaces comprobados |
| 3 | p3_cuento, p3_multimedia, p3_practica | w3_colombia_aprende, w3_extra, w3_literarios | Enlaces comprobados |
| 4 | p4_noticia, p4_multimedia, p4_detector | w4_noticia, w4_reinformados, w4_laberinto | Falta abrir EduCaixa en un navegador (sección 6) |
| 5 | p5_modelo, p5_multimedia, p5_practica | w5_punto_vista, w5_debate, w5_argumentativos | Enlaces comprobados |
| Total | 15 | 15 | 50 % y 50 % |

Si la evaluadora cuenta cada pieza por separado (podcast, video, infografía y tarjetas como cuatro recursos), el lado propio sube a 27 y hay que sumar recursos web. En ese caso, conviene agregar en cada caso módulos de Colombia Aprende de grado quinto que todavía no se usan.

Herramientas para crear recursos propios (criterio 3 de la rúbrica):
- Web 4.0 (inteligencia artificial): Gemini Notebook, para infografías, videos, podcasts y tarjetas. `/docentes` la nombra.
- Web 2.0, como réplicas dentro del sitio: cómic con cámara de viñetas (en lugar de Pixton), muros de preguntas y de debate (en lugar de Padlet), lienzo de dibujo (en lugar de Canva) y grabadora de voz. Ver SPECS, sección 17.
- Decisión pendiente: crear cuentas reales en Pixton y Padlet, o mantener las réplicas (SPECS, sección 16).

Declaración sugerida para `/referencias`: "Los podcasts, videos, infografías y tarjetas marcados con la etiqueta de IA fueron generados por el equipo con Gemini Notebook a partir de textos escritos por el equipo, y revisados antes de publicarse." El sitio dice hoy "herramientas digitales", sin nombrar Gemini (commit 88a9973). La decisión está en SPECS, sección 16.

Crédito de la herramienta de IA (APA 7, formato para software). Todavía no aparece en `/referencias`:
- Google. (2026). *Gemini Notebook* [Herramienta de inteligencia artificial]. https://notebook.google/ [URL vigente confirmada el 24 de septiembre de 2026]

---

## 5. Verificación del 24 de septiembre de 2026 (registro histórico)

Cada enlace se abrió y se leyó su contenido (excepto donde se indica). Cambios respecto a las secciones anteriores:

- Colombia Aprende: los seis módulos de grado quinto de Lenguaje tienen URL directa y coinciden con los títulos del inventario (`/contenidos-para-aprender/<nombre>`). Para el caso 3 se eligieron tres módulos de grado quinto: "Comprensión de diversos tipos de texto", "Reconocimiento de los argumentos básicos de un texto" y "Comprensión de diversos tipos de textos literarios".
- Icfes: el PDF "Ejemplos de preguntas Saber 5.° Lenguaje" ya no existe en esa dirección (404). Se reemplazó por el tercer módulo de Colombia Aprende del caso 3.
- Caso 1: el video de la ficha ("El mensaje oculto", canal Miss Edith, 26 de junio de 2020, 9 min 43 s, apto para todo público) carga y permite insertarse. Es un juego de palabras para primeros grados; se publica como pidió la ficha y queda para que el equipo confirme si es adecuado para 5.º. No se usa Happy Learning Español: el canal no tiene un video de comprensión lectora.
- Caso 2: el texto de "El renacuajo paseador" se tomó del anexo 1 de la guía de MinTIC (abierta). Cervantes Virtual bloquea la verificación automática (Cloudflare) y queda fuera de las referencias. La biografía de Biografías y Vidas confirma los datos del texto informativo: nació en Bogotá en 1833, murió en 1912, estudió matemáticas e ingeniería, fue secretario de la legación colombiana en Nueva York y cónsul, y su obra completa se publicó en 1916 en cuatro volúmenes.
- Caso 4: "El laberinto de la información" (EduCaixa, con Maldita.es y Verificat, 2024) es un juego interactivo en Genially. La página oficial de EduCaixa se abrió en un navegador y da el enlace https://view.genially.com/664dca9c96d30b00146b5513, que se muestra dentro de la página del caso 4. El kit descargable (PDF y videos de 350 a 440 MB) es de "todos los derechos reservados": no se publica en el sitio. Interland (Google) prohíbe mostrarse en otra página y sale del inventario; entra el módulo "Presentación de una noticia" de Colombia Aprende, que sí se puede mostrar.
- Gemini Notebook: `notebooklm.google` ahora redirige a https://notebook.google/, titulada "Gemini Notebook".
- Decreto 1290 de 2009: página oficial del MEN, actualizada el 16 de octubre de 2024.
- Conteo: 15 recursos propios y 15 de la web, 15 de 15 con enlace confirmado (el 16/10 se re-comprobaron, ver sección 6).

### Cómo se integra cada recurso de la web (probado en un navegador el 24 de septiembre de 2026)

- Se muestran dentro de la página, con carga al pulsar (13): el video de YouTube (youtube-nocookie), los 9 módulos de Colombia Aprende (el paquete interactivo directo de cada uno), el juego Genially del laberinto, la biografía de Biografías y Vidas y Reinformados (la diaria).
- Integrados como actividad, con enlace (2): "La liebre y la tortuga" de Cultura Genial (su sitio prohíbe mostrarse en otra página; se integra como actividad de comparación) y la guía de MinTIC (su PDF prohíbe mostrarse en otra página; el texto de dominio público del anexo 1 se muestra completo en la actividad de marcar inicio, nudo y desenlace).

---

## 6. Verificación del 16 de octubre de 2026

Método. Se comprobaron los 38 enlaces únicos de `src/data/recursos.json`, `src/data/referencias_extra.ts`, `src/data/noticia_reto4.json` y `RECURSOS.md` con `scripts/verificar_enlaces.sh`: código HTTP, título de la página y cabeceras que deciden si puede mostrarse dentro de otra página. Además:

- YouTube: se usó oEmbed (`youtube.com/oembed`), que devuelve título y canal aunque la página responda 429.
- Guía de MinTIC: se leyó el texto de su portada (autora, año y licencia).
- Fechas y autores: se leyeron los metadatos de cada página (JSON-LD y texto visible).

Es una comprobación automática. No equivale a abrir el enlace en un navegador ni a que el equipo haga clic.

Resultados:

| Resultado | Enlaces | Cuáles |
|---|---|---|
| Responde 200 con contenido | 32 | Incluye los recursos usados en el sitio, salvo EduCaixa, el video de YouTube y las dos fuentes del Banco de la República |
| Responde 200, pero con un captcha de bots | 1 | Enciclopedia del Banco de la República |
| No responde | 5 | PDF del Banco de la República (error de certificado con curl); EduCaixa (403); Cervantes Virtual (403); ICFES (404); página del video de YouTube (429) |

Cabeceras que deciden si puede mostrarse dentro de otra página:

- Sí se puede (embebido): módulos de Colombia Aprende (su `frame-ancestors` admite cualquier origen https), Biografías y Vidas, Reinformados y el juego de Genially.
- No se puede: Cultura Genial (SAMEORIGIN), Interland (DENY), Wordwall (`frame-ancestors 'self'`), Gemini Notebook (SAMEORIGIN), Pixton, Happy Learning y City TV (SAMEORIGIN).
- La guía de MinTIC no se revisó en cabeceras; se enlaza, como en el registro del 24/09.

Cambios hechos hoy:

1. Guía de MinTIC: cita con autora y año (Parada Orozco, 2025) y licencia CC BY-NC-ND 4.0, en lugar de "MinTIC (s.f.)".
2. Reinformados: año 2021 en la cita (antes s.f.).
3. Secciones 2 y 4 puestas al día con `recursos.json`: los módulos de Colombia Aprende ya tienen su enlace directo, el ICFES queda retirado y la sugerencia de Wordwall del caso 3 se descartó.
4. Open Peeps no se usa: no aparece en el sitio ni en `/referencias`.
5. Herramientas: las réplicas de Pixton, Padlet y Canva se describen como réplicas dentro del sitio, y `/docentes` nombra Gemini Notebook.
6. Se añadieron al inventario la noticia del reto del caso 4 y el Decreto 1290. Ya se publicaban sin estar aquí, y `CLAUDE.md` pide que todo recurso publicado esté en este archivo.
7. Se añadió `scripts/verificar_enlaces.sh` para repetir la comprobación.

Pendiente para el equipo:

- Abrir en un navegador los dos enlaces del Banco de la República, EduCaixa y el video del caso 1 (y decidir si es adecuado para 5.º).
- Confirmar la licencia de los módulos de Colombia Aprende. La página de derechos del portal y los términos del MEN no tienen texto legible desde el entorno de trabajo.
- Confirmar la licencia de Reinformados. El registro del 24/09 la anota como CC BY-NC-SA, pero la página revisada hoy no lo muestra.
- Molenda (2003), si se quiere citar el origen del modelo ADDIE en `/docentes`: por confirmar. Los buscadores dan Performance Improvement, 42(5), 34-37, y el DOI 10.1002/pfi.4930420508, pero desde el entorno de trabajo el DOI responde 403 y el PDF de respaldo 503.
