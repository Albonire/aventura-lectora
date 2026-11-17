// structured data and pure helper logic for activity 1.2 (Fundamentos de la Gamificacion):
// empathize and define with the 5th grade group of I.E. Jorge Eliecer Gaitan, Maripi.
// every number comes from the classroom log (5 May 2026), the teacher interview, the families or the document review.

export type ClaveFuente = 'B' | 'E' | 'F' | 'D';
export type FiltroFuente = 'TODAS' | ClaveFuente;

export const fuentes: Record<ClaveFuente, string> = {
  B: 'Bitácora de aula, 5 de mayo',
  E: 'Entrevista a la docente',
  F: 'Comentarios de las familias',
  D: 'Revisión documental',
};

export const claves_fuentes: ClaveFuente[] = ['B', 'E', 'F', 'D'];

export interface CifraGrupo {
  id: string;
  valor: string;
  texto: string;
  fuente: ClaveFuente;
  barra: number | null;
  // how many of the 13 students this figure represents, when applicable
  ninos_de_13: number | null;
  total_grupo: number | null;
  color_acento: 'fresh-grass' | 'sunshine-pop' | 'sky-pop' | 'coral-pop';
}

export const cifras: CifraGrupo[] = [
  {
    id: 'grupo-total',
    valor: '13',
    texto: 'estudiantes de 5.º en el grupo',
    fuente: 'B',
    barra: null,
    ninos_de_13: 13,
    total_grupo: 13,
    color_acento: 'sunshine-pop',
  },
  {
    id: 'participacion',
    valor: '+75 %',
    texto: 'participó en la clase de lectura observada',
    fuente: 'B',
    barra: 75,
    ninos_de_13: 10,
    total_grupo: 13,
    color_acento: 'fresh-grass',
  },
  {
    id: 'celular-datos',
    valor: '70 %',
    texto: 'tiene celular con datos en casa, más o menos 9 de 13',
    fuente: 'E',
    barra: 70,
    ninos_de_13: 9,
    total_grupo: 13,
    color_acento: 'sky-pop',
  },
  {
    id: 'instruccion-plataforma',
    valor: '3 de 13',
    texto: 'necesitan guía paso a paso para manejar una pantalla',
    fuente: 'B',
    barra: 23,
    ninos_de_13: 3,
    total_grupo: 13,
    color_acento: 'coral-pop',
  },
  {
    id: 'leen-casa',
    valor: '2 de 13',
    texto: 'leen en casa, a veces con la mamá',
    fuente: 'E',
    barra: 15,
    ninos_de_13: 2,
    total_grupo: 13,
    color_acento: 'sunshine-pop',
  },
  {
    id: 'factores-familiares',
    valor: '4 de 4',
    texto: 'factores familiares que afectan la lectura marcados en la bitácora',
    fuente: 'B',
    barra: 100,
    ninos_de_13: null,
    total_grupo: 4,
    color_acento: 'coral-pop',
  },
];

export interface CitaParticipante {
  id: string;
  texto: string;
  quien: string;
  actor: 'estudiantes' | 'docente' | 'familias';
  fuente: ClaveFuente;
}

export const citas: CitaParticipante[] = [
  {
    id: 'cita-4',
    texto: 'Los engancha lo colorido, lo lúdico. Los aburre la monotonía.',
    quien: 'Docente titular',
    actor: 'docente',
    fuente: 'E',
  },
  {
    id: 'cita-5',
    texto:
      'La lectura suele verse más como una obligación escolar que como una actividad placentera.',
    quien: 'Docente titular',
    actor: 'docente',
    fuente: 'B',
  },
  {
    id: 'cita-6',
    texto: 'Solo leyeron cuando estudiaron.',
    quien: 'Madres y padres, en reunión de familias',
    actor: 'familias',
    fuente: 'F',
  },
];

export interface CuadranteMapa {
  id: 'dice' | 'hace' | 'piensa' | 'siente';
  titulo: string;
  color: string;
  tipo_evidencia: 'Observado' | 'Inferencia del equipo';
  resumen: string;
  items: [string, ClaveFuente][];
}

export const mapa: CuadranteMapa[] = [
  {
    id: 'dice',
    titulo: 'Dice',
    color: 'bg-sunshine-pop',
    tipo_evidencia: 'Observado',
    resumen: 'Todavía no hay frases de los estudiantes recogidas para esta versión.',
    items: [],
  },
  {
    id: 'hace',
    titulo: 'Hace',
    color: 'bg-fresh-grass',
    tipo_evidencia: 'Observado',
    resumen: 'Lee por turnos y ayuda en la finca.',
    items: [
      ['Elige el libro más llamativo de la mesa y lee en voz alta por turnos.', 'B'],
      ['Pierde la atención mientras leen sus compañeros.', 'B'],
      ['Apoya las labores agrícolas en la casa.', 'B'],
    ],
  },
  {
    id: 'piensa',
    titulo: 'Piensa',
    color: 'bg-sky-soft',
    tipo_evidencia: 'Inferencia del equipo',
    resumen: 'Leer es una tarea del colegio. Inferencia del equipo.',
    items: [
      ['“Leer es algo que se hace en el colegio.” La docente lo ve como obligación escolar.', 'B'],
    ],
  },
  {
    id: 'siente',
    titulo: 'Siente',
    color: 'bg-coral-soft',
    tipo_evidencia: 'Inferencia del equipo',
    resumen: 'Entusiasmo con lo lúdico, aburrimiento con la monotonía. Inferencia del equipo.',
    items: [
      ['Entusiasmo al empezar la clase y al ver el sitio.', 'B'],
      ['Aburrimiento con la monotonía.', 'E'],
    ],
  },
];

export const dolores: string[] = [
  'No identifica la idea principal',
  'Palabras que no conoce',
  'Lee en voz alta sin comprender',
  'Pocos libros en casa y en la sede',
  'Señal débil y cortes de luz',
  'Nadie lee con él en casa',
];

export const ganancias: string[] = [
  'Colores, figuras y personajes',
  'Actividades que parecen juego',
  'Coplas, mitos y relatos de los abuelos',
  'Conocer cómo viven otras culturas',
  'Leer con los compañeros',
];

export interface SegmentoPixel {
  x: number;
  w: number;
  c: string;
}

export function compactar_fila_pixel(fila: string): SegmentoPixel[] {
  const segmentos: SegmentoPixel[] = [];
  let i = 0;
  while (i < fila.length) {
    const ch = fila[i];
    if (ch === '.' || ch === ' ') {
      i++;
      continue;
    }
    let w = 1;
    while (i + w < fila.length && fila[i + w] === ch) {
      w++;
    }
    segmentos.push({ x: i, w, c: ch });
    i += w;
  }
  return segmentos;
}

export interface PatronTriangulado {
  id: string;
  patron: string;
  f: ClaveFuente[];
}

export const patrones: PatronTriangulado[] = [
  { id: 'patron-1', patron: 'El interés aparece en el aula', f: ['B', 'E'] },
  { id: 'patron-2', patron: 'La comprensión es la mayor dificultad', f: ['B', 'E', 'D'] },
  { id: 'patron-3', patron: 'Se detienen cuando una pregunta los supera', f: ['E'] },
  { id: 'patron-4', patron: 'Fuera del aula casi nadie lee', f: ['B', 'E', 'F'] },
  { id: 'patron-5', patron: 'Acceso compartido e intermitente', f: ['B', 'E'] },
  { id: 'patron-6', patron: 'Algunos no conocen estas plataformas', f: ['E'] },
  { id: 'patron-7', patron: 'La tradición oral les atrae', f: ['B'] },
];

export interface PerfilPersona {
  id: 'sofia' | 'julian' | 'valentina' | 'docente' | 'rosa';
  nombre: string;
  rol: string;
  texto: string;
  necesita: string;
  color_fondo: 'sunshine-pop' | 'fresh-grass' | 'sky-pop' | 'coral-pop';
  fuentes_base: ClaveFuente[];
  // 0-based indices into `insights` and `como_podriamos` that directly respond to this persona
  insights_vinculados: number[];
  preguntas_vinculadas: number[];
}

export const personas: PerfilPersona[] = [
  {
    id: 'sofia',
    nombre: 'Sofía, 10 años',
    rol: 'La lectora que se queda atrás',
    texto:
      'Lee despacio y a veces se salta palabras. Cuando leen los demás, se distrae. Al terminar su parte no sabe decir de qué trataba ni qué significan algunas palabras.',
    necesita: 'Avanzar por pasos cortos, con apoyo en las palabras nuevas.',
    color_fondo: 'sunshine-pop',
    fuentes_base: ['B', 'D'],
    insights_vinculados: [0, 1],
    preguntas_vinculadas: [0, 1],
  },
  {
    id: 'julian',
    nombre: 'Julián, 11 años',
    rol: 'El ayudante de la finca',
    texto:
      'En las tardes ayuda en el campo. En su casa hay un celular con datos, pero nadie lee. Le gustan los mitos y las historias de su abuelo.',
    necesita: 'Practicar en ratos cortos, con historias que reconoce.',
    color_fondo: 'fresh-grass',
    fuentes_base: ['B', 'E', 'F'],
    insights_vinculados: [2, 5],
    preguntas_vinculadas: [2, 4],
  },
  {
    id: 'valentina',
    nombre: 'Valentina, 10 años',
    rol: 'La que necesita guía',
    texto: 'Necesita guía paso a paso para manejar una pantalla.',
    necesita: 'Entender la plataforma desde el primer minuto, sin ayuda.',
    color_fondo: 'sky-pop',
    fuentes_base: ['B', 'E'],
    insights_vinculados: [0, 3, 4],
    preguntas_vinculadas: [0, 3, 5],
  },
  {
    id: 'docente',
    nombre: 'La docente rural',
    rol: 'Parte interesada',
    texto:
      'Atiende a 13 estudiantes con pocos libros. Trabaja con calor, señal débil y cortes de luz.',
    necesita: 'Ver quién avanza y quién se traba, sin depender de la conexión.',
    color_fondo: 'coral-pop',
    fuentes_base: ['B', 'E'],
    insights_vinculados: [1, 3, 4],
    preguntas_vinculadas: [1, 3, 5],
  },
  {
    id: 'rosa',
    nombre: 'Doña Rosa, madre',
    rol: 'Parte interesada',
    texto:
      'Leyó solo cuando estudió. Trabaja en el campo y no ve la lectura como pasatiempo. Tiene un celular con datos para toda la casa.',
    necesita: 'Una forma sencilla de acompañar la lectura sin ser lectora.',
    color_fondo: 'sunshine-pop',
    fuentes_base: ['B', 'E', 'F'],
    insights_vinculados: [2, 3, 5],
    preguntas_vinculadas: [2, 4, 5],
  },
];

export interface InsightDefinicion {
  titulo: string;
  prioridad: 'Alta' | 'Media';
}

export const insights: InsightDefinicion[] = [
  {
    titulo: 'El gusto ya existe; falta que se convierta en comprensión',
    prioridad: 'Alta',
  },
  {
    titulo: 'Cuando una pregunta los supera, se detienen y no saben cómo seguir',
    prioridad: 'Alta',
  },
  { titulo: 'Fuera del aula nadie sostiene la lectura', prioridad: 'Alta' },
  { titulo: 'El acceso es compartido y se corta', prioridad: 'Media' },
  { titulo: 'Tres de cada trece necesitan guía paso a paso para usar una pantalla', prioridad: 'Media' },
  { titulo: 'La tradición oral les abre la puerta', prioridad: 'Media' },
];

export interface PreguntaComoPodriamos {
  texto: string;
  principal: boolean;
}

export const como_podriamos: PreguntaComoPodriamos[] = [
  {
    texto:
      '¿Cómo podríamos convertir el gusto por lo colorido y lo lúdico en práctica para encontrar la idea principal?',
    principal: true,
  },
  {
    texto:
      '¿Cómo podríamos ayudar a un estudiante a seguir cuando una pregunta lo supera, sin darle la respuesta?',
    principal: false,
  },
  {
    texto:
      '¿Cómo podríamos llevar la lectura a la casa, aunque la familia no tenga el hábito de leer?',
    principal: true,
  },
  {
    texto:
      '¿Cómo podríamos lograr que quien usa la plataforma por primera vez juegue sin ayuda desde la primera actividad?',
    principal: false,
  },
  {
    texto:
      '¿Cómo podríamos usar las coplas, los mitos y los relatos de los abuelos de Maripí como material de lectura?',
    principal: false,
  },
  {
    texto:
      '¿Cómo podríamos hacer que la experiencia funcione con celulares compartidos, poca señal y cortes de luz?',
    principal: false,
  },
];

export const texto_desafio =
  'Los 13 estudiantes de 5.º disfrutan la lectura cuando es colorida y lúdica, pero no encuentran la idea principal, se detienen ante las preguntas difíciles y casi no leen fuera del aula. Queremos que una experiencia gamificada convierta ese gusto en práctica de comprensión que avance por niveles y llegue a la casa.';

export interface ResumenFuente {
  clave: ClaveFuente;
  nombre: string;
  cifras: number;
  citas: number;
  evidencias_mapa: number;
  patrones: number;
  total: number;
}

export function resumen_por_fuente(clave: ClaveFuente): ResumenFuente {
  const n_cifras = cifras.filter((c) => c.fuente === clave).length;
  const n_citas = citas.filter((c) => c.fuente === clave).length;
  const n_evidencias = mapa.reduce(
    (acc, cuadrante) => acc + cuadrante.items.filter(([, f]) => f === clave).length,
    0,
  );
  const n_patrones = patrones.filter((p) => p.f.includes(clave)).length;

  return {
    clave,
    nombre: fuentes[clave],
    cifras: n_cifras,
    citas: n_citas,
    evidencias_mapa: n_evidencias,
    patrones: n_patrones,
    total: n_cifras + n_citas + n_evidencias + n_patrones,
  };
}

export function coincide_fuente(
  fuentes_item: ClaveFuente | ClaveFuente[],
  filtro: FiltroFuente,
): boolean {
  if (filtro === 'TODAS') return true;
  if (Array.isArray(fuentes_item)) return fuentes_item.includes(filtro);
  return fuentes_item === filtro;
}
