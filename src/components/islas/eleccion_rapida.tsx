import { CheckCircle } from '@phosphor-icons/react';
import type { Opcion } from '../../lib/tipos';
import { usar_almacen } from './hooks';
import { Burbuja } from './personajes';
import { ReadAloud } from './read_aloud';

interface Props {
  unidad: number;
  id: string;
  pregunta: string;
  opciones: Opcion[];
  // short strategy label shown before the question ("predigo", "comparo")
  estrategia?: string;
  quien?: 'sofia' | 'mateo';
  // with "correcta" the choice is checked and a wrong one gets the hint; without it any choice is fine
  correcta?: string;
  acierto?: string;
  pista?: string;
  // answer shown after choosing when there is no right option (a prediction)
  respuesta?: string;
}

// one quick question with big buttons: a prediction before reading or a first comparison
export function EleccionRapida({
  unidad,
  id,
  pregunta,
  opciones,
  estrategia,
  quien = 'sofia',
  correcta,
  acierto,
  pista,
  respuesta,
}: Props) {
  const [elegida, set_elegida] = usar_almacen<string>(`eleccion:${unidad}:${id}`, '');
  const hay_clave = Boolean(correcta);
  const acerto = hay_clave && elegida === correcta;
  const fallo = hay_clave && elegida !== '' && !acerto;

  return (
    <div className="rounded-card border-2 border-ink-black bg-pure-white p-5 md:p-8">
      <Burbuja quien={quien}>
        {estrategia && (
          <span className="interfaz mr-2 inline-block rounded-pill border-2 border-ink-black bg-sunshine-pop px-3 py-0.5 text-body-sm font-bold">
            {estrategia}
          </span>
        )}
        <span className="text-body font-medium">{pregunta}</span>
      </Burbuja>
      <ReadAloud
        texto={`${pregunta} ${opciones.map((o) => o.texto).join('. ')}`}
        tamano="chico"
        className="mt-4"
      />
      <ul className="mt-4 grid gap-3 sm:grid-cols-3" aria-label="Opciones">
        {opciones.map((op) => {
          const activa = elegida === op.id;
          return (
            <li key={op.id}>
              <button
                type="button"
                aria-pressed={activa}
                onClick={() => set_elegida(op.id)}
                className={`flex min-h-14 w-full items-center gap-2 rounded-soft border-2 border-ink-black px-4 py-3 text-left text-body transition-colors ${
                  activa ? 'bg-fresh-grass font-medium' : 'bg-pure-white hover:bg-cream-paper'
                }`}
              >
                {activa && <CheckCircle size={22} weight="fill" aria-hidden="true" />}
                <span className="flex-1">{op.texto}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <div role="status" aria-live="polite" className="mt-4 min-h-7">
        {!hay_clave && elegida && respuesta && <p className="text-body">{respuesta}</p>}
        {acerto && <p className="text-body font-medium">{acierto}</p>}
        {fallo && (
          <Burbuja quien="sofia" tono="pista" titulo="Pista de Sofía">
            <p data-pista-sofia>{pista}</p>
          </Burbuja>
        )}
      </div>
    </div>
  );
}
