// references of the design document (guide 2.1) and of the prototype.
// "verificado" is true only after the link was opened and its content matched the citation
// (date in "verificado_el"). The ones that could not be confirmed are not published: see "nota".

export interface Referencia {
  apa: string;
  url: string;
  verificado: boolean;
  verificado_el?: string;
  nota?: string;
}

export const referencias: Referencia[] = [
  {
    apa: 'Arias-Delgado, L. (2023). *Módulo 2: Diseño y aplicación de experiencias de aprendizaje gamificadas*. Universidad Santo Tomás, Campus Virtual.',
    url: '',
    verificado: true,
    verificado_el: '2026-11-16',
    nota: 'Material del campus virtual, sin enlace abierto. Es el recurso de consulta que cita la guía de la Actividad 2.2.',
  },
  {
    apa: 'Llumiquinga Haro, C. E. (2026). *Fortalecimiento de la compresión lectora mediante la gamificación para desarrollar el pensamiento critico*. Repositorio Institucional de la Universidad Politécnica Salesiana. https://dspace.ups.edu.ec/handle/123456789/32830',
    url: 'https://dspace.ups.edu.ec/handle/123456789/32830',
    verificado: true,
    verificado_el: '2026-11-16',
    nota: 'El título se copia como aparece en el repositorio ("compresión", "critico").',
  },
  {
    apa: 'Ministerio de Educación Nacional. (2016). *Derechos Básicos de Aprendizaje: Lenguaje* (V.2). https://www.mineducacion.gov.co/',
    url: 'https://www.mineducacion.gov.co/',
    verificado: true,
    verificado_el: '2026-11-16',
    nota: 'Los enunciados de los DBA 1, 5, 6, 7 y 8 de grado 5.º se compararon con el PDF del documento.',
  },
  {
    apa: 'Rodríguez Basto, S. J., y Vera Arias, M. L. (2025). Importancia de la comprensión lectora como elemento fundamental en los procesos de enseñanza-aprendizaje en estudiantes de básica primaria en Colombia. *Dialéctica*, *1*(25), 112-128. https://doi.org/10.56219/dialctica.v1i25.3880',
    url: 'https://doi.org/10.56219/dialctica.v1i25.3880',
    verificado: true,
    verificado_el: '2026-11-16',
  },
  {
    apa: 'Acosta Sznajderman, A., Junguitu Angulo, L., y Osuna Acedo, S. (2026). Gamificación, narrativa transmedia e IA para motivar la lectura en Primaria: un estudio de caso cualitativo. *Revista Prisma Social*, (52), 145-172. https://revistaprismasocial.es/',
    url: 'https://revistaprismasocial.es/',
    verificado: false,
    nota: 'El enlace abre la portada de la revista. No se encontró el artículo con ese título y esos autores.',
  },
  {
    apa: 'Gutiérrez-González, R., Carrera-Fernández, M. J., y Cid-Sillero, S. (2023). Comprensión lectora en educación primaria: revisión sistemática sobre estrategias de intervención. *Revista de Investigación Educativa*, *41*(1), 159-177. https://doi.org/10.6018/rie.518741',
    url: 'https://doi.org/10.6018/rie.518741',
    verificado: false,
    nota: 'El DOI abre otro artículo: "Análisis de la producción científica relacionada con Recursos Educativos Digitales (RED) y Objetos Virtuales de Aprendizaje (OVA), entre 2000 y 2021", de C. Gutiérrez-González y otros.',
  },
  {
    apa: 'Instituto Colombiano para la Evaluación de la Educación. (2023). *Informe nacional de resultados de las pruebas Saber 3.°, 5.° y 9.°*. ICFES. https://www.icfes.gov.co/',
    url: 'https://www.icfes.gov.co/',
    verificado: false,
    nota: 'El enlace abre la portada del ICFES. El informe publicado se titula "Informe nacional de resultados de las pruebas Saber 3.°, 5.°, 7.° y 9.°. Aplicación 2022": falta confirmar cuál es y su enlace directo.',
  },
  {
    apa: 'Novoa Velandia, L. Y., y Serrato Vargas, Y. P. (2023). *Gamificación, una estrategia didáctica para el desarrollo de la comprensión lectora en estudiantes de grado cuarto de básica primaria* [Trabajo de grado de maestría, Corporación Universitaria Minuto de Dios]. Repositorio Institucional UNIMINUTO. https://repository.uniminuto.edu/handle/10656/17982',
    url: 'https://repository.uniminuto.edu/handle/10656/17982',
    verificado: false,
    nota: 'El enlace abre otro trabajo de grado ("Investigar los efectos del teletrabajo en los empleados de la empresa Sotrauraba").',
  },
];
