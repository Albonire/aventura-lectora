// the four medals of the detective passport: round, with a dashed inner ring and a ribbon (guide 2.1, figure 3)

interface Props {
  caso: number;
  size?: number;
  ganada?: boolean;
  titulo?: string;
}

const TINTA = '#1e293b';

const BASES: Record<number, { base: string; cinta: string }> = {
  1: { base: '#fed7aa', cinta: '#fdba74' },
  2: { base: '#bae6fd', cinta: '#7dd3fc' },
  3: { base: '#d9f99d', cinta: '#bef264' },
  4: { base: '#fecdd3', cinta: '#fda4af' },
};

function Icono({ caso }: { caso: number }) {
  switch (caso) {
    // bronze magnifying glass
    case 1:
      return (
        <g>
          <path d="M68 64 L82 78" stroke={TINTA} strokeWidth="9" strokeLinecap="round" />
          <path d="M68 64 L82 78" stroke="#c2703d" strokeWidth="5" strokeLinecap="round" />
          <circle cx="54" cy="50" r="17" fill="#ffffff" stroke={TINTA} strokeWidth="7" />
          <circle cx="54" cy="50" r="17" fill="none" stroke="#c2703d" strokeWidth="3.5" />
        </g>
      );
    // silver magnifying glass that looks between the lines
    case 2:
      return (
        <g>
          <path d="M68 64 L82 78" stroke={TINTA} strokeWidth="9" strokeLinecap="round" />
          <path d="M68 64 L82 78" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
          <circle cx="54" cy="50" r="17" fill="#ffffff" stroke={TINTA} strokeWidth="7" />
          <circle cx="54" cy="50" r="17" fill="none" stroke="#cbd5e1" strokeWidth="3.5" />
          <circle cx="54" cy="50" r="6" fill="#0284c7" stroke={TINTA} strokeWidth="2" />
        </g>
      );
    // shield with a check mark
    case 3:
      return (
        <g>
          <path
            d="M60 31 L83 40 V58 C83 73 73 81 60 86 C47 81 37 73 37 58 V40 Z"
            fill="#ffffff"
            stroke={TINTA}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M48 58 L56 66 L73 47"
            stroke="#4d7c0f"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      );
    // megaphone
    default:
      return (
        <g>
          <path
            d="M82 46 Q91 56 82 66"
            stroke={TINTA}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M88 39 Q102 56 88 73"
            stroke={TINTA}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M42 51 L74 38 L74 74 L42 61 Z"
            fill="#ffffff"
            stroke={TINTA}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <rect
            x="32"
            y="49"
            width="12"
            height="14"
            rx="3"
            fill="#f43f5e"
            stroke={TINTA}
            strokeWidth="3"
          />
        </g>
      );
  }
}

export function Insignia({ caso, size = 120, ganada = true, titulo }: Props) {
  const { base, cinta } = BASES[caso] ?? BASES[1];
  return (
    <svg
      viewBox="0 0 120 132"
      width={size}
      height={(size * 132) / 120}
      role={titulo ? 'img' : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
      focusable="false"
      data-insignia={caso}
      data-ganada={ganada}
      style={{ opacity: ganada ? 1 : 0.4, filter: ganada ? 'none' : 'grayscale(1)' }}
    >
      <path
        d="M40 92 L28 128 L45 119 L53 129 L60 96 Z"
        fill={cinta}
        stroke={TINTA}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M80 92 L92 128 L75 119 L67 129 L60 96 Z"
        fill={cinta}
        stroke={TINTA}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="60" cy="56" r="48" fill={base} stroke={TINTA} strokeWidth="3" />
      <circle
        cx="60"
        cy="56"
        r="40"
        fill="none"
        stroke={TINTA}
        strokeWidth="2"
        strokeDasharray="5 5"
      />
      <Icono caso={caso} />
    </svg>
  );
}
