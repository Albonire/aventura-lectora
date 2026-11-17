// faces of the two guides for the React islands (hint bubbles, passport, tower).
import type { ReactNode } from 'react';
import { materiales } from '../../lib/arte/paleta';
import { MATEO_BUSTO } from '../../lib/arte/piezas/mateo';
import { SOFIA_BUSTO } from '../../lib/arte/piezas/sofia';
import { Pieza } from './pieza';

interface Props {
  size?: number;
  className?: string;
}

// round frame of a face. It crops the drawing with css (overflow hidden), so the svg needs no ids.
function Marco({
  size,
  className,
  fondo,
  quien,
  children,
}: {
  size: number;
  className: string;
  fondo: string;
  quien: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`block shrink-0 overflow-hidden rounded-full border-2 border-ink-black ${className}`}
      style={{ width: size, height: size, background: fondo }}
      data-cara={quien}
    >
      <svg viewBox="0 0 200 200" width="100%" height="100%" aria-hidden="true" focusable="false">
        {children}
      </svg>
    </span>
  );
}

// the faces are the head and the top of the body of the full drawings (src/lib/arte/piezas), so they never drift apart
export function CaraSofia({ size = 56, className = '' }: Props) {
  return (
    <Marco size={size} className={className} fondo={materiales.chaqueta.luz} quien="sofia">
      <g transform="translate(-14 2)">
        <Pieza formas={SOFIA_BUSTO} detalle="reducido" escala={0.9} />
      </g>
    </Marco>
  );
}

export function CaraMateo({ size = 56, className = '' }: Props) {
  return (
    <Marco size={size} className={className} fondo={materiales.lima.luz} quien="mateo">
      <g transform="translate(-30 4)">
        <Pieza formas={MATEO_BUSTO} detalle="reducido" escala={0.9} />
      </g>
    </Marco>
  );
}

interface BurbujaProps {
  quien?: 'sofia' | 'mateo';
  // small line above the text, for example "Pista de Sofía (1 de 2)"
  titulo?: string;
  children: ReactNode;
  tono?: 'pista' | 'calma';
  className?: string;
}

// speech bubble of a guide: the face on the left and the words beside it
export function Burbuja({
  quien = 'sofia',
  titulo,
  children,
  tono = 'calma',
  className = '',
}: BurbujaProps) {
  const Cara = quien === 'sofia' ? CaraSofia : CaraMateo;
  const fondo = tono === 'pista' ? 'bg-sunshine-pop' : 'bg-pure-white';
  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <Cara size={64} />
      <div
        className={`burbuja-guia relative min-w-0 flex-1 rounded-soft border-2 border-ink-black ${fondo} px-4 py-3 text-ink-black`}
      >
        {titulo && <p className="interfaz text-body-sm font-bold">{titulo}</p>}
        <div className="text-body">{children}</div>
      </div>
    </div>
  );
}
