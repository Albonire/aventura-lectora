import { useEffect } from 'react';
import { CheckCircle, CheckSquare, Square } from '@phosphor-icons/react';
import type { TorreGuardada } from '../../lib/tipos';
import {
  TORRE_VACIA,
  armar_torre,
  campo_completo,
  chequeo_completo,
  iniciador_de,
  piso_completo,
  torre_completa,
  type PisoTorre,
} from '../../lib/torre';
import { marcar_tarea } from '../../lib/progreso';
import { usar_almacen, usar_movimiento } from './hooks';
import { Burbuja } from './personajes';
import { ReadAloud } from './read_aloud';
import { Superficie, campo_texto } from './ui';

interface Props {
  unidad: number;
  situaciones: { id: string; texto: string }[];
  // base first, top last
  pisos: PisoTorre[];
  autochequeo: { id: string; texto: string }[];
}

const FONDO_PISO: Record<string, string> = {
  base: 'bg-coral-soft',
  centro: 'bg-sky-soft',
  cima: 'bg-sunshine-pop',
};

// guided builder of the argument tower: three floors, each with sentence starters to choose,
// a short line to finish the sentence and an example. No empty text area.
export function TorreArgumentos({ unidad, situaciones, pisos, autochequeo }: Props) {
  const [torre, set_torre, listo] = usar_almacen<TorreGuardada>('torre', TORRE_VACIA);
  const movimiento = usar_movimiento();
  const datos: TorreGuardada = { ...TORRE_VACIA, ...torre };

  const completa = torre_completa(pisos, datos);
  const revisada = completa && chequeo_completo(autochequeo, datos);
  const texto = armar_torre(pisos, datos);

  useEffect(() => {
    if (!listo) return;
    if (completa) marcar_tarea(unidad, 'torre');
    if (revisada) marcar_tarea(unidad, 'autochequeo');
    if (completa || revisada) document.dispatchEvent(new CustomEvent('progreso:cambio'));
  }, [listo, completa, revisada, unidad]);

  const cambiar = (cambio: Partial<TorreGuardada>) => set_torre((t) => ({ ...TORRE_VACIA, ...t, ...cambio }));

  function alternar_chequeo(id: string) {
    const actual = datos.chequeo;
    cambiar({ chequeo: actual.includes(id) ? actual.filter((x) => x !== id) : [...actual, id] });
  }

  return (
    <Superficie tipo="escribe" id="constructor" titulo="Arma tu torre de argumentos">
      <fieldset>
        <legend className="text-body font-medium">Primero, elige de qué vas a opinar</legend>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {situaciones.map((s) => (
            <label
              key={s.id}
              className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-soft border-2 border-ink-black px-3 py-2 text-body ${
                datos.situacion === s.id ? 'bg-fresh-grass font-medium' : 'bg-pure-white hover:bg-cream-paper'
              }`}
            >
              <input
                type="radio"
                name="torre-situacion"
                className="size-5 shrink-0 accent-ink-black"
                checked={datos.situacion === s.id}
                onChange={() => cambiar({ situacion: s.id })}
              />
              <span>{s.texto}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* the tower itself: the top is drawn first because a tower is read from the ground up */}
      <div className="mt-8" aria-hidden="true">
        <p className="interfaz mb-2 text-body-sm font-medium text-stone-text">Tu torre</p>
        <div className="mx-auto flex max-w-sm flex-col items-center gap-1.5">
          {[...pisos].reverse().map((p, i) => {
            const hecho = piso_completo(p, datos);
            const ancho = ['w-3/5', 'w-4/5', 'w-full'][i] ?? 'w-full';
            return (
              <div
                key={`${p.id}-${hecho}`}
                className={`interfaz flex min-h-12 ${ancho} items-center justify-center rounded-soft border-2 px-3 text-center text-body-sm font-bold ${
                  hecho
                    ? `${FONDO_PISO[p.id] ?? 'bg-sandstone'} border-ink-black ${movimiento ? 'torre-cae' : ''}`
                    : 'border-dashed border-stone-gray text-stone-text'
                }`}
              >
                {p.nombre}: {p.funcion.charAt(0).toLowerCase() + p.funcion.slice(1)}
              </div>
            );
          })}
        </div>
      </div>

      <ol className="mt-8 flex flex-col gap-6">
        {pisos.map((p, numero) => (
          <li key={p.id} className="rounded-soft border-2 border-ink-black p-4 md:p-5">
            <p className="flex flex-wrap items-center gap-2">
              <span
                className={`interfaz rounded-pill border-2 border-ink-black px-3 py-0.5 text-body-sm font-bold ${FONDO_PISO[p.id] ?? 'bg-sandstone'}`}
              >
                Piso {numero + 1}. {p.nombre}
              </span>
              <span className="text-body font-bold">{p.funcion}</span>
              {piso_completo(p, datos) && (
                <span className="interfaz flex items-center gap-1 text-body-sm font-medium">
                  <CheckCircle size={20} weight="fill" aria-hidden="true" /> Listo
                </span>
              )}
            </p>
            <p className="mt-1 text-body text-stone-text">{p.pregunta}</p>

            {p.campos.map((c) => {
              const inicio = iniciador_de(c, datos);
              return (
                <div key={c.id} className="mt-4">
                  {c.iniciadores.length > 1 ? (
                    <fieldset>
                      <legend className="interfaz text-body-sm font-medium">
                        Elige cómo empieza tu frase
                      </legend>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {c.iniciadores.map((ini) => (
                          <label
                            key={ini}
                            className={`interfaz flex min-h-11 cursor-pointer items-center gap-2 rounded-pill border-2 border-ink-black px-4 text-body-sm font-medium ${
                              inicio === ini ? 'bg-ink-black text-cream-paper' : 'bg-pure-white hover:bg-cream-paper'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`iniciador-${c.id}`}
                              className="sr-only"
                              checked={inicio === ini}
                              onChange={() =>
                                cambiar({ iniciadores: { ...datos.iniciadores, [c.id]: ini } })
                              }
                            />
                            {ini}...
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  ) : null}
                  <label htmlFor={`torre-${c.id}`} className="mt-3 block text-body font-bold">
                    {inicio}...
                  </label>
                  <input
                    id={`torre-${c.id}`}
                    type="text"
                    autoComplete="off"
                    maxLength={160}
                    placeholder="Termina la frase con tus palabras"
                    className={`${campo_texto} mt-2`}
                    value={datos.textos[c.id] ?? ''}
                    onChange={(e) =>
                      cambiar({ textos: { ...datos.textos, [c.id]: e.target.value } })
                    }
                    aria-describedby={`torre-${c.id}-ejemplo`}
                  />
                  <p id={`torre-${c.id}-ejemplo`} className="mt-2 text-body-sm text-stone-text">
                    Ejemplo: {c.ejemplo}
                    {campo_completo(c, datos) ? '' : ' Escribe al menos tres palabras.'}
                  </p>
                </div>
              );
            })}
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-soft bg-cream-paper p-5">
        <h4 className="text-subheading font-medium">Tu torre en palabras</h4>
        <p data-torre-texto className="mt-2 max-w-reading text-reading">
          {texto || 'Cuando termines tus frases, aquí se arma tu torre.'}
        </p>
        {texto && <ReadAloud texto={texto} className="mt-3" />}
      </div>

      <fieldset className="mt-8" disabled={!completa}>
        <legend className="text-subheading font-medium">Revisa tu torre</legend>
        <p className="mt-1 text-body-sm text-stone-text">
          {completa
            ? 'Lee tu torre y marca lo que sí lograste.'
            : 'Termina los tres pisos para poder revisarla.'}
        </p>
        <ul className="mt-3 flex flex-col gap-2">
          {autochequeo.map((punto, i) => {
            const marcado = datos.chequeo.includes(punto.id);
            return (
              <li key={punto.id}>
                <label
                  className={`flex min-h-12 items-center gap-3 rounded-soft border-2 border-ink-black px-4 py-2 text-body ${
                    completa ? 'cursor-pointer' : 'opacity-60'
                  } ${marcado ? 'bg-fresh-grass font-medium' : 'bg-pure-white'}`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={marcado}
                    onChange={() => alternar_chequeo(punto.id)}
                  />
                  {marcado ? (
                    <CheckSquare size={24} weight="fill" aria-hidden="true" />
                  ) : (
                    <Square size={24} weight="bold" aria-hidden="true" />
                  )}
                  <span>
                    {i + 1}. {punto.texto}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <div role="status" aria-live="polite" className="mt-5 min-h-7">
        {revisada && (
          <Burbuja quien="mateo">
            <p className="font-medium">
              ¡Tu torre quedó firme! Tiene una postura, dos razones y un ejemplo. Léela en voz alta a
              tus compañeros.
            </p>
          </Burbuja>
        )}
      </div>
    </Superficie>
  );
}
