import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Stop, SpeakerHigh } from '@phosphor-icons/react';
import { boton } from './ui';
import { elegir_voz, partir_frases } from '../../lib/voz';

export { elegir_voz };

interface Props {
  texto: string;
  etiqueta?: string;
  // "chico" for the button beside a short instruction
  tamano?: 'normal' | 'chico';
  className?: string;
}

// slow reading speed for children who still read syllable by syllable (pilot adjustment)
export const VELOCIDAD_PAUSADA = 0.9;

// "Escuchar con voz pausada": reads a text aloud in Spanish. Hidden when the browser has no speechSynthesis.
export function ReadAloud({
  texto,
  etiqueta = 'Escuchar con voz pausada',
  tamano = 'normal',
  className = '',
}: Props) {
  const [disponible, set_disponible] = useState(false);
  const [estado, set_estado] = useState<'quieto' | 'leyendo' | 'pausado'>('quieto');
  const voz = useRef<SpeechSynthesisVoice | null>(null);
  // each reading gets a number, so the end of a cancelled reading cannot touch the new one
  const lectura = useRef(0);
  const leyendo_ahora = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    set_disponible(true);
    const cargar = () => {
      voz.current = elegir_voz(window.speechSynthesis.getVoices());
    };
    cargar();
    window.speechSynthesis.addEventListener?.('voiceschanged', cargar);
    return () => {
      window.speechSynthesis.removeEventListener?.('voiceschanged', cargar);
      if (leyendo_ahora.current) window.speechSynthesis.cancel();
    };
  }, []);

  if (!disponible) return null;

  function leer() {
    window.speechSynthesis.cancel();
    const frases = partir_frases(texto);
    if (frases.length === 0) return;
    lectura.current += 1;
    const mia = lectura.current;
    leyendo_ahora.current = true;
    const terminar = () => {
      if (lectura.current !== mia) return;
      leyendo_ahora.current = false;
      set_estado('quieto');
    };
    frases.forEach((f, i) => {
      const frase = new SpeechSynthesisUtterance(f);
      frase.lang = voz.current?.lang ?? 'es-CO';
      if (voz.current) frase.voice = voz.current;
      frase.rate = VELOCIDAD_PAUSADA;
      frase.pitch = 1;
      if (i === frases.length - 1) frase.onend = terminar;
      frase.onerror = terminar;
      window.speechSynthesis.speak(frase);
    });
    set_estado('leyendo');
  }

  function pausar_o_seguir() {
    if (estado === 'leyendo') {
      window.speechSynthesis.pause();
      set_estado('pausado');
    } else if (estado === 'pausado') {
      window.speechSynthesis.resume();
      set_estado('leyendo');
    }
  }

  function detener() {
    lectura.current += 1;
    leyendo_ahora.current = false;
    window.speechSynthesis.cancel();
    set_estado('quieto');
  }

  const clase = tamano === 'chico' ? `${boton} px-4` : boton;

  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${className}`}
      role="group"
      aria-label="Lectura en voz alta"
      data-voz-pausada={VELOCIDAD_PAUSADA}
    >
      {estado === 'quieto' ? (
        <button type="button" className={clase} onClick={leer}>
          <SpeakerHigh size={20} weight="bold" aria-hidden="true" />
          {etiqueta}
        </button>
      ) : (
        <>
          <button type="button" className={clase} onClick={pausar_o_seguir}>
            {estado === 'leyendo' ? (
              <Pause size={20} weight="bold" aria-hidden="true" />
            ) : (
              <Play size={20} weight="bold" aria-hidden="true" />
            )}
            {estado === 'leyendo' ? 'Pausar' : 'Seguir'}
          </button>
          <button type="button" className={clase} onClick={detener}>
            <Stop size={20} weight="bold" aria-hidden="true" />
            Detener
          </button>
        </>
      )}
    </div>
  );
}
