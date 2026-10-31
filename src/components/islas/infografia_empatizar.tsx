import { useEffect, useState } from 'react';
import {
  cifras,
  citas,
  claves_fuentes,
  coincide_fuente,
  como_podriamos,
  dolores,
  fuentes,
  ganancias,
  insights,
  mapa,
  patrones,
  personas,
  recorrido,
  resumen_por_fuente,
  texto_desafio,
  type FiltroFuente,
  type PerfilPersona,
} from '../../lib/empatizar';
import {
  EscenaPersonaPixel,
  EstudiantePixelMini,
  IconoCuadrantePixel,
  IconoVozPixel,
  MapaRecorridoPixel,
  RetratoEstudianteMapaPixel,
} from './pixel_art_empatizar';

const EVENTO_FUENTE = 'empatizar:cambio-fuente';
const EVENTO_PERSONA = 'empatizar:cambio-persona';

function emitir_fuente(fuente: FiltroFuente) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<FiltroFuente>(EVENTO_FUENTE, { detail: fuente }));
}

function emitir_persona(id_persona: PerfilPersona['id'] | null) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent<PerfilPersona['id'] | null>(EVENTO_PERSONA, { detail: id_persona }),
  );
}

function useFuenteCompartida(): [FiltroFuente, (nueva: FiltroFuente) => void] {
  const [fuente, setFuente] = useState<FiltroFuente>('TODAS');

  useEffect(() => {
    const manejador = (ev: Event) => {
      const custom = ev as CustomEvent<FiltroFuente>;
      if (custom.detail) setFuente(custom.detail);
    };
    window.addEventListener(EVENTO_FUENTE, manejador);
    return () => window.removeEventListener(EVENTO_FUENTE, manejador);
  }, []);

  const cambiar = (nueva: FiltroFuente) => {
    setFuente(nueva);
    emitir_fuente(nueva);
  };

  return [fuente, cambiar];
}

function usePersonaCompartida(): [
  PerfilPersona['id'] | null,
  (nueva: PerfilPersona['id'] | null) => void,
] {
  const [persona, setPersona] = useState<PerfilPersona['id'] | null>(null);

  useEffect(() => {
    const manejador = (ev: Event) => {
      const custom = ev as CustomEvent<PerfilPersona['id'] | null>;
      setPersona(custom.detail ?? null);
    };
    window.addEventListener(EVENTO_PERSONA, manejador);
    return () => window.removeEventListener(EVENTO_PERSONA, manejador);
  }, []);

  const cambiar = (nueva: PerfilPersona['id'] | null) => {
    setPersona(nueva);
    emitir_persona(nueva);
  };

  return [persona, cambiar];
}

export function BarraFiltroFuentes() {
  const [fuente_activa, setFuenteActiva] = useFuenteCompartida();
  const resumen_actual = fuente_activa !== 'TODAS' ? resumen_por_fuente(fuente_activa) : null;

  return (
    <div
      role="region"
      aria-label="Explorador interactivo por fuente documental"
      className="rounded-soft border-2 border-ink-black bg-pure-white p-4"
    >
      <div
        role="group"
        aria-label="Filtrar hallazgos por fuente"
        className="flex flex-wrap items-center gap-2"
      >
        <span className="interfaz mr-1 text-micro font-medium text-stone-text">
          Fuentes de campo:
        </span>
        <button
          type="button"
          aria-pressed={fuente_activa === 'TODAS'}
          onClick={() => setFuenteActiva('TODAS')}
          className={`interfaz min-h-9 rounded-pill border-2 border-ink-black px-3 py-1 text-micro font-medium transition-colors ${
            fuente_activa === 'TODAS'
              ? 'bg-ink-black text-pure-white'
              : 'bg-cream-paper text-ink-black hover:bg-sandstone'
          }`}
        >
          Todas (5)
        </button>
        {claves_fuentes.map((clave) => {
          const info = resumen_por_fuente(clave);
          const activa = fuente_activa === clave;
          return (
            <button
              key={clave}
              type="button"
              aria-pressed={activa}
              onClick={() => setFuenteActiva(activa ? 'TODAS' : clave)}
              className={`interfaz min-h-9 rounded-pill border-2 border-ink-black px-3 py-1 text-micro font-medium transition-colors ${
                activa
                  ? 'bg-sunshine-pop text-ink-black'
                  : 'bg-pure-white text-ink-black hover:bg-cream-paper'
              }`}
            >
              <span className="font-bold">{clave}</span> · {fuentes[clave]} ({info.total})
            </button>
          );
        })}
      </div>

      {resumen_actual && (
        <p
          role="status"
          className="interfaz mt-3 rounded-chip bg-cream-paper px-3 py-2 text-body-sm text-ink-black"
        >
          Resaltando <span className="font-medium">{resumen_actual.total} evidencias</span> de{' '}
          <span className="font-medium">
            {resumen_actual.clave} ({resumen_actual.nombre})
          </span>
          : {resumen_actual.cifras} en datos clave, {resumen_actual.citas} en voces,{' '}
          {resumen_actual.evidencias_mapa} en mapa de empatía, {resumen_actual.pasos_recorrido} en
          recorrido y {resumen_actual.patrones} en patrones.
        </p>
      )}
    </div>
  );
}

export function CifrasInteractivas() {
  const [fuente_activa, setFuenteActiva] = useFuenteCompartida();

  return (
    <div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cifras.map((c) => {
          const destacada =
            fuente_activa !== 'TODAS' && coincide_fuente(c.fuente, fuente_activa);
          return (
            <li
              key={c.id}
              className={`flex flex-col rounded-soft border-2 p-6 transition-colors ${
                destacada
                  ? 'border-ink-black bg-sunshine-pop/35 ring-2 ring-ink-black'
                  : 'border-ink-black bg-pure-white'
              }`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-heading-sm font-medium leading-none tabular-nums">
                  {c.valor}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setFuenteActiva(fuente_activa === c.fuente ? 'TODAS' : c.fuente)
                  }
                  title={`Filtrar por ${fuentes[c.fuente]}`}
                  className="interfaz min-h-8 rounded-pill border border-ink-black bg-cream-paper px-2.5 py-0.5 text-micro font-medium text-ink-black hover:bg-sunshine-pop"
                >
                  {c.fuente}
                </button>
              </div>

              <span className="mt-2 text-body">{c.texto}</span>

              {c.barra !== null && (
                <span
                  className="mt-4 block h-3 w-full overflow-hidden rounded-pill border border-ink-black bg-sandstone"
                  aria-hidden="true"
                >
                  <span
                    className="block h-full bg-fresh-grass"
                    style={{ width: `${c.barra}%` }}
                  />
                </span>
              )}

              {c.ninos_de_13 !== null && (
                <div
                  className="mt-4 rounded-chip border border-hairline-mist bg-cream-paper p-2.5"
                  aria-hidden="true"
                >
                  <div className="grid grid-cols-13 gap-1">
                    {Array.from({ length: 13 }).map((_, idx) => {
                      const activo = idx < (c.ninos_de_13 ?? 0);
                      return <EstudiantePixelMini key={idx} indice={idx} activo={activo} />;
                    })}
                  </div>
                  <span className="interfaz mt-1.5 block text-micro text-stone-text">
                    {c.ninos_de_13} de 13 estudiantes en el aula
                  </span>
                </div>
              )}

              <span className="interfaz mt-auto pt-4 text-micro text-stone-text">
                Fuente: {fuentes[c.fuente]}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 max-w-3xl text-body-sm text-stone-text">
        El 70 % y el 20 % son estimaciones de la docente titular. El grupo es pequeño: cada
        estudiante pesa casi 8 puntos porcentuales.
      </p>
    </div>
  );
}

export function VocesInteractivas() {
  const [fuente_activa, setFuenteActiva] = useFuenteCompartida();

  return (
    <div>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {citas.map((c) => {
          const resaltada =
            fuente_activa !== 'TODAS' && coincide_fuente(c.fuente, fuente_activa);

          return (
            <li
              key={c.id}
              className={`flex flex-col rounded-soft border-2 p-6 transition-colors ${
                resaltada
                  ? 'border-ink-black bg-sunshine-pop/35 ring-2 ring-ink-black'
                  : 'border-ink-black bg-pure-white'
              }`}
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <IconoVozPixel actor={c.actor} />
                  <span className="interfaz text-micro font-medium text-stone-text">
                    {c.actor === 'estudiantes'
                      ? 'Estudiantes'
                      : c.actor === 'docente'
                        ? 'Docente titular'
                        : 'Familias'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFuenteActiva(fuente_activa === c.fuente ? 'TODAS' : c.fuente)
                  }
                  className="interfaz min-h-8 rounded-pill border border-ink-black bg-cream-paper px-2.5 py-0.5 text-micro font-medium text-ink-black hover:bg-sunshine-pop"
                >
                  {c.fuente}
                </button>
              </div>
              <blockquote className="text-subheading leading-snug">“{c.texto}”</blockquote>
              <p className="interfaz mt-auto pt-4 text-body-sm font-medium">{c.quien}</p>
              <p className="interfaz text-micro text-stone-text">{fuentes[c.fuente]}</p>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 max-w-3xl text-body-sm text-stone-text">
        Las frases de los estudiantes las recuerda y las reporta la docente. No son grabaciones
        textuales.
      </p>
    </div>
  );
}

export function MapaEmpatiaInteractivo() {
  const [fuente_activa] = useFuenteCompartida();

  return (
    <div>
      {/* Encabezado central del sujeto del Mapa de Empatía */}
      <div className="mb-4 flex items-center gap-4 rounded-soft border-2 border-ink-black bg-pure-white p-4">
        <RetratoEstudianteMapaPixel />
        <div>
          <p className="interfaz text-micro font-medium text-stone-text">
            Centro del mapa de empatía
          </p>
          <p className="text-subheading font-medium">
            Estudiante de 5.º de la I.E. Jorge Eliécer Gaitán (10 a 11 años)
          </p>
        </div>
      </div>

      {/* Cuatro cuadrantes siempre visibles como infografía editorial */}
      <div className="grid gap-4 md:grid-cols-2">
        {mapa.map((m) => (
          <article
            key={m.id}
            className="flex flex-col rounded-soft border-2 border-ink-black bg-pure-white p-6"
          >
            <div className="flex items-start gap-3.5">
              <IconoCuadrantePixel id={m.id} />
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-subheading font-medium">{m.titulo}</h3>
                  <span className="interfaz rounded-chip border border-ink-black bg-cream-paper px-2.5 py-0.5 text-micro font-medium text-ink-black">
                    {m.tipo_evidencia}
                  </span>
                </div>
                <p className="mt-1 text-body text-stone-text">{m.resumen}</p>
              </div>
            </div>

            <ul className="mt-4 space-y-2.5 border-t border-hairline-mist pt-4">
              {m.items.map(([t, f], idx) => {
                const resalta =
                  fuente_activa !== 'TODAS' && coincide_fuente(f, fuente_activa);
                return (
                  <li
                    key={idx}
                    className={`flex items-baseline justify-between gap-3 rounded-chip px-2 py-1 text-body ${
                      resalta ? 'bg-sunshine-pop/45 font-medium' : ''
                    }`}
                  >
                    <span>{t}</span>
                    <span className="interfaz shrink-0 text-micro font-medium text-stone-text">
                      {f}
                    </span>
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-soft border-2 border-ink-black bg-pure-white p-6">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-subheading font-medium">Dolores</h3>
            <span className="interfaz text-micro font-medium text-stone-text">
              6 barreras detectadas
            </span>
          </div>
          <ul className="mt-3 flex flex-wrap gap-2">
            {dolores.map((d) => (
              <li
                key={d}
                className="rounded-chip border-2 border-ink-black bg-cream-paper px-3 py-1 text-body-sm"
              >
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-soft border-2 border-ink-black bg-pure-white p-6">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-subheading font-medium">Ganancias</h3>
            <span className="interfaz text-micro font-medium text-stone-text">
              6 motores de motivación
            </span>
          </div>
          <ul className="mt-3 flex flex-wrap gap-2">
            {ganancias.map((g) => (
              <li
                key={g}
                className="rounded-chip border-2 border-ink-black bg-fresh-grass px-3 py-1 text-body-sm font-medium text-ink-black"
              >
                {g}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-6 max-w-3xl text-body-sm text-stone-text">
        Dice y hace salen de lo observado. Piensa y siente son inferencias del equipo a partir de
        esa evidencia.
      </p>
    </div>
  );
}

export function RecorridoInteractivo() {
  const [fuente_activa] = useFuenteCompartida();
  const [paso_activo, setPasoActivo] = useState<number>(1);
  const actual = recorrido[paso_activo] ?? recorrido[0];

  const color_insignia =
    actual.emocion >= 4
      ? 'bg-fresh-grass'
      : actual.emocion <= 2
        ? 'bg-coral-pop'
        : 'bg-sunshine-pop';

  return (
    <div>
      {/* Barra de estado del paso activo en el camino pixel-art */}
      <div
        role="region"
        aria-label="Detalle del paso seleccionado en el recorrido"
        className="mb-4 flex flex-col justify-between gap-4 rounded-soft border-2 border-ink-black bg-pure-white p-5 md:flex-row md:items-center"
      >
        <div className="flex items-start gap-4">
          <span
            className={`interfaz flex size-12 shrink-0 items-center justify-center rounded-chip border-2 border-ink-black text-subheading font-bold tabular-nums ${color_insignia}`}
          >
            {actual.emocion}/5
          </span>
          <div>
            <p className="interfaz text-micro font-medium text-stone-text">
              Estación {paso_activo + 1} de {recorrido.length} · {actual.etiqueta_emocion} · Fuente:{' '}
              {fuentes[actual.fuente]} ({actual.fuente})
            </p>
            <h3 className="mt-0.5 text-subheading font-medium">
              Paso {paso_activo + 1}: {actual.paso}
            </h3>
            <p className="mt-1 text-body">{actual.hace}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setPasoActivo((p) => (p - 1 + recorrido.length) % recorrido.length)
            }
            className="interfaz min-h-10 rounded-pill border-2 border-ink-black bg-cream-paper px-4 py-1.5 text-body-sm font-medium hover:bg-sandstone"
          >
            Paso anterior
          </button>
          <button
            type="button"
            onClick={() => setPasoActivo((p) => (p + 1) % recorrido.length)}
            className="interfaz min-h-10 rounded-pill border-2 border-ink-black bg-sunshine-pop px-4 py-1.5 text-body-sm font-medium hover:bg-fresh-grass"
          >
            Paso siguiente
          </button>
        </div>
      </div>

      {/* Escenario horizontal desplazable en Pixel-Art con personaje animado */}
      <div
        className="overflow-x-auto rounded-card border-2 border-ink-black bg-pure-white p-4 md:p-6"
        tabIndex={0}
        role="region"
        aria-label="Recorrido en pixel-art con desplazamiento horizontal"
      >
        <div className="min-w-[44rem]">
          <MapaRecorridoPixel
            paso_activo={paso_activo}
            fuente_activa={fuente_activa}
            onSelectPaso={setPasoActivo}
          />

          <ol className="mt-4 grid grid-cols-7 gap-2.5">
            {recorrido.map((r, i) => {
              const es_activo = paso_activo === i;
              const coincide_f =
                fuente_activa !== 'TODAS' && coincide_fuente(r.fuente, fuente_activa);
              return (
                <li key={r.paso} className="text-body-sm">
                  <button
                    type="button"
                    aria-pressed={es_activo}
                    onClick={() => setPasoActivo(i)}
                    className={`flex h-full w-full flex-col rounded-soft border-2 p-2.5 text-left transition-colors ${
                      es_activo
                        ? 'border-ink-black bg-sunshine-pop/50'
                        : coincide_f
                          ? 'border-ink-black bg-cream-paper'
                          : 'border-hairline-mist bg-pure-white hover:border-ink-black hover:bg-cream-paper'
                    }`}
                  >
                    <span className="interfaz block text-micro font-medium text-stone-text">
                      Paso {i + 1} · {r.fuente}
                    </span>
                    <span className="mt-0.5 block font-medium leading-snug">{r.paso}</span>
                    <span className="mt-1 block text-micro leading-snug text-stone-text">
                      {r.hace}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <p className="mt-6 max-w-3xl text-body-sm text-stone-text">
        Toca cualquier estación (1 a 7) para mover al estudiante por el sendero desde la escuela
        rural hasta la finca. Verde: momento alto; amarillo: medio; coral: bajo.
      </p>
    </div>
  );
}

export function MatrizTriangulacion() {
  const [fuente_activa, setFuenteActiva] = useFuenteCompartida();

  return (
    <div>
      <div
        className="overflow-x-auto rounded-card border-2 border-ink-black bg-pure-white p-3 md:p-6"
        tabIndex={0}
        role="region"
        aria-label="Tabla con desplazamiento horizontal"
      >
        <table className="w-full min-w-[36rem] text-left text-body-sm">
          <caption className="sr-only">Qué fuentes respaldan cada patrón</caption>
          <thead>
            <tr className="border-b-2 border-ink-black">
              <th scope="col" className="px-3 py-3 font-medium">
                Patrón
              </th>
              {claves_fuentes.map((k) => {
                const col_activa = fuente_activa === k;
                return (
                  <th
                    key={k}
                    scope="col"
                    className={`px-2 py-3 text-center font-medium ${
                      col_activa ? 'bg-sunshine-pop/50' : ''
                    }`}
                    title={fuentes[k]}
                  >
                    <button
                      type="button"
                      onClick={() => setFuenteActiva(col_activa ? 'TODAS' : k)}
                      aria-label={`Filtrar por fuente ${k}: ${fuentes[k]}`}
                      className="interfaz min-h-9 min-w-9 rounded-chip border border-ink-black bg-cream-paper px-2 py-1 font-bold hover:bg-sunshine-pop"
                    >
                      {k}
                    </button>
                  </th>
                );
              })}
              <th scope="col" className="px-3 py-3 text-right font-medium">
                Respaldo
              </th>
            </tr>
          </thead>
          <tbody>
            {patrones.map((p) => {
              const fila_resaltada =
                fuente_activa !== 'TODAS' && coincide_fuente(p.f, fuente_activa);
              return (
                <tr
                  key={p.id}
                  className={`border-b border-hairline-mist last:border-0 ${
                    fila_resaltada ? 'bg-sunshine-pop/30 font-medium' : ''
                  }`}
                >
                  <th scope="row" className="px-3 py-3 font-normal">
                    {p.patron}
                  </th>
                  {claves_fuentes.map((k) => {
                    const tiene = p.f.includes(k);
                    return (
                      <td
                        key={k}
                        className={`px-2 py-3 text-center ${
                          fuente_activa === k ? 'bg-sunshine-pop/25' : ''
                        }`}
                      >
                        {tiene ? (
                          <span className="inline-block size-4 rounded-chip border-2 border-ink-black bg-fresh-grass">
                            <span className="sr-only">Sí</span>
                          </span>
                        ) : (
                          <span className="sr-only">No</span>
                        )}
                      </td>
                    );
                  })}
                  <td className="interfaz px-3 py-3 text-right text-micro text-stone-text tabular-nums">
                    {p.f.length} de 5 fuentes
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-body-sm text-stone-text">
        {Object.entries(fuentes)
          .map(([k, v]) => `${k}: ${v}`)
          .join(' · ')}
      </p>
    </div>
  );
}

export function PerfilesInteractivos() {
  const [persona_activa, setPersonaActiva] = usePersonaCompartida();

  return (
    <div>
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {personas.map((p) => {
          const seleccionada = persona_activa === p.id;
          return (
            <li
              key={p.id}
              className={`flex flex-col rounded-soft border-2 p-5 transition-colors ${
                seleccionada
                  ? 'border-ink-black bg-sunshine-pop/35 ring-2 ring-ink-black'
                  : 'border-ink-black bg-pure-white'
              }`}
            >
              <EscenaPersonaPixel id={p.id} />

              <div className="mt-4 flex items-start justify-between gap-2">
                <div>
                  <span className="interfaz block text-micro font-medium text-stone-text">
                    {p.rol}
                  </span>
                  <h3 className="mt-0.5 text-subheading font-medium">{p.nombre}</h3>
                </div>
                <button
                  type="button"
                  aria-pressed={seleccionada}
                  onClick={() => setPersonaActiva(seleccionada ? null : p.id)}
                  className={`interfaz min-h-8 shrink-0 rounded-pill border border-ink-black px-2.5 py-0.5 text-micro font-medium transition-colors ${
                    seleccionada
                      ? 'bg-ink-black text-pure-white'
                      : 'bg-cream-paper text-ink-black hover:bg-sunshine-pop'
                  }`}
                >
                  {seleccionada ? 'Activo' : 'Ver retos'}
                </button>
              </div>

              <p className="mt-3 text-body">{p.texto}</p>

              <p className="mt-auto pt-4">
                <span className="block rounded-chip border border-ink-black bg-sandstone p-3 text-body-sm">
                  <span className="font-medium">Necesita:</span> {p.necesita}
                </span>
              </p>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 max-w-3xl text-body-sm text-stone-text">
        Los nombres son ficticios. Cada perfil reúne rasgos observados en varios estudiantes o
        familias del grupo.
      </p>
    </div>
  );
}

export function DefinirInteractivo() {
  const [persona_activa, setPersonaActiva] = usePersonaCompartida();
  const perfil_seleccionado = personas.find((p) => p.id === persona_activa) ?? null;

  return (
    <div>
      {perfil_seleccionado && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-soft border-2 border-ink-black bg-sunshine-pop px-4 py-2.5">
          <span className="interfaz text-body-sm font-medium">
            Mostrando hallazgos vinculados con: {perfil_seleccionado.nombre} (
            {perfil_seleccionado.rol})
          </span>
          <button
            type="button"
            onClick={() => setPersonaActiva(null)}
            className="interfaz min-h-8 rounded-pill border border-ink-black bg-pure-white px-3 py-0.5 text-micro font-medium hover:bg-cream-paper"
          >
            Mostrar todos sin resaltar
          </button>
        </div>
      )}

      <ol className="grid gap-3 md:grid-cols-2">
        {insights.map((ins, i) => {
          const vinculado_a_persona =
            perfil_seleccionado?.insights_vinculados.includes(i) ?? false;

          return (
            <li
              key={ins.titulo}
              className={`flex items-start gap-4 rounded-soft border-2 p-5 transition-colors ${
                vinculado_a_persona
                  ? 'border-ink-black bg-sunshine-pop/45 ring-2 ring-ink-black'
                  : 'border-ink-black bg-pure-white'
              }`}
            >
              <span
                className="flex size-10 shrink-0 items-center justify-center rounded-chip border-2 border-ink-black bg-sunshine-pop font-bold tabular-nums"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span>
                <span className="block text-body font-medium leading-snug">{ins.titulo}</span>
                <span className="interfaz mt-1 block text-micro text-stone-text">
                  Prioridad {ins.prioridad.toLowerCase()}
                  {vinculado_a_persona && perfil_seleccionado
                    ? ` · Responde a ${perfil_seleccionado.nombre}`
                    : ''}
                </span>
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 rounded-card border-2 border-ink-black bg-fresh-grass p-6 md:p-10">
        <p className="interfaz text-body-sm font-medium">Desafío</p>
        <p className="mt-2 text-subheading leading-snug md:text-heading-sm">{texto_desafio}</p>
      </div>

      <h3 className="mt-12 text-heading-sm leading-tight">¿Cómo podríamos...?</h3>
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {como_podriamos.map((c, idx) => {
          const vinculada =
            perfil_seleccionado?.preguntas_vinculadas.includes(idx) ?? false;
          return (
            <li
              key={c.texto}
              className={`rounded-soft border-2 border-ink-black p-6 text-body transition-colors ${
                c.principal
                  ? 'bg-sunshine-pop'
                  : vinculada
                    ? 'bg-cream-paper ring-2 ring-ink-black'
                    : 'bg-pure-white'
              }`}
            >
              {(c.principal || (vinculada && perfil_seleccionado)) && (
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  {c.principal && (
                    <span className="interfaz inline-block rounded-chip border border-ink-black bg-pure-white px-2.5 py-0.5 text-micro font-medium">
                      Pregunta priorizada
                    </span>
                  )}
                  {vinculada && perfil_seleccionado && (
                    <span className="interfaz inline-block rounded-chip border border-ink-black bg-fresh-grass px-2.5 py-0.5 text-micro font-medium">
                      Clave para {perfil_seleccionado.nombre}
                    </span>
                  )}
                </div>
              )}
              {c.texto}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
