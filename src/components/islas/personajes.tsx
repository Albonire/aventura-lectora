// small faces of the two guides for the React islands (hint bubbles, passport, tower).
// Same character sheet as the Astro illustrations in src/components/ilustraciones.

const TINTA = '#1e293b';

interface Props {
  size?: number;
  className?: string;
}

// Sofía: brown hair in a high ponytail with a red bow, light brown skin, yellow jacket collar
export function CaraSofia({ size = 56, className = '' }: Props) {
  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="40" cy="40" r="38" fill="#fef9c3" stroke={TINTA} strokeWidth="2.5" />
      <path d="M58 20 C78 16 80 46 66 56 C70 42 66 32 56 28 Z" fill="#7c4a2d" />
      <path d="M57 15 L66 20 L57 25 L61 20 Z" fill="#f43f5e" />
      <path d="M67 15 L58 20 L67 25 L63 20 Z" fill="#f43f5e" />
      <path d="M22 76 Q40 62 58 76 Z" fill="#facc15" stroke={TINTA} strokeWidth="2" />
      <rect x="35" y="56" width="10" height="10" fill="#d9a273" />
      <path d="M21 38 C21 22 59 22 59 38 C59 52 49 60 40 60 C31 60 21 52 21 38 Z" fill="#d9a273" />
      <path d="M21 38 C18 14 62 12 59 38 C54 27 46 25 40 25 C31 25 25 29 21 38 Z" fill="#7c4a2d" />
      <circle cx="33" cy="41" r="2.4" fill={TINTA} />
      <circle cx="47" cy="41" r="2.4" fill={TINTA} />
      <circle cx="28" cy="48" r="3.6" fill="#f43f5e" opacity="0.35" />
      <circle cx="52" cy="48" r="3.6" fill="#f43f5e" opacity="0.35" />
      <path
        d="M35 50 Q40 55 45 50"
        stroke={TINTA}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// Mateo: curly black hair under a sky blue cap, brown skin, lime sweater collar
export function CaraMateo({ size = 56, className = '' }: Props) {
  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="40" cy="40" r="38" fill="#ecfccb" stroke={TINTA} strokeWidth="2.5" />
      <path d="M22 76 Q40 62 58 76 Z" fill="#84cc16" stroke={TINTA} strokeWidth="2" />
      <rect x="35" y="56" width="10" height="10" fill="#a9703f" />
      <path d="M22 40 C22 25 58 25 58 40 C58 53 49 60 40 60 C31 60 22 53 22 40 Z" fill="#a9703f" />
      <g fill={TINTA}>
        <circle cx="22" cy="34" r="7" />
        <circle cx="19" cy="44" r="5.5" />
        <circle cx="58" cy="34" r="7" />
        <circle cx="61" cy="44" r="5.5" />
      </g>
      <path d="M21 31 C22 13 58 13 59 31 Z" fill="#0284c7" />
      <path d="M54 30 Q72 29 77 36 Q64 40 52 35 Z" fill="#0369a1" />
      <circle cx="33" cy="42" r="2.4" fill={TINTA} />
      <circle cx="47" cy="42" r="2.4" fill={TINTA} />
      <circle cx="28" cy="49" r="3.6" fill="#f43f5e" opacity="0.35" />
      <circle cx="52" cy="49" r="3.6" fill="#f43f5e" opacity="0.35" />
      <path
        d="M35 51 Q40 56 45 51"
        stroke={TINTA}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

interface BurbujaProps {
  quien?: 'sofia' | 'mateo';
  // small line above the text, for example "Pista de Sofía (1 de 2)"
  titulo?: string;
  children: React.ReactNode;
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
      <Cara size={56} />
      <div
        className={`burbuja-guia relative min-w-0 flex-1 rounded-soft border-2 border-ink-black ${fondo} px-4 py-3 text-ink-black`}
      >
        {titulo && <p className="interfaz text-body-sm font-bold">{titulo}</p>}
        <div className="text-body">{children}</div>
      </div>
    </div>
  );
}
