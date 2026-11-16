// faces of the two guides for the React islands (hint bubbles, passport, tower).
// They are the head groups of src/components/ilustraciones/sofia.astro and mateo.astro,
// framed in a circle: when a head changes there, copy it here.
import type { ReactNode } from 'react';

const TINTA = '#1e293b';

interface Props {
  size?: number;
  className?: string;
}

const trazo = {
  stroke: TINTA,
  strokeWidth: 4,
  strokeLinejoin: 'round' as const,
  strokeLinecap: 'round' as const,
};

// round frame of a face. The frame clips the drawing with css, so the svg needs no ids
// (several faces can be on the same page).
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

// Sofía: brown hair in a high ponytail with a red bow, light brown skin, yellow jacket
export function CaraSofia({ size = 56, className = '' }: Props) {
  const PIEL = '#d9a273';
  const PELO = '#6b3f26';
  const PELO_LUZ = '#855233';
  return (
    <Marco size={size} className={className} fondo="#fef3c7" quien="sofia">
        <g transform="translate(-14 2)" {...trazo}>
          <path
            d="M94 52 C82 22 44 22 40 54 C14 68 10 106 30 130 C18 148 28 172 52 174 C42 162 48 150 58 144 C76 132 78 108 66 94 C62 76 72 60 94 52 Z"
            fill={PELO}
          />
          <path d="M42 62 C30 86 34 110 48 124" fill="none" stroke={PELO_LUZ} strokeWidth="5" />
          <path d="M114 144 V166 H138 V144 Z" fill={PIEL} />
          <path
            d="M100 160 C84 164 76 188 76 242 L170 242 C170 198 166 170 152 160 C140 168 112 168 100 160 Z"
            fill="#facc15"
          />
          <path d="M104 160 L126 178 L112 190 L97 166 Z" fill="#fde047" />
          <path d="M148 160 L126 178 L140 190 L155 166 Z" fill="#fde047" />
          <path
            d="M66 100 C66 60 96 42 126 42 C158 42 182 64 182 100 C182 134 156 154 126 154 C92 154 66 134 66 100 Z"
            fill={PIEL}
          />
          <path
            d="M64 110 C54 66 84 32 126 34 C164 36 190 64 184 100 C178 84 166 72 150 68 C134 86 106 96 82 96 C74 99 68 104 64 110 Z"
            fill={PELO}
          />
          <path d="M150 68 C142 62 132 58 120 58" fill="none" stroke={PELO_LUZ} strokeWidth="4" />
          <path d="M88 46 L70 34 C66 44 68 54 74 60 Z" fill="#f43f5e" />
          <path d="M88 46 L98 26 C108 30 112 38 110 48 Z" fill="#f43f5e" />
          <circle cx="89" cy="46" r="6.5" fill="#e11d48" />
          <path d="M72 98 C60 96 56 112 64 120 C68 124 74 122 76 118 Z" fill={PIEL} />
          <g stroke="none">
            <ellipse cx="108" cy="124" rx="10" ry="7" fill="#fb7185" opacity="0.5" />
            <ellipse cx="172" cy="120" rx="8" ry="6.5" fill="#fb7185" opacity="0.5" />
            <ellipse cx="128" cy="108" rx="5" ry="7" fill={TINTA} />
            <ellipse cx="162" cy="106" rx="5" ry="7" fill={TINTA} />
            <circle cx="129.8" cy="105" r="1.9" fill="#ffffff" />
            <circle cx="163.8" cy="103" r="1.9" fill="#ffffff" />
          </g>
          <g fill="none" strokeWidth="3.5">
            <path d="M118 93 Q127 87 136 92" />
            <path d="M154 90 Q162 85 170 90" />
            <path d="M148 112 q6 5 0 10" strokeWidth="3" />
            <path d="M132 130 Q146 141 160 128" />
          </g>
        </g>
    </Marco>
  );
}

// Mateo: curly black hair under a sky blue cap, brown skin, lime sweater
export function CaraMateo({ size = 56, className = '' }: Props) {
  const PIEL = '#a9703f';
  const PELO = '#111827';
  const rizos_atras: [number, number, number][] = [
    [74, 76, 15],
    [62, 94, 14],
    [62, 116, 13],
    [72, 134, 12],
    [186, 104, 10],
  ];
  const rizos_frente: [number, number, number][] = [
    [100, 74, 11],
    [118, 68, 11],
    [138, 66, 11],
    [158, 70, 11],
    [174, 80, 10],
  ];
  return (
    <Marco size={size} className={className} fondo="#ecfccb" quien="mateo">
        <g transform="translate(-30 4)" {...trazo}>
          <path d="M114 144 V166 H138 V144 Z" fill={PIEL} />
          <path
            d="M98 160 C82 164 76 190 78 240 L170 240 C172 198 166 168 152 160 C140 170 110 170 98 160 Z"
            fill="#84cc16"
          />
          <path d="M100 158 C112 176 138 176 150 158 C140 168 110 168 100 158 Z" fill="#65a30d" />
          {rizos_atras.map(([cx, cy, r]) => (
            <circle key={`a${cx}`} cx={cx} cy={cy} r={r} fill={PELO} />
          ))}
          <path
            d="M66 102 C66 62 96 44 126 44 C158 44 182 66 182 102 C182 136 156 156 126 156 C92 156 66 136 66 102 Z"
            fill={PIEL}
          />
          {rizos_frente.map(([cx, cy, r]) => (
            <circle key={`f${cx}`} cx={cx} cy={cy} r={r} fill={PELO} />
          ))}
          <path
            d="M58 86 C50 46 90 20 130 24 C168 28 192 54 184 82 C152 60 96 62 58 86 Z"
            fill="#0284c7"
          />
          <path d="M96 36 C84 44 76 56 74 68" fill="none" stroke="#38bdf8" strokeWidth="6" />
          <path d="M144 64 C176 54 212 64 222 84 C200 94 170 92 148 80 Z" fill="#38bdf8" />
          <circle cx="126" cy="23" r="6" fill="#38bdf8" />
          <path d="M72 102 C60 100 56 116 64 124 C68 128 74 126 76 122 Z" fill={PIEL} />
          <g stroke="none">
            <ellipse cx="108" cy="126" rx="10" ry="7" fill="#f43f5e" opacity="0.45" />
            <ellipse cx="172" cy="122" rx="8" ry="6.5" fill="#f43f5e" opacity="0.45" />
            <ellipse cx="130" cy="110" rx="5" ry="7" fill={TINTA} />
            <ellipse cx="164" cy="108" rx="5" ry="7" fill={TINTA} />
            <circle cx="131.8" cy="107" r="1.9" fill="#ffffff" />
            <circle cx="165.8" cy="105" r="1.9" fill="#ffffff" />
          </g>
          <g fill="none" strokeWidth="3.5">
            <path d="M120 96 Q129 90 138 95" strokeWidth="4" />
            <path d="M156 93 Q164 88 172 93" strokeWidth="4" />
            <path d="M150 114 q6 5 0 10" strokeWidth="3" />
            <path d="M130 131 Q147 145 164 129" />
          </g>
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
