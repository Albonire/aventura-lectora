# Guía de estilo compartida (Gemini Notebook + sitio web)

Esta guía la usan dos lados. Gemini Notebook la recibe pegada dentro de cada prompt de video, infografía y presentación. Claude Code la usa para dibujar las ilustraciones SVG del sitio. Así los videos, las infografías y la página se ven como parte del mismo libro.

No se sube como fuente a los cuadernos.

## Bloque de estilo (versión completa, para infografías y presentaciones)

```
Estilo visual: ilustración de papel recortado tipo libro de cuentos infantil. Capas de papel planas con bordes suaves, sin degradados, sin sombras, sin brillos, sin 3D, sin neón. Fondo color crema #f5f1e4. Bloques de contenido en tarjetas blancas #ffffff con esquinas muy redondeadas. Texto y contornos en tinta #2c2e2a. Colores de acento, usados en ilustraciones, iconos y rellenos: verde #8ed462, azul cielo #2ba0ff, coral #ff705d, amarillo sol #f5e211, arena #e0dbce. Nunca texto de color sobre crema: el texto siempre va en tinta #2c2e2a. Tipografía sans serif geométrica tipo Inter, títulos muy grandes en peso medio, solo mayúscula inicial, nunca palabras completas en mayúsculas. Mucho espacio vacío y pocos elementos por bloque. Iconos simples de trazo redondeado. Público: niños y niñas de 10 años en Colombia. Todo el texto en español con tildes y signos ¿ ¡ correctos, en frases cortas. Sin logos, sin marcas y sin personajes de películas o series.
```

## Bloque de estilo (versión corta, para el estilo personalizado de video)

```
Libro de cuentos en papel recortado: capas planas, bordes suaves, sin degradados ni sombras ni 3D. Fondo crema #f5f1e4, tarjetas blancas muy redondeadas, texto y contornos tinta #2c2e2a. Acentos verde #8ed462, azul #2ba0ff, coral #ff705d, amarillo #f5e211. Letra sans tipo Inter, títulos grandes, solo mayúscula inicial. Personajes: Sofía (niña de 10 años, cola de caballo negra, chaqueta amarilla, lupa de mango verde) y Mateo (niño de 10 años, cabello crespo negro, camiseta verde, gorra azul, libreta). Poco texto por escena, español con tildes.
```

Si el estilo personalizado no está disponible o da malos resultados, usa el estilo predefinido "Paper-craft" (papel recortado) y pega la versión corta en el prompt de enfoque.

## Ficha de personajes

Los mismos personajes aparecen en el sitio, en los videos y en las infografías.

| Personaje | Descripción fija | Dónde aparece |
|---|---|---|
| Sofía | Niña de 10 años, piel morena clara, cabello negro en cola de caballo, chaqueta amarilla sol #f5e211, pantalón azul oscuro, lupa grande con mango verde #8ed462. Curiosa y decidida. | Todo el curso (detective guía) |
| Mateo | Niño de 10 años, piel trigueña, cabello negro crespo, camiseta verde #8ed462, gorra azul cielo #2ba0ff, libreta pequeña y lápiz. Pregunta mucho. | Todo el curso (detective guía) |
| La liebre | Liebre color arena #e0dbce con orejas muy largas y bufanda coral #ff705d. Presumida. | Caso 1 |
| La tortuga | Tortuga verde con caparazón de hexágonos verdes y puntos amarillos. Tranquila y constante. | Caso 1 y caso 5 |
| Rinrín renacuajo | Renacuajo verde con sombrero con cinta y corbata. | Caso 2 |
| La lupa | Símbolo del curso: lupa de aro tinta #2c2e2a y mango verde. | Todo |

## Color por caso (para variar sin salirse del sistema)

| Caso | Acento dominante | Motivo visual |
|---|---|---|
| 1. Leo y comprendo | Verde #8ed462 | Carrera en la colina, árbol grande de meta |
| 2. El sendero de los textos | Azul cielo #2ba0ff | Sendero con tres estaciones: cuento, datos, pasos |
| 3. Pregunto como detective | Amarillo sol #f5e211 | Tres lupas que bajan en profundidad |
| 4. Detectives de noticias | Coral #ff705d | Periódico doblado y celular con mensajes |
| 5. Mi voz cuenta | Verde con amarillo | Torre de bloques de argumento |

## Reglas que Claude Code aplica en el sitio para que haga juego

- Las ilustraciones SVG del sitio siguen esta misma ficha de personajes y el mismo acento por caso.
- Las infografías se muestran dentro de una tarjeta blanca con radio de 50px sobre el fondo crema. Así el borde crema de la imagen se funde con la página.
- Los reproductores de audio y video llevan los tokens del sitio (botón circular verde para reproducir, texto tinta).
- Nada de marcos, sombras ni efectos añadidos alrededor de las piezas generadas.
