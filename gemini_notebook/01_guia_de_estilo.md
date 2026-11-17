# Guía de estilo: personajes e ilustraciones

Ficha fija de los personajes y del estilo visual, tomada de la Guía 2.1 (etapa 2, "Darles vida"). La usan las ilustraciones SVG del sitio y cualquier pieza que el equipo genere con otras herramientas. No se publica en el sitio.

## Estilo

Libro ilustrado infantil en vector plano 2D: formas simples, líneas oscuras bien definidas y colores suaves que no recarguen la vista. Sin degradados, sin sombras difusas, sin 3D, sin neón.

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

## Insignias

Medallas circulares con borde punteado y cinta: Lupa de Bronce (durazno), Lupa de Plata (celeste), Detector de Verdades (verde claro, escudo con visto bueno) y Voz de Detective (rosa, megáfono).

## Archivos

- `src/components/ilustraciones/`: `sofia.astro`, `mateo.astro`, `conejo.astro`, `tortuga.astro`, `oruga.astro` y las portadas de cada estación.
- `src/components/islas/personajes.tsx`: caras de Sofía y Mateo para las burbujas de diálogo.
- `src/components/islas/insignia.tsx`: las cuatro medallas.
