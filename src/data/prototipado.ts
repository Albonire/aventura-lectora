// data of the teacher sheet: diagnosis of the group and the adjustments made to the prototype.
// Sources: design document of activity 2.1 (diagnosis of 5 May 2026, tables 4 and 6) and the review of the teachers.
// No figure here is estimated.

export interface DatoDiagnostico {
  id: string;
  de_13: number;
  texto: string;
  color: 'fresh-grass' | 'sunshine-pop' | 'sky-soft' | 'coral-soft';
}

export const TOTAL_GRUPO = 13;

export const diagnostico: DatoDiagnostico[] = [
  {
    id: 'entusiasmo',
    de_13: 10,
    texto: 'Se entusiasman con los juegos y los retos con imágenes',
    color: 'fresh-grass',
  },
  {
    id: 'inferencia',
    de_13: 10,
    texto: 'Tienen dificultad para inferir y para justificar una idea por escrito',
    color: 'coral-soft',
  },
  {
    id: 'celular',
    de_13: 9,
    texto: 'Tienen en casa un celular con datos, compartido entre la familia',
    color: 'sky-soft',
  },
  {
    id: 'sin_datos',
    de_13: 4,
    texto: 'Viven en fincas sin conectividad (usan la ficha en papel)',
    color: 'sunshine-pop',
  },
  {
    id: 'guia',
    de_13: 3,
    texto: 'Requieren guía paso a paso para manejar una pantalla',
    color: 'sunshine-pop',
  },
];

export function porcentaje(de_13: number): string {
  return `${((de_13 / TOTAL_GRUPO) * 100).toFixed(1).replace('.', ',')} %`;
}

export interface Ajuste {
  id: string;
  aspecto: string;
  hallazgo: string;
  fuente: string;
  ajuste: string;
  donde: { texto: string; href: string };
}

export const ajustes: Ajuste[] = [
  {
    id: 'extension',
    aspecto: 'Extensión del recorrido',
    hallazgo:
      'La ruta de cinco casos extensos resultaba demasiado larga para quienes leen despacio.',
    fuente: 'Revisión de las docentes',
    ajuste:
      'Seis partes de 15 a 20 minutos, con lecturas de 150 a 250 palabras divididas en paradas breves.',
    donde: { texto: 'El camino de la aventura', href: '/#indice' },
  },
  {
    id: 'pistas',
    aspecto: 'Riesgo de bloqueo o de responder al azar',
    hallazgo:
      'Cuando una pregunta los supera, se detienen. Hay que decirles dónde volver a leer sin darles la respuesta.',
    fuente: 'Entrevista a la docente',
    ajuste:
      'Pistas graduadas de Sofía: tras un error aparece una burbuja que dice qué párrafo o frase volver a leer. Nunca solo "incorrecto".',
    donde: { texto: 'Misión 1, paso 4', href: '/unidad/1/cerrar#reto' },
  },
  {
    id: 'voz',
    aspecto: 'Lectura silábica y menor manejo digital',
    hallazgo: '3 de 13 estudiantes necesitan guía paso a paso para manejar una pantalla.',
    fuente: 'Diagnóstico',
    ajuste:
      'Parte de inicio en parejas con una pista de prueba, cuatro pasos fijos en cada misión y botón "Escuchar con voz pausada" en cada lectura y consigna.',
    donde: { texto: 'Inicio', href: '/agencia' },
  },
  {
    id: 'libreta',
    aspecto: 'Hogares sin datos móviles',
    hallazgo: '4 de 13 estudiantes no tienen conectividad en la finca para hacer el reto familiar.',
    fuente: 'Diagnóstico',
    ajuste:
      'Ficha imprimible en media carta "Libreta de campo de Mateo": se llena en papel en casa y se registra al día siguiente en el salón.',
    donde: { texto: 'Libreta de campo de Mateo', href: '/libreta' },
  },
  {
    id: 'torre',
    aspecto: 'Argumentación escrita',
    hallazgo:
      '10 de 13 escribieron frases sueltas cuando se les pidió justificar una idea desde cero.',
    fuente: 'Diagnóstico',
    ajuste:
      'Torre de ideas guiada: tres pisos con frases iniciadoras para elegir, ejemplos y una lista de autochequeo de tres puntos. Sin área de texto vacía.',
    donde: { texto: 'Reto final, paso 4', href: '/unidad/4/cerrar#reto' },
  },
  {
    id: 'datos',
    aspecto: 'Celular compartido y tiempo de clase',
    hallazgo:
      'Los aparatos se comparten y los datos del celular familiar son limitados: 9 de 13 tienen un celular con datos en casa, para toda la familia.',
    fuente: 'Diagnóstico',
    ajuste:
      'Sin videos ni podcasts: quedan actividades cortas de tocar y ordenar, y páginas livianas que cargan con pocos datos.',
    donde: { texto: 'Misión 1, paso 3', href: '/unidad/1/lupa' },
  },
  {
    id: 'vocabulario',
    aspecto: 'Vocabulario para niños de 10 y 11 años',
    hallazgo:
      'Los nombres del documento de diseño (agencia, estación, expediente, postura, argumentos, rumor, verificar) son palabras de adultos.',
    fuente: 'Revisión de las docentes',
    ajuste:
      'Palabras de todos los días: Club de Detectives Lectores, misión, medalla, álbum, diploma, torre de ideas, lo que pienso, dato real, chisme y revisar. El villano se llama el Borracuentos.',
    donde: { texto: 'Inicio', href: '/agencia' },
  },
  {
    id: 'progreso',
    aspecto: 'Cortes de luz y señal débil',
    hallazgo: 'En la sede hay señal débil y cortes de luz, y el celular se comparte entre varios.',
    fuente: 'Entrevista a la docente',
    ajuste:
      'El álbum, las respuestas y las medallas se guardan en el aparato, sin registro y sin enviar datos.',
    donde: { texto: 'Álbum de medallas', href: '/cierre#pasaporte' },
  },
];
