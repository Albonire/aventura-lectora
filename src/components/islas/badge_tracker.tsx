import { CheckCircle, Circle } from '@phosphor-icons/react';
import { insignia_de, insignias } from '../../lib/insignias';
import { nombres_detectives, tarea_hecha } from '../../lib/progreso';
import { ruta_pagina } from '../../config/paginas';
import { usar_pasaporte, usar_progreso } from './hooks';
import { Insignia } from './insignia';
import { Superficie } from './ui';

interface Props {
  modo: 'caso' | 'pasaporte';
  unidad?: number;
}

// medal of one case with the list of what is missing, or the whole passport with its four medals
export function BadgeTracker({ modo, unidad }: Props) {
  const progreso = usar_progreso();
  const [pasaporte] = usar_pasaporte();

  if (modo === 'caso') {
    const dato = unidad ? insignia_de(unidad) : undefined;
    if (!dato) return null;
    const ganada = progreso.resueltos.includes(dato.caso);
    return (
      <div
        className="rounded-card border-2 border-ink-black bg-pure-white p-5 md:p-8"
        data-insignia-caso={dato.caso}
      >
        <div className="flex flex-wrap items-center gap-5">
          <Insignia caso={dato.caso} size={104} ganada={ganada} titulo={`Insignia ${dato.nombre}`} />
          <div className="min-w-0 flex-1">
            <p className="interfaz text-body-sm font-medium text-stone-text">
              Insignia de la {dato.estacion === 'Desafío final' ? 'estación' : 'misión'}
            </p>
            <p className="text-heading-sm font-bold leading-tight">{dato.nombre}</p>
            <p role="status" aria-live="polite" className="mt-1 text-body">
              {ganada
                ? `¡Ganaste esta insignia! ${dato.descripcion}`
                : 'Completa estos pasos para ganarla:'}
            </p>
          </div>
        </div>
        <ul className="mt-4 flex flex-col gap-2">
          {dato.tareas.map((t) => {
            const hecha = tarea_hecha(dato.caso, t.id, progreso);
            return (
              <li
                key={t.id}
                className={`flex min-h-11 items-center gap-3 rounded-soft border-2 px-3 py-2 text-body ${
                  hecha ? 'border-ink-black bg-fresh-grass font-medium' : 'border-stone-gray'
                }`}
              >
                {hecha ? (
                  <CheckCircle size={24} weight="fill" aria-hidden="true" className="shrink-0" />
                ) : (
                  <Circle size={24} weight="bold" aria-hidden="true" className="shrink-0" />
                )}
                <span className="flex-1">
                  {t.texto}
                  <span className="sr-only">{hecha ? ' (hecho)' : ' (falta)'}</span>
                </span>
                {!hecha && t.pagina !== 'cerrar' && (
                  <a
                    href={ruta_pagina(dato.caso, t.pagina)}
                    className="interfaz shrink-0 text-body-sm font-medium underline decoration-2 underline-offset-4"
                  >
                    Ir al paso 3
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  const total = insignias.filter((i) => progreso.resueltos.includes(i.caso)).length;
  const nombres = nombres_detectives(pasaporte);
  return (
    <Superficie
      titulo={nombres ? `Pasaporte de ${nombres}` : 'Pasaporte de detective'}
      etiqueta={`${total} de ${insignias.length} insignias`}
    >
      <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4" data-pasaporte-medallas>
        {insignias.map((i) => {
          const ganada = progreso.resueltos.includes(i.caso);
          return (
            <li key={i.caso} className="flex flex-col items-center text-center">
              <Insignia caso={i.caso} size={104} ganada={ganada} />
              <p className="mt-2 text-body font-bold leading-tight">{i.nombre}</p>
              <p className="interfaz text-body-sm text-stone-text">
                {i.estacion}: {ganada ? 'ganada' : 'por ganar'}
              </p>
            </li>
          );
        })}
      </ul>
    </Superficie>
  );
}
