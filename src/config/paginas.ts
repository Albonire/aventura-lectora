// the route has six stations: the opening of the agency (00), three missions (01 to 03),
// the final challenge (04) and the closing with the certificate (05).
// Stations 01 to 04 are "cases" of four short pages, always in the same order, so nobody gets lost.

export type SlugPagina = 'abrir' | 'pistas' | 'lupa' | 'cerrar';

export interface PaginaCaso {
  slug: SlugPagina;
  // path segment after /unidad/N ('' for the first page)
  segmento: string;
  titulo: string;
  descripcion: string;
  // ids of the sections that live on this page
  secciones: string[];
}

export const paginas_caso: PaginaCaso[] = [
  {
    slug: 'abrir',
    segmento: '',
    titulo: 'Abrir el caso',
    descripcion: 'Conocemos el caso y pensamos qué puede pasar.',
    secciones: ['portada', 'mision', 'introduccion'],
  },
  {
    slug: 'pistas',
    segmento: '/pistas',
    titulo: 'Seguir las pistas',
    descripcion: 'Leemos despacio, con paradas cortas.',
    secciones: ['desarrollo'],
  },
  {
    slug: 'lupa',
    segmento: '/lupa',
    titulo: 'Entrenar la lupa',
    descripcion: 'Practicamos. Si algo falla, Sofía da una pista y volvemos a intentar.',
    secciones: ['practica'],
  },
  {
    slug: 'cerrar',
    segmento: '/cerrar',
    titulo: 'Cerrar el caso',
    descripcion: 'Resolvemos el reto y ganamos la insignia.',
    secciones: ['reto', 'cierre-caso'],
  },
];

// stations 01 to 04
export const TOTAL_CASOS = 4;

export interface Estacion {
  codigo: string;
  // short name of the kind of station
  etiqueta: string;
  titulo: string;
  resumen: string;
  nivel: string;
  recompensa: string;
  // number of the unit (case) when the station has four pages
  caso?: number;
  href: string;
}

// titles, levels and rewards as planned in the design document (guide 2.1, table 4)
export const estaciones: Estacion[] = [
  {
    codigo: '00',
    etiqueta: 'Inicio',
    titulo: 'Apertura de la Agencia',
    resumen: 'Conoces a Sofía y a Mateo, pruebas una pista corta y activas tu pasaporte.',
    nivel: 'Parejas en el aula y carné',
    recompensa: 'Pasaporte de detective',
    href: '/agencia',
  },
  {
    codigo: '01',
    etiqueta: 'Misión 1',
    titulo: 'Leo y comprendo el rastro',
    resumen: 'Lees una fábula y una receta campesina con paradas antes, durante y después.',
    nivel: 'Nivel literal: cuentos y recetas',
    recompensa: 'Insignia Lupa de Bronce',
    caso: 1,
    href: '/unidad/1',
  },
  {
    codigo: '02',
    etiqueta: 'Misión 2',
    titulo: 'Pistas y "Cuéntame, abuelo"',
    resumen: 'Descubres lo que el texto sugiere y recoges un relato de tu familia.',
    nivel: 'Nivel inferencial y relato en casa',
    recompensa: 'Insignia Lupa de Plata',
    caso: 2,
    href: '/unidad/2',
  },
  {
    codigo: '03',
    etiqueta: 'Misión 3',
    titulo: 'Detectives de noticias',
    resumen: 'Comparas dos mensajes del celular y separas los hechos de los rumores.',
    nivel: 'Nivel crítico: hecho y opinión',
    recompensa: 'Insignia Detector de Verdades',
    caso: 3,
    href: '/unidad/3',
  },
  {
    codigo: '04',
    etiqueta: 'Desafío final',
    titulo: 'Mi voz cuenta en Maripí',
    resumen: 'Armas tu torre de argumentos con una postura, dos razones y un ejemplo.',
    nivel: 'Torre de argumentos propia',
    recompensa: 'Insignia Voz de Detective',
    caso: 4,
    href: '/unidad/4',
  },
  {
    codigo: '05',
    etiqueta: 'Logro',
    titulo: 'Cierre del expediente',
    resumen: 'Miras tu pasaporte completo, compartes tu relato y recibes tu certificado.',
    nivel: 'Círculo de lectura familiar',
    recompensa: 'Certificado de Detective Lector',
    href: '/cierre',
  },
];

export function estacion_de_caso(caso: number): Estacion {
  const estacion = estaciones.find((e) => e.caso === caso);
  if (!estacion) throw new Error(`caso desconocido: ${caso}`);
  return estacion;
}

// "Misión 1", "Desafío final"
export function etiqueta_caso(caso: number): string {
  return estacion_de_caso(caso).etiqueta;
}

export function pagina_por_slug(slug: string): PaginaCaso | undefined {
  return paginas_caso.find((p) => p.slug === slug);
}

export function pagina_de_seccion(id_seccion: string): PaginaCaso | undefined {
  return paginas_caso.find((p) => p.secciones.includes(id_seccion));
}

export function ruta_pagina(caso: number, slug: SlugPagina = 'abrir'): string {
  const pagina = pagina_por_slug(slug);
  if (!pagina) throw new Error(`pagina desconocida: ${slug}`);
  return `/unidad/${caso}${pagina.segmento}`;
}

// link to a section, wherever it lives
export function ruta_seccion(caso: number, id_seccion: string): string {
  const pagina = pagina_de_seccion(id_seccion);
  if (!pagina) throw new Error(`seccion desconocida: ${id_seccion}`);
  return `${ruta_pagina(caso, pagina.slug)}#${id_seccion}`;
}

// key used to remember which pages the student already read
export function id_pagina(caso: number, slug: SlugPagina): string {
  return `${caso}/${slug}`;
}

export function folio(slug: SlugPagina): string {
  const indice = paginas_caso.findIndex((p) => p.slug === slug);
  return `Paso ${indice + 1} de ${paginas_caso.length}`;
}

export type Ubicacion =
  | { tipo: 'inicio' }
  | { tipo: 'agencia' }
  | { tipo: 'caso'; caso: number; pagina: SlugPagina }
  | { tipo: 'cierre' };

export interface Destino {
  href: string;
  titulo: string;
  contexto: string;
}

// reading order: cover, station 00, four cases of four pages, station 05
export function orden_libro(total_casos: number = TOTAL_CASOS): Ubicacion[] {
  const orden: Ubicacion[] = [{ tipo: 'inicio' }, { tipo: 'agencia' }];
  for (let caso = 1; caso <= total_casos; caso += 1) {
    for (const pagina of paginas_caso) orden.push({ tipo: 'caso', caso, pagina: pagina.slug });
  }
  orden.push({ tipo: 'cierre' });
  return orden;
}

export function destino_de(ubicacion: Ubicacion): Destino {
  switch (ubicacion.tipo) {
    case 'inicio':
      return { href: '/', titulo: 'Mapa de la ruta', contexto: 'Portada' };
    case 'agencia':
      return {
        href: '/agencia',
        titulo: estaciones[0].titulo,
        contexto: `Estación 00: ${estaciones[0].etiqueta}`,
      };
    case 'cierre': {
      const ultima = estaciones[estaciones.length - 1];
      return {
        href: '/cierre',
        titulo: ultima.titulo,
        contexto: `Estación ${ultima.codigo}: ${ultima.etiqueta}`,
      };
    }
    case 'caso': {
      const pagina = pagina_por_slug(ubicacion.pagina);
      if (!pagina) throw new Error(`pagina desconocida: ${ubicacion.pagina}`);
      const estacion = estacion_de_caso(ubicacion.caso);
      return {
        href: ruta_pagina(ubicacion.caso, ubicacion.pagina),
        titulo: pagina.titulo,
        contexto: `${estacion.etiqueta}: ${estacion.titulo}`,
      };
    }
  }
}

function coincide(a: Ubicacion, b: Ubicacion): boolean {
  if (a.tipo !== b.tipo) return false;
  if (a.tipo === 'caso' && b.tipo === 'caso') return a.caso === b.caso && a.pagina === b.pagina;
  return true;
}

export interface Vecinos {
  anterior: Destino | null;
  siguiente: Destino | null;
}

// previous and next page in reading order (the last page of a case leads to the next station)
export function vecinos(ubicacion: Ubicacion, total_casos: number = TOTAL_CASOS): Vecinos {
  const orden = orden_libro(total_casos);
  const indice = orden.findIndex((u) => coincide(u, ubicacion));
  if (indice === -1) return { anterior: null, siguiente: null };
  const previa = orden[indice - 1];
  const proxima = orden[indice + 1];
  return {
    anterior: previa ? destino_de(previa) : null,
    siguiente: proxima ? destino_de(proxima) : null,
  };
}
