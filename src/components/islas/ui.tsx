import type { ReactNode } from 'react';
import { Sparkle } from '@phosphor-icons/react';

export const boton =
  'inline-flex min-h-11 items-center justify-center gap-2.5 rounded-pill border-2 border-ink-black bg-pure-white px-5 py-2 text-body-sm font-medium text-ink-black transition-colors hover:bg-sandstone disabled:pointer-events-none disabled:opacity-45';

export const boton_primario =
  'inline-flex min-h-11 items-center justify-center gap-2.5 rounded-pill border-2 border-ink-black bg-fresh-grass px-5 py-2 text-body-sm font-medium text-ink-black transition-colors hover:bg-ink-black hover:text-cream-paper disabled:pointer-events-none disabled:opacity-45';

export const boton_reto =
  'inline-flex min-h-12 items-center justify-center gap-2.5 rounded-pill border-2 border-ink-black bg-coral-pop px-6 py-3 text-body-sm font-medium text-ink-black transition-colors hover:bg-ink-black hover:text-cream-paper disabled:pointer-events-none disabled:opacity-45';

export const area_texto =
  'w-full rounded-soft border-2 border-transparent bg-sandstone p-4 text-body text-ink-black placeholder:text-stone-text focus:border-ink-black';

export const campo_texto =
  'min-h-11 w-full rounded-soft border-2 border-transparent bg-sandstone px-4 py-2 text-body text-ink-black placeholder:text-stone-text focus:border-ink-black';

interface SuperficieProps {
  children: ReactNode;
  tono?: 'blanco' | 'arena';
  className?: string;
  titulo?: string;
  etiqueta?: string;
  id?: string;
}

// white card that hosts an activity
export function Superficie({
  children,
  tono = 'blanco',
  className = '',
  titulo,
  etiqueta,
  id,
}: SuperficieProps) {
  const fondo = tono === 'blanco' ? 'bg-pure-white' : 'bg-sandstone';
  return (
    <section
      id={id}
      aria-label={titulo}
      className={`${fondo} rounded-card p-6 text-ink-black md:p-10 ${className}`}
    >
      {(titulo || etiqueta) && (
        <header className="mb-6 md:mb-8">
          {etiqueta && <p className="text-body-sm font-medium text-stone-text">{etiqueta}</p>}
          {titulo && <h3 className="mt-1 text-heading-sm font-medium tracking-tight">{titulo}</h3>}
        </header>
      )}
      {children}
    </section>
  );
}

export function Chip({
  children,
  tono = 'arena',
}: {
  children: ReactNode;
  tono?: 'arena' | 'sol' | 'verde';
}) {
  const fondo = { arena: 'bg-sandstone', sol: 'bg-sunshine-pop', verde: 'bg-fresh-grass' }[tono];
  return (
    <span
      className={`${fondo} inline-flex items-center rounded-pill px-3 py-1 text-micro font-medium text-ink-black`}
    >
      {children}
    </span>
  );
}

// label required on every piece generated with AI
export function EtiquetaIA({ className = '' }: { className?: string }) {
  return (
    <p className={`flex items-center gap-2 text-micro text-stone-text ${className}`}>
      <Sparkle size={16} weight="fill" aria-hidden="true" />
      Hecho con IA (Gemini Notebook) y revisado por el equipo
    </p>
  );
}

export function Transcripcion({
  texto,
  titulo = 'Ver transcripción',
}: {
  texto: string;
  titulo?: string;
}) {
  const parrafos = texto.split(/\n+/).filter(Boolean);
  return (
    <details className="group rounded-soft bg-cream-paper">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-soft px-4 py-2 text-body-sm font-medium [&::-webkit-details-marker]:hidden">
        {titulo}
        <span className="text-stone-text group-open:hidden" aria-hidden="true">
          Abrir
        </span>
        <span className="hidden text-stone-text group-open:inline" aria-hidden="true">
          Cerrar
        </span>
      </summary>
      <div className="max-w-reading space-y-3 px-4 pb-5 text-body">
        {parrafos.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </details>
  );
}
