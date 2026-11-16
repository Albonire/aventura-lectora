import { leer, guardar } from './almacen';
import { caso_completo, clave_tarea } from './insignias';

export interface Progreso {
  // cases whose medal is already won
  resueltos: number[];
  visitados: number[];
  // pages already read, as "caso/pagina" (for example "2/pistas")
  paginas_leidas: string[];
  // tasks already done, as "caso:tarea" (for example "1:receta")
  tareas: string[];
  ultimo: { ruta: string; seccion: string } | null;
}

// "ruta" replaces the "progreso" key of the five case version, whose case numbers mean something else now
const CLAVE = 'ruta';

const VACIO: Progreso = {
  resueltos: [],
  visitados: [],
  paginas_leidas: [],
  tareas: [],
  ultimo: null,
};

const lista = <T>(valor: unknown): T[] => (Array.isArray(valor) ? (valor as T[]) : []);

export function leer_progreso(): Progreso {
  const dato = leer<Partial<Progreso>>(CLAVE, VACIO);
  return {
    resueltos: lista<number>(dato.resueltos),
    visitados: lista<number>(dato.visitados),
    paginas_leidas: lista<string>(dato.paginas_leidas),
    tareas: lista<string>(dato.tareas),
    ultimo: dato.ultimo ?? null,
  };
}

function actualizar(cambio: (p: Progreso) => Progreso): Progreso {
  const nuevo = cambio(leer_progreso());
  guardar(CLAVE, nuevo);
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

// a task of a case is done; when it was the last one, the medal of the case is won
export function marcar_tarea(caso: number, tarea: string): Progreso {
  return actualizar((p) => {
    const clave = clave_tarea(caso, tarea);
    const tareas = p.tareas.includes(clave) ? p.tareas : [...p.tareas, clave];
    const gana = caso_completo(caso, tareas) && !p.resueltos.includes(caso);
    return {
      ...p,
      tareas,
      resueltos: gana ? [...p.resueltos, caso].sort() : p.resueltos,
    };
  });
}

export function tarea_hecha(caso: number, tarea: string, p: Progreso): boolean {
  return p.tareas.includes(clave_tarea(caso, tarea));
}

export function marcar_pagina_leida(id: string): Progreso {
  return actualizar((p) =>
    p.paginas_leidas.includes(id) ? p : { ...p, paginas_leidas: [...p.paginas_leidas, id] },
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

// the passport of station 00: who plays (alone or in a pair of detectives)
export interface Pasaporte {
  activo: boolean;
  modo: 'solo' | 'pareja';
  nombres: string[];
  fecha: string;
}

export const PASAPORTE_VACIO: Pasaporte = { activo: false, modo: 'solo', nombres: ['', ''], fecha: '' };

// "Ana" or "Ana y Luis"
export function nombres_detectives(p: Pick<Pasaporte, 'modo' | 'nombres'>): string {
  const limpios = (p.modo === 'pareja' ? p.nombres.slice(0, 2) : p.nombres.slice(0, 1))
    .map((n) => (n ?? '').trim())
    .filter(Boolean);
  return limpios.join(' y ');
}
