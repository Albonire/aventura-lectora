// data of the teacher sheet: diagnosis of the group, pilot findings and the adjustments made to the prototype.
// Sources: design document of activity 2.1 (diagnosis of 5 May 2026, tables 4 and 6) and the pilot notes
// of 10 October 2026 that are detailed on /empatizar. No figure here is estimated.

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
      'La ruta de cinco casos extensos resultó demasiado larga: quienes leen despacio se quedaban atrás y se cansaban.',
    fuente: 'Pilotaje y revisión de las docentes',
    ajuste:
      'Seis partes de 15 a 20 minutos, con lecturas de 150 a 250 palabras divididas en paradas breves.',
    donde: { texto: 'El camino de la aventura', href: '/#indice' },
  },
  {
    id: 'pistas',
    aspecto: 'Riesgo de bloqueo o de responder al azar',
    hallazgo:
      '"Algunas preguntas están difíciles". Cuando una pregunta los superaba, se detenían o adivinaban.',
    fuente: 'Pilotaje',
    ajuste:
      'Pistas graduadas de Sofía: tras un error aparece una burbuja que dice qué párrafo o frase volver a leer. Nunca solo "incorrecto".',
    donde: { texto: 'Misión 1, paso 4', href: '/unidad/1/cerrar#reto' },
  },
  {
    id: 'voz',
    aspecto: 'Lectura silábica y menor manejo digital',
    hallazgo: 'Cerca de 3 de 13 estudiantes necesitaron instrucción para usar la plataforma.',
    fuente: 'Pilotaje y diagnóstico',
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
      'Los aparatos se usan por turnos y la sopa de letras tomó mucho tiempo. Los datos del celular familiar son limitados.',
    fuente: 'Pilotaje y diagnóstico',
    ajuste:
      'Se retiraron la sopa de letras, los videos y los podcasts. Quedan actividades cortas de tocar y ordenar, y páginas livianas que cargan con pocos datos.',
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
    hallazgo: 'Se fue la luz, volvió y el progreso seguía ahí. Fue un acierto de la primera versión.',
    fuente: 'Pilotaje',
    ajuste:
      'Se conserva: el álbum, las respuestas y las medallas se guardan en el aparato, sin registro y sin enviar datos.',
    donde: { texto: 'Álbum de medallas', href: '/cierre#pasaporte' },
  },
];
