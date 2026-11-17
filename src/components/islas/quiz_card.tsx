import { useEffect, useMemo, useRef } from 'react';
import { ArrowCounterClockwise, ArrowRight, CheckCircle, XCircle } from '@phosphor-icons/react';
import type { Pregunta } from '../../lib/tipos';
import {
  es_correcta,
  opciones_barajadas,
  pista_para,
  registrar_intento,
  resumir,
  type Intentos,
} from '../../lib/quiz';
import { marcar_tarea } from '../../lib/progreso';
import { usar_almacen } from './hooks';
import { Burbuja } from './personajes';
import { ReadAloud } from './read_aloud';
import { Chip, Superficie, boton, boton_primario } from './ui';

interface Props {
  preguntas: Pregunta[];
  unidad: number;
  // storage key of this quiz inside the case
  id: string;
  titulo?: string;
  etiqueta?: string;
  // task of the case that is done when every question is solved (see src/lib/insignias.ts)
  tarea?: string;
}

interface Estado {
  intentos: Intentos;
  indice: number;
}

const ESTADO_INICIAL: Estado = { intentos: {}, indice: 0 };

// multiple choice questions. A wrong answer never says only "incorrect": Sofía gives a graded hint
// that names the paragraph or sentence to read again before the next try.
export function QuizCard({
  preguntas,
  unidad,
  id,
  titulo = 'Pon a prueba tu lupa',
  etiqueta,
  tarea,
}: Props) {
  const [estado, set_estado, listo] = usar_almacen<Estado>(`quiz:${unidad}:${id}`, ESTADO_INICIAL);
  const foco = useRef<HTMLDivElement>(null);

  const resumen = useMemo(() => resumir(preguntas, estado.intentos), [preguntas, estado.intentos]);
  const terminado = resumen.resueltas === resumen.total;
  const en_resumen = terminado && estado.indice >= preguntas.length;
  const pregunta = preguntas[Math.min(estado.indice, preguntas.length - 1)];
  const intentos_actual = estado.intentos[pregunta.id] ?? [];
  const resuelta = intentos_actual.includes(pregunta.correcta);
  const pista = pista_para(pregunta, intentos_actual);

  const opciones = useMemo(
    () => opciones_barajadas(pregunta, `${id}${unidad}`),
    [pregunta, id, unidad],
  );

  useEffect(() => {
    if (!listo || !terminado || !tarea) return;
    marcar_tarea(unidad, tarea);
    document.dispatchEvent(new CustomEvent('progreso:cambio'));
  }, [listo, terminado, tarea, unidad]);

  function elegir(opcion_id: string) {
    if (resuelta || intentos_actual.includes(opcion_id)) return;
    set_estado((prev) => ({
      ...prev,
      intentos: registrar_intento(prev.intentos, pregunta.id, opcion_id),
    }));
  }

  function siguiente() {
    set_estado((prev) => ({ ...prev, indice: prev.indice + 1 }));
    requestAnimationFrame(() => foco.current?.focus());
  }

  function repasar() {
    set_estado({ intentos: {}, indice: 0 });
    requestAnimationFrame(() => foco.current?.focus());
  }

  const es_ultima = estado.indice >= preguntas.length - 1;
  const texto_voz = `${pregunta.pregunta} ${opciones
    .map((op, i) => `Opción ${String.fromCharCode(65 + i)}: ${op.texto}`)
    .join(' ')}`;

  return (
    <Superficie tipo="practica" titulo={titulo} etiqueta={etiqueta}>
      <div ref={foco} tabIndex={-1} className="outline-none">
        {en_resumen ? (
          <div>
            <p className="text-subheading font-medium">Resolviste las {resumen.total} preguntas.</p>
            <p className="mt-2 text-body">
              Acertaste {resumen.a_la_primera} a la primera.{' '}
              {resumen.a_la_primera === resumen.total
                ? 'No fallaste ninguna.'
                : 'Las demás las lograste al volver a leer, y así se aprende.'}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" className={boton} onClick={repasar}>
                <ArrowCounterClockwise size={20} weight="bold" aria-hidden="true" />
                Repasar
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="interfaz text-body-sm font-medium text-stone-text">
                Pregunta {estado.indice + 1} de {preguntas.length}
              </p>
              <Chip>{pregunta.nivel}</Chip>
            </div>

            <div
              className="mt-3 flex gap-1.5"
              role="img"
              aria-label={`${resumen.resueltas} de ${resumen.total} resueltas`}
            >
              {preguntas.map((p) => (
                <span
                  key={p.id}
                  className={`h-2 flex-1 rounded-full border border-ink-black ${
                    (estado.intentos[p.id] ?? []).includes(p.correcta)
                      ? 'bg-fresh-grass'
                      : 'bg-cream-paper'
                  }`}
                />
              ))}
            </div>

            <h4 className="mt-6 text-subheading font-medium">{pregunta.pregunta}</h4>
            <ReadAloud texto={texto_voz} tamano="chico" className="mt-3" />

            <ul className="mt-5 flex flex-col gap-3" aria-label="Opciones">
              {opciones.map((op, i) => {
                const probada = intentos_actual.includes(op.id);
                const acierto = probada && es_correcta(pregunta, op.id);
                const fallo = probada && !acierto;
                return (
                  <li key={op.id}>
                    <button
                      type="button"
                      onClick={() => elegir(op.id)}
                      disabled={resuelta && !acierto}
                      aria-disabled={fallo || undefined}
                      className={`flex min-h-14 w-full items-center gap-4 rounded-soft border-2 px-4 py-3 text-left text-body transition-colors ${
                        acierto
                          ? 'border-ink-black bg-fresh-grass'
                          : fallo
                            ? 'border-stone-gray bg-cream-paper text-stone-text'
                            : 'border-ink-black bg-pure-white hover:bg-cream-paper'
                      } ${resuelta && !acierto ? 'opacity-60' : ''}`}
                    >
                      <span
                        className="interfaz flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-ink-black bg-pure-white text-body-sm font-medium text-ink-black"
                        aria-hidden="true"
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1">
                        {op.texto}
                        {acierto && (
                          <span className="interfaz mt-1 flex items-center gap-1 text-body-sm font-medium">
                            <CheckCircle size={20} weight="fill" aria-hidden="true" />
                            Correcta
                          </span>
                        )}
                        {fallo && (
                          <span className="interfaz mt-1 flex items-center gap-1 text-body-sm">
                            <XCircle size={20} weight="fill" aria-hidden="true" />
                            Todavía no
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div role="status" aria-live="polite" className="mt-5 min-h-7">
              {resuelta && (
                <p className="text-body font-medium">¡Muy bien, detective! {pregunta.retro}</p>
              )}
              {!resuelta && pista && (
                <Burbuja
                  quien="sofia"
                  tono="pista"
                  titulo={`Pista de Sofía (${pista.numero} de ${pista.total})`}
                >
                  <p data-pista-sofia>{pista.texto}</p>
                  <p className="mt-1 text-body-sm">Vuelve a leer y prueba con otra opción.</p>
                </Burbuja>
              )}
            </div>

            {resuelta && (
              <div className="mt-4">
                <button type="button" className={boton_primario} onClick={siguiente}>
                  {es_ultima ? 'Ver mi resultado' : 'Siguiente pregunta'}
                  <ArrowRight size={20} weight="bold" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Superficie>
  );
}
