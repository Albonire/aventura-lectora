import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Stop, SpeakerHigh } from '@phosphor-icons/react';
import { boton } from './ui';
import { elegir_voz, partir_frases } from '../../lib/voz';
import { hash_texto } from '../../lib/voz_hash';

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

// address of the Worker with the natural voice (worker_tts). Without it, only the voice of the device is used.
const TTS_URL: string = (import.meta.env.PUBLIC_TTS_URL ?? '').replace(/\/+$/, '');
// seconds to wait for the natural voice before using the one of the device
const ESPERA_TTS_MS = 8000;

// "Escuchar con voz pausada": reads a text aloud in Spanish. First the natural voice of the Worker (if the
// site has one), and if it is not available the best voice of the device. Nothing is asked before the touch.
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
  const modo = useRef<'ninguno' | 'audio' | 'voz'>('ninguno');
  const audio = useRef<HTMLAudioElement | null>(null);
  const espera = useRef<ReturnType<typeof setTimeout> | null>(null);

  function limpiar_audio() {
    if (espera.current) clearTimeout(espera.current);
    espera.current = null;
    const a = audio.current;
    if (a) {
      a.onplaying = null;
      a.onended = null;
      a.onerror = null;
      a.pause();
      a.removeAttribute('src');
      a.load();
    }
    audio.current = null;
  }

  useEffect(() => {
    const hay_voz = typeof window !== 'undefined' && 'speechSynthesis' in window;
    if (!hay_voz && !TTS_URL) return;
    set_disponible(true);
    const cargar = () => {
      if (hay_voz) voz.current = elegir_voz(window.speechSynthesis.getVoices());
    };
    cargar();
    if (hay_voz) window.speechSynthesis.addEventListener?.('voiceschanged', cargar);
    return () => {
      if (hay_voz) window.speechSynthesis.removeEventListener?.('voiceschanged', cargar);
      if (modo.current === 'voz' && hay_voz) window.speechSynthesis.cancel();
      limpiar_audio();
    };
  }, []);

  if (!disponible) return null;

  function terminar(mia: number) {
    if (lectura.current !== mia) return;
    modo.current = 'ninguno';
    limpiar_audio();
    set_estado('quieto');
  }

  function leer_con_voz_del_sistema(mia: number) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return terminar(mia);
    window.speechSynthesis.cancel();
    const frases = partir_frases(texto);
    if (frases.length === 0) return terminar(mia);
    modo.current = 'voz';
    frases.forEach((f, i) => {
      const frase = new SpeechSynthesisUtterance(f);
      frase.lang = voz.current?.lang ?? 'es-CO';
      if (voz.current) frase.voice = voz.current;
      frase.rate = VELOCIDAD_PAUSADA;
      frase.pitch = 1;
      if (i === frases.length - 1) frase.onend = () => terminar(mia);
      frase.onerror = () => terminar(mia);
      window.speechSynthesis.speak(frase);
    });
    set_estado('leyendo');
  }

  // the audio element is made and started inside the touch (iOS only allows that); if the natural voice is not
  // there in time, or fails, the voice of the device reads instead
  function leer_con_voz_natural(mia: number) {
    const a = new Audio();
    audio.current = a;
    modo.current = 'audio';
    a.preload = 'auto';
    a.src = `${TTS_URL}/?h=${hash_texto(texto)}`;
    a.playbackRate = VELOCIDAD_PAUSADA;
    const caer = () => {
      if (lectura.current !== mia || modo.current !== 'audio') return;
      limpiar_audio();
      leer_con_voz_del_sistema(mia);
    };
    a.onplaying = () => {
      if (espera.current) clearTimeout(espera.current);
      espera.current = null;
      // some browsers reset the speed when the audio starts
      a.playbackRate = VELOCIDAD_PAUSADA;
    };
    a.onended = () => terminar(mia);
    a.onerror = caer;
    espera.current = setTimeout(caer, ESPERA_TTS_MS);
    a.play().catch(caer);
    set_estado('leyendo');
  }

  function leer() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    limpiar_audio();
    lectura.current += 1;
    const mia = lectura.current;
    if (TTS_URL) leer_con_voz_natural(mia);
    else leer_con_voz_del_sistema(mia);
  }

  function pausar_o_seguir() {
    if (estado === 'leyendo') {
      if (modo.current === 'audio') audio.current?.pause();
      else window.speechSynthesis.pause();
      set_estado('pausado');
    } else if (estado === 'pausado') {
      if (modo.current === 'audio') void audio.current?.play();
      else window.speechSynthesis.resume();
      set_estado('leyendo');
    }
  }

  function detener() {
    lectura.current += 1;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    limpiar_audio();
    modo.current = 'ninguno';
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
