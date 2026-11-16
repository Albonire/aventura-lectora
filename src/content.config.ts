import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// data of the four cases (missions 1 to 3 and the final challenge). Titles and rewards live in src/config/paginas.ts
const unidades = defineCollection({
  loader: glob({ pattern: 'unidad_*.mdx', base: './src/content/unidades' }),
  schema: z.object({
    numero: z.number().int().min(1).max(4),
    color: z.enum(['fresh-grass', 'sky-pop', 'sunshine-pop', 'coral-pop']),
    // who guides the case and which characters are drawn on its cover
    guia: z.string(),
    duracion: z.string(),
    imagen_portada: z.object({ alt: z.string() }),
    mision: z.string(),
    introduccion: z.string(),
    // reading strategy labels of the case (for example predigo, pregunto, opino)
    estrategias: z.array(z.object({ etiqueta: z.string(), texto: z.string() })),
    aprendizajes_esperados: z.array(z.string()).min(1),
    referentes: z.array(z.string()),
    para_familias: z.string(),
  }),
});

// one MDX file per page of a case (unidad_N/abrir, pistas, lupa, cerrar). They receive the unit data as props.unidad.
const paginas = defineCollection({
  loader: glob({ pattern: 'unidad_*/*.mdx', base: './src/content/paginas' }),
  schema: z.object({}),
});

export const collections = { unidades, paginas };
