import { compactar_fila_pixel, type PerfilPersona } from '../../lib/empatizar';

export const PALETA_PIXEL: Record<string, string> = {
  K: '#1e293b', // ink-black
  W: '#ffffff', // pure-white
  C: '#faf6ee', // cream-paper
  S: '#ece5d6', // sandstone
  M: '#b8b2a3', // stone shadow
  Y: '#facc15', // sunshine-pop
  y: '#d4c208', // dark yellow
  G: '#84cc16', // fresh-grass
  g: '#5aa03a', // mid green
  E: '#3e7a29', // deep green
  B: '#0284c7', // sky-pop
  b: '#8ccbff', // light sky
  L: '#dbeefb', // pale sky
  R: '#f43f5e', // coral-pop
  r: '#c94a38', // dark coral / terracotta
  P: '#e5b88b', // light skin
  p: '#c48b5c', // tan skin
  D: '#8b6b4a', // wood brown
  d: '#5c442c', // dark wood
  N: '#2f4a6b', // navy blue
};

interface PropsMatrizPixel {
  filas: string[];
  x?: number;
  y?: number;
  escala?: number;
  paleta?: Record<string, string>;
}

export function MatrizPixel({
  filas,
  x = 0,
  y = 0,
  escala = 1,
  paleta = PALETA_PIXEL,
}: PropsMatrizPixel) {
  return (
    <g
      transform={x !== 0 || y !== 0 ? `translate(${x} ${y})` : undefined}
      shapeRendering="crispEdges"
    >
      {filas.map((fila, idx_y) => {
        const segmentos = compactar_fila_pixel(fila);
        return segmentos.map((seg, idx_s) => {
          const fill = paleta[seg.c] ?? '#1e293b';
          return (
            <rect
              key={`${idx_y}-${idx_s}`}
              x={seg.x * escala}
              y={idx_y * escala}
              width={seg.w * escala}
              height={escala}
              fill={fill}
            />
          );
        });
      })}
    </g>
  );
}

const SPRITES_ESTUDIANTE_MINI: string[][][] = [
  // 0: Niña con cola de caballo y chaqueta amarilla
  [
    '....KKKK....',
    '...KKKKKK...',
    '..KKKKKKKKKK',
    '..KPPPPPPK.K',
    '..KPKPPKPK.K',
    '..KPPPPPPK..',
    '...KPPPPK...',
    '....KKKK....',
    '..KKYYYYKK..',
    '.KYYYYYYYYK.',
    '.KYYWWWWYYK.',
    'KKKKKKKKKKKK',
  ],
  // 1: Niño con sombrero campesino boyacense y camisa azul
  [
    '...KKKKKK...',
    '.KKCCCCCCKK.',
    'KKKKKKKKKKKK',
    '..KppppppK..',
    '..KpKppKpK..',
    '..KppppppK..',
    '...KppppK...',
    '....KKKK....',
    '..KKBBBBKK..',
    '.KBBBBBBBBK.',
    '.KBBWWWWBBK.',
    'KKKKKKKKKKKK',
  ],
  // 2: Niña con dos moños altos y buzo coral
  [
    '.KK.KKKK.KK.',
    'KKKKKKKKKKKK',
    '.KK.KKKK.KK.',
    '..KPPPPPPK..',
    '..KPKPPKPK..',
    '..KPPPPPPK..',
    '...KPPPPK...',
    '....KKKK....',
    '..KKRRRRKK..',
    '.KRRRRRRRRK.',
    '.KRRWWWWRRK.',
    'KKKKKKKKKKKK',
  ],
  // 3: Niño con gorra y camisa verde
  [
    '...KKKKKK...',
    '..KBBBBBBKK.',
    '..KKKKKKKKKK',
    '..KppppppK..',
    '..KpKppKpK..',
    '..KppppppK..',
    '...KppppK...',
    '....KKKK....',
    '..KKGGGGKK..',
    '.KGGGGGGGGK.',
    '.KGGWWWWGGK.',
    'KKKKKKKKKKKK',
  ],
];

const PALETA_INACTIVA: Record<string, string> = {
  ...PALETA_PIXEL,
  Y: '#ece5d6',
  B: '#ece5d6',
  R: '#ece5d6',
  G: '#ece5d6',
  P: '#faf6ee',
  p: '#faf6ee',
  C: '#ece5d6',
  W: '#faf6ee',
  K: '#94a3b8',
};

export function EstudiantePixelMini({
  indice,
  activo,
}: {
  indice: number;
  activo: boolean;
}) {
  const matriz = SPRITES_ESTUDIANTE_MINI[indice % SPRITES_ESTUDIANTE_MINI.length];
  return (
    <svg
      viewBox="0 0 12 12"
      className="h-auto w-full"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      <MatrizPixel
        filas={matriz}
        escala={1}
        paleta={activo ? PALETA_PIXEL : PALETA_INACTIVA}
      />
    </svg>
  );
}

export function IconoVozPixel({
  actor,
}: {
  actor: 'estudiantes' | 'docente' | 'familias';
}) {
  const matriz =
    actor === 'estudiantes'
      ? [
          '..KK..KKKK..KK..',
          '.KKKKKKKKKKKKKK.',
          '..KK.KKKKKK.KK..',
          '....KPPPPPPK....',
          '...KPPPPPPPPK...',
          '...KPKPPPPKPK...',
          '...KPPPPPPPPK...',
          '....KPPKKPPK....',
          '.....KKKKKK.....',
          '...KKYYYYYYKK...',
          '..KYYYYYYYYYYK..',
          '..KYYWWWWWWYYK..',
          '.KYYYYYYYYYYYYK.',
          '.KKKKKKKKKKKKKK.',
        ]
      : actor === 'docente'
        ? [
            '.....KKKKKK.....',
            '....KKKKKKKK....',
            '....KPPPPPPK....',
            '...KPPPPPPPPK...',
            '..KKKKKKKKKKKK..',
            '..KLLKPPPPKLLK..',
            '..KKKKKKKKKKKK..',
            '....KPPKKPPK....',
            '.....KKKKKK.....',
            '...KKWWWWWWKK...',
            '..KWWWWWWWWWWK..',
            '..KWWWRRRRWWWK..',
            '.KWWWWWWWWWWWWK.',
            '.KKKKKKKKKKKKKK.',
          ]
        : [
            '....KKKKKKKK....',
            '..KKCCCCCCCCKK..',
            '.KKKKKKKKKKKKKK.',
            '....KppppppK....',
            '...KppppppppK...',
            '...KpKppppKpK...',
            '...KppppppppK...',
            '....KppKKppK....',
            '.....KKKKKK.....',
            '...KKGGGGGGKK...',
            '..KGGGGGGGGGGK..',
            '..KGGCCCCCCGGK..',
            '.KGGGGGGGGGGGGK.',
            '.KKKKKKKKKKKKKK.',
          ];

  const color_fondo =
    actor === 'estudiantes'
      ? 'bg-sunshine-pop'
      : actor === 'docente'
        ? 'bg-fresh-grass'
        : 'bg-sky-pop';

  return (
    <span
      className={`inline-flex size-10 shrink-0 items-center justify-center rounded-chip border-2 border-ink-black p-1 ${color_fondo}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 16 14" className="h-full w-full" shapeRendering="crispEdges">
        <MatrizPixel filas={matriz} escala={1} />
      </svg>
    </span>
  );
}

export function IconoCuadrantePixel({
  id,
}: {
  id: 'dice' | 'hace' | 'piensa' | 'siente';
}) {
  const matriz =
    id === 'dice'
      ? [
          '..KKKKKKKKKKKK..',
          '.KWWWWWWWWWWWWK.',
          'KWWWWWWWWWWWWWWK',
          'KWWKKKKKKKKKKWWK',
          'KWWWWWWWWWWWWWWK',
          'KWWKKKKKKWWWWWWK',
          'KWWWWWWWWWWWWWWK',
          '.KWWWWWWWWWWWWK.',
          '..KKKKWWWWKKKK..',
          '....KWWWWW......',
          '...KWWK.........',
          '...KKK..........',
        ]
      : id === 'hace'
        ? [
            '..KKKKKK.KKKKKK.',
            '.KWWWWWWKWWWWWWK',
            'KWWWWWWWKWWWWWWK',
            'KWWKKKWWKWWKKKWK',
            'KWWWWWWWKWWWWWWK',
            'KWWKKKWWKWWYYYYK',
            'KWWWWWWWKWWWWWWK',
            'KWWKKKWWKWWKKKWK',
            'KWWWWWWWKWWWWWWK',
            'KRRRRRRRKRRRRRRK',
            '.KKKKKKK.KKKKKK.',
            '................',
          ]
        : id === 'piensa'
          ? [
              '....KKKKKKKK....',
              '..KKWWWWWWWWKK..',
              '.KWWWWWWWWWWWWK.',
              'KWWWWWWKKWWWWWWK',
              'KWWWWWWWWKWWWWWK',
              'KWWWWWWKKWWWWWWK',
              'KWWWWWWWWWWWWWWK',
              '.KWWWWWWWWWWWWK.',
              '..KKKKKKKKKKKK..',
              '....KKK.........',
              '..KK............',
              '................',
            ]
          : [
              '..KKKK....KKKK..',
              '.KRRRRK..KRRRRK.',
              'KRRRRRRKKRRRRRRK',
              'KRRRRRRRRRRRRRRK',
              'KRRWWWRRRRRRRRRK',
              'KRRRRRRRRRRRRRRK',
              '.KRRRRRRRRRRRRK.',
              '..KRRRRRRRRRRK..',
              '...KRRRRRRRRK...',
              '....KRRRRRRK....',
              '.....KRRRRK.....',
              '......KKKK......',
            ];

  const fondo =
    id === 'dice'
      ? 'bg-sunshine-pop'
      : id === 'hace'
        ? 'bg-fresh-grass'
        : id === 'piensa'
          ? 'bg-sky-pop'
          : 'bg-coral-pop';

  return (
    <span
      className={`inline-flex size-12 shrink-0 items-center justify-center rounded-chip border-2 border-ink-black p-1.5 ${fondo}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 16 12" className="h-full w-full" shapeRendering="crispEdges">
        <MatrizPixel filas={matriz} escala={1} />
      </svg>
    </span>
  );
}

export function RetratoEstudianteMapaPixel() {
  const matriz = [
    '.....KKKKKK.....',
    '...KKKKKKKKKK...',
    '..KKKKKKKKKKKKK.',
    '..KKPPPPPPPPK.KK',
    '..KPPPPPPPPPPK.K',
    '..KPKPPPPPPKPK..',
    '..KPPPPPPPPPPK..',
    '..KPRRPPPPRRPK..',
    '...KPPPWWPPPK...',
    '....KKKKKKKK....',
    '..KKYYYYYYYYKK..',
    '.KYYYYWWWWYYYYK.',
    'KYYYYYWWWWYYYYYK',
    'KYYYYYYYYYYYYYYK',
    'KKKKKKKKKKKKKKKK',
  ];
  return (
    <span
      className="inline-flex size-16 shrink-0 items-center justify-center rounded-chip border-2 border-ink-black bg-sunshine-pop p-1.5"
      aria-hidden="true"
    >
      <svg viewBox="0 0 16 15" className="h-full w-full" shapeRendering="crispEdges">
        <MatrizPixel filas={matriz} escala={1} />
      </svg>
    </span>
  );
}

// 16-bit Pixel-Art Diorama Header for each of the 5 Personas (grid: 60x26 logical pixels)
export function EscenaPersonaPixel({ id }: { id: PerfilPersona['id'] }) {
  if (id === 'sofia') {
    const personaje_sofia = [
      '....KKKKKK....',
      '..KKKKKKKKKKK.',
      '..KPPPPPPPPK.K',
      '..KPKPPPPKPK.K',
      '..KPPPPPPPPK..',
      '...KPPKKPPK...',
      '....KKKKKK....',
      '..KKYYYYYYKK..',
      '.KYYYYWWYYYYK.',
      '.KYYYYYYYYYYK.',
      'KKKKKKKKKKKKKK',
    ];
    return (
      <svg
        viewBox="0 0 60 26"
        className="h-auto w-full rounded-chip border-2 border-ink-black bg-cream-paper"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        {/* Pared del aula y mesa de madera */}
        <rect width="60" height="26" fill="#faf6ee" />
        <rect y="20" width="60" height="6" fill="#dcae82" />
        <rect y="20" width="60" height="1" fill="#1e293b" />

        {/* Tablero escolar verde en pixel art (izquierda) */}
        <rect x="3" y="3" width="18" height="12" fill="#1e293b" />
        <rect x="4" y="4" width="16" height="10" fill="#4d7c0f" />
        <rect x="6" y="6" width="8" height="1" fill="#ffffff" />
        <rect x="6" y="9" width="11" height="1" fill="#ffffff" />
        <rect x="6" y="12" width="6" height="1" fill="#facc15" />

        {/* Bloque de signo de pregunta pixel-art */}
        <rect x="17" y="2" width="5" height="5" fill="#1e293b" />
        <rect x="18" y="3" width="3" height="3" fill="#facc15" />
        <rect x="19" y="4" width="1" height="1" fill="#1e293b" />

        {/* Sofía en pixel art en el centro */}
        <MatrizPixel filas={personaje_sofia} x={23} y={9} escala={1} />

        {/* Lupa pixel-art junto a Sofía */}
        <rect x="19" y="13" width="4" height="4" fill="#1e293b" />
        <rect x="20" y="14" width="2" height="2" fill="#dbeefb" />
        <rect x="21" y="17" width="1" height="3" fill="#84cc16" />

        {/* Libro abierto sobre la mesa (derecha) */}
        <rect x="41" y="15" width="15" height="6" fill="#1e293b" />
        <rect x="42" y="16" width="6" height="4" fill="#ffffff" />
        <rect x="49" y="16" width="6" height="4" fill="#ffffff" />
        <rect x="43" y="17" width="4" height="1" fill="#facc15" />
        <rect x="50" y="17" width="4" height="1" fill="#1e293b" />
        <rect x="50" y="19" width="3" height="1" fill="#f43f5e" />
      </svg>
    );
  }

  if (id === 'julian') {
    const personaje_julian = [
      '...KKKKKKKK...',
      '.KKCCCCCCCCKK.',
      'KKKKKKKKKKKKKK',
      '..KppppppppK..',
      '..KpKppppKpK..',
      '..KppppppppK..',
      '...KppWWppK...',
      '....KKKKKK....',
      '..KKCCCCCCKK..',
      '.KCCRRRRRRCCK.',
      '.KCCCCCCCCCCK.',
      'KKKKKKKKKKKKKK',
    ];
    return (
      <svg
        viewBox="0 0 60 26"
        className="h-auto w-full rounded-chip border-2 border-ink-black bg-cream-paper"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        {/* Cielo de atardecer campesino y montañas escalonadas en pixel-art */}
        <rect width="60" height="26" fill="#fcf6c5" />
        {/* Sol pixelado */}
        <rect x="6" y="4" width="6" height="6" fill="#facc15" />
        <rect x="5" y="5" width="8" height="4" fill="#facc15" />
        {/* Montañas de Maripí */}
        <rect x="0" y="14" width="60" height="12" fill="#5aa03a" />
        <rect x="8" y="12" width="18" height="2" fill="#5aa03a" />
        <rect x="38" y="11" width="16" height="3" fill="#5aa03a" />
        <rect x="0" y="18" width="60" height="8" fill="#84cc16" />

        {/* Arbusto de café con cerezas rojas (izquierda) */}
        <rect x="7" y="16" width="2" height="6" fill="#5c442c" />
        <rect x="5" y="13" width="6" height="5" fill="#3e7a29" />
        <rect x="6" y="14" width="1" height="1" fill="#f43f5e" />
        <rect x="9" y="15" width="1" height="1" fill="#f43f5e" />
        <rect x="7" y="16" width="1" height="1" fill="#facc15" />

        {/* Julián con sombrero campesino y ruana */}
        <MatrizPixel filas={personaje_julian} x={23} y={8} escala={1} />

        {/* Insignia pixel de tradición oral y señal de celular (derecha) */}
        <rect x="43" y="4" width="13" height="10" fill="#1e293b" />
        <rect x="44" y="5" width="11" height="8" fill="#ffffff" />
        <rect x="46" y="9" width="1" height="3" fill="#84cc16" />
        <rect x="48" y="7" width="1" height="5" fill="#84cc16" />
        <rect x="50" y="6" width="1" height="6" fill="#84cc16" />
        <rect x="52" y="7" width="2" height="2" fill="#facc15" />
      </svg>
    );
  }

  if (id === 'valentina') {
    const personaje_valentina = [
      '.KK..KKKK..KK.',
      'KKKKKKKKKKKKKK',
      '.KK.KKKKKK.KK.',
      '...KPPPPPPK...',
      '..KPKPPPPKPK..',
      '..KPPPPPPPPK..',
      '...KPPWWPPK...',
      '....KKKKKK....',
      '..KKRRRRRRKK..',
      '.KRRRRKKRRRRK.',
      '.KRRRGGGGGRRK.',
      'KKKKKKKKKKKKKK',
    ];
    return (
      <svg
        viewBox="0 0 60 26"
        className="h-auto w-full rounded-chip border-2 border-ink-black bg-cream-paper"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        <rect width="60" height="26" fill="#dbeefb" />
        <rect y="20" width="60" height="6" fill="#dcae82" />
        <rect y="20" width="60" height="1" fill="#1e293b" />

        {/* Reloj de turnos en pixel-art (izquierda) */}
        <rect x="5" y="5" width="9" height="9" fill="#1e293b" />
        <rect x="6" y="6" width="7" height="7" fill="#facc15" />
        <rect x="9" y="7" width="1" height="3" fill="#1e293b" />
        <rect x="9" y="9" width="3" height="1" fill="#1e293b" />

        {/* Valentina con dos moños y celular compartido */}
        <MatrizPixel filas={personaje_valentina} x={21} y={8} escala={1} />

        {/* Cuadrícula de sopa de letras en pixel-art (derecha) */}
        <rect x="41" y="3" width="15" height="15" fill="#1e293b" />
        <rect x="42" y="4" width="13" height="13" fill="#ffffff" />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={43 + c * 4}
              y={5 + r * 4}
              width="3"
              height="3"
              fill={r === 1 ? '#facc15' : '#ece5d6'}
            />
          )),
        )}
      </svg>
    );
  }

  if (id === 'docente') {
    const personaje_docente = [
      '....KKKKKK....',
      '...KKKKKKKK...',
      '...KPPPPPPK...',
      '..KKKKKKKKKK..',
      '..KLLKPPKLLK..',
      '..KKKKKKKKKK..',
      '...KPPWWPPK...',
      '....KKKKKK....',
      '..KKWWWWWWKK..',
      '.KWWWRRRRWWWK.',
      '.KWWWWWWWWWWK.',
      'KKKKKKKKKKKKKK',
    ];
    return (
      <svg
        viewBox="0 0 60 26"
        className="h-auto w-full rounded-chip border-2 border-ink-black bg-cream-paper"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        <rect width="60" height="26" fill="#faf6ee" />
        <rect y="20" width="60" height="6" fill="#dcae82" />
        <rect y="20" width="60" height="1" fill="#1e293b" />

        {/* Estante con pocos libros (izquierda) */}
        <rect x="4" y="4" width="14" height="12" fill="#1e293b" />
        <rect x="5" y="5" width="12" height="10" fill="#ece5d6" />
        <rect x="6" y="7" width="2" height="7" fill="#f43f5e" />
        <rect x="9" y="8" width="2" height="6" fill="#0284c7" />
        <rect x="12" y="7" width="2" height="7" fill="#facc15" />

        {/* Docente rural con gafas y bata blanca */}
        <MatrizPixel filas={personaje_docente} x={23} y={8} escala={1} />

        {/* Portátil y rayo de energía (derecha) */}
        <rect x="42" y="13" width="11" height="7" fill="#1e293b" />
        <rect x="43" y="14" width="9" height="5" fill="#0284c7" />
        <rect x="40" y="20" width="15" height="1" fill="#1e293b" />
        {/* Rayo pixel */}
        <rect x="48" y="4" width="3" height="2" fill="#facc15" />
        <rect x="47" y="6" width="4" height="2" fill="#facc15" />
        <rect x="48" y="8" width="2" height="3" fill="#facc15" />
      </svg>
    );
  }

  // Doña Rosa, madre
  const personaje_rosa = [
    '...KKKKKKKK...',
    '..KRRRRRRRRK..',
    '.KRRWRRRRWRRK.',
    '..KppppppppK..',
    '..KpKppppKpK..',
    '..KppppppppK..',
    '...KppWWppK...',
    '....KKKKKK....',
    '..KKGGGGGGKK..',
    '.KGGWWWWWWGGK.',
    '.KGGWWWWWWGGK.',
    'KKKKKKKKKKKKKK',
  ];
  return (
    <svg
      viewBox="0 0 60 26"
      className="h-auto w-full rounded-chip border-2 border-ink-black bg-cream-paper"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect width="60" height="26" fill="#faf6ee" />
      <rect y="20" width="60" height="6" fill="#dcae82" />
      <rect y="20" width="60" height="1" fill="#1e293b" />

      {/* Ventana campesina con montañas (izquierda) */}
      <rect x="4" y="4" width="14" height="12" fill="#1e293b" />
      <rect x="5" y="5" width="12" height="10" fill="#dbeefb" />
      <rect x="5" y="11" width="12" height="4" fill="#84cc16" />
      <rect x="10" y="5" width="1" height="10" fill="#1e293b" />
      <rect x="5" y="9" width="12" height="1" fill="#1e293b" />

      {/* Doña Rosa en el centro */}
      <MatrizPixel filas={personaje_rosa} x={23} y={8} escala={1} />

      {/* Pocillo de café y único celular de la casa (derecha) */}
      <rect x="43" y="15" width="5" height="5" fill="#f43f5e" />
      <rect x="44" y="12" width="1" height="2" fill="#94a3b8" />
      <rect x="46" y="11" width="1" height="2" fill="#94a3b8" />
      <rect x="50" y="9" width="6" height="11" fill="#1e293b" />
      <rect x="51" y="10" width="4" height="8" fill="#facc15" />
    </svg>
  );
}
