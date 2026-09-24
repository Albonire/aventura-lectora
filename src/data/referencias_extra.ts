// references that are not resources of a case: the source of a text, the AI tool, the evaluation decree.
// "verificado" is true only after the link was opened and its content read (date in "verificado_el").

export interface ReferenciaExtra {
  apa: string;
  url: string;
  verificado: boolean;
  verificado_el?: string;
}

export const referencias_extra: ReferenciaExtra[] = [
  {
    apa: 'Ministerio de Tecnologías de la Información y las Comunicaciones. (s.f.). *Guía: Un paseo diferente* [Guía didáctica]. Colombia Programa. https://mintic.gov.co/colombiaprograma/847/articles-407418_recurso_1.pdf',
    url: 'https://mintic.gov.co/colombiaprograma/847/articles-407418_recurso_1.pdf',
    verificado: true,
    verificado_el: '2026-09-24',
  },
];
