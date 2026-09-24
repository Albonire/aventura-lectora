import { useState } from 'react';
import { ArrowSquareOut, Play } from '@phosphor-icons/react';
import { Superficie, boton, boton_primario } from './ui';

interface Props {
  titulo: string;
  etiqueta?: string;
  descripcion?: string;
  // apa 7 citation shown before anything loads
  apa: string;
  proveedor: string;
  youtube_id?: string;
  url_embed?: string;
  url_abrir: string;
  alto?: number;
}

// external content only loads after a click. YouTube goes through youtube-nocookie.com.
export function EmbedFrame({
  titulo,
  etiqueta,
  descripcion,
  apa,
  proveedor,
  youtube_id,
  url_embed,
  url_abrir,
  alto = 420,
}: Props) {
  const [cargado, set_cargado] = useState(false);
  const fuente = youtube_id
    ? `https://www.youtube-nocookie.com/embed/${youtube_id}?rel=0&modestbranding=1`
    : (url_embed ?? '');
  const es_video = Boolean(youtube_id);

  return (
    <Superficie titulo={titulo} etiqueta={etiqueta ?? 'Recurso de la web'}>
      {descripcion && <p className="max-w-reading text-body">{descripcion}</p>}
      <p className="mt-3 max-w-reading text-body-sm text-stone-text">{apa}</p>

      {cargado && fuente ? (
        <div
          className={`mt-6 overflow-hidden rounded-soft border-2 border-ink-black bg-ink-black ${es_video ? 'aspect-video' : ''}`}
        >
          <iframe
            src={fuente}
            title={titulo}
            loading="lazy"
            allow="fullscreen; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin allow-presentation allow-popups allow-forms"
            className="h-full w-full border-0"
            style={es_video ? undefined : { height: `${alto}px` }}
          />
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {!cargado && fuente && (
          <button type="button" className={boton_primario} onClick={() => set_cargado(true)}>
            <Play size={20} weight="fill" aria-hidden="true" />
            Cargar {es_video ? 'el video' : 'el recurso'}
          </button>
        )}
        <a href={url_abrir} target="_blank" rel="noopener noreferrer" className={boton}>
          <ArrowSquareOut size={20} weight="bold" aria-hidden="true" />
          Abrir en otra pestaña
          <span className="sr-only"> (se abre en una pestaña nueva)</span>
        </a>
      </div>
      {!cargado && fuente && (
        <p className="mt-3 text-micro text-stone-text">
          Al cargarlo, tu navegador se conecta con {proveedor}. Antes de eso no se envía ningún
          dato.
        </p>
      )}
    </Superficie>
  );
}
