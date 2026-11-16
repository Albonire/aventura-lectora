import { useCallback, useEffect, useRef, useState } from 'react';
import { guardar, leer } from '../../lib/almacen';
import {
  PASAPORTE_VACIO,
  leer_progreso,
  type Pasaporte,
  type Progreso,
} from '../../lib/progreso';

const EVENTO = 'almacen:cambio';

// state persisted in localStorage. The first render uses the default so server and client match.
export function usar_almacen<T>(clave: string, por_defecto: T) {
  const [valor, set_valor] = useState<T>(por_defecto);
  const [listo, set_listo] = useState(false);
  const valor_ref = useRef(valor);
  valor_ref.current = valor;

  useEffect(() => {
    set_valor(leer<T>(clave, por_defecto));
    set_listo(true);
    const al_cambiar = (e: Event) => {
      const detalle = (e as CustomEvent<{ clave: string; origen: unknown }>).detail;
      if (detalle.clave === clave && detalle.origen !== valor_ref) {
        set_valor(leer<T>(clave, por_defecto));
      }
    };
    window.addEventListener(EVENTO, al_cambiar);
    return () => window.removeEventListener(EVENTO, al_cambiar);
  }, [clave]);

  const actualizar = useCallback(
    (nuevo: T | ((previo: T) => T)) => {
      const siguiente =
        typeof nuevo === 'function' ? (nuevo as (previo: T) => T)(valor_ref.current) : nuevo;
      valor_ref.current = siguiente;
      set_valor(siguiente);
      guardar(clave, siguiente);
      window.dispatchEvent(new CustomEvent(EVENTO, { detail: { clave, origen: valor_ref } }));
    },
    [clave],
  );

  return [valor, actualizar, listo] as const;
}

// true while the "Movimiento" switch is on and the system does not ask for reduced motion
export function usar_movimiento(): boolean {
  const [movimiento, set_movimiento] = useState(false);
  useEffect(() => {
    const leer_estado = () =>
      set_movimiento(document.documentElement.getAttribute('data-movimiento') !== 'no');
    leer_estado();
    document.addEventListener('ajustes:cambio', leer_estado);
    return () => document.removeEventListener('ajustes:cambio', leer_estado);
  }, []);
  return movimiento;
}

// passport of station 00: who plays and whether it is active
export function usar_pasaporte() {
  return usar_almacen<Pasaporte>('pasaporte', PASAPORTE_VACIO);
}

// solved cases and finished tasks, refreshed when an activity marks a task as done
export function usar_progreso() {
  const [progreso, set_progreso] = useState<Progreso>({
    resueltos: [],
    visitados: [],
    paginas_leidas: [],
    tareas: [],
    ultimo: null,
  });
  useEffect(() => {
    const refrescar = () => set_progreso(leer_progreso());
    refrescar();
    document.addEventListener('progreso:cambio', refrescar);
    window.addEventListener('storage', refrescar);
    return () => {
      document.removeEventListener('progreso:cambio', refrescar);
      window.removeEventListener('storage', refrescar);
    };
  }, []);
  return progreso;
}
