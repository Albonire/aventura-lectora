// references that are not resources of a case: the AI tool and the evaluation decree.
// "verificado" is true only after the link was opened and its content read (date in "verificado_el").

export interface ReferenciaExtra {
  apa: string;
  url: string;
  verificado: boolean;
  verificado_el?: string;
}

export const referencias_extra: ReferenciaExtra[] = [
  {
    apa: 'Google. (2026). *Gemini Notebook* [Herramienta de inteligencia artificial]. https://notebook.google/',
    url: 'https://notebook.google/',
    verificado: true,
    verificado_el: '2026-09-24',
  },
  {
    apa: 'Ministerio de Educación Nacional. (2009). *Decreto 1290 de 2009: Por el cual se reglamenta la evaluación del aprendizaje y promoción de los estudiantes de los niveles de educación básica y media*. https://www.mineducacion.gov.co/1759/w3-article-187765.html',
    url: 'https://www.mineducacion.gov.co/1759/w3-article-187765.html',
    verificado: true,
    verificado_el: '2026-09-24',
  },
];
