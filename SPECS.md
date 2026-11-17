# SPECS: Aventura lectora (prototipo de la Actividad 2.2)

Documento maestro del sitio. Léelo completo antes de escribir código. Reemplaza la especificación del curso de cinco casos (seminario anterior), que ya no aplica.

| Archivo | Para qué sirve |
|---|---|
| `CLAUDE.md` | Reglas del proyecto (convenciones, comandos, qué no hacer). |
| `SPECS.md` | Este documento: contexto, ruta, diseño, componentes, modelo de datos y criterios de aceptación. |
| `CONTENIDO.md` | Todo el texto que ven los estudiantes en las 6 estaciones. Se genera desde los datos con `pnpm contenido`. |
| `RECURSOS.md` | Referencias de la Guía 2.1 con su estado de verificación y lista de recursos propios. |
| `gemini_notebook/01_guia_de_estilo.md` | Ficha de personajes y estilo de las ilustraciones. |

Regla de oro: el sitio muestra solo lo que está en `CONTENIDO.md` y cita solo lo que está verificado en `RECURSOS.md`. Los datos del grupo (diagnóstico, pilotaje) no se estiman ni se redondean.

---

## 1. Contexto

- Institución: Institución Educativa Jorge Eliécer Gaitán (sector oficial rural), Maripí, Boyacá, Colombia. Contexto veredal de familias productoras de caña panelera y cacao.
- Población: 13 estudiantes de quinto grado de primaria, de 10 y 11 años.
- Docentes autoras (únicas): Luz Marina Castillo Cuadrado e Ingrid Yuliana González Flores.
- Entrega académica: Universidad Santo Tomás, Sede Principal. Maestría en Tecnología e Innovación Educativa (2026). Espacio académico: Gamificación (Tecnología Educativa). Docente: Gustavo Alberto Orozco Bohórquez. Asesora de proyecto de grado: Marcela Zambrano. Fase de diseño y planificación, Actividad 2.2: Prototipado.
- Producto: prototipo de alta fidelidad (sitio web funcional) de la experiencia planeada en la Actividad 2.1. La URL pública es la evidencia del prototipo; el entregable de la actividad es un PDF con el desarrollo de las 7 etapas, que se apoya en la página `/docentes`.
- Estos datos viven en `src/config/sitio.ts`. No se menciona a ninguna otra docente, ciudad ni colegio.

### Diagnóstico del 5 de mayo de 2026 (n = 13)

| Dato | Estudiantes |
|---|---|
| Entusiasmo por los juegos y los retos con imágenes | 10 de 13 |
| Dificultad para inferir y para justificar por escrito | 10 de 13 |
| Celular con datos, compartido entre la familia | 9 de 13 |
| Sin conectividad en la finca | 4 de 13 |
| Requieren guía paso a paso en pantallas | 3 de 13 |

Fuente: Guía 2.1, figura 1. Datos en `src/data/prototipado.ts`.

## 2. La ruta: 6 estaciones cortas

Cada estación dura de 15 a 20 minutos. Las lecturas tienen de 150 a 250 palabras (la fábula, máximo 200).

| Estación | Ruta | Nivel y referentes | Reto | Recompensa |
|---|---|---|---|---|
| 00 Inicio: Entra al club de detectives | `/agencia` | Ubicación, trabajo en parejas | Conocer a Sofía y a Mateo, elegir solo o en pareja, resolver la pista de prueba, hacer la tarjeta de detective | Tarjeta y álbum de medallas |
| 01 Misión 1: Leo con calma | `/unidad/1` | Literal. DBA 5 y 6 | Inicio, nudo y desenlace; ordenar la receta; idea principal y detalles | Lupa de Bronce |
| 02 Misión 2: Pistas y "Cuéntame, abuelo" | `/unidad/2` | Inferencial. DBA 6 y 5 | Preguntas inferenciales; reto familiar en pantalla o en papel | Lupa de Plata |
| 03 Misión 3: ¿Verdad o chisme? | `/unidad/3` | Crítico. DBA 1 y 5 (ver nota) | Dato real u opinión o chisme; revisar quién escribió | Detector de Verdades |
| 04 Reto final: Mi voz cuenta en Maripí | `/unidad/4` | Argumentación. DBA 1, 7 y 8 | Torre de ideas guiada y autochequeo | Voz de Detective |
| 05 Final: ¡Caso resuelto! | `/cierre` | Autoevaluación | Álbum con 4 medallas, historia de la familia, diploma | Diploma de Detective Lector |

Nota sobre la Misión 3: la Guía 2.1 la asocia al "DBA 3 de Lenguaje". En el documento oficial (MEN, 2016, V.2), el DBA 3 de grado 5.º trata de los roles de los personajes en las obras literarias. Los enunciados que sí hablan de mensajes de los medios son el DBA 1 y la evidencia del DBA 5 ("Asume una postura crítica y respetuosa frente a los mensajes que circulan en su medio"), y son los que cita el sitio. Pendiente del equipo: confirmar o corregir el referente en el documento de entrega.

### Secuencia fija de 4 pasos

Las estaciones 01 a 04 tienen siempre las mismas cuatro páginas, con una barra de 4 botones tipo píldora (`PasosCaso`):

1. `1. Abrir el caso` (`/unidad/N`): portada, misión, estrategias y una pregunta de entrada.
2. `2. Seguir las pistas` (`/unidad/N/pistas`): la lectura, con paradas cortas.
3. `3. Entrenar la lupa` (`/unidad/N/lupa`): práctica con pistas de Sofía.
4. `4. Cerrar el caso` (`/unidad/N/cerrar`): reto, insignia y autoevaluación.

Trucos de detective (etiquetas de estrategia): Misión 1 `imagino`, `pregunto`, `opino`; Misión 3 `comparo`, `reviso`, `explico`. La Guía 2.1 los llama `predigo`, `verifico` y `argumento`; se cambiaron por palabras más fáciles.

### Otras páginas

| Ruta | Contenido |
|---|---|
| `/` | Tapa del libro, bienvenida y mapa de la ruta con el estado de cada estación. |
| `/libreta` | Ficha imprimible "Libreta de campo de Mateo" en media carta (una por hoja, o dos en una hoja carta). En el menú principal y en la Misión 2. |
| `/docentes` | Ficha docente y prototipado 2.2: contexto, diagnóstico, las 7 etapas, ajustes tras el pilotaje, evaluación del prototipo y uso en el aula. |
| `/empatizar` | Infografía de la Actividad 1.2 (empatizar y definir) con el trabajo de campo. |
| `/referencias` | Referencias verificadas en APA 7 y créditos. |

## 3. Ajustes tras la prueba piloto (deben verse funcionando)

0. **Vocabulario de niño de 10 años.** Lo que leen los estudiantes usa palabras de todos los días; los nombres del documento de diseño se tradujeron así: agencia por club, estación por parte o misión, insignia por medalla, pasaporte por álbum, certificado por diploma, torre de argumentos por torre de ideas, postura por lo que pienso, hecho comprobable por dato real, rumor por chisme, verificar por revisar, relato por historia y desafío final por reto final. Las páginas para docentes conservan los términos pedagógicos.

1. **Botón "Escuchar con voz pausada".** `ReadAloud` con `speechSynthesis`, voz `es-CO`, luego `es-419`, luego cualquier `es`, a `rate: 0.9`. En cada lectura y en cada consigna (misión, cuestionarios, clasificaciones, reto familiar, torre). Se oculta si el navegador no tiene la API.
2. **Pistas graduadas de Sofía.** Una respuesta incorrecta nunca muestra solo "incorrecto": aparece una burbuja de Sofía con una pista que nombra el párrafo, la línea o la frase que hay que volver a leer. Cada pregunta tiene al menos dos pistas, cada una más concreta (`pista_para` en `src/lib/quiz.ts`). Las tarjetas mal clasificadas también tienen pista. En las páginas de práctica y de reto la lectura está plegada en "Volver a leer".
3. **Libreta de campo de Mateo.** Modalidad dual del reto familiar: formulario de 3 campos en pantalla y ficha de papel para los 4 hogares sin datos móviles.
4. **Ficha docente y prototipado 2.2.** `/docentes` con los datos reales del diagnóstico y el resumen de ajustes.
5. **Torre de argumentos guiada.** Sin área de texto vacía: 3 pisos con frases iniciadoras seleccionables, ejemplos y lista de autochequeo de 3 puntos.
6. **Recorrido liviano.** Sin videos, podcasts, infografías ni recursos externos insertados: celular compartido y datos limitados.

## 4. Gamificación

- Narrativa: "El misterio de los cuentos que se borran en Maripí". El Borracuentos (el "Efecto Lectura Rápida" de la Guía 2.1) borra las ideas más importantes, desordena recetas y hace olvidar coplas y leyendas.
- Personajes (ver `gemini_notebook/01_guia_de_estilo.md`): Sofía, "la Guardiana de la Lupa", con el conejo de la bufanda roja y la tortuga; Mateo, "el Rastreador de Pistas", con la oruga del sombrero de copa.
- Tarjeta de detective y álbum de medallas (el "pasaporte" de la Guía 2.1): se hace en el Inicio con el nombre del estudiante o de la pareja.
- Insignias: cada una declara sus tareas en `src/lib/insignias.ts`. Una insignia se gana cuando todas las tareas de su caso están hechas (`marcar_tarea` en `src/lib/progreso.ts`). El panel "Gana tu insignia" muestra qué falta.

| Medalla | Tareas |
|---|---|
| Lupa de Bronce | `partes`, `receta` (paso 3) e `idea` (paso 4) |
| Lupa de Plata | `inferencias` (paso 3) y `abuelo` (paso 4) |
| Detector de Verdades | `clasificar` (paso 3) y `verificar` (paso 4) |
| Voz de Detective | `torre` y `autochequeo` (paso 4) |

## 5. Stack y decisiones técnicas

| Pieza | Elección |
|---|---|
| Framework | Astro con islas de React. Salida estática. |
| Estilos | Tailwind CSS v4 con `design_tokens.css`. |
| Contenido | Colección `unidades` (datos de cada caso), colección `paginas` (MDX por paso) y JSON de actividades. |
| Movimiento | GSAP y ScrollTrigger solo en la tapa del libro, dentro de `gsap.matchMedia()`. |
| Arrastrar y soltar | `@dnd-kit`, siempre con botones "Mover a" y flechas como alternativa. |
| Voz | Web Speech API del navegador. Sin servicios externos. |
| Impresión | CSS de impresión (`@page`): media carta para la libreta, carta horizontal para el certificado. |
| PDF | `jspdf` con import dinámico, solo para descargar el certificado. |
| Iconos y letra | Phosphor. Andika para lecturas, Inter para la interfaz, autoalojadas. |
| Pruebas | Vitest (lógica y reglas de contenido) y Playwright con axe (humo, accesibilidad y recorrido). |

## 6. Design system

Estilo de libro ilustrado infantil en vector plano. Pocas cajas, sin cajas anidadas innecesarias, textos cortos.

| Token | Valor | Uso |
|---|---|---|
| `cream-paper` | `#faf6ee` | Lienzo |
| `pure-white` | `#ffffff` | Tarjetas |
| `ink-black` | `#1e293b` | Texto, iconos y bordes de 2 px |
| `sunshine-pop` | `#facc15` | Acento, pistas de Sofía |
| `fresh-grass` | `#84cc16` | Acento, acierto y acción principal |
| `sky-pop` | `#0284c7` | Acento en ilustración, puntos y trazos |
| `coral-pop` | `#f43f5e` | Acento en ilustración, puntos y trazos |
| `sky-soft` / `coral-soft` | `#bae6fd` / `#fda4af` | Rellenos que llevan texto encima |
| `stone-text` | `#475569` | Texto secundario |

Contraste (WCAG 2.2 AA, calculado): tinta sobre crema 13.6:1, sobre amarillo 9.6:1, sobre verde 7.4:1. Tinta sobre azul cielo (3.6:1) y sobre coral (4.0:1) no pasa: esos dos colores nunca llevan texto encima; para eso están sus versiones suaves (11.0:1 y 7.7:1). El texto secundario no se usa sobre verde ni sobre coral suave.

## 7. Componentes

| Componente | Archivo | Qué hace |
|---|---|---|
| `ReadAloud` | `islas/read_aloud.tsx` | Botón "Escuchar con voz pausada", pausar y detener. |
| `Burbuja`, `CaraSofia`, `CaraMateo` | `islas/personajes.tsx` | Burbuja de diálogo de los guías. |
| `QuizCard` | `islas/quiz_card.tsx` | Opción múltiple con pistas graduadas y tarea de insignia. |
| `DragSort` | `islas/drag_sort.tsx` | Clasificar tarjetas en cajas, con pista por tarjeta. |
| `StepOrderer` | `islas/step_orderer.tsx` | Ordenar los pasos de la receta. |
| `EleccionRapida` | `islas/eleccion_rapida.tsx` | Una pregunta rápida (predicción o comparación). |
| `CuentameAbuelo` | `islas/cuentame_abuelo.tsx` | Reto familiar de 3 campos y enlace a la libreta. |
| `TorreArgumentos` | `islas/torre_argumentos.tsx` | Constructor de la torre con iniciadores y autochequeo. |
| `PasaporteAgencia` | `islas/pasaporte_agencia.tsx` | Solo o pareja, nombres, carné. |
| `BadgeTracker`, `Insignia` | `islas/badge_tracker.tsx`, `islas/insignia.tsx` | Insignia del caso con sus tareas; pasaporte con 4 medallas. |
| `RelatoFamiliar` | `islas/relato_familiar.tsx` | Muestra el relato en el cierre. |
| `Certificate` | `islas/certificate.tsx` | Certificado con nombre, imprimir y descargar. |
| `LecturaConPausas`, `Receta`, `MensajesCelular`, `DetectorVerdades`, `TorreModelo` | `libro/` | Lecturas estáticas con párrafos numerados. |

Todos: uso completo con teclado, áreas táctiles de 44 px, retroalimentación en texto (el color nunca es la única señal) y estado guardado en `localStorage`.

## 8. Modelo de datos

```
src/config/sitio.ts          institución, población, autoras y datos académicos
src/config/paginas.ts        las 6 estaciones, los 4 pasos y el orden de lectura
src/lib/insignias.ts         las 4 insignias y sus tareas
src/content/unidades/unidad_N.mdx      misión, guía, estrategias, aprendizajes y DBA (N = 1 a 4)
src/content/paginas/unidad_N/{abrir,pistas,lupa,cerrar}.mdx
src/data/actividades/unidad_N.json     lecturas, preguntas, pistas y clasificaciones
src/data/agencia.json        relato de apertura, guías y pista de prueba
src/data/prototipado.ts      diagnóstico y ajustes tras el pilotaje
src/data/referencias.ts      referencias con su estado de verificación
```

Claves de `localStorage` (prefijo `aventura_lectora:`): `ruta` (progreso), `pasaporte`, `abuelo`, `torre`, `certificado_nombre`, `quiz:N:id`, `clasificar:N:id`, `pasos:N:id`, `eleccion:N:id`, `autoeval:N` y `ajustes`.

## 9. Accesibilidad, rendimiento y privacidad

- WCAG 2.2 AA. Un solo `h1` por página, `lang="es-CO"`, foco visible.
- Interruptores "Movimiento" y "Letra grande" en el menú.
- Contenido visible sin JavaScript. Las lecturas son HTML plano.
- Sin analítica, sin cookies de terceros, sin registro y sin envío de datos (usuarios menores de edad). Lo que escribe el estudiante vive en su navegador. En `/docentes` hay un botón para borrar el progreso entre turnos de un celular compartido.
- Funciona en un Android de gama baja a 360 px de ancho. Sin video ni audio que descargar.

## 10. Criterios de aceptación

- [ ] `pnpm build` sin errores y las 23 rutas responden.
- [ ] El recorrido completo (estación 00 a 05) se hace solo con "Siguiente".
- [ ] Cada misión muestra la barra de 4 pasos con el paso actual marcado.
- [ ] Una respuesta incorrecta muestra la burbuja de Sofía con una pista concreta.
- [ ] Cada lectura y consigna tiene el botón "Escuchar con voz pausada" (`rate` 0.9).
- [ ] El progreso del pasaporte se guarda en el navegador y sobrevive a recargar.
- [ ] La libreta se abre desde la Misión 2 y desde el menú, e imprime solo la ficha.
- [ ] El certificado lleva el nombre del estudiante o de la pareja e imprime solo el certificado.
- [ ] `/docentes` muestra las cinco cifras del diagnóstico y los ajustes del pilotaje.
- [ ] Ningún texto con raya larga, emojis, otras docentes, otras ciudades u otros colegios.
- [ ] axe sin violaciones serias en todas las rutas.

## 11. Pendientes que dependen de las autoras

- Validar con el grupo la fábula, la receta, el relato y los mensajes (son textos escritos para el prototipo), o reemplazarlos por textos recogidos en las veredas.
- Confirmar el referente DBA de la Misión 3 (ver nota de la sección 2).
- Corregir en el documento de entrega las cuatro referencias que no se pudieron verificar (ver `RECURSOS.md`).
- Probar la ruta de 6 estaciones con los 13 estudiantes y registrar tiempos y pistas usadas.
- Probar el botón de voz en los celulares reales del grupo (depende de las voces en español instaladas).

## 12. Despliegue

Vercel, importando el repositorio de GitHub (salida estática, `vercel.json` ya lo indica). Probar la URL en una ventana privada y en un celular antes de entregarla.
