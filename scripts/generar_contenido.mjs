// writes CONTENIDO.md from the data files, so the document and the site always say the same
import { readFileSync, writeFileSync } from 'node:fs';
import process from 'node:process';
const raiz = process.argv[2] ?? '.';
const json = (r) => JSON.parse(readFileSync(`${raiz}/${r}`, 'utf8'));
const a1 = json('src/data/actividades/unidad_1.json');
const a2 = json('src/data/actividades/unidad_2.json');
const a3 = json('src/data/actividades/unidad_3.json');
const a4 = json('src/data/actividades/unidad_4.json');
const ag = json('src/data/agencia.json');
const front = (n) => {
  const t = readFileSync(`${raiz}/src/content/unidades/unidad_${n}.mdx`, 'utf8');
  const campo = (k) => (t.match(new RegExp(`^${k}: "(.*)"$`, 'm')) ?? [])[1]?.replace(/\\"/g, '"') ?? '';
  return { mision: campo('mision'), introduccion: campo('introduccion'), guia: campo('guia'), familias: campo('para_familias'), duracion: campo('duracion') };
};
const palabras = (t) => t.trim().split(/\s+/).filter(Boolean).length;
const L = [];
const p = (...x) => L.push(...x, '');
const quiz = (preguntas) => {
  for (const q of preguntas) {
    L.push(`- **${q.pregunta}** (${q.nivel})`);
    for (const o of q.opciones) L.push(`  - ${o.id === q.correcta ? '[correcta] ' : ''}${o.texto}`);
    q.pistas.forEach((x, i) => L.push(`  - Pista ${i + 1} de Sofía: ${x}`));
    L.push(`  - Al acertar: ${q.retro}`);
  }
  L.push('');
};
const clasificar = (c) => {
  L.push(`Consigna: ${c.instruccion}`, '', '| Tarjeta | Caja correcta | Pista de Sofía si queda mal ubicada |', '|---|---|---|');
  for (const i of c.items) L.push(`| ${i.texto} | ${c.cajas.find((x) => x.id === i.caja).titulo} | ${i.pista} |`);
  L.push('');
};
const lectura = (t) => {
  const n = t.parrafos.reduce((s, x) => s + palabras(x.texto), 0) + (t.moraleja ? palabras(t.moraleja) : 0);
  p(`**${t.titulo}** (${n} palabras). ${t.autoria}.`);
  t.parrafos.forEach((x, i) => {
    p(`${i + 1}. ${x.texto}`);
    if (x.pausa) p(`   > Parada${x.pausa.estrategia ? ` (${x.pausa.estrategia})` : ''}: ${x.pausa.texto}`);
  });
  if (t.moraleja) p(`Moraleja: ${t.moraleja}`);
};

p('# CONTENIDO: Aventura lectora (prototipo 2.2)');
p('Fuente de verdad del texto que ven los estudiantes. Sale de la Guía 2.1 (narrativa, personajes y mapa de misiones) y de los ajustes de la Actividad 2.2. Cada bloque dice en qué archivo de datos vive; si se cambia un texto, se cambia en los dos lados.');
p('Reglas: lecturas de 150 a 250 palabras (la fábula, máximo 200), frases cortas, tuteo, sin raya larga. Los diálogos van entre comillas. Cada pregunta trae al menos dos pistas de Sofía que dicen qué párrafo, línea o frase volver a leer.');
p('Vocabulario: palabras que un niño de 10 años usa todos los días. Club de Detectives Lectores (no agencia), parte o misión (no estación), medalla y álbum (no insignia y pasaporte), diploma (no certificado), torre de ideas y lo que pienso (no argumentos ni postura), dato real y chisme (no hecho comprobable ni rumor), revisar (no verificar), historia (no relato). El villano se llama el Borracuentos.');
p('Los textos de lectura (fábula, receta, relato y mensajes) fueron escritos para este prototipo. Las profesoras deben validarlos con el grupo y pueden reemplazarlos por textos recogidos en las veredas.');

p('## 00. Inicio: Entra al club de detectives', 'Archivo: `src/data/agencia.json`. Página: `/agencia`.');
p('### El misterio de los cuentos que se borran');
ag.relato.forEach((x) => p(x));
p('### Los guías');
ag.personajes.forEach((x) => p(`- **${x.nombre}, ${x.apodo}.** ${x.texto} ${x.compania}`));
p('### Pista de prueba (1 minuto, con ayuda de Sofía)');
p(ag.prueba.nota, `Pregunta: ${ag.prueba.pregunta}`);
ag.prueba.opciones.forEach((o) => L.push(`- ${o.id === ag.prueba.correcta ? '[correcta] ' : ''}${o.texto}`));
p('', `Pista de Sofía: ${ag.prueba.pista}`, `Al acertar: ${ag.prueba.acierto}`);
p('### Tarjeta de detective', 'El estudiante elige "Trabajo solo o sola" o "Trabajo en pareja de detectives", escribe el nombre o los dos nombres y pulsa "Hacer mi tarjeta". Aparece la tarjeta con el álbum de cuatro medallas.');

const estaciones = [
  [1, '## 01. Misión 1: Leo con calma (nivel literal)', 'Recompensa: medalla Lupa de Bronce.'],
  [2, '## 02. Misión 2: Pistas y "Cuéntame, abuelo" (nivel inferencial)', 'Recompensa: medalla Lupa de Plata.'],
  [3, '## 03. Misión 3: ¿Verdad o chisme? (nivel crítico)', 'Recompensa: medalla Detector de Verdades.'],
  [4, '## 04. Reto final: Mi voz cuenta en Maripí (producción argumentativa)', 'Recompensa: medalla Voz de Detective.'],
];
for (const [n, titulo, premio] of estaciones) {
  const f = front(n);
  p(titulo, `Archivos: \`src/content/unidades/unidad_${n}.mdx\` y \`src/data/actividades/unidad_${n}.json\`. Páginas: \`/unidad/${n}\`, \`/pistas\`, \`/lupa\`, \`/cerrar\`. ${premio}`);
  p(`Guía: ${f.guia}. Duración: ${f.duracion}.`, `Misión: ${f.mision}`, `Introducción: ${f.introduccion}`, `Para conversar en casa: ${f.familias}`);
  if (n === 1) {
    p('### Paso 1. Abrir el caso (imagino)', `${a1.prediccion.pregunta} Opciones: ${a1.prediccion.opciones.map((o) => o.texto).join('; ')}. Respuesta: ${a1.prediccion.respuesta}`);
    p('### Paso 2. Seguir las pistas (pregunto)');
    lectura(a1.fabula);
    p(`**${a1.receta.titulo}**. ${a1.receta.autoria}.`, a1.receta.entrada, `Ingredientes: ${a1.receta.ingredientes.join('; ')}.`);
    a1.receta.pasos.forEach((x, i) => L.push(`${i + 1}. ${x.texto}`));
    p('');
    p('### Paso 3. Entrenar la lupa', '**Inicio, nudo y desenlace**');
    clasificar(a1.partes);
    p('**Ordena la receta**', `Pista de Sofía: ${a1.receta.pista_orden}`, `Al acertar: ${a1.receta.acierto_orden}`);
    p('### Paso 4. Cerrar el caso (opino)', '**La idea principal y los detalles**');
    quiz(a1.quiz);
    p(a1.opino.texto);
  }
  if (n === 2) {
    p('### Paso 1. Abrir el caso', `Frase: ${a2.ejemplo.frase}`, `${a2.ejemplo.pregunta} Opciones: ${a2.ejemplo.opciones.map((o) => (o.id === a2.ejemplo.correcta ? '[correcta] ' : '') + o.texto).join('; ')}.`, `Pista de Sofía: ${a2.ejemplo.pista}`, `Al acertar: ${a2.ejemplo.acierto}`);
    p('### Paso 2. Seguir las pistas');
    lectura(a2.relato);
    p('### Paso 3. Entrenar la lupa', '**Lo que el relato sugiere**');
    quiz(a2.quiz);
    p('### Paso 4. Cerrar el caso: reto familiar "Cuéntame, abuelo"', a2.abuelo.instruccion);
    a2.abuelo.campos.forEach((c) => L.push(`- ${c.etiqueta} (${c.ayuda})`));
    p('', 'Modalidad dual: los tres campos en pantalla o la ficha de papel "Libreta de campo de Mateo" (`/libreta`, media carta) para los 4 hogares sin datos móviles. La ficha se llena en casa y se registra al día siguiente en el salón.');
  }
  if (n === 3) {
    p('### Paso 1. Abrir el caso', `${a3.inicio.pregunta} Opciones: ${a3.inicio.opciones.map((o) => o.texto).join('; ')}. Respuesta: ${a3.inicio.respuesta}`);
    p('### Paso 2. Seguir las pistas (comparo)', `Marca visible: ${a3.marca}.`);
    a3.mensajes.forEach((m) => { p(`**${m.nombre}** (${m.remitente})`); m.lineas.forEach((l, i) => L.push(`${i + 1}. ${l}`)); p(''); });
    p('**El Detector de Verdades**');
    a3.detector.forEach((d, i) => L.push(`${i + 1}. ${d.pregunta} ${d.detalle}`));
    p('', `${a3.comparo.pregunta} Correcta: el mensaje 1. Pista de Sofía: ${a3.comparo.pista}`);
    p('### Paso 3. Entrenar la lupa (reviso)', '**Dato real u opinión o chisme**');
    clasificar(a3.clasificar);
    p('### Paso 4. Cerrar el caso (explico)', '**¿Lo comparto o no?**');
    quiz(a3.quiz);
    p(a3.argumento.texto);
  }
  if (n === 4) {
    p('### Paso 1. Abrir el caso', 'Situaciones para opinar:');
    a4.situaciones.forEach((s) => L.push(`- ${s.texto}`));
    p('', '### Paso 2. Seguir las pistas', `**${a4.modelo.titulo}**. ${a4.modelo.situacion}`);
    [...a4.modelo.pisos].reverse().forEach((x) => L.push(`- ${x.nombre}: ${x.frases.join(' ')}`));
    p('', '### Paso 3. Entrenar la lupa');
    clasificar(a4.practica);
    p('### Paso 4. Cerrar el caso: constructor de la torre de ideas', 'Sin área de texto vacía: cada piso tiene frases iniciadoras para elegir, una línea corta para terminar la frase y un ejemplo.');
    L.push('| Piso | Función | Frases iniciadoras | Ejemplo |', '|---|---|---|---|');
    a4.torre.pisos.forEach((x) => x.campos.forEach((c) => L.push(`| ${x.nombre} | ${x.funcion} | ${c.iniciadores.map((i) => `"${i}..."`).join(' o ')} | ${c.ejemplo} |`)));
    p('', 'Lista de autochequeo:');
    a4.torre.autochequeo.forEach((x, i) => L.push(`${i + 1}. ${x.texto}`));
    p('');
  }
}
p('## 05. Final: ¡Caso resuelto!', 'Página: `/cierre`.');
p('1. Álbum con las 4 medallas: Lupa de Bronce, Lupa de Plata, Detector de Verdades y Voz de Detective.', '2. La historia de la familia de "Cuéntame, abuelo", para leerla en el círculo de lectura del salón.', '3. Diploma de Detective Lector de la Institución Educativa Jorge Eliécer Gaitán (Maripí, Boyacá), con el nombre del estudiante o de la pareja y botón de impresión.');
p('Texto del diploma: "Se otorga a [nombre] por resolver las tres misiones de lectura y el reto final, leer con calma, descubrir pistas escondidas, revisar antes de compartir y decir lo que piensa con razones."');
writeFileSync(`${raiz}/CONTENIDO.md`, L.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n');
process.stdout.write(`CONTENIDO.md: ${L.length} lineas\n`);
