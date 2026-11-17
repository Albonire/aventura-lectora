import { IdentificationCard, User, UsersThree } from '@phosphor-icons/react';
import { insignias } from '../../lib/insignias';
import { PASAPORTE_VACIO, nombres_detectives, type Pasaporte } from '../../lib/progreso';
import { sitio } from '../../config/sitio';
import { usar_almacen, usar_pasaporte, usar_progreso } from './hooks';
import { Insignia } from './insignia';
import { CaraMateo, CaraSofia } from './personajes';
import { Superficie, boton_primario, campo_texto } from './ui';

interface Props {
  // storage key of the trial clue: the passport opens once it is solved
  clave_prueba: string;
  correcta_prueba: string;
}

// station 00: choose to play alone or as a pair of detectives, write the names and activate the passport.
// The card (carné) and the four empty medal slots appear when it is active.
export function PasaporteAgencia({ clave_prueba, correcta_prueba }: Props) {
  const [pasaporte, set_pasaporte, listo] = usar_pasaporte();
  const [prueba] = usar_almacen<string>(clave_prueba, '');
  const progreso = usar_progreso();
  const datos: Pasaporte = { ...PASAPORTE_VACIO, ...pasaporte };
  const nombres = nombres_detectives(datos);
  const faltan_nombres =
    datos.modo === 'pareja'
      ? datos.nombres.slice(0, 2).some((n) => !(n ?? '').trim())
      : !(datos.nombres[0] ?? '').trim();
  const prueba_lista = prueba === correcta_prueba;

  const cambiar = (cambio: Partial<Pasaporte>) =>
    set_pasaporte((p) => ({ ...PASAPORTE_VACIO, ...p, ...cambio }));

  function cambiar_nombre(indice: number, valor: string) {
    const nombres_nuevos = [...datos.nombres];
    nombres_nuevos[indice] = valor;
    cambiar({ nombres: nombres_nuevos });
  }

  function activar() {
    cambiar({ activo: true, fecha: new Date().toISOString().slice(0, 10) });
  }

  const modos = [
    { id: 'solo' as const, texto: 'Trabajo solo o sola', Icono: User },
    { id: 'pareja' as const, texto: 'Trabajo en pareja de detectives', Icono: UsersThree },
  ];

  return (
    <Superficie tipo="escribe" titulo="Haz tu tarjeta de detective">
      <fieldset>
        <legend className="text-body font-medium">¿Cómo vas a trabajar?</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {modos.map(({ id, texto, Icono }) => (
            <label
              key={id}
              className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-soft border-2 border-ink-black px-4 py-3 text-body ${
                datos.modo === id ? 'bg-fresh-grass font-medium' : 'bg-pure-white hover:bg-cream-paper'
              }`}
            >
              <input
                type="radio"
                name="pasaporte-modo"
                className="sr-only"
                checked={datos.modo === id}
                onChange={() => cambiar({ modo: id })}
              />
              <Icono size={26} weight="bold" aria-hidden="true" />
              {texto}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="detective-1" className="block text-body font-medium">
            {datos.modo === 'pareja' ? 'Nombre del primer detective' : 'Tu nombre'}
          </label>
          <input
            id="detective-1"
            type="text"
            autoComplete="off"
            maxLength={40}
            className={`${campo_texto} mt-2`}
            value={datos.nombres[0] ?? ''}
            onChange={(e) => cambiar_nombre(0, e.target.value)}
          />
        </div>
        {datos.modo === 'pareja' && (
          <div>
            <label htmlFor="detective-2" className="block text-body font-medium">
              Nombre del segundo detective
            </label>
            <input
              id="detective-2"
              type="text"
              autoComplete="off"
              maxLength={40}
              className={`${campo_texto} mt-2`}
              value={datos.nombres[1] ?? ''}
              onChange={(e) => cambiar_nombre(1, e.target.value)}
            />
          </div>
        )}
      </div>
      <p className="mt-2 text-body-sm text-stone-text">
        Los nombres se guardan solo en este celular o computador. No se mandan a ninguna parte.
      </p>

      {!datos.activo && (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className={boton_primario}
            onClick={activar}
            disabled={!listo || faltan_nombres || !prueba_lista}
          >
            <IdentificationCard size={22} weight="bold" aria-hidden="true" />
            Hacer mi tarjeta
          </button>
          <p className="text-body-sm text-stone-text" role="status" aria-live="polite">
            {!prueba_lista
              ? 'Primero resuelve la pista de prueba de arriba.'
              : faltan_nombres
                ? 'Escribe tu nombre para hacer la tarjeta.'
                : 'Todo listo.'}
          </p>
        </div>
      )}

      {datos.activo && (
        <div role="status" aria-live="polite" className="mt-6">
          <div
            data-carne
            className="rounded-card border-2 border-ink-black bg-cream-paper p-5 md:p-6"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex -space-x-3">
                <CaraSofia size={64} />
                <CaraMateo size={64} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="interfaz text-body-sm font-medium text-stone-text">
                  Tarjeta del Club de Detectives Lectores
                </p>
                <p className="break-words text-heading-sm font-bold leading-tight">{nombres}</p>
                <p className="text-body">
                  {datos.modo === 'pareja' ? 'Pareja de detectives lectores' : 'Detective lector'} de{' '}
                  {sitio.grado}
                </p>
                <p className="text-body-sm text-stone-text">
                  {sitio.institucion_corta}, {sitio.municipio_corto}
                </p>
              </div>
            </div>
            <ul className="mt-5 grid grid-cols-4 gap-2" aria-label="Tu álbum: espacio para cuatro medallas">
              {insignias.map((i) => {
                const ganada = progreso.resueltos.includes(i.caso);
                return (
                  <li key={i.caso} className="flex flex-col items-center text-center">
                    <Insignia caso={i.caso} size={64} ganada={ganada} />
                    <span className="interfaz mt-1 text-micro leading-tight">
                      {i.nombre}
                      <span className="sr-only">{ganada ? ' (ganada)' : ' (por ganar)'}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <p className="mt-3 text-body font-medium">
            ¡Ya tienes tu tarjeta y tu álbum de medallas! Puedes empezar la Misión 1.
          </p>
        </div>
      )}
    </Superficie>
  );
}
