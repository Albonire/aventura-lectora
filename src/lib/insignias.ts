// the four medals of the detective passport and the tasks that unlock each one.
// A medal is won when every task of its case is done (see marcar_tarea in progreso.ts).

export interface TareaInsignia {
  id: string;
  // what the student did, in words of a ten year old
  texto: string;
  // page of the case where the task is solved
  pagina: 'lupa' | 'cerrar';
}

export interface DatoInsignia {
  caso: number;
  nombre: string;
  // where it is won: "Misión 1", "Desafío final"
  estacion: string;
  nivel: string;
  descripcion: string;
  tareas: TareaInsignia[];
}

export const insignias: DatoInsignia[] = [
  {
    caso: 1,
    nombre: 'Lupa de Bronce',
    estacion: 'Misión 1',
    nivel: 'Nivel literal',
    descripcion: 'Por leer con calma y encontrar lo que el texto dice.',
    tareas: [
      { id: 'partes', texto: 'Encontré el inicio, el nudo y el desenlace', pagina: 'lupa' },
      { id: 'receta', texto: 'Ordené los pasos de la receta', pagina: 'lupa' },
      { id: 'idea', texto: 'Separé la idea principal de los detalles', pagina: 'cerrar' },
    ],
  },
  {
    caso: 2,
    nombre: 'Lupa de Plata',
    estacion: 'Misión 2',
    nivel: 'Nivel inferencial',
    descripcion: 'Por descubrir pistas escondidas y guardar un relato de tu familia.',
    tareas: [
      { id: 'inferencias', texto: 'Descubrí lo que el relato no dice de frente', pagina: 'lupa' },
      { id: 'abuelo', texto: 'Registré el relato de "Cuéntame, abuelo"', pagina: 'cerrar' },
    ],
  },
  {
    caso: 3,
    nombre: 'Detector de Verdades',
    estacion: 'Misión 3',
    nivel: 'Nivel crítico',
    descripcion: 'Por separar los hechos de los rumores antes de compartir.',
    tareas: [
      { id: 'clasificar', texto: 'Separé los hechos de las opiniones y los rumores', pagina: 'lupa' },
      { id: 'verificar', texto: 'Revisé quién escribió el mensaje antes de compartirlo', pagina: 'cerrar' },
    ],
  },
  {
    caso: 4,
    nombre: 'Voz de Detective',
    estacion: 'Desafío final',
    nivel: 'Argumentación',
    descripcion: 'Por defender tu postura con dos razones y un ejemplo de Maripí.',
    tareas: [
      { id: 'torre', texto: 'Armé los tres pisos de mi torre de argumentos', pagina: 'cerrar' },
      { id: 'autochequeo', texto: 'Revisé mi torre con la lista de tres puntos', pagina: 'cerrar' },
    ],
  },
];

export function insignia_de(caso: number): DatoInsignia | undefined {
  return insignias.find((i) => i.caso === caso);
}

export function tareas_de(caso: number): string[] {
  return insignia_de(caso)?.tareas.map((t) => t.id) ?? [];
}

// "1:partes"
export function clave_tarea(caso: number, tarea: string): string {
  return `${caso}:${tarea}`;
}

export function caso_completo(caso: number, hechas: readonly string[]): boolean {
  const requeridas = tareas_de(caso);
  return requeridas.length > 0 && requeridas.every((t) => hechas.includes(clave_tarea(caso, t)));
}
