// central site settings: edit here, not in components

// the two teachers who wrote the experience (only authors)
export const integrantes = [
  { id: 'luz', nombre: 'Luz Marina Castillo Cuadrado' },
  { id: 'ingrid', nombre: 'Ingrid Yuliana González Flores' },
] as const;

export type IntegranteId = (typeof integrantes)[number]['id'];

export const sitio = {
  nombre_curso: 'Aventura lectora',
  subtitulo: 'Agencia Escolar de Detectives de la Lectura',
  nombre_largo: 'Aventura lectora: el misterio de los relatos desvanecidos en Maripí',
  grado: '5.º de primaria',
  pie_portada: 'Quinto grado, I.E. Jorge Eliécer Gaitán, Maripí',
  anio: 2026,

  // school and group
  institucion: 'Institución Educativa Jorge Eliécer Gaitán',
  institucion_corta: 'I.E. Jorge Eliécer Gaitán',
  sector: 'Sector oficial rural',
  municipio: 'Maripí, Boyacá, Colombia',
  municipio_corto: 'Maripí, Boyacá',
  contexto: 'Contexto veredal de familias productoras de caña panelera y cacao',
  poblacion: '13 estudiantes de quinto grado de primaria, entre 10 y 11 años',
  total_estudiantes: 13,
  fecha_diagnostico: '5 de mayo de 2026',

  // academic data of the module
  universidad: 'Universidad Santo Tomás',
  sede: 'Sede Principal',
  division: 'División de Ciencias Sociales y de la Educación',
  facultad: 'Facultad de Educación',
  programa: 'Maestría en Tecnología e Innovación Educativa',
  espacio_academico: 'Gamificación (Tecnología Educativa)',
  fase: 'Fase de diseño y planificación',
  actividad: 'Actividad 2.2: Prototipado',
  docente: 'Gustavo Alberto Orozco Bohórquez',
  asesora: 'Marcela Zambrano',
} as const;

export const autoras = integrantes.map((i) => i.nombre);

export function ruta_caso(numero: number): string {
  return `/unidad/${numero}`;
}
