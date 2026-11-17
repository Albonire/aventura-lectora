import { useEffect, useState } from 'react';
import { FilePdf, Printer } from '@phosphor-icons/react';
import { insignias } from '../../lib/insignias';
import { nombres_detectives } from '../../lib/progreso';
import { autoras, sitio } from '../../config/sitio';
import { usar_almacen, usar_movimiento, usar_pasaporte, usar_progreso } from './hooks';
import { Insignia } from './insignia';
import { diploma_fondo_url } from '../../lib/diploma_fondo';
import { Superficie, boton, boton_primario, campo_texto } from './ui';

export const TITULO_CERTIFICADO = 'Diploma de Detective Lector';

// certificate of the closing station with the name of the student or the pair and a print button.
// Printing shows only the certificate (see the print rules in global.css).
export function Certificate() {
  const [pasaporte] = usar_pasaporte();
  const [nombre, set_nombre, listo] = usar_almacen<string>('certificado_nombre', '');
  const progreso = usar_progreso();
  const movimiento = usar_movimiento();
  const [sello, set_sello] = useState(0);
  const [generando, set_generando] = useState(false);
  const [mensaje, set_mensaje] = useState('');
  const total = insignias.length;
  const ganadas = insignias.filter((i) => progreso.resueltos.includes(i.caso)).length;
  const del_pasaporte = nombres_detectives(pasaporte);

  // the name written in station 00 is the starting point; it can be corrected here
  useEffect(() => {
    if (listo && !nombre && del_pasaporte) set_nombre(del_pasaporte);
  }, [listo, nombre, del_pasaporte]);

  const mostrado = nombre.trim();
  const fecha = new Date().toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  function imprimir() {
    set_sello((n) => n + 1);
    set_mensaje('Se abrió la ventana para imprimir tu diploma.');
    window.setTimeout(() => window.print(), 80);
  }

  async function descargar() {
    set_generando(true);
    set_mensaje('');
    set_sello((n) => n + 1);
    try {
      const { descargar_certificado } = await import('../../lib/pdf');
      await descargar_certificado(mostrado);
      set_mensaje('Tu diploma se descargó.');
    } catch {
      set_mensaje('No se pudo descargar. Vuelve a intentarlo o usa el botón de imprimir.');
    } finally {
      set_generando(false);
    }
  }

  return (
    <Superficie titulo="Tu diploma" etiqueta="Detective lector">
      <div className="no-imprimir">
        <p className="max-w-reading text-body">
          Revisa cómo quedó escrito tu nombre, o el de tu pareja de detectives, e imprime el
          diploma.
          {ganadas < total &&
            ` Llevas ${ganadas} de ${total} medallas: imprímelo cuando tengas las cuatro.`}
        </p>
        <label htmlFor="cert-nombre" className="mt-5 block text-body font-medium">
          Nombre del detective o de la pareja
        </label>
        <input
          id="cert-nombre"
          type="text"
          autoComplete="off"
          maxLength={80}
          value={nombre}
          onChange={(e) => set_nombre(e.target.value)}
          className={`${campo_texto} mt-2 max-w-md`}
        />
      </div>

      <div
        data-certificado
        className="certificado relative isolate mt-8 overflow-hidden rounded-card border-2 border-ink-black bg-cream-paper p-6 pb-24 text-center md:p-10"
      >
        {/* crayon drawing behind the text: it prints without the "background graphics" option because it is an image */}
        <img
          src={diploma_fondo_url}
          alt=""
          aria-hidden="true"
          width={1024}
          height={765}
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <p className="interfaz inline-block rounded-pill border-2 border-ink-black bg-sunshine-pop px-4 py-1 text-body-sm font-bold">
          {sitio.nombre_curso}: {sitio.subtitulo}
        </p>
        <p className="mt-5 text-[clamp(1.5rem,1rem+2.4vw,2.5rem)] font-bold leading-tight">
          {TITULO_CERTIFICADO}
        </p>
        <p className="mt-1 text-body font-medium">
          {sitio.institucion} ({sitio.municipio_corto})
        </p>
        <p className="mt-5 text-body">Se otorga a</p>
        <p
          data-certificado-nombre
          className="mx-auto mt-1 min-h-12 max-w-xl break-words border-b-2 border-ink-black pb-1 text-heading-sm font-bold leading-tight"
        >
          {mostrado || 'Tu nombre'}
        </p>
        <p className="mx-auto mt-5 max-w-lg text-body">
          por resolver las tres misiones de lectura y el reto final, leer con calma, descubrir
          pistas escondidas, revisar antes de compartir y decir lo que piensa con razones.
        </p>

        <ul className="mx-auto mt-5 flex max-w-md justify-center gap-3" aria-label="Medallas ganadas">
          {insignias.map((i) => (
            <li key={i.caso}>
              <Insignia
                caso={i.caso}
                size={56}
                ganada={progreso.resueltos.includes(i.caso)}
                titulo={`${i.nombre}: ${progreso.resueltos.includes(i.caso) ? 'ganada' : 'por ganar'}`}
              />
            </li>
          ))}
        </ul>

        <div className="mt-6 grid gap-4 text-body-sm sm:grid-cols-2">
          {autoras.map((a) => (
            <p key={a} className="border-t-2 border-ink-black pt-2">
              <span className="block font-bold">{a}</span>
              Profesora de quinto grado
            </p>
          ))}
        </div>
        <p className="mt-4 text-body-sm text-stone-text">
          {sitio.municipio_corto}, {fecha}
        </p>
        <div
          key={sello}
          className={`pointer-events-none absolute bottom-3 right-3 md:bottom-5 md:right-6 ${sello > 0 && movimiento ? 'sello-estampa' : ''}`}
          aria-hidden="true"
        >
          {ganadas === total && <Insignia caso={4} size={64} />}
        </div>
      </div>

      <div className="no-imprimir mt-6 flex flex-wrap items-center gap-3">
        <button type="button" className={boton_primario} onClick={imprimir} disabled={!mostrado}>
          <Printer size={20} weight="bold" aria-hidden="true" />
          Imprimir diploma
        </button>
        <button
          type="button"
          className={boton}
          onClick={descargar}
          disabled={generando || !mostrado}
        >
          <FilePdf size={20} weight="bold" aria-hidden="true" />
          {generando ? 'Preparando...' : 'Descargar diploma'}
        </button>
        {!mostrado && (
          <p className="text-body-sm text-stone-text">Escribe el nombre para imprimirlo.</p>
        )}
      </div>
      <p role="status" aria-live="polite" className="no-imprimir mt-3 min-h-7 text-body">
        {mensaje}
      </p>
    </Superficie>
  );
}
