# Guía de estilo: personajes e ilustraciones

Ficha fija de los personajes y del estilo visual, tomada de la Guía 2.1 (etapa 2, "Darles vida"). La usan las ilustraciones SVG del sitio y cualquier pieza que el equipo genere con otras herramientas. No se publica en el sitio.

## Estilo

Libro ilustrado infantil pintado a mano, dibujado con código (SVG). Mantiene la forma, la ropa y los colores de la Guía 2.1, pero con acabado artesanal: contorno de tinta con pulso de plumilla, rellenos con volumen, sombras puestas a mano, tramas de rayitas, detalles de costura y pelaje y un grano de papel suave. Sin neón, sin sombras difusas ni borrosas y sin 3D de computador: la profundidad sale de capas y de sombras duras, como en un grabado coloreado.

Reglas que valen para toda ilustración (están en `src/lib/arte/paleta.ts`):

1. **Una sola luz**, desde arriba a la izquierda. La luz va arriba y a la izquierda de cada forma, la sombra abajo y a la derecha, y la sombra del suelo cae hacia la derecha.
2. **Cuatro tonos por material**: luz, base, sombra y trazo suave. Los tonos base son los de la tabla de colores de abajo.
3. **Tres planos**: el fondo no lleva contorno y usa tonos claros; el plano medio lleva contorno fino y del color de la sombra; el frente lleva contorno de tinta (4 en personajes, 3.5 en animales, 3 en objetos).
4. **Trazo a mano**: el contorno se dibuja en dos pasadas con un temblor pequeño y fijo (siempre igual), y el color de relleno queda corrido unas décimas, como en una impresión artesanal.
5. **Nada se anima en la textura**: no hay filtros que se muevan ni que "hiervan".
6. **Se simplifica donde se imprime o es muy chico**: en papel, en caras de menos de 80 px y en celulares con poca memoria se quitan tramas y filtros, y queda el dibujo limpio.

| Uso | Color |
|---|---|
| Fondo crema cálido | `#faf6ee` |
| Tarjetas | `#ffffff` |
| Contornos y texto (gris pizarra oscuro) | `#1e293b` |
| Amarillo | `#facc15` |
| Verde lima | `#84cc16` |
| Azul cielo | `#0284c7` |
| Coral | `#f43f5e` |

El texto siempre va en gris pizarra oscuro. El azul cielo y el coral no llevan texto encima.

## Ficha de personajes

| Personaje | Descripción fija | Dónde aparece |
|---|---|---|
| Sofía, "la Guardiana de la Lupa" | Niña de 10 años, piel trigueña, cabello castaño en coleta alta con lazo rojo, chaqueta amarilla con dos botones, pantalón azul oscuro y lupa celeste. Paciente y observadora. | Todo el recorrido. Guía de la Misión 1 y voz de las pistas. |
| Mateo, "el Rastreador de Pistas" | Niño de 11 años, piel morena, cabello negro rizado bajo una gorra azul cielo, suéter verde lima con bolsillo amarillo en el pecho, libreta de campo con respaldo verde y lápiz amarillo. Inquieto y conversador. | Todo el recorrido. Guía de la Misión 3 y dueño de la libreta de campo. |
| El conejo | Color arena, orejas largas y bufanda roja. | Acompaña a Sofía. Misión 1. |
| La tortuga | Verde, con caparazón de hexágonos. Tranquila y constante. | Acompaña a Sofía. Misión 1. |
| La oruga | Verde, con sombrero de copa negro y corbatín rojo. | Acompaña a Mateo. Misiones 2 y 3. |

## Medallas

Medallas circulares con aro repujado, borde punteado y cinta con pliegue: Lupa de Bronce (durazno), Lupa de Plata (celeste), Detector de Verdades (verde claro, escudo con visto bueno) y Voz de Detective (rosa, megáfono).

## Archivos

- `src/components/ilustraciones/`: `sofia.astro`, `mateo.astro`, `conejo.astro`, `tortuga.astro`, `oruga.astro` y las portadas de cada estación.
- `src/components/islas/personajes.tsx`: caras de Sofía y Mateo para las burbujas de diálogo.
- `src/components/islas/insignia.tsx`: las cuatro medallas.
- `src/lib/arte/`: paleta, trazo y capas del estilo pintado. `src/components/ilustraciones/pintura_defs.astro`: degradados, tramas y filtro compartidos (los únicos ids del arte).
- `src/assets/ilustraciones/` y `src/assets/sprites/`: imágenes en crayón de la tapa, el fondo del diploma y los 19 sprites de Sofía, Mateo, el conejo, la tortuga y la oruga, con fondo transparente. Se generan con `scripts/preparar_imagenes.mjs`; los originales están en `gemini_notebook/imagenes_origen/`. Conviven con el arte pintado en código: no lo reemplazan.
