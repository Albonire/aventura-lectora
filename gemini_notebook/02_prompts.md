# Prompts de Gemini Notebook

Cómo usar este archivo:
- Cada bloque de código se copia completo en el cuadro de personalización del formato, que se abre con el lápiz en Studio.
- Los prompts ya traen dentro el bloque de estilo de `01_guia_de_estilo.md`.
- Si un cuadro corta el texto, usa la "versión corta" que va debajo del prompt.
- Nombres de las opciones: la interfaz en español puede traducirlas un poco distinto. Entre paréntesis va el nombre en inglés de la documentación de Google.

Opciones comunes a todos los casos:

| Formato | Opciones |
|---|---|
| Resumen en audio | Formato: Análisis profundo (Deep Dive); en el caso 5, Debate (The Debate). Idioma: Español. Duración: predeterminada. El control de duración solo funciona en inglés; en español la duración se pide en el prompt. |
| Resumen en video | Formato: Explicación (Explainer). Idioma: Español. Estilo visual: Personalizado (Custom), con el texto de "estilo" de cada caso. Si no aparece Personalizado, elige Papel recortado (Paper-craft). |
| Infografía | Idioma: Español. Orientación: Vertical. Nivel de detalle: Estándar. Estilo: descripción personalizada con el prompt del caso. |
| Tarjetas didácticas | Cantidad: Estándar. Dificultad: Fácil. |

Antes de generar, en el panel de fuentes deja marcada solo la fuente del caso (en el caso 2, también el poema).

---

## Caso 1. Leo y comprendo
Cuaderno: "Aventura lectora - Caso 1 Leo y comprendo". Fuente: `caso_1_leo_y_comprendo.md`.

### 1.1 Resumen en audio: "Repaso del caso 1"
Se muestra en el sitio en la sección `practica`, después de la fábula. Archivo: `caso_1_podcast.mp3`.

```
Episodio de repaso para niños y niñas de 10 años de quinto de primaria en Colombia que ya leyeron la fábula "La liebre y la tortuga". Llámenlos "detectives de la lectura". Hablen en español de Colombia, despacio, con palabras sencillas, frases cortas y tono cálido y alegre. Repasen las tres etapas de la lectura: antes (predigo mirando el título y la imagen), durante (hago pausas, me pregunto y hago inferencias con pistas) y después (recuerdo lo importante y opino usando "porque"). Usen solo la fábula, las pistas del detective y las palabras del caso que están en la fuente. Hagan dos pausas en las que digan "pausa el audio y piensa..." seguido de una pregunta. Terminen con el refrán "Más vale paso que dure y no trote que canse" y una pregunta para que el oyente dé su opinión. No usen palabras en inglés, no mencionen "la fuente" ni "el documento" y no inventen datos, personajes ni finales. Duración máxima: 6 minutos.
```

Versión corta:
```
Repaso para niños de 10 años en Colombia que ya leyeron "La liebre y la tortuga". Llámenlos detectives de la lectura. Español sencillo, lento y cálido. Repasen antes (predigo), durante (pausas e inferencias) y después (opino con porque). Dos pausas para pensar. Cierren con el refrán del caso. Sin inglés, sin inventar. Máximo 6 minutos.
```

### 1.2 Resumen en video: "Leo como detective"
Se muestra en `desarrollo`, después de la fábula (revela el final). Subir a YouTube como no listado.

Estilo personalizado:
```
Libro de cuentos en papel recortado: capas planas, bordes suaves, sin degradados ni sombras ni 3D. Fondo crema #f5f1e4, tarjetas blancas muy redondeadas, texto y contornos tinta #2c2e2a. Acento principal verde #8ed462, con azul #2ba0ff, coral #ff705d y amarillo #f5e211. Letra sans tipo Inter, títulos grandes, solo mayúscula inicial. Personajes: Sofía (niña de 10 años, cola de caballo negra, chaqueta amarilla, lupa de mango verde) y Mateo (niño de 10 años, cabello crespo negro, camiseta verde, gorra azul, libreta). Liebre color arena con bufanda coral; tortuga verde con puntos amarillos. Poco texto por escena, español con tildes.
```

Enfoque:
```
Video para niños de 10 años en Colombia titulado "Leo como detective". Sofía y Mateo muestran las tres etapas de la lectura usando la fábula "La liebre y la tortuga": antes de leer (miran el título y la imagen y predicen), durante la lectura (hacen pausas, usan las pistas del detective para inferir) y después de leer (dicen la enseñanza y opinan con "porque"). Cada etapa en su propia escena con un título grande. Narración lenta, frases cortas, español de Colombia. No uses otras historias ni personajes. Duración máxima: 4 minutos.
```

### 1.3 Infografía: "Leo como detective"
Se muestra en `contenidos`. Archivo: `caso_1_infografia.png`.

```
Infografía vertical titulada "Leo como detective", para niños de 10 años.
Estilo visual: ilustración de papel recortado tipo libro de cuentos infantil. Capas de papel planas con bordes suaves, sin degradados, sin sombras, sin brillos, sin 3D, sin neón. Fondo crema #f5f1e4. Bloques en tarjetas blancas #ffffff con esquinas muy redondeadas. Texto y contornos en tinta #2c2e2a. Acento principal verde #8ed462, con azul cielo #2ba0ff, coral #ff705d, amarillo sol #f5e211 y arena #e0dbce. El texto siempre en tinta #2c2e2a, nunca de color. Tipografía sans serif geométrica tipo Inter, títulos muy grandes en peso medio, solo mayúscula inicial. Mucho espacio vacío. Sin logos ni personajes de películas.
Composición: arriba, la liebre (color arena, bufanda coral) y la tortuga (verde con puntos amarillos) en la línea de salida, con un árbol grande en lo alto de una colina. Debajo, tres tarjetas blancas en orden vertical, unidas por un camino punteado verde, cada una con una lupa de mango verde:
1. "Antes de leer: predigo". Miro el título y la imagen. Me pregunto de qué se trata.
2. "Durante: hago pausas". Me pregunto qué pasa. Descubro palabras por el contexto. Busco pistas.
3. "Después: opino". Recuerdo lo importante. Busco la enseñanza. Digo qué pienso y por qué.
Al pie, en letra pequeña: "Aventura lectora, caso 1".
Máximo 14 palabras por tarjeta. Español de Colombia con tildes correctas.
```

### 1.4 Tarjetas didácticas
Se copian a `unidad_1.json`, clave `tarjetas`.

```
Tarjetas para niños de 10 años en Colombia. En el frente, una pregunta o una palabra de máximo 10 palabras. En el reverso, una respuesta de máximo 20 palabras que use un ejemplo de "La liebre y la tortuga". Temas: qué hago antes, durante y después de leer; qué es una predicción; qué es una inferencia; las palabras meta, apuesta, siesta, constancia y orgullo; la comparación "salir disparada como una flecha"; el significado del refrán del caso. Español sencillo.
```

---

## Caso 2. El sendero de los textos
Cuaderno: "Aventura lectora - Caso 2 El sendero de los textos". Fuentes: `caso_2_sendero_de_los_textos.md` y el poema "El renacuajo paseador" (texto copiado de Cervantes Virtual).

### 2.1 Resumen en audio: "Repaso del caso 2"
Archivo: `caso_2_podcast.mp3`.

```
Episodio de repaso para niños y niñas de 10 años de quinto de primaria en Colombia. Llámenlos "detectives de la lectura". Español de Colombia, despacio, palabras sencillas, frases cortas, tono cálido. Expliquen que cada texto tiene una misión: el narrativo cuenta una historia (inicio, nudo y desenlace), el informativo da datos reales que se pueden comprobar y el instructivo enseña a hacer algo con pasos en orden. Usen como ejemplos "El renacuajo paseador" de Rafael Pombo, el texto "¿Quién fue Rafael Pombo?" y el instructivo del separador. Jueguen tres veces a "¿cuenta, informa o enseña?": lean una frase corta y digan "pausa el audio y adivina qué tipo de texto es" antes de dar la respuesta. No usen palabras en inglés, no mencionen "la fuente" ni inventen datos sobre Pombo. Duración máxima: 6 minutos.
```

Versión corta:
```
Repaso para niños de 10 años en Colombia. Detectives de la lectura. Español sencillo y lento. Narrativo cuenta (inicio, nudo, desenlace), informativo da datos reales, instructivo enseña con pasos en orden. Ejemplos: Renacuajo paseador, biografía de Pombo, separador. Tres rondas de "¿cuenta, informa o enseña?" con pausa. Sin inglés. Máximo 6 minutos.
```

### 2.2 Resumen en video: "Tres textos, tres misiones"
Se muestra en `desarrollo`, antes del sendero.

Estilo personalizado:
```
Libro de cuentos en papel recortado: capas planas, bordes suaves, sin degradados ni sombras ni 3D. Fondo crema #f5f1e4, tarjetas blancas muy redondeadas, texto y contornos tinta #2c2e2a. Acento principal azul cielo #2ba0ff, con verde #8ed462, coral #ff705d y amarillo #f5e211. Letra sans tipo Inter, títulos grandes, solo mayúscula inicial. Personajes: Sofía (niña de 10 años, cola de caballo negra, chaqueta amarilla, lupa de mango verde), Mateo (niño de 10 años, cabello crespo negro, camiseta verde, gorra azul, libreta) y Rinrín renacuajo (verde, sombrero con cinta y corbata). Poco texto por escena, español con tildes.
```

Enfoque:
```
Video para niños de 10 años en Colombia titulado "Tres textos, tres misiones". Sofía y Mateo encuentran una caja con tres hojas y recorren un sendero azul con tres estaciones. Estación del texto narrativo: cuenta una historia; inicio, nudo y desenlace con "El renacuajo paseador". Estación del texto informativo: da datos reales; título, entrada, desarrollo y cierre con la biografía de Rafael Pombo. Estación del texto instructivo: enseña a hacer algo; materiales y pasos en orden con el separador de Rinrín. Cierre: "Pregúntate si el texto te cuenta, te informa o te enseña a hacer algo". Narración lenta, español de Colombia. Duración máxima: 4 minutos.
```

### 2.3 Infografía: "El sendero de los textos"
Archivo: `caso_2_infografia.png`.

```
Infografía vertical titulada "El sendero de los textos", para niños de 10 años.
Estilo visual: ilustración de papel recortado tipo libro de cuentos infantil. Capas de papel planas con bordes suaves, sin degradados, sin sombras, sin brillos, sin 3D, sin neón. Fondo crema #f5f1e4. Bloques en tarjetas blancas #ffffff con esquinas muy redondeadas. Texto y contornos en tinta #2c2e2a. Acento principal azul cielo #2ba0ff, con verde #8ed462, coral #ff705d, amarillo sol #f5e211 y arena #e0dbce. El texto siempre en tinta #2c2e2a, nunca de color. Tipografía sans serif geométrica tipo Inter, títulos muy grandes en peso medio, solo mayúscula inicial. Mucho espacio vacío. Sin logos ni personajes de películas.
Composición: un sendero azul que baja en zigzag con tres estaciones, cada una en una tarjeta blanca con un icono grande:
1. Libro abierto con Rinrín renacuajo: "Texto narrativo: cuenta una historia". Partes: inicio, nudo, desenlace. Pista: "Había una vez...".
2. Hoja con fecha y datos: "Texto informativo: da datos reales". Partes: título, entrada, desarrollo, cierre. Pista: fechas, lugares y nombres reales.
3. Lista numerada con tijeras: "Texto instructivo: enseña a hacer algo". Partes: materiales y pasos en orden. Pista: números y verbos como corta, pega, dobla.
Al final del sendero, Sofía con su lupa pregunta: "¿Me cuenta, me informa o me enseña?".
Al pie, en letra pequeña: "Aventura lectora, caso 2".
Máximo 14 palabras por tarjeta. Español de Colombia con tildes correctas.
```

### 2.4 Tarjetas didácticas

```
Tarjetas para niños de 10 años en Colombia. En el frente, una frase corta de un texto o una pregunta de máximo 10 palabras. En el reverso, la respuesta en máximo 20 palabras. La mitad de las tarjetas muestra una frase y pregunta "¿es narrativo, informativo o instructivo?". La otra mitad pregunta por las partes de cada tipo de texto: inicio, nudo y desenlace; título y entrada; materiales y pasos. Usa ejemplos de "El renacuajo paseador", la biografía de Rafael Pombo y el separador. Español sencillo.
```

---

## Caso 3. Pregunto como detective
Cuaderno: "Aventura lectora - Caso 3 Pregunto como detective". Fuente: `caso_3_pregunto_como_detective.md`.

### 3.1 Resumen en audio: "Repaso del caso 3"
Archivo: `caso_3_podcast.mp3`.

```
Episodio de repaso para niños y niñas de 10 años de quinto de primaria en Colombia. Llámenlos "detectives de la lectura". Español de Colombia, despacio, palabras sencillas, frases cortas, tono cálido. Expliquen las tres lupas para leer: lupa 1, lo que dice el texto (la respuesta está escrita); lupa 2, lo que el texto sugiere (pistas más lo que ya sé); lupa 3, lo que yo pienso (mi opinión con razones). Usen solo el cuento "Los libros viajeros de la vereda". Hagan tres rondas en las que lean una pregunta sobre el cuento, digan "pausa el audio y decide con qué lupa se responde" y luego expliquen la respuesta. Terminen invitando al oyente a inventar una pregunta de cada lupa. No usen palabras en inglés, no mencionen "la fuente" y no cambien el cuento. Duración máxima: 6 minutos.
```

Versión corta:
```
Repaso para niños de 10 años en Colombia. Detectives de la lectura. Español sencillo y lento. Tres lupas: lo que dice, lo que sugiere, lo que pienso. Solo el cuento "Los libros viajeros de la vereda". Tres rondas de "¿con qué lupa se responde?" con pausa. Cierren invitando a inventar preguntas. Sin inglés. Máximo 6 minutos.
```

### 3.2 Resumen en video: "Las tres lupas"

Estilo personalizado:
```
Libro de cuentos en papel recortado: capas planas, bordes suaves, sin degradados ni sombras ni 3D. Fondo crema #f5f1e4, tarjetas blancas muy redondeadas, texto y contornos tinta #2c2e2a. Acento principal amarillo sol #f5e211, con verde #8ed462, azul #2ba0ff y coral #ff705d. Letra sans tipo Inter, títulos grandes, solo mayúscula inicial. Personajes: Sofía (niña de 10 años, cola de caballo negra, chaqueta amarilla, lupa de mango verde) y Mateo (niño de 10 años, cabello crespo negro, camiseta verde, gorra azul, libreta). Escuela rural colombiana con un estante de libros y un cuaderno de tapas rojas. Poco texto por escena, español con tildes.
```

Enfoque:
```
Video para niños de 10 años en Colombia titulado "Las tres lupas". Sofía y Mateo leen "Los libros viajeros de la vereda" y usan tres lupas, cada una más profunda que la anterior: lupa 1, lo que dice el texto, con preguntas de quién, qué, dónde, cuándo y cuántos; lupa 2, lo que el texto sugiere, uniendo pistas con lo que ya sé; lupa 3, lo que yo pienso, dando mi opinión con razones. Para cada lupa, un ejemplo de pregunta sobre el cuento y su respuesta. Cierre: cómo inventar mis propias preguntas. Narración lenta, español de Colombia. Duración máxima: 4 minutos.
```

### 3.3 Infografía: "Las tres lupas"
Reemplaza la infografía de Canva que estaba prevista. Archivo: `caso_3_infografia.png`.

```
Infografía vertical titulada "Las tres lupas", para niños de 10 años.
Estilo visual: ilustración de papel recortado tipo libro de cuentos infantil. Capas de papel planas con bordes suaves, sin degradados, sin sombras, sin brillos, sin 3D, sin neón. Fondo crema #f5f1e4. Bloques en tarjetas blancas #ffffff con esquinas muy redondeadas. Texto y contornos en tinta #2c2e2a. Acento principal amarillo sol #f5e211, con verde #8ed462, azul cielo #2ba0ff, coral #ff705d y arena #e0dbce. El texto siempre en tinta #2c2e2a, nunca de color. Tipografía sans serif geométrica tipo Inter, títulos muy grandes en peso medio, solo mayúscula inicial. Mucho espacio vacío. Sin logos ni personajes de películas.
Composición: tres lupas grandes en fila vertical que bajan como capas de papel, cada una más profunda y con más relleno amarillo que la anterior. Junto a cada lupa, una tarjeta blanca:
1. "Lupa 1: lo que dice el texto". La respuesta está escrita. Pregunto quién, qué, dónde, cuándo. Ejemplo: ¿Cuántos libros tenía el estante?
2. "Lupa 2: lo que el texto sugiere". Uno pistas con lo que ya sé. Ejemplo: ¿Por qué le temblaban las manos a Julián?
3. "Lupa 3: lo que yo pienso". Doy mi opinión con razones. Ejemplo: ¿Prestarías un libro de tu casa? ¿Por qué?
Arriba, pequeño, un cuaderno de tapas rojas sobre un estante de escuela rural.
Al pie, en letra pequeña: "Aventura lectora, caso 3".
Máximo 18 palabras por tarjeta. Español de Colombia con tildes y signos ¿ correctos.
```

### 3.4 Tarjetas didácticas

```
Tarjetas para niños de 10 años en Colombia. En el frente, una pregunta sobre el cuento "Los libros viajeros de la vereda" de máximo 14 palabras. En el reverso, el nivel de la pregunta (lupa 1 literal, lupa 2 inferencial o lupa 3 crítica) y una explicación de máximo 20 palabras de por qué pertenece a ese nivel. Incluye preguntas de los tres niveles en cantidades parecidas. Español sencillo.
```

---

## Caso 4. Detectives de noticias
Cuaderno: "Aventura lectora - Caso 4 Detectives de noticias". Fuente: `caso_4_detectives_de_noticias.md`.

### 4.1 Resumen en audio: "Repaso del caso 4"
Archivo: `caso_4_podcast.mp3`.

```
Episodio de repaso para niños y niñas de 10 años de quinto de primaria en Colombia. Llámenlos "detectives de noticias". Español de Colombia, despacio, palabras sencillas, frases cortas, tono cálido y tranquilo, sin asustar. Expliquen la diferencia entre un hecho (se puede comprobar) y una opinión (lo que alguien piensa), con las palabras pista de opinión. Jueguen tres rondas de "¿hecho u opinión?" con frases de la fuente y una pausa antes de cada respuesta. Luego expliquen las seis preguntas de la noticia con la noticia inventada de la biblioteca en el patio, aclarando que es inventada para practicar. Terminen con la lista LUPA y la regla de oro: si tengo dudas, no lo comparto y le pregunto a un adulto. No hablen de noticias reales, no usen palabras en inglés y no mencionen "la fuente". Duración máxima: 7 minutos.
```

Versión corta:
```
Repaso para niños de 10 años en Colombia. Detectives de noticias. Español sencillo, lento y tranquilo. Hecho vs. opinión con tres rondas y pausa. Las seis preguntas con la noticia inventada de la biblioteca. Lista LUPA y regla de oro. Sin noticias reales, sin inglés. Máximo 7 minutos.
```

### 4.2 Resumen en video: "¿Puedo confiar en esta noticia?"

Estilo personalizado:
```
Libro de cuentos en papel recortado: capas planas, bordes suaves, sin degradados ni sombras ni 3D. Fondo crema #f5f1e4, tarjetas blancas muy redondeadas, texto y contornos tinta #2c2e2a. Acento principal coral #ff705d, con verde #8ed462, azul #2ba0ff y amarillo #f5e211. Letra sans tipo Inter, títulos grandes, solo mayúscula inicial. Personajes: Sofía (niña de 10 años, cola de caballo negra, chaqueta amarilla, lupa de mango verde) y Mateo (niño de 10 años, cabello crespo negro, camiseta verde, gorra azul, libreta). Periódico de papel doblado y un celular con mensajes. Poco texto por escena, español con tildes.
```

Enfoque:
```
Video para niños de 10 años en Colombia titulado "¿Puedo confiar en esta noticia?". A Mateo le llega al celular el mensaje "¡URGENTE! Comer helado todos los días te hace crecer 10 centímetros". Sofía le enseña a separar hechos de opiniones y a revisar el mensaje con la lista LUPA, una escena por letra: L, ¿leo quién lo escribió?; U, ¿ubico la fecha?; P, ¿pregunto a otras fuentes?; A, ¿analizo si quiere asustarme o emocionarme? Cierre con la regla de oro: si tengo dudas, no lo comparto y le pregunto a un adulto. Todos los titulares son inventados para practicar. Tono tranquilo. Narración lenta, español de Colombia. Duración máxima: 4 minutos.
```

### 4.3 Infografía: "La lista LUPA"
Reemplaza la infografía de Canva que estaba prevista. Archivo: `caso_4_infografia.png`.

```
Infografía vertical titulada "La lista LUPA: ¿confío en esta noticia?", para niños de 10 años.
Estilo visual: ilustración de papel recortado tipo libro de cuentos infantil. Capas de papel planas con bordes suaves, sin degradados, sin sombras, sin brillos, sin 3D, sin neón. Fondo crema #f5f1e4. Bloques en tarjetas blancas #ffffff con esquinas muy redondeadas. Texto y contornos en tinta #2c2e2a. Acento principal coral #ff705d, con verde #8ed462, azul cielo #2ba0ff, amarillo sol #f5e211 y arena #e0dbce. El texto siempre en tinta #2c2e2a, nunca de color. Tipografía sans serif geométrica tipo Inter, títulos muy grandes en peso medio, solo mayúscula inicial salvo las cuatro letras L, U, P y A. Mucho espacio vacío. Sin logos, sin marcas de redes sociales y sin personajes de películas.
Composición: arriba, Sofía con su lupa sobre un periódico doblado y un celular. Debajo, cuatro tarjetas blancas, cada una con una letra grande en un círculo coral:
L: ¿Leo quién lo escribió? Busco el autor o el medio.
U: ¿Ubico la fecha? Una noticia vieja puede parecer nueva.
P: ¿Pregunto a otras fuentes? Si es verdad, otros medios serios lo dicen.
A: ¿Analizo si quiere asustarme o emocionarme? "Urgente" y "compártelo ya" son alertas.
Abajo, una franja amarilla con la regla de oro: "Si tengo dudas, no lo comparto y le pregunto a un adulto".
Al pie, en letra pequeña: "Aventura lectora, caso 4".
Máximo 16 palabras por tarjeta. Español de Colombia con tildes y signos ¿ correctos.
```

### 4.4 Tarjetas didácticas

```
Tarjetas para niños de 10 años en Colombia. En el frente, una frase corta de máximo 12 palabras y la pregunta "¿hecho u opinión?". En el reverso, la respuesta y una explicación de máximo 20 palabras: si se puede comprobar o qué palabra pista muestra la opinión. Agrega cuatro tarjetas sobre la lista LUPA, una por letra. Usa solo frases y titulares inventados para practicar, nunca noticias reales. Español sencillo.
```

---

## Caso 5. Mi voz cuenta
Cuaderno: "Aventura lectora - Caso 5 Mi voz cuenta". Fuente: `caso_5_mi_voz_cuenta.md`.

### 5.1 Resumen en audio: "El gran debate: ¿velocidad o constancia?"
Formato: Debate (The Debate). Se muestra en `desarrollo`, antes del muro de Padlet. Archivo: `caso_5_podcast.mp3`.

```
Debate amistoso para niños y niñas de 10 años de quinto de primaria en Colombia. Pregunta: para llegar a una meta, ¿qué es más importante, la velocidad o la constancia? Un presentador defiende la constancia y el otro la velocidad, con los argumentos y ejemplos de la fuente, incluida la fábula de la liebre y la tortuga. Hablen en español de Colombia, despacio, con palabras sencillas y tono alegre. Usen en voz alta los conectores "porque", "por ejemplo", "además", "sin embargo" y "en conclusión", y hagan una pausa corta cada vez que usen uno. Muestren cómo se responde con respeto: "Entiendo tu idea, pero yo pienso que... porque...". Nadie gana ni se burla: al final reconocen lo bueno de la otra idea, llegan a una conclusión y le piden al oyente que escriba su propia opinión con dos razones y un ejemplo. No usen palabras en inglés ni mencionen "la fuente". Duración máxima: 6 minutos.
```

Versión corta:
```
Debate amistoso para niños de 10 años en Colombia: ¿velocidad o constancia para llegar a una meta? Un presentador por lado, con argumentos y ejemplos de la fuente. Español sencillo y alegre. Usen porque, por ejemplo, además, sin embargo, en conclusión. Respeto, sin burlas ni ganador. Cierren pidiendo al oyente su opinión con dos razones. Máximo 6 minutos.
```

### 5.2 Resumen en video: "Construye tu opinión como una torre"

Estilo personalizado:
```
Libro de cuentos en papel recortado: capas planas, bordes suaves, sin degradados ni sombras ni 3D. Fondo crema #f5f1e4, tarjetas blancas muy redondeadas, texto y contornos tinta #2c2e2a. Acentos verde #8ed462 y amarillo sol #f5e211, con azul #2ba0ff y coral #ff705d. Letra sans tipo Inter, títulos grandes, solo mayúscula inicial. Personajes: Sofía (niña de 10 años, cola de caballo negra, chaqueta amarilla, lupa de mango verde) y Mateo (niño de 10 años, cabello crespo negro, camiseta verde, gorra azul, libreta). Una torre de bloques de papel de colores. Poco texto por escena, español con tildes.
```

Enfoque:
```
Video para niños de 10 años en Colombia titulado "Construye tu opinión como una torre". Sofía y Mateo arman, bloque por bloque, una torre que responde "¿velocidad o constancia?": base, mi opinión ("Yo pienso que..."); segundo bloque, una razón ("porque..."); tercero, un ejemplo ("Por ejemplo,..."); cuarto, otra razón ("Además,..."); quinto, una idea contraria ("Sin embargo,..."); arriba, la conclusión ("En conclusión,..."). Cada bloque es una escena con su conector escrito en grande. Cierre: una opinión con razones es fuerte, y escuchar al otro con respeto también es parte de opinar. Narración lenta, español de Colombia. Duración máxima: 4 minutos.
```

### 5.3 Infografía: "La torre del argumento"
Archivo: `caso_5_infografia.png`.

```
Infografía vertical titulada "La torre del argumento", para niños de 10 años.
Estilo visual: ilustración de papel recortado tipo libro de cuentos infantil. Capas de papel planas con bordes suaves, sin degradados, sin sombras, sin brillos, sin 3D, sin neón. Fondo crema #f5f1e4. Bloques en tarjetas blancas #ffffff con esquinas muy redondeadas. Texto y contornos en tinta #2c2e2a. Acentos verde #8ed462 y amarillo sol #f5e211, con azul cielo #2ba0ff, coral #ff705d y arena #e0dbce. El texto siempre en tinta #2c2e2a, nunca de color. Tipografía sans serif geométrica tipo Inter, títulos muy grandes en peso medio, solo mayúscula inicial. Mucho espacio vacío. Sin logos ni personajes de películas.
Composición: una torre de seis bloques de papel apilados, de abajo hacia arriba, cada bloque con su conector en grande y una frase de ejemplo corta:
1 (base, el más ancho): "Mi opinión: Yo pienso que la constancia es más importante".
2: "Razón: porque quien no se rinde termina llegando".
3: "Ejemplo: Por ejemplo, la tortuga ganó sin detenerse".
4: "Otra razón: Además, la velocidad falla si uno se confía".
5: "Idea contraria: Sin embargo, la velocidad ayuda en una emergencia".
6 (arriba): "Conclusión: En conclusión, vale más no rendirse".
Junto a la torre, Mateo pone el último bloque y Sofía la sostiene con su lupa. La tortuga mira desde abajo.
Al pie, en letra pequeña: "Aventura lectora, caso 5".
Máximo 12 palabras por bloque. Español de Colombia con tildes correctas.
```

### 5.4 Tarjetas didácticas

```
Tarjetas para niños de 10 años en Colombia. En el frente, un conector (porque, por ejemplo, además, sin embargo, en conclusión) o una pregunta corta sobre cómo argumentar. En el reverso, para qué sirve en máximo 15 palabras y una oración de ejemplo sobre la liebre y la tortuga. Agrega tres tarjetas sobre cómo responder con respeto a quien piensa distinto. Español sencillo.
```

---

## Cuaderno de docentes
Cuaderno: "Aventura lectora - Docentes". Fuentes: `docentes_propuesta_didactica.md`, `CONTENIDO.md`, `RECURSOS.md`, `Guia.pdf` (guía del módulo), la ficha `.docx`, el PDF de los DBA y la página de Estándares.

### D.1 Presentación: socialización del diseño didáctico
Opciones: Formato "Diapositivas para presentador" (Presenter slides), porque ustedes hablan sobre ellas. Idioma: Español. Longitud: predeterminada. Descarga: PDF (para el sitio) y PPTX (para ajustar). Archivo: `socializacion.pdf`.

```
Presentación para socializar la propuesta didáctica "Aventura lectora" ante la docente y los compañeros del Seminario de Profundización I: Innovación Didáctica (criterio 4 de la rúbrica de Guia.pdf). De 12 a 14 diapositivas en este orden: 1 portada; 2 necesidad y público; 3 competencias y referentes (Estándares y DBA de 5.º); 4 metáfora de los detectives y metodología en cuatro momentos; 5 ruta de aprendizaje de los cinco casos; 6 a 10 una diapositiva por caso con su aprendizaje, su lectura, su actividad principal y su reto; 11 recursos y proporción 50/50 entre propios y web; 12 herramientas web 2.0 y de inteligencia artificial usadas; 13 evaluación y rúbricas; 14 diseño instruccional ADDIE y enlace al sitio. Máximo 25 palabras por diapositiva: el detalle va en las notas del presentador.
Estilo visual: ilustración de papel recortado tipo libro de cuentos. Fondo crema #f5f1e4, tarjetas blancas #ffffff con esquinas muy redondeadas, texto en tinta #2c2e2a, acentos verde #8ed462, azul cielo #2ba0ff, coral #ff705d y amarillo sol #f5e211, sin degradados ni sombras. Tipografía sans serif tipo Inter, títulos muy grandes, solo mayúscula inicial. Personajes: Sofía (niña de 10 años, chaqueta amarilla, lupa de mango verde) y Mateo (niño de 10 años, camiseta verde, gorra azul). Cada diapositiva de caso usa el acento de su caso: 1 verde, 2 azul, 3 amarillo, 4 coral, 5 verde y amarillo. Español de Colombia con tildes.
```

### D.2 Informes: guía para familias
Opciones: Crear el tuyo (formato personalizado). Idioma: Español. Se copia a `src/content/docentes/guia_familias.md`.

```
Escribe una guía para familias y acudientes de niños de quinto de primaria que harán el curso virtual "Aventura lectora". Lenguaje sencillo y cálido, sin tecnicismos pedagógicos, en español de Colombia, máximo 700 palabras. Estructura: qué es el curso y cómo funciona en el sitio web; cómo acompañar sin hacer la tarea por el niño; una sección por cada uno de los cinco casos con qué aprende y una idea para conversar en casa; cómo se evalúa; y privacidad (el sitio no pide registro ni guarda datos). Usa solo información de las fuentes.
```

### D.3 Mapa mental
Selecciona solo `docentes_propuesta_didactica.md` y genera el mapa mental. Si tu versión permite escribir instrucciones, usa:

```
Mapa mental del curso "Aventura lectora": nodo central con el nombre del curso; ramas para competencias, metodología en cuatro momentos, los cinco casos con su tema, recursos, evaluación y ADDIE. Etiquetas cortas, en español.
```

Descárgalo como imagen, o haz una captura si tu versión no ofrece descarga. Archivo: `mapa_mental.png`. El mapa mental no permite elegir colores; en `/docentes` se muestra dentro de una tarjeta blanca para que no desentone.

---

## Resumen de archivos

| Caso | Audio | Video | Infografía | Tarjetas |
|---|---|---|---|---|
| 1 | caso_1_podcast.mp3 | YouTube, id en multimedia.json | caso_1_infografia.png | unidad_1.json |
| 2 | caso_2_podcast.mp3 | YouTube | caso_2_infografia.png | unidad_2.json |
| 3 | caso_3_podcast.mp3 | YouTube | caso_3_infografia.png | unidad_3.json |
| 4 | caso_4_podcast.mp3 | YouTube | caso_4_infografia.png | unidad_4.json |
| 5 | caso_5_podcast.mp3 (debate) | YouTube | caso_5_infografia.png | unidad_5.json |
| Docentes | | | socializacion.pdf, mapa_mental.png | guia_familias.md |

Formato para copiar las tarjetas al JSON:
```json
"tarjetas": [
  { "frente": "¿Qué es una inferencia?", "reverso": "Descubrir lo que el texto no dice, uniendo pistas con lo que ya sé." }
]
```
