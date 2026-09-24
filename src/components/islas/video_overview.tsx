import { useState } from 'react';
import { Play } from '@phosphor-icons/react';
import { EtiquetaIA, Superficie, Transcripcion } from './ui';

interface Props {
  titulo: string;
  etiqueta?: string;
  webm?: string;
  mp4: string;
  poster: string;
  subtitulos?: string;
  duracion: string;
  transcripcion?: string;
  descripcion?: string;
}

// the video file is only requested after the click
export function VideoOverview({
  titulo,
  etiqueta,
  webm,
  mp4,
  poster,
  subtitulos,
  duracion,
  transcripcion,
  descripcion,
}: Props) {
  const [cargado, set_cargado] = useState(false);

  return (
    <Superficie titulo={titulo} etiqueta={etiqueta}>
      <div className="grid gap-8 md:grid-cols-[minmax(0,20rem)_1fr] md:items-start">
        <div className="mx-auto w-full max-w-[20rem]">
          <div className="relative aspect-[9/16] overflow-hidden rounded-soft bg-ink-black">
            {cargado ? (
              <video
                className="absolute inset-0 h-full w-full"
                controls
                autoPlay
                playsInline
                preload="auto"
                poster={poster}
                aria-label={titulo}
              >
                {webm && <source src={webm} type='video/webm; codecs="av01.0.05M.08, opus"' />}
                <source src={mp4} type="video/mp4" />
                {subtitulos && (
                  <track kind="captions" src={subtitulos} srcLang="es" label="Español" default />
                )}
                Tu navegador no puede reproducir este video.
              </video>
            ) : (
              <button
                type="button"
                onClick={() => set_cargado(true)}
                className="group absolute inset-0 block h-full w-full"
                aria-label={`Ver el video: ${titulo} (${duracion})`}
              >
                <img
                  src={poster}
                  alt=""
                  width={540}
                  height={960}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex size-20 items-center justify-center rounded-full border-2 border-ink-black bg-fresh-grass text-ink-black group-hover:bg-ink-black group-hover:text-cream-paper">
                    <Play size={36} weight="fill" aria-hidden="true" />
                  </span>
                </span>
                <span className="absolute bottom-3 left-3 rounded-pill bg-pure-white px-3 py-1 text-micro font-medium text-ink-black">
                  {duracion}
                </span>
              </button>
            )}
          </div>
          {!cargado && (
            <p className="mt-3 text-center text-micro text-stone-text">
              El video se descarga cuando pulsas reproducir.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-5">
          {descripcion && <p className="max-w-reading text-body">{descripcion}</p>}
          <p className="text-body-sm text-stone-text">
            Duración: {duracion}. Activa los subtítulos si los necesitas.
          </p>
          {transcripcion && <Transcripcion texto={transcripcion} />}
          <EtiquetaIA />
        </div>
      </div>
    </Superficie>
  );
}
