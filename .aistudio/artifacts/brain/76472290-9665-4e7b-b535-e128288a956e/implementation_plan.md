# Infografía Interactiva: Empatizar y Definir (5.º en Maripí)

Diseño e implementación de una página de infografía interactiva en la ruta `/empatizar` para la Actividad 1.2 (*Fundamentos de la Gamificación*), basada en los hallazgos reales de aula, pilotaje y entrevistas con el grupo de 13 estudiantes de 5.º de la I.E. Jorge Eliécer Gaitán (Maripí, Boyacá).

## Decisiones Confirmadas

> [!IMPORTANT]
> Estas decisiones recogen tus respuestas y guían el alcance visual e interactivo de la página conservando el 100 % de los datos, textos, cifras y citas originales.

- **Ruta y navegación confirmadas**: La página vivirá en `/empatizar` fuera del orden secuencial de lectura de los niños (`sin_paginador`), y quedará enlazada en el menú superior (sección *Para docentes*), en el pie de página global y con un acceso destacado desde la página *Para docentes*.
- **Interactividad confirmada**:
  1. **Explorador transversal por fuente (`B`, `P`, `E`, `F`, `D`)**: Barra interactiva que permite filtrar o resaltar en tiempo real qué cifras, voces, evidencias del mapa de empatía, pasos del recorrido y patrones provienen de la Bitácora de aula, el Pilotaje, la Entrevista docente, las Familias o la Revisión documental.
  2. **Curva de emoción interactiva paso a paso**: Visualización SVG viva de los 7 momentos del pilotaje donde se puede seleccionar cada estación (o recorrerlas con botones *Anterior / Siguiente*), viendo el cambio de estado emocional (1 a 5), la fuente y la escena ilustrada.
  3. **Mapa de empatía y perfiles conectados a los hallazgos**: Cuadrantes interactivos (*Dice, Hace, Piensa, Siente*, más *Dolores* y *Ganancias*) y tarjetas de los 5 arquetipos (*Sofía, Julián, Valentina, La docente rural, Doña Rosa*) que al seleccionarse resaltan qué hallazgos (*insights*) y preguntas *¿Cómo podríamos...?* responden directamente a su necesidad.
- **Dirección estética confirmada**: Estilo de libro ilustrado fiel al sistema de diseño de *Aventura lectora*, enriquecido con composiciones SVG propias (representación visual de los 13 estudiantes, retratos ilustrados para los 5 perfiles, íconos Phosphor de apoyo y barras comparativas animadas) sin romper la accesibilidad ni el rendimiento.

---

## 1. Visión General y Concepto Central

- **Qué hace**: Transforma los datos de investigación diagnóstica del grupo de 5.º de Maripí en una experiencia editorial e interactiva dividida en las dos primeras fases del *Design Thinking* (**Fase 1: Empatizar** y **Fase 2: Definir**), cerrando con el contexto nacional PISA.
- **Público objetivo**: Docentes, evaluadores académicos y lectores de la Maestría en Tecnología e Innovación Educativa que revisan el sustento empírico y metodológico detrás de *Aventura lectora*.
- **Valor principal**: Permite verificar de un vistazo la trazabilidad de cada hallazgo (desde la observación en el aula rural hasta las preguntas generadoras del reto gamificado) mediante visualizaciones claras, táctiles y memorables.

---

## 2. Experiencia de Usuario y Diseño Visual

### Recorrido del Usuario en la Página

1. **Portada de la hoja y navegación rápida**: Encabezado editorial con etiqueta *Actividad 1.2 · Fundamentos de la Gamificación*, título *"Lo que aprendimos de 5.º en Maripí"*, autoras (*Luz Marina Castillo Cuadrado e Ingrid Yuliana González Flores*), ilustración de apertura con Sofía y Mateo investigando, e índice rápido de salto a las 8 secciones.
2. **Barra fija/flotante de filtro por fuente**: Control interactivo con las 5 fuentes documentales (`B`: Bitácora, `P`: Pilotaje, `E`: Entrevista, `F`: Familias, `D`: Revisión documental). Al elegir una fuente, se resaltan las tarjetas y filas respaldadas por esa evidencia y se muestra el conteo de hallazgos vinculados.
3. **Sección 1 · Datos clave del grupo (`#cifras`)**: Tarjetas de alto impacto tipográfico con visualización gráfica para cada cifra (cuadrícula de 13 figuras para ver qué significan 9 de 13 con celular, 3 de 13 que necesitaron instrucción y 2 de 13 que leen en casa; medidor de los 4 de 4 factores familiares y barras de progreso con `tabular-nums`).
4. **Sección 2 · Las voces del grupo (`#voces`)**: Mural de burbujas de diálogo ilustradas agrupadas por actor (*Estudiantes*, *Docente titular*, *Madres y padres*), con filtro rápido por voz o por fuente.
5. **Sección 3 · Mapa de empatía (`#mapa`)**: Tablero visual en cuatro cuadrantes cromáticos (*Dice* en amarillo sol, *Hace* en verde hierba, *Piensa* en azul cielo, *Siente* en coral) con figura central del estudiante de 5.º, desplegables accesibles con contador de evidencias y paneles contrastados de *Dolores* vs. *Ganancias*.
6. **Sección 4 · Recorrido del caso 1 (`#recorrido`)**: *Journey map* interactivo del pilotaje del 10 de octubre. Incluye la curva emocional SVG con línea punteada de referencia neutral, nodos interactivos coloreados según nivel emocional (verde alto, amarillo medio, coral bajo), visor de detalle del paso activo y controles para recorrer paso a paso los 7 momentos (desde *Conseguir el aparato* hasta *En casa*).
7. **Sección 5 · Patrones y triangulación (`#patrones`)**: Matriz interactiva de los 7 patrones cruzados con las 5 fuentes (`B, P, E, F, D`). Pasar el cursor o tocar una fuente o un patrón resalta las intersecciones y resume la solidez de la triangulación (cuántas fuentes independientes confirman cada patrón).
8. **Sección 6 · Perfiles (`#personas`)**: Galería de los 5 arquetipos (*Sofía, Julián, Valentina, La docente rural, Doña Rosa*), cada uno con su retrato SVG propio, rol, relato, bloque destacado de necesidad (*Necesita: ...*) y botón interactivo *"Ver cómo responde el diseño"* que conecta el perfil con los hallazgos de la siguiente sección.
9. **Sección 7 · Del hallazgo al reto (`#definir`)**: Lista numerada de los 6 *insights* con selector de prioridad (*Todas / Prioridad alta / Prioridad media*), tarjeta protagonista en verde hierba con la declaración del **Desafío**, y cuadrícula de las 6 preguntas *¿Cómo podríamos...?* destacando las 2 preguntas priorizadas.
10. **Sección 8 · Contexto nacional (`#contexto`)**: Comparador visual entre Colombia (49 %) y el promedio OCDE (74 %) en lectura PISA 2022, acompañado de la tarjeta de evolución de puntaje (409 a 399 entre 2022 y 2025) con su nota metodológica.

### Identidad Visual y Sistema de Tokens

- **Dirección estética**: Hoja de libro ilustrada y táctil, con bordes definidos de `2px solid` en tinta (`--color-ink-black`), esquinas redondeadas suaves (`--radius-soft`, `--radius-card`) y superficies limpias sin sombras difusas ni degradados artificiales.
- **Paleta de color (Regla 60-30-10)**:
  - **60 % Lienzo dominante**: Papel crema (`--color-cream-paper`: `#f5f1e4`) y arena (`--color-sandstone`: `#e0dbce`) para áreas de contraste suave.
  - **30 % Superficies estructurales**: Blanco puro (`--color-pure-white`: `#ffffff`) con trazos en tinta (`--color-ink-black`: `#2c2e2a`) y texto secundario en piedra (`--color-stone-text`: `#5f615e`, contraste AA verificado).
  - **10 % Acentos semánticos**: Verde hierba (`--color-fresh-grass`: `#8ed462`), amarillo sol (`--color-sunshine-pop`: `#f5e211`), azul cielo (`--color-sky-pop`: `#2ba0ff`) y coral (`--color-coral-pop`: `#ff705d`).
- **Tipografía y jerarquía**:
  - Lectura y narrativa en **Andika** (`--font-lectura`), pensada para claridad lectora.
  - Controles, etiquetas, tablas y filtros en **Inter Variable** (`--font-sans`) con `tabular-nums` en todas las cifras y porcentajes.

---

## 3. Decisiones de Producto y Alternativas Evaluadas

- **Decisión 1: Renderizado estático completo + Isla React interactiva progresiva**
  - *Enfoque elegido*: Todo el contenido textual, cifras, tablas, SVG y desplegables nativos se renderizan desde el primer instante en HTML accesible (cumpliendo la regla del proyecto de que el contenido sea 100 % visible sin depender de JS), potenciados por controles interactivos para el filtrado transversal por fuente, el explorador paso a paso del *journey map* y la conexión entre perfiles y hallazgos.
  - *Por qué*: Garantiza carga instantánea, accesibilidad total con lectores de pantalla y compatibilidad con las pruebas automatizadas del proyecto, a la vez que ofrece una experiencia rica e interactiva al explorar.
- **Decisión 2: Visualización proporcional "Cada niño cuenta (13 estudiantes)"**
  - *Enfoque elegido*: Además de las barras de porcentaje originales, incluir en las tarjetas de cifras una fila visual de 13 iconos/puntos (donde 1 estudiante equivale a ~7.7 %) que colorea exactamente cuántos niños representan el dato (por ejemplo, 9 de 13 con celular, 3 de 13 que necesitaron ayuda, 2 de 13 que leen en casa).
  - *Por qué*: Refuerza visualmente la nota metodológica del equipo (*"El grupo es pequeño: cada estudiante pesa casi 8 puntos porcentuales"*).

---

## 4. Arquitectura Técnica y Flujo de Interacción

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    Marco del Libro (CursoLayout)                        │
│  ┌───────────────────┐  ┌────────────────────────────────────────────┐  │
│  │ Cabecera Global   │  │ Hoja Principal (/empatizar)                │  │
│  │ + Enlace Menú     │  │                                            │  │
│  │   "Empatizar y    │  │  ┌──────────────────────────────────────┐  │  │
│  │    definir"       │  │  │ Encabezado Ilustrado + Índice Rápido │  │  │
│  └───────────────────┘  │  └──────────────────┬───────────────────┘  │  │
│                         │                     ▼                      │  │
│  ┌───────────────────┐  │  ┌──────────────────────────────────────┐  │  │
│  │ Índice Lateral    │  │  │ Barra de Filtro por Fuente           │  │  │
│  │ del Curso         │  │  │ [Todas] [B] [P] [E] [F] [D]          │  │  │
│  └───────────────────┘  │  └────────┬─────────────────┬───────────┘  │  │
│                         │           │                 │              │  │
│                         │           ▼                 ▼              │  │
│                         │  ┌─────────────────┐ ┌──────────────────┐  │  │
│                         │  │ Fase 1:         │ │ Fase 2:          │  │  │
│                         │  │ Empatizar       │ │ Definir          │  │  │
│                         │  │                 │ │                  │  │  │
│                         │  │ • Cifras (13)   │ │ • Perfiles SVG   │  │  │
│                         │  │ • Voces         │ │   conectables    │  │  │
│                         │  │ • Mapa Empatía  │ │ • 6 Insights     │  │  │
│                         │  │ • Curva 7 pasos │ │ • El Desafío     │  │  │
│                         │  │ • Triangulación │ │ • ¿Cómo          │  │  │
│                         │  │   (Matriz 7x5)  │ │   podríamos...?  │  │  │
│                         │  └─────────────────┘ └────────┬─────────┘  │  │
│                         │                               ▼            │  │
│                         │  ┌──────────────────────────────────────┐  │  │
│                         │  │ Contexto Nacional PISA (2022 - 2025) │  │  │
│                         │  └──────────────────────────────────────┘  │  │
│                         └────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

### Mapa de Estado e Interacciones

- **Estado de Fuente Activa (`fuente_activa: 'TODAS' | 'B' | 'P' | 'E' | 'F' | 'D'`)**:
  - Al pulsar cualquier fuente en la barra superior o en las celdas de la tabla de triangulación, se destacan las tarjetas de *Datos clave*, *Voces*, evidencias del *Mapa de empatía*, estaciones del *Recorrido* y filas de *Patrones* que provienen de esa fuente, atenuando suavemente el resto sin ocultarlo para mantener el contexto.
- **Estado del Paso del Recorrido (`paso_activo: 0..6`)**:
  - Al hacer clic en un nodo del gráfico SVG, en una tarjeta de los 7 pasos o en los botones *Paso anterior / Paso siguiente*, el nodo seleccionado se amplía, se muestra la tarjeta de foco con el nivel de emoción (`1/5` a `5/5`), qué hace el estudiante y la fuente documental.
- **Estado de Perfil e Insight Conectado (`perfil_activo` / `prioridad_insight`)**:
  - Al seleccionar uno de los 5 perfiles (*Sofía, Julián, Valentina, La docente rural, Doña Rosa*), se resaltan sus hallazgos y preguntas *¿Cómo podríamos...?* afines en la sección *Definir*, permitiendo seguir el hilo desde la persona real hasta el reto de diseño.
