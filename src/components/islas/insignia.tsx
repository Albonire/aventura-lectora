// the four medals of the detective passport (guide 2.1, figure 3): a round medal with a dashed inner ring
// and two ribbon tails. Each medal has its own color for fill and outline; the icons keep the ink outline.

interface Props {
  caso: number;
  size?: number;
  ganada?: boolean;
  titulo?: string;
}

const TINTA = '#1e293b';

// pastel fill, outline of the medal and ribbon color
const COLORES: Record<number, { fondo: string; borde: string; cinta: string }> = {
  1: { fondo: '#ffedd5', borde: '#c2410c', cinta: '#fed7aa' },
  2: { fondo: '#e0f2fe', borde: '#0369a1', cinta: '#bae6fd' },
  3: { fondo: '#ecfccb', borde: '#4d7c0f', cinta: '#d9f99d' },
  4: { fondo: '#ffe4e6', borde: '#be123c', cinta: '#fecdd3' },
};

function Icono({ caso }: { caso: number }) {
  switch (caso) {
    // Lupa de Bronce: plain magnifying glass
    case 1:
      return (
        <g stroke={TINTA} strokeLinecap="round" fill="none">
          <path d="M68 64 L82 78" strokeWidth="7" />
          <circle cx="55" cy="51" r="17" strokeWidth="5" fill="#ffffff" />
          <path d="M45 48 A11 11 0 0 1 53 40" stroke="#fdba74" strokeWidth="3.5" />
        </g>
      );
    // Lupa de Plata: the glass finds what is between the lines
    case 2:
      return (
        <g stroke={TINTA} strokeLinecap="round" fill="none">
          <path d="M68 64 L82 78" strokeWidth="7" />
          <circle cx="55" cy="51" r="17" strokeWidth="5" fill="#ffffff" />
          <circle cx="55" cy="51" r="7" fill="#0284c7" strokeWidth="3" />
        </g>
      );
    // Detector de Verdades: shield with a check mark
    case 3:
      return (
        <g strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M60 30 L84 39 V57 C84 72 74 81 60 87 C46 81 36 72 36 57 V39 Z"
            fill="#ffffff"
            stroke={TINTA}
            strokeWidth="4"
          />
          <path d="M47 57 L56 66 L74 46" fill="none" stroke="#4d7c0f" strokeWidth="7" />
        </g>
      );
    // Voz de Detective: megaphone
    default:
      return (
        <g stroke={TINTA} strokeLinecap="round" strokeLinejoin="round">
          <path d="M40 49 L76 34 V78 L40 63 Z" fill="#ffffff" strokeWidth="4" />
          <rect x="30" y="47" width="13" height="18" rx="3" fill="#e11d48" strokeWidth="4" />
          <path d="M84 46 Q92 56 84 66" fill="none" strokeWidth="3.5" />
          <path d="M48 66 L52 80 H61 L58 69" fill="#ffffff" strokeWidth="3.5" />
        </g>
      );
  }
}

export function Insignia({ caso, size = 120, ganada = true, titulo }: Props) {
  const { fondo, borde, cinta } = COLORES[caso] ?? COLORES[1];
  return (
    <svg
      viewBox="0 0 120 136"
      width={size}
      height={(size * 136) / 120}
      role={titulo ? 'img' : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
      focusable="false"
      data-insignia={caso}
      data-ganada={ganada}
      style={{ opacity: ganada ? 1 : 0.45, filter: ganada ? 'none' : 'grayscale(1)' }}
    >
      {/* ribbon tails */}
      <path
        d="M42 94 L30 132 L46 122 L56 132 L60 98 Z"
        fill={cinta}
        stroke={borde}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M78 94 L90 132 L74 122 L64 132 L60 98 Z"
        fill={cinta}
        stroke={borde}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* medal */}
      <circle cx="60" cy="56" r="50" fill={fondo} stroke={borde} strokeWidth="4" />
      <circle
        cx="60"
        cy="56"
        r="41"
        fill="none"
        stroke={borde}
        strokeWidth="2.5"
        strokeDasharray="6 5"
        strokeLinecap="round"
      />
      <Icono caso={caso} />
    </svg>
  );
}
