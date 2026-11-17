// every list of shapes of the book, to know which gradients the shared definitions must write.
import { capas, referencias } from '../capas';
import { SOFIA, SOFIA_BUSTO } from './sofia';
import { MATEO, MATEO_BUSTO } from './mateo';
import { CONEJO, ORUGA, TORTUGA } from './animales';
import { CANAS_PORTADA, FLORES, PLACA_TAPA, PLANTAS, SUELO_GUIA, fondo, torre, MARCAS_VERDAD } from './escena';
import { CELULAR, LIBRO, LUPA_SIMBOLO } from './objetos';
import { medalla } from './medallas';
import type { Forma } from '../capas';

export function todas_las_piezas(): Record<string, Forma[]> {
  return {
    sofia_lupa: SOFIA.lupa,
    sofia_senala: SOFIA.senala,
    sofia_busto: SOFIA_BUSTO,
    mateo_libreta: MATEO.libreta,
    mateo_levanta: MATEO.levanta,
    mateo_busto: MATEO_BUSTO,
    conejo: CONEJO,
    tortuga: TORTUGA,
    oruga: ORUGA,
    fondo: fondo(),
    suelo_guia: SUELO_GUIA,
    placa_tapa: PLACA_TAPA,
    canas: CANAS_PORTADA,
    torre: torre(),
    marcas: MARCAS_VERDAD,
    libro: LIBRO,
    celular: CELULAR,
    lupa: LUPA_SIMBOLO,
    ...Object.fromEntries(Object.entries(PLANTAS).map(([k, v]) => [`planta_${k}`, v])),
    ...Object.fromEntries(Object.entries(FLORES).map(([k, v]) => [`flor_${k}`, v])),
    ...Object.fromEntries([1, 2, 3, 4].map((n) => [`medalla_${n}`, medalla(n)])),
  };
}

// ids of every gradient and pattern that some piece uses, in either level of detail
export function referencias_usadas(): Set<string> {
  const ids = new Set<string>();
  for (const formas of Object.values(todas_las_piezas())) {
    for (const detalle of ['completo', 'reducido'] as const) {
      for (const id of referencias(capas(formas, { detalle }))) ids.add(id);
    }
  }
  return ids;
}
