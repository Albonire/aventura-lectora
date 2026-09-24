# RECURSOS: Aventura lectora

Inventario de recursos para `src/data/recursos.json`. Cada recurso lleva tipo (propio o web), herramienta, enlace, estado de verificación y cita APA 7.

Estados de verificación (revisados el 23 de septiembre de 2026):
- Abierto: se abrió el enlace y se leyó el contenido.
- Encontrado: el enlace apareció en resultados de búsqueda con el título y la descripción esperados, pero no se abrió completo.
- Por confirmar: falta que el equipo elija el recurso exacto o compruebe el enlace.

En el JSON, `verificado: true` solo para "Abierto" y "Encontrado" después de que el equipo haga clic y confirme que carga. Los "Por confirmar" no se publican hasta completarlos.

---

## 1. Referentes curriculares (para docentes; no cuentan en el 50/50)

| Id | Recurso | Enlace | Estado |
|---|---|---|---|
| ref_dba | Derechos Básicos de Aprendizaje de Lenguaje, versión 2 (MEN) | https://www.colombiaaprende.edu.co/sites/default/files/files_public/2022-06/DBA_Lenguaje-min.pdf | Abierto |
| ref_ebc | Estándares Básicos de Competencias (MEN), página de descarga | https://www.mineducacion.gov.co/1759/w3-article-340021.html | Encontrado |

APA 7:
- Ministerio de Educación Nacional. (2016). *Derechos básicos de aprendizaje: Lenguaje* (V.2). https://www.colombiaaprende.edu.co/sites/default/files/files_public/2022-06/DBA_Lenguaje-min.pdf
- Ministerio de Educación Nacional. (2006). *Estándares básicos de competencias en lenguaje, matemáticas, ciencias y ciudadanas*. https://www.mineducacion.gov.co/1759/w3-article-340021.html

Hallazgo: las dos evidencias de aprendizaje de la unidad 2 de la ficha son textuales del DBA 6 de grado 4.º (página 22 del PDF). El DBA 6 de 5.º está en la página 26. Ver REVISION_FICHA.md.

---

## 2. Recursos de la web por unidad

### Caso 1. Leo y comprendo
| Id | Recurso | Uso | Enlace | Estado |
|---|---|---|---|---|
| w1_fabula | "La liebre y la tortuga: la fábula (con guía para padres y maestros)", Cultura Genial | Versión comparativa de la fábula y preguntas para conversar | https://www.culturagenial.com/es/la-liebre-y-la-tortuga/ | Encontrado |
| w1_hipotesis | Colombia Aprende, Contenidos para aprender, grado quinto: "Proposición de hipótesis predictivas sobre un texto literario" | Práctica de predicción (antes de leer) | Listado: https://colombiaaprende.edu.co/contenidos-para-aprender (filtrar Básica primaria, Grado quinto, Lenguaje) | Encontrado el título en el listado; el equipo copia el enlace directo del módulo |
| w1_video_ficha | Video de la ficha para la actividad "Mensaje oculto" | Preguntas de inferencia | https://www.youtube.com/watch?v=yVYG4uvefCQ | Por confirmar: al abrirlo, YouTube redirigió a otro video sin título (canal "69", mayo de 2022). Revisar a mano. Si no es el esperado, reemplazar |
| w1_happy | Canal Happy Learning Español (videos educativos para niños) | Alternativa al video de la ficha: un video sobre comprensión lectora | https://www.youtube.com/@HappyLearningEs | Canal encontrado; video exacto por confirmar |

APA 7:
- Arancibia Durán, C. (s.f.). *La liebre y la tortuga: la fábula (con guía para padres y maestros)*. Cultura Genial. https://www.culturagenial.com/es/la-liebre-y-la-tortuga/
- Ministerio de Educación Nacional. (s.f.). *Proposición de hipótesis predictivas sobre un texto literario* [Recurso educativo digital]. Colombia Aprende. [PENDIENTE: URL directa]
- [PENDIENTE: cita del video una vez confirmado. Formato: Apellido, I. o Nombre del canal. (Año, día de mes). *Título del video* [Video]. YouTube. URL]

### Caso 2. Descubro el sendero de los textos
| Id | Recurso | Uso | Enlace | Estado |
|---|---|---|---|---|
| w2_renacuajo | "El renacuajo paseador", Rafael Pombo, Biblioteca Virtual Miguel de Cervantes | Texto del cuento para leer y marcar inicio, nudo y desenlace | https://www.cervantesvirtual.com/obra/el-renacuajo-paseador-1168925/ | Encontrado (citado por Wikipedia). El sitio bloqueó la verificación automática: abrirlo a mano |
| w2_mintic_guia | Guía "Un paseo diferente" (MinTIC, Colombia Programa), con el texto del cuento en el anexo | Respaldo del texto y otra propuesta de actividad con el cuento | https://mintic.gov.co/colombiaprograma/847/articles-407418_recurso_1.pdf | Encontrado |
| w2_pombo_bio | Biografía de Rafael Pombo, Biografías y Vidas | Fuente del texto informativo "¿Quién fue Rafael Pombo?" | https://www.biografiasyvidas.com/biografia/p/pombo_rafael.htm | Encontrado |
| w2_textos_info | Colombia Aprende, grado quinto: "Construcción de textos informativos" | Ampliación del texto informativo | Listado de Contenidos para aprender (ver caso 1) | Título encontrado; URL directa pendiente |
| w2_happy_tipos | Video de Happy Learning Español sobre tipos de texto | Refuerzo audiovisual | Canal (ver caso 1) | Por confirmar |

Dominio público: Rafael Pombo murió en 1912, así que su obra ya es de dominio público en Colombia. El sitio puede mostrar el texto completo con la cita de la fuente de donde se copió.

APA 7:
- Pombo, R. (s.f.). *El renacuajo paseador*. Biblioteca Virtual Miguel de Cervantes. https://www.cervantesvirtual.com/obra/el-renacuajo-paseador-1168925/
- Ministerio de Tecnologías de la Información y las Comunicaciones. (s.f.). *Guía: Un paseo diferente* [Guía didáctica]. Colombia Programa. https://mintic.gov.co/colombiaprograma/847/articles-407418_recurso_1.pdf
- Fernández, T., y Tamaro, E. (s.f.). *Biografía de Rafael Pombo*. Biografías y Vidas. https://www.biografiasyvidas.com/biografia/p/pombo_rafael.htm [PENDIENTE: confirmar autores en la página]

### Caso 3. Pregunto como detective
| Id | Recurso | Uso | Enlace | Estado |
|---|---|---|---|---|
| w3_icfes | Icfes, "Ejemplos de preguntas Saber 5.º Lenguaje" (2015) | Practicar con preguntas reales de la prueba y ubicar su nivel | https://www.icfes.gov.co/documents/20143/489407/Ejemplos%20de%20preguntas%20saber%205%20lenguaje%202015%20v3.pdf | Encontrado. El Icfes permite uso académico con crédito y prohíbe transformar las preguntas: enlazar, no adaptar |
| w3_colombia_aprende | Colombia Aprende, módulo de grado quinto de Lenguaje a elegir | Práctica adicional de comprensión | Listado de Contenidos para aprender | Por confirmar |
| w3_extra | Tercer recurso web del caso (sugerencia: una actividad pública de Wordwall sobre niveles de comprensión) | Juego de repaso | https://wordwall.net/es (buscar "niveles de comprensión lectora") | Por confirmar |

APA 7:
- Instituto Colombiano para la Evaluación de la Educación. (2015). *Ejemplos de preguntas Saber 5.° Lenguaje*. https://www.icfes.gov.co/documents/20143/489407/Ejemplos%20de%20preguntas%20saber%205%20lenguaje%202015%20v3.pdf

### Caso 4. Detectives de noticias
| Id | Recurso | Uso | Enlace | Estado |
|---|---|---|---|---|
| w4_interland | Interland, Sé genial en Internet (Google), mundo "Río de la realidad" | Juego para distinguir información real de engaños (7 a 12 años, sin registro) | https://beinternetawesome.withgoogle.com/interland/ | Encontrado |
| w4_reinformados | Reinformados (la diaria, con apoyo de Plan Ceibal y Google News Initiative) | Cuadernos de actividades sobre noticias y desinformación para 9 a 12 años. Licencia CC BY-NC-SA | https://ver.ladiaria.com.uy/reinformados | Encontrado en documento oficial del proyecto |
| w4_laberinto | "El laberinto de la información" (EduCaixa, con Maldita.es y Verificat) | Juego en Genially sobre hechos, opiniones y desinformación para 8 a 12 años | Reseña: https://www.educaciontrespuntocero.com/recursos/el-laberinto-de-la-informacion/ (el equipo ubica el enlace del recurso en el portal de EduCaixa) | Reseña encontrada; enlace del recurso por confirmar |
| w4_chequeado | "Infodemia en la escuela", Chequeado con apoyo de UNESCO | Planificaciones para el docente sobre desinformación, últimos años de primaria | https://chequeado.com/infodemiaenlaescuela/ | Encontrado |
| w4_noticia | Colombia Aprende, grado quinto: "Presentación de una noticia" | Estructura de la noticia | Listado de Contenidos para aprender | Título encontrado; URL directa pendiente |

APA 7:
- Google. (s.f.). *Interland: Sé genial en Internet* [Juego en línea]. https://beinternetawesome.withgoogle.com/interland/
- la diaria. (2021). *Reinformados* [Recursos educativos]. https://ver.ladiaria.com.uy/reinformados
- Chequeado. (2020). *Infodemia en la escuela: Recursos para docentes sobre coronavirus y desinformación*. https://chequeado.com/infodemiaenlaescuela/
- EduCaixa. (s.f.). *El laberinto de la información* [Recurso educativo]. [PENDIENTE: URL]

### Caso 5. Mi voz cuenta
| Id | Recurso | Uso | Enlace | Estado |
|---|---|---|---|---|
| w5_punto_vista | Colombia Aprende, grado quinto: "Justificación del punto de vista" | Argumentar una opinión | Listado de Contenidos para aprender | Título encontrado; URL directa pendiente |
| w5_debate | Colombia Aprende, grado quinto: "Justificación de opiniones en un debate" | Preparar el muro de debate | Listado de Contenidos para aprender | Título encontrado; URL directa pendiente |
| w5_argumentativos | Colombia Aprende, grado quinto: "Producción de textos argumentativos" | Escribir el texto de opinión | Listado de Contenidos para aprender | Título encontrado; URL directa pendiente |

APA 7 (mismo formato para los tres):
- Ministerio de Educación Nacional. (s.f.). *Justificación del punto de vista* [Recurso educativo digital]. Colombia Aprende. [PENDIENTE: URL]

### Ilustración del sitio (no cuenta en el 50/50)
| Id | Recurso | Licencia | Enlace | Estado |
|---|---|---|---|---|
| il_openpeeps | Open Peeps, Pablo Stanley | CC0 (dominio público, sin atribución obligatoria) | https://www.openpeeps.com/ | Encontrado |

Se da crédito igual en `/creditos` por buena práctica: Stanley, P. (s.f.). *Open Peeps* [Ilustraciones]. https://www.openpeeps.com/

---

## 3. Recursos propios (elaborados por el equipo)

Los recursos propios se agrupan en tres por caso (una fila de la ficha = un recurso): material central, kit multimedia hecho con IA y kit de práctica.

| Id | Caso | Recurso | Herramienta | Dónde vive |
|---|---|---|---|---|
| p1_fabula | 1 | Adaptación de "La liebre y la tortuga" con lectura con pausas y pista de carrera | Sitio (React + GSAP) | Sitio |
| p1_multimedia | 1 | Kit multimedia: infografía "Leo como detective", video, podcast de repaso y tarjetas | Gemini Notebook (IA) | Sitio (MP3, imagen, JSON) y YouTube no listado |
| p1_practica | 1 | Sopa de letras, tablero de predicciones, pistas del detective, tarjeta de refrán, ruleta y cuestionario | Sitio (React). Opcional: sopa o ruleta en Wordwall | Sitio |
| p2_modelos | 2 | Cómic "Tres textos, tres misiones", texto informativo sobre Pombo e instructivo del separador | Pixton o Storyboard That (cómic) + sitio | Insertado + sitio |
| p2_multimedia | 2 | Kit multimedia: infografía "El sendero de los textos", video "Tres textos, tres misiones", podcast y tarjetas | Gemini Notebook (IA) | Sitio y YouTube no listado |
| p2_practica | 2 | Resaltador de inicio, nudo y desenlace, ordenador de pasos, clasificador de textos y cuestionario | Sitio (React) | Sitio |
| p3_cuento | 3 | Cuento original "Los libros viajeros de la vereda" | Sitio | Sitio |
| p3_multimedia | 3 | Kit multimedia: infografía "Las tres lupas", video, podcast y tarjetas | Gemini Notebook (IA) | Sitio y YouTube no listado |
| p3_practica | 3 | Semáforo de preguntas, cuestionario y muro de Padlet para intercambiar preguntas | Sitio (React) + Padlet | Sitio + insertado |
| p4_noticia | 4 | Noticia inventada pieza por pieza y clasificador hecho u opinión | Sitio | Sitio |
| p4_multimedia | 4 | Kit multimedia: infografía "La lista LUPA", video "¿Puedo confiar en esta noticia?", podcast y tarjetas | Gemini Notebook (IA) | Sitio y YouTube no listado |
| p4_detector | 4 | Detector de fuentes y cuestionario | Sitio (React) | Sitio |
| p5_modelo | 5 | Modelo de texto de opinión | Sitio | Sitio |
| p5_multimedia | 5 | Kit multimedia: infografía "La torre del argumento", video, podcast en formato debate y tarjetas | Gemini Notebook (IA) | Sitio y YouTube no listado |
| p5_practica | 5 | Constructor de argumentos, clasificador de conectores, cuestionario y muro de debate en Padlet (con grabación de audio) | Sitio (React) + Padlet | Sitio + insertado |

Fuera del conteo, por ser evaluación, decoración o material para docentes: retos sumativos, rúbricas, certificado, portadas ilustradas de los casos, y del cuaderno de docentes la presentación de socialización, la guía para familias y el mapa mental.

Crédito de la herramienta de IA en `/creditos` (APA 7, formato para software):
- Google. (2026). *Gemini Notebook* [Herramienta de inteligencia artificial]. https://notebooklm.google.com [PENDIENTE: confirmar la URL vigente después del cambio de nombre]

Declaración sugerida para `/creditos`: "Los podcasts, videos, infografías y tarjetas marcados con la etiqueta de IA fueron generados por el equipo con Gemini Notebook a partir de textos escritos por el equipo, y revisados antes de publicarse."

---

## 4. Conteo 50/50

| Caso | Propios | Web | Estado |
|---|---|---|---|
| 1 | p1_fabula, p1_multimedia, p1_practica | w1_fabula, w1_hipotesis, w1_video_ficha o w1_happy | Falta confirmar el video |
| 2 | p2_modelos, p2_multimedia, p2_practica | w2_renacuajo, w2_pombo_bio, w2_textos_info | Falta URL directa de Colombia Aprende |
| 3 | p3_cuento, p3_multimedia, p3_practica | w3_icfes, w3_colombia_aprende, w3_extra | Faltan dos recursos web por elegir |
| 4 | p4_noticia, p4_multimedia, p4_detector | w4_interland, w4_reinformados, w4_laberinto | Falta enlace del laberinto (o usar w4_noticia) |
| 5 | p5_modelo, p5_multimedia, p5_practica | w5_punto_vista, w5_debate, w5_argumentativos | Faltan URL directas |
| Total | 15 | 15 | 50 % y 50 % |

Si la evaluadora cuenta cada pieza por separado (podcast, video, infografía y tarjetas como cuatro recursos), el lado propio sube a 27 y hay que sumar recursos web. En ese caso, prioricen agregar en cada caso los módulos de Colombia Aprende de grado quinto que no se usaron y videos verificados de Happy Learning Español.

Herramientas usadas por el equipo para crear recursos propios (criterio 3 de la rúbrica): web 2.0, Pixton (cómic) y Padlet (muros de los casos 3 y 5), y opcionalmente Wordwall; web 4.0 o IA, Gemini Notebook (infografías, videos, podcasts y tarjetas). Enlaces: https://www.pixton.com, https://padlet.com, https://wordwall.net/es
