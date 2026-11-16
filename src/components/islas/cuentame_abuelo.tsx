import { useEffect } from 'react';
import { CheckCircle, Printer } from '@phosphor-icons/react';
import type { RelatoFamiliar } from '../../lib/tipos';
import { marcar_tarea } from '../../lib/progreso';
import { usar_almacen } from './hooks';
import { Burbuja } from './personajes';
import { ReadAloud } from './read_aloud';
import { Superficie, area_texto, boton_reto, campo_texto } from './ui';

interface Campo {
  id: string;
  etiqueta: string;
  ayuda: string;
  lineas: number;
}

interface Props {
  unidad: number;
  titulo: string;
  instruccion: string;
  campos: Campo[];
  // printable half letter sheet for the homes without mobile data
  ruta_libreta: string;
}

export const RELATO_VACIO: RelatoFamiliar = { quien: '', trama: '', ensenanza: '' };

const MINIMOS: Record<string, number> = { quien: 2, trama: 12, ensenanza: 8 };

export function relato_completo(r: RelatoFamiliar): boolean {
  return (
    r.quien.trim().length >= MINIMOS.quien &&
    r.trama.trim().length >= MINIMOS.trama &&
    r.ensenanza.trim().length >= MINIMOS.ensenanza
  );
}

// family challenge of mission 2 in its two forms: three short fields on the screen,
// or the paper sheet "Libreta de campo de Mateo" that is filled at home and typed here the next day
export function CuentameAbuelo({ unidad, titulo, instruccion, campos, ruta_libreta }: Props) {
  const [relato, set_relato, listo] = usar_almacen<RelatoFamiliar>('abuelo', RELATO_VACIO);
  const datos: RelatoFamiliar = { ...RELATO_VACIO, ...relato };
  const completo = relato_completo(datos);

  useEffect(() => {
    if (!listo || !completo) return;
    marcar_tarea(unidad, 'abuelo');
    document.dispatchEvent(new CustomEvent('progreso:cambio'));
  }, [listo, completo, unidad]);

  const cambiar = (id: string, valor: string) =>
    set_relato((r) => ({ ...RELATO_VACIO, ...r, [id]: valor }));

  return (
    <Superficie tipo="conversa" titulo={titulo} etiqueta="Reto familiar">
      <Burbuja quien="mateo">
        <p>{instruccion}</p>
      </Burbuja>
      <ReadAloud texto={instruccion} tamano="chico" className="mt-3" />

      <div className="mt-6 rounded-soft border-2 border-ink-black bg-cream-paper p-4 md:p-5">
        <p className="text-body font-bold">¿En tu casa no hay internet?</p>
        <p className="mt-1 text-body">
          Lleva la ficha de papel, llénala con tu familia y regístrala aquí mañana en el salón.
        </p>
        <a href={ruta_libreta} className={`${boton_reto} mt-3 text-left`} data-libreta>
          <Printer size={22} weight="bold" aria-hidden="true" />
          <span>Imprimir o ver la ficha: Libreta de campo de Mateo (sin internet)</span>
        </a>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        {campos.map((c) => (
          <div key={c.id}>
            <label htmlFor={`abuelo-${c.id}`} className="block text-body font-bold">
              {c.etiqueta}
            </label>
            <p id={`abuelo-${c.id}-ayuda`} className="text-body-sm text-stone-text">
              {c.ayuda}
            </p>
            {c.lineas > 1 ? (
              <textarea
                id={`abuelo-${c.id}`}
                rows={c.lineas}
                maxLength={400}
                className={`${area_texto} mt-2`}
                aria-describedby={`abuelo-${c.id}-ayuda`}
                value={(datos as unknown as Record<string, string>)[c.id] ?? ''}
                onChange={(e) => cambiar(c.id, e.target.value)}
              />
            ) : (
              <input
                id={`abuelo-${c.id}`}
                type="text"
                autoComplete="off"
                maxLength={80}
                className={`${campo_texto} mt-2`}
                aria-describedby={`abuelo-${c.id}-ayuda`}
                value={(datos as unknown as Record<string, string>)[c.id] ?? ''}
                onChange={(e) => cambiar(c.id, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      <label className="mt-5 flex min-h-11 cursor-pointer items-center gap-3 text-body">
        <input
          type="checkbox"
          className="size-5 accent-ink-black"
          checked={Boolean(datos.en_papel)}
          onChange={(e) => set_relato((r) => ({ ...RELATO_VACIO, ...r, en_papel: e.target.checked }))}
        />
        Lo traje escrito en la ficha de papel
      </label>

      <p role="status" aria-live="polite" className="mt-4 min-h-7 text-body font-medium">
        {completo ? (
          <span className="flex items-start gap-2">
            <CheckCircle size={24} weight="fill" aria-hidden="true" className="mt-0.5 shrink-0" />
            Relato registrado. Se guarda solo en este aparato y lo vas a compartir en el círculo de
            lectura.
          </span>
        ) : (
          'Responde las tres preguntas para registrar tu relato.'
        )}
      </p>
    </Superficie>
  );
}
