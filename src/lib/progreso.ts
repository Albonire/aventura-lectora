import { leer, guardar } from './almacen';

export interface Progreso {
  resueltos: number[];
  visitados: number[];
  ultimo: { ruta: string; seccion: string } | null;
}

const VACIO: Progreso = { resueltos: [], visitados: [], ultimo: null };

export function leer_progreso(): Progreso {
  const dato = leer<Progreso>('progreso', VACIO);
  return {
    resueltos: Array.isArray(dato.resueltos) ? dato.resueltos : [],
    visitados: Array.isArray(dato.visitados) ? dato.visitados : [],
    ultimo: dato.ultimo ?? null,
  };
}

function actualizar(cambio: (p: Progreso) => Progreso): Progreso {
  const nuevo = cambio(leer_progreso());
  guardar('progreso', nuevo);
  return nuevo;
}

export function marcar_visitado(caso: number): Progreso {
  return actualizar((p) =>
    p.visitados.includes(caso) ? p : { ...p, visitados: [...p.visitados, caso].sort() },
  );
}

export function marcar_resuelto(caso: number): Progreso {
  return actualizar((p) =>
    p.resueltos.includes(caso) ? p : { ...p, resueltos: [...p.resueltos, caso].sort() },
  );
}

export function guardar_lugar(ruta: string, seccion: string): Progreso {
  return actualizar((p) => ({ ...p, ultimo: { ruta, seccion } }));
}

export type EstadoCaso = 'sin_empezar' | 'en_curso' | 'resuelto';

export function estado_de(caso: number, p: Progreso): EstadoCaso {
  if (p.resueltos.includes(caso)) return 'resuelto';
  if (p.visitados.includes(caso)) return 'en_curso';
  return 'sin_empezar';
}
