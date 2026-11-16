import type { RelatoFamiliar as Relato } from '../../lib/tipos';
import { ruta_seccion } from '../../config/paginas';
import { RELATO_VACIO, relato_completo } from './cuentame_abuelo';
import { usar_almacen } from './hooks';
import { ReadAloud } from './read_aloud';
import { Superficie, boton } from './ui';

// closing station: the family story of "Cuéntame, abuelo", ready to be shared in the reading circle
export function RelatoFamiliar() {
  const [relato] = usar_almacen<Relato>('abuelo', RELATO_VACIO);
  const datos: Relato = { ...RELATO_VACIO, ...relato };
  const completo = relato_completo(datos);
  const texto = `Me lo contó ${datos.quien}. ${datos.trama} La enseñanza que nos deja: ${datos.ensenanza}`;

  return (
    <Superficie tipo="conversa" titulo="Mi relato de Cuéntame, abuelo">
      {completo ? (
        <div data-relato-familiar>
          <dl className="flex flex-col gap-4">
            <div>
              <dt className="interfaz text-body-sm font-medium text-stone-text">
                Quién me contó la historia
              </dt>
              <dd className="text-reading font-bold">{datos.quien}</dd>
            </div>
            <div>
              <dt className="interfaz text-body-sm font-medium text-stone-text">De qué trata</dt>
              <dd className="max-w-reading whitespace-pre-line text-reading">{datos.trama}</dd>
            </div>
            <div>
              <dt className="interfaz text-body-sm font-medium text-stone-text">
                La enseñanza que nos deja
              </dt>
              <dd className="max-w-reading whitespace-pre-line text-reading">{datos.ensenanza}</dd>
            </div>
          </dl>
          <ReadAloud texto={texto} className="mt-5" />
          <p className="mt-4 text-body">
            Léelo en voz alta en el círculo de lectura del salón y escucha los relatos de tus
            compañeros.
          </p>
        </div>
      ) : (
        <div>
          <p className="max-w-reading text-body">
            Todavía no has registrado tu relato familiar. Cuando lo hagas en la Misión 2, aparece
            aquí para compartirlo en el círculo de lectura.
          </p>
          <a href={ruta_seccion(2, 'reto')} className={`${boton} mt-4`}>
            Ir al reto familiar
          </a>
        </div>
      )}
    </Superficie>
  );
}
