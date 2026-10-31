// structured data and pure helper logic for activity 1.2 (Fundamentos de la Gamificacion):
// empathize and define with the 5th grade group of I.E. Jorge Eliecer Gaitan, Maripi.
// every number comes from the classroom log (5 May 2026), the pilot (10 Oct 2026) or the teacher interview.

export type ClaveFuente = 'B' | 'P' | 'E' | 'F' | 'D';
export type FiltroFuente = 'TODAS' | ClaveFuente;

export const fuentes: Record<ClaveFuente, string> = {
  B: 'Bitácora de aula, 5 de mayo',
  P: 'Pilotaje del caso 1, 10 de octubre',
  E: 'Entrevista a la docente',
  F: 'Comentarios de las familias',
  D: 'Revisión documental',
};

export const claves_fuentes: ClaveFuente[] = ['B', 'P', 'E', 'F', 'D'];

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
    valor: '20 %',
    texto: 'necesitó instrucción para usar la plataforma, cerca de 3 de 13',
    fuente: 'P',
    barra: 20,
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
    id: 'cita-1',
    texto: 'Se ve muy bonito.',
    quien: 'Estudiantes, reportado por la docente',
    actor: 'estudiantes',
    fuente: 'P',
  },
  {
    id: 'cita-2',
    texto: 'Me gustan las figuras y los muñecos.',
    quien: 'Estudiantes, reportado por la docente',
    actor: 'estudiantes',
    fuente: 'P',
  },
  {
    id: 'cita-3',
    texto: 'Algunas preguntas están difíciles.',
    quien: 'Estudiantes, reportado por la docente',
    actor: 'estudiantes',
    fuente: 'P',
  },
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
    resumen: 'Le gusta cómo se ve, pero algunas preguntas le cuestan.',
    items: [
      ['“Se ve muy bonito.”', 'P'],
      ['“Me gustan las figuras y los muñecos.”', 'P'],
      ['“Algunas preguntas están difíciles.”', 'P'],
    ],
  },
  {
    id: 'hace',
    titulo: 'Hace',
    color: 'bg-fresh-grass',
    tipo_evidencia: 'Observado',
    resumen: 'Lee por turnos, comparte celular y ayuda en la finca.',
    items: [
      ['Elige el libro más llamativo de la mesa y lee en voz alta por turnos.', 'B'],
      ['Pierde la atención mientras leen sus compañeros.', 'B'],
      ['Usa su celular o espera el de la docente por turnos.', 'P'],
      ['Tarda mucho en la sopa de letras.', 'P'],
      ['Apoya las labores agrícolas en la casa.', 'B'],
    ],
  },
  {
    id: 'piensa',
    titulo: 'Piensa',
    color: 'bg-sky-pop',
    tipo_evidencia: 'Inferencia del equipo',
    resumen: 'Leer es una tarea del colegio. Inferencia del equipo.',
    items: [
      ['“Leer es algo que se hace en el colegio.” La docente lo ve como obligación escolar.', 'B'],
      ['“Si no sé qué responder, la dejo.” Se detienen en ciertas actividades.', 'P'],
    ],
  },
  {
    id: 'siente',
    titulo: 'Siente',
    color: 'bg-coral-pop',
    tipo_evidencia: 'Inferencia del equipo',
    resumen: 'Entusiasmo con lo lúdico, frustración con lo difícil. Inferencia del equipo.',
    items: [
      ['Entusiasmo al empezar la clase y al ver el sitio.', 'B'],
      ['Frustración cuando una pregunta lo supera.', 'P'],
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
  'El progreso no se pierde si se va la luz',
];

export interface PasoRecorrido {
  paso: string;
  hace: string;
  emocion: 1 | 2 | 3 | 4 | 5;
  etiqueta_emocion: string;
  fuente: ClaveFuente;
}

// emotion from 1 (low) to 5 (high), read by the team from the pilot account
export const recorrido: PasoRecorrido[] = [
  {
    paso: 'Conseguir el aparato',
    hace: 'Unos usan su celular; otros esperan el de la docente.',
    emocion: 3,
    etiqueta_emocion: 'Expectativa tranquila (3 de 5)',
    fuente: 'P',
  },
  {
    paso: 'Entrar al sitio',
    hace: 'Ve colores, figuras y personajes.',
    emocion: 5,
    etiqueta_emocion: 'Entusiasmo alto (5 de 5)',
    fuente: 'P',
  },
  {
    paso: 'Leer el texto',
    hace: 'Lee; los que leen despacio se quedan atrás.',
    emocion: 3,
    etiqueta_emocion: 'Atención dispar (3 de 5)',
    fuente: 'B',
  },
  {
    paso: 'Responder',
    hace: 'Hay preguntas que no sabe cómo contestar.',
    emocion: 1,
    etiqueta_emocion: 'Frustración y bloqueo (1 de 5)',
    fuente: 'P',
  },
  {
    paso: 'Sopa de letras',
    hace: 'Le toma mucho tiempo terminarla.',
    emocion: 2,
    etiqueta_emocion: 'Cansancio (2 de 5)',
    fuente: 'P',
  },
  {
    paso: 'Corte de luz',
    hace: 'Se va la luz, vuelve y el progreso sigue ahí.',
    emocion: 4,
    etiqueta_emocion: 'Alivio y confianza (4 de 5)',
    fuente: 'P',
  },
  {
    paso: 'En casa',
    hace: 'Casi nadie lee con él; ayuda en la finca.',
    emocion: 2,
    etiqueta_emocion: 'Desconexión lectora (2 de 5)',
    fuente: 'E',
  },
];

export const ancho_svg_recorrido = 700;
export const alto_svg_recorrido = 180;

export function punto_x_recorrido(
  indice: number,
  total: number = recorrido.length,
  ancho: number = ancho_svg_recorrido,
): number {
  const paso_x = ancho / total;
  return (indice + 0.5) * paso_x;
}

export function punto_y_recorrido(
  emocion: number,
  alto: number = alto_svg_recorrido,
): number {
  return alto - 20 - ((emocion - 1) / 4) * (alto - 40);
}

export function linea_svg_recorrido(
  pasos: Pick<PasoRecorrido, 'emocion'>[] = recorrido,
  ancho: number = ancho_svg_recorrido,
  alto: number = alto_svg_recorrido,
): string {
  return pasos
    .map(
      (r, i) =>
        `${i === 0 ? 'M' : 'L'}${punto_x_recorrido(i, pasos.length, ancho).toFixed(1)},${punto_y_recorrido(r.emocion, alto).toFixed(1)}`,
    )
    .join(' ');
}

export type EstadoAnimacionPixel =
  | 'salto_estrellas'
  | 'alivio_escudo'
  | 'atento_curioso'
  | 'cansado_sudor'
  | 'bloqueo_pregunta';

export function estado_animacion_recorrido(emocion: 1 | 2 | 3 | 4 | 5): EstadoAnimacionPixel {
  if (emocion === 5) return 'salto_estrellas';
  if (emocion === 4) return 'alivio_escudo';
  if (emocion === 3) return 'atento_curioso';
  if (emocion === 2) return 'cansado_sudor';
  return 'bloqueo_pregunta';
}

export function camino_escalonado_pixel(
  pasos: Pick<PasoRecorrido, 'emocion'>[] = recorrido,
  ancho: number = ancho_svg_recorrido,
  alto: number = alto_svg_recorrido,
): string {
  if (pasos.length === 0) return '';
  const comandos: string[] = [];
  for (let i = 0; i < pasos.length; i++) {
    const x = Math.round(punto_x_recorrido(i, pasos.length, ancho));
    const y = Math.round(punto_y_recorrido(pasos[i].emocion, alto));
    if (i === 0) {
      comandos.push(`M${x},${y}`);
    } else {
      const prev_x = Math.round(punto_x_recorrido(i - 1, pasos.length, ancho));
      const prev_y = Math.round(punto_y_recorrido(pasos[i - 1].emocion, alto));
      const mid_x = Math.round((prev_x + x) / 2);
      const mid_y = Math.round((prev_y + y) / 2);
      comandos.push(`H${mid_x - 10} V${mid_y} H${mid_x + 10} V${y} H${x}`);
    }
  }
  return comandos.join(' ');
}

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
  { id: 'patron-1', patron: 'El interés aparece en el aula y en el sitio', f: ['B', 'P', 'E'] },
  { id: 'patron-2', patron: 'La comprensión es la mayor dificultad', f: ['B', 'E', 'D'] },
  { id: 'patron-3', patron: 'Se detienen cuando una pregunta los supera', f: ['P', 'E'] },
  { id: 'patron-4', patron: 'Fuera del aula casi nadie lee', f: ['B', 'E', 'F'] },
  { id: 'patron-5', patron: 'Acceso compartido e intermitente', f: ['B', 'P', 'E'] },
  { id: 'patron-6', patron: 'Algunos no conocen estas plataformas', f: ['P', 'E'] },
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
    fuentes_base: ['B', 'P', 'D'],
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
    rol: 'La que juega por turnos',
    texto:
      'No tiene celular propio y usa el de la profesora. Nunca había usado una plataforma así. Le encantaron los muñecos y se demoró en la sopa de letras.',
    necesita: 'Entender la plataforma desde el primer minuto, sin ayuda.',
    color_fondo: 'sky-pop',
    fuentes_base: ['P', 'E'],
    insights_vinculados: [0, 3, 4],
    preguntas_vinculadas: [0, 3, 5],
  },
  {
    id: 'docente',
    nombre: 'La docente rural',
    rol: 'Parte interesada',
    texto:
      'Atiende a 13 estudiantes con pocos libros. Presta su celular y su computador. Trabaja con calor, señal débil y cortes de luz.',
    necesita: 'Ver quién avanza y quién se traba, sin depender de la conexión.',
    color_fondo: 'coral-pop',
    fuentes_base: ['B', 'P', 'E'],
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
  { titulo: 'Uno de cada cinco necesita aprender a usar la plataforma', prioridad: 'Media' },
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
  pasos_recorrido: number;
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
  const n_pasos = recorrido.filter((r) => r.fuente === clave).length;
  const n_patrones = patrones.filter((p) => p.f.includes(clave)).length;

  return {
    clave,
    nombre: fuentes[clave],
    cifras: n_cifras,
    citas: n_citas,
    evidencias_mapa: n_evidencias,
    pasos_recorrido: n_pasos,
    patrones: n_patrones,
    total: n_cifras + n_citas + n_evidencias + n_pasos + n_patrones,
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
