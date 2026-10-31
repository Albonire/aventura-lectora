import {
  ancho_svg_recorrido,
  camino_escalonado_pixel,
  coincide_fuente,
  compactar_fila_pixel,
  estado_animacion_recorrido,
  punto_x_recorrido,
  punto_y_recorrido,
  recorrido,
  type FiltroFuente,
  type PerfilPersona,
} from '../../lib/empatizar';

export const PALETA_PIXEL: Record<string, string> = {
  K: '#2c2e2a', // ink-black
  W: '#ffffff', // pure-white
  C: '#f5f1e4', // cream-paper
  S: '#e0dbce', // sandstone
  M: '#b8b2a3', // stone shadow
  Y: '#f5e211', // sunshine-pop
  y: '#d4c208', // dark yellow
  G: '#8ed462', // fresh-grass
  g: '#5aa03a', // mid green
  E: '#3e7a29', // deep green
  B: '#2ba0ff', // sky-pop
  b: '#8ccbff', // light sky
  L: '#dbeefb', // pale sky
  R: '#ff705d', // coral-pop
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
          const fill = paleta[seg.c] ?? '#2c2e2a';
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
  Y: '#e0dbce',
  B: '#e0dbce',
  R: '#e0dbce',
  G: '#e0dbce',
  P: '#f5f1e4',
  p: '#f5f1e4',
  C: '#e0dbce',
  W: '#f5f1e4',
  K: '#80827f',
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
        <rect width="60" height="26" fill="#f5f1e4" />
        <rect y="20" width="60" height="6" fill="#dcae82" />
        <rect y="20" width="60" height="1" fill="#2c2e2a" />

        {/* Tablero escolar verde en pixel art (izquierda) */}
        <rect x="3" y="3" width="18" height="12" fill="#2c2e2a" />
        <rect x="4" y="4" width="16" height="10" fill="#4f9a34" />
        <rect x="6" y="6" width="8" height="1" fill="#ffffff" />
        <rect x="6" y="9" width="11" height="1" fill="#ffffff" />
        <rect x="6" y="12" width="6" height="1" fill="#f5e211" />

        {/* Bloque de signo de pregunta pixel-art */}
        <rect x="17" y="2" width="5" height="5" fill="#2c2e2a" />
        <rect x="18" y="3" width="3" height="3" fill="#f5e211" />
        <rect x="19" y="4" width="1" height="1" fill="#2c2e2a" />

        {/* Sofía en pixel art en el centro */}
        <MatrizPixel filas={personaje_sofia} x={23} y={9} escala={1} />

        {/* Lupa pixel-art junto a Sofía */}
        <rect x="19" y="13" width="4" height="4" fill="#2c2e2a" />
        <rect x="20" y="14" width="2" height="2" fill="#dbeefb" />
        <rect x="21" y="17" width="1" height="3" fill="#8ed462" />

        {/* Libro abierto sobre la mesa (derecha) */}
        <rect x="41" y="15" width="15" height="6" fill="#2c2e2a" />
        <rect x="42" y="16" width="6" height="4" fill="#ffffff" />
        <rect x="49" y="16" width="6" height="4" fill="#ffffff" />
        <rect x="43" y="17" width="4" height="1" fill="#f5e211" />
        <rect x="50" y="17" width="4" height="1" fill="#2c2e2a" />
        <rect x="50" y="19" width="3" height="1" fill="#ff705d" />
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
        <rect x="6" y="4" width="6" height="6" fill="#f5e211" />
        <rect x="5" y="5" width="8" height="4" fill="#f5e211" />
        {/* Montañas de Maripí */}
        <rect x="0" y="14" width="60" height="12" fill="#5aa03a" />
        <rect x="8" y="12" width="18" height="2" fill="#5aa03a" />
        <rect x="38" y="11" width="16" height="3" fill="#5aa03a" />
        <rect x="0" y="18" width="60" height="8" fill="#8ed462" />

        {/* Arbusto de café con cerezas rojas (izquierda) */}
        <rect x="7" y="16" width="2" height="6" fill="#5c442c" />
        <rect x="5" y="13" width="6" height="5" fill="#3e7a29" />
        <rect x="6" y="14" width="1" height="1" fill="#ff705d" />
        <rect x="9" y="15" width="1" height="1" fill="#ff705d" />
        <rect x="7" y="16" width="1" height="1" fill="#f5e211" />

        {/* Julián con sombrero campesino y ruana */}
        <MatrizPixel filas={personaje_julian} x={23} y={8} escala={1} />

        {/* Insignia pixel de tradición oral y señal de celular (derecha) */}
        <rect x="43" y="4" width="13" height="10" fill="#2c2e2a" />
        <rect x="44" y="5" width="11" height="8" fill="#ffffff" />
        <rect x="46" y="9" width="1" height="3" fill="#8ed462" />
        <rect x="48" y="7" width="1" height="5" fill="#8ed462" />
        <rect x="50" y="6" width="1" height="6" fill="#8ed462" />
        <rect x="52" y="7" width="2" height="2" fill="#f5e211" />
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
        <rect y="20" width="60" height="1" fill="#2c2e2a" />

        {/* Reloj de turnos en pixel-art (izquierda) */}
        <rect x="5" y="5" width="9" height="9" fill="#2c2e2a" />
        <rect x="6" y="6" width="7" height="7" fill="#f5e211" />
        <rect x="9" y="7" width="1" height="3" fill="#2c2e2a" />
        <rect x="9" y="9" width="3" height="1" fill="#2c2e2a" />

        {/* Valentina con dos moños y celular compartido */}
        <MatrizPixel filas={personaje_valentina} x={21} y={8} escala={1} />

        {/* Cuadrícula de sopa de letras en pixel-art (derecha) */}
        <rect x="41" y="3" width="15" height="15" fill="#2c2e2a" />
        <rect x="42" y="4" width="13" height="13" fill="#ffffff" />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={43 + c * 4}
              y={5 + r * 4}
              width="3"
              height="3"
              fill={r === 1 ? '#f5e211' : '#e0dbce'}
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
        <rect width="60" height="26" fill="#f5f1e4" />
        <rect y="20" width="60" height="6" fill="#dcae82" />
        <rect y="20" width="60" height="1" fill="#2c2e2a" />

        {/* Estante con pocos libros (izquierda) */}
        <rect x="4" y="4" width="14" height="12" fill="#2c2e2a" />
        <rect x="5" y="5" width="12" height="10" fill="#e0dbce" />
        <rect x="6" y="7" width="2" height="7" fill="#ff705d" />
        <rect x="9" y="8" width="2" height="6" fill="#2ba0ff" />
        <rect x="12" y="7" width="2" height="7" fill="#f5e211" />

        {/* Docente rural con gafas y bata blanca */}
        <MatrizPixel filas={personaje_docente} x={23} y={8} escala={1} />

        {/* Portátil y rayo de energía (derecha) */}
        <rect x="42" y="13" width="11" height="7" fill="#2c2e2a" />
        <rect x="43" y="14" width="9" height="5" fill="#2ba0ff" />
        <rect x="40" y="20" width="15" height="1" fill="#2c2e2a" />
        {/* Rayo pixel */}
        <rect x="48" y="4" width="3" height="2" fill="#f5e211" />
        <rect x="47" y="6" width="4" height="2" fill="#f5e211" />
        <rect x="48" y="8" width="2" height="3" fill="#f5e211" />
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
      <rect width="60" height="26" fill="#f5f1e4" />
      <rect y="20" width="60" height="6" fill="#dcae82" />
      <rect y="20" width="60" height="1" fill="#2c2e2a" />

      {/* Ventana campesina con montañas (izquierda) */}
      <rect x="4" y="4" width="14" height="12" fill="#2c2e2a" />
      <rect x="5" y="5" width="12" height="10" fill="#dbeefb" />
      <rect x="5" y="11" width="12" height="4" fill="#8ed462" />
      <rect x="10" y="5" width="1" height="10" fill="#2c2e2a" />
      <rect x="5" y="9" width="12" height="1" fill="#2c2e2a" />

      {/* Doña Rosa en el centro */}
      <MatrizPixel filas={personaje_rosa} x={23} y={8} escala={1} />

      {/* Pocillo de café y único celular de la casa (derecha) */}
      <rect x="43" y="15" width="5" height="5" fill="#ff705d" />
      <rect x="44" y="12" width="1" height="2" fill="#80827f" />
      <rect x="46" y="11" width="1" height="2" fill="#80827f" />
      <rect x="50" y="9" width="6" height="11" fill="#2c2e2a" />
      <rect x="51" y="10" width="4" height="8" fill="#f5e211" />
    </svg>
  );
}

// Sprite pixel-art del estudiante viajero que recorre el camino emocional
const SPRITE_ESTUDIANTE_VIAJERO: string[] = [
  '....KKKKKK....',
  '..KKKKKKKKKKK.',
  '..KPPPPPPPPK.K',
  '..KPKPPPPKPK.K',
  '..KPPPPPPPPK..',
  '...KPPWWPPK...',
  '....KKKKKK....',
  '..KKYYYYYYKK..',
  '.KYYYYWWYYYYK.',
  '.KYYYYYYYYYYK.',
  '..KKNNNNNNKK..',
  '..KNNK..KNNK..',
  '..KKKK..KKKK..',
];

const SPRITE_ESTUDIANTE_FRUSTRADO: string[] = [
  '....KKKKKK....',
  '..KKKKKKKKKKK.',
  '..KPPPPPPPPK.K',
  '..KPKPPPPKPK.K',
  '..KPPPPPPPPK..',
  '...KPPKKPPK...',
  '....KKKKKK....',
  '..KKRRRRRRKK..',
  '.KRRRRWWRRRRK.',
  '.KRRRRRRRRRRK.',
  '..KKNNNNNNKK..',
  '..KNNK..KNNK..',
  '..KKKK..KKKK..',
];

export function MapaRecorridoPixel({
  paso_activo,
  fuente_activa,
  onSelectPaso,
}: {
  paso_activo: number;
  fuente_activa: FiltroFuente;
  onSelectPaso: (idx: number) => void;
}) {
  const OFFSET_Y = 38;
  const actual = recorrido[paso_activo] ?? recorrido[0];
  const estado_anim = estado_animacion_recorrido(actual.emocion);
  const sendero_escalonado = camino_escalonado_pixel();
  const char_x = Math.round(punto_x_recorrido(paso_activo));
  const char_y = Math.round(punto_y_recorrido(actual.emocion)) + OFFSET_Y;

  const clase_animacion =
    estado_anim === 'salto_estrellas'
      ? 'pixel-anim-jump'
      : estado_anim === 'alivio_escudo'
        ? 'pixel-anim-bob'
        : estado_anim === 'bloqueo_pregunta'
          ? 'pixel-anim-shake'
          : estado_anim === 'cansado_sudor'
            ? 'pixel-anim-tired'
            : 'pixel-anim-idle';

  return (
    <svg
      viewBox={`0 0 ${ancho_svg_recorrido} 264`}
      className="h-auto w-full rounded-soft border-2 border-ink-black bg-cream-paper"
      shapeRendering="crispEdges"
      role="img"
      aria-label="Paisaje pixel-art del recorrido del estudiante desde la escuela rural hasta la finca en casa, con el personaje desplazándose por las 7 estaciones según su emoción."
    >
      <style>{`
        @keyframes pixelJump {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes pixelBob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes pixelIdle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        @keyframes pixelShake {
          0%, 100% { transform: translateX(0px); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
        @keyframes pixelTired {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(3px); }
        }
        @keyframes pixelSparkle {
          0%, 100% { opacity: 1; transform: translateY(0px); }
          50% { opacity: 0.45; transform: translateY(-3px); }
        }
        @keyframes pixelSweat {
          0% { opacity: 1; transform: translateY(0px); }
          100% { opacity: 0.25; transform: translateY(6px); }
        }
        .pixel-anim-jump { animation: pixelJump 0.75s steps(2, end) infinite; }
        .pixel-anim-bob { animation: pixelBob 1.1s steps(2, end) infinite; }
        .pixel-anim-idle { animation: pixelIdle 1.6s steps(2, end) infinite; }
        .pixel-anim-shake { animation: pixelShake 0.45s steps(2, end) infinite; }
        .pixel-anim-tired { animation: pixelTired 1.4s steps(2, end) infinite; }
        .pixel-fx-sparkle { animation: pixelSparkle 0.8s steps(2, end) infinite; }
        .pixel-fx-sweat { animation: pixelSweat 0.9s steps(3, end) infinite; }
      `}</style>

      {/* 1. Cielo pixel-art por franjas (mañana escolar a la izquierda -> tarde campesina a la derecha) */}
      <rect x="0" y="0" width="700" height="56" fill="#cfe6f7" />
      <rect x="0" y="56" width="700" height="52" fill="#dbeefb" />
      <rect x="0" y="108" width="700" height="56" fill="#eff7fd" />
      {/* Atardecer cálido hacia la zona de la finca (derecha) */}
      <rect x="520" y="0" width="180" height="56" fill="#fcf6c5" opacity="0.55" />
      <rect x="556" y="56" width="144" height="52" fill="#fcf6c5" opacity="0.4" />

      {/* Sol pixel-art sobre la escuela (izquierda) */}
      <g transform="translate(18 14)">
        <rect x="4" y="0" width="16" height="24" fill="#f5e211" />
        <rect x="0" y="4" width="24" height="16" fill="#f5e211" />
        <rect x="4" y="4" width="16" height="16" fill="#ffffff" opacity="0.3" />
      </g>

      {/* Nubes pixeladas en el cielo */}
      <g fill="#ffffff">
        <rect x="218" y="16" width="36" height="8" />
        <rect x="226" y="10" width="20" height="6" />
        <rect x="214" y="24" width="44" height="4" fill="#b9d6f0" />

        <rect x="412" y="16" width="44" height="8" />
        <rect x="420" y="10" width="24" height="6" />
        <rect x="408" y="24" width="52" height="4" fill="#b9d6f0" />
      </g>

      {/* 2. Cordillera escalonada de Maripí al fondo */}
      <g fill="#5aa03a">
        <rect x="0" y="148" width="700" height="94" />
        <rect x="64" y="136" width="140" height="12" />
        <rect x="92" y="124" width="84" height="12" />
        <rect x="280" y="140" width="120" height="8" />
        <rect x="476" y="132" width="180" height="16" />
        <rect x="512" y="120" width="108" height="12" />
      </g>

      {/* Colina intermedia y prado donde corre el sendero */}
      <g fill="#6fbb47">
        <rect x="0" y="168" width="700" height="74" />
        <rect x="0" y="156" width="240" height="12" />
        <rect x="460" y="156" width="240" height="12" />
      </g>
      <rect x="0" y="200" width="700" height="42" fill="#8ed462" />

      {/* 3. Hitos arquitectónicos del paisaje en Pixel-Art */}
      {/* ZONA 1 (Izquierda): Escuela Rural Sede 5.º */}
      <g transform="translate(8 64)">
        {/* Techo escalonado de teja */}
        <rect x="8" y="0" width="44" height="4" fill="#2c2e2a" />
        <rect x="4" y="4" width="52" height="4" fill="#ff705d" />
        <rect x="0" y="8" width="60" height="6" fill="#ff705d" />
        {/* Pared blanca y zócalo azul */}
        <rect x="4" y="14" width="52" height="30" fill="#2c2e2a" />
        <rect x="6" y="14" width="48" height="22" fill="#ffffff" />
        <rect x="6" y="36" width="48" height="6" fill="#2ba0ff" />
        {/* Puerta y ventanas */}
        <rect x="26" y="24" width="8" height="18" fill="#8b6b4a" />
        <rect x="10" y="20" width="10" height="10" fill="#4f9a34" />
        <rect x="40" y="20" width="10" height="10" fill="#dbeefb" />
        {/* Bandera de Colombia */}
        <rect x="64" y="-8" width="2" height="52" fill="#2c2e2a" />
        <rect x="66" y="-8" width="12" height="4" fill="#f5e211" />
        <rect x="66" y="-4" width="12" height="2" fill="#2ba0ff" />
        <rect x="66" y="-2" width="12" height="2" fill="#ff705d" />
      </g>

      {/* ZONA 2 (Centro, Valle de preguntas difíciles y sopa de letras): Bloques de reto */}
      <g transform="translate(304 188)">
        <rect x="0" y="0" width="20" height="20" fill="#2c2e2a" />
        <rect x="2" y="2" width="16" height="16" fill="#ff705d" />
        <text x="10" y="15" textAnchor="middle" fontSize="12" fontWeight="700" fill="#ffffff">
          ?
        </text>
      </g>
      <g transform="translate(476 184)">
        <rect x="0" y="0" width="22" height="22" fill="#2c2e2a" />
        <rect x="2" y="2" width="18" height="18" fill="#ffffff" />
        <rect x="4" y="4" width="4" height="4" fill="#f5e211" />
        <rect x="9" y="4" width="4" height="4" fill="#e0dbce" />
        <rect x="14" y="4" width="4" height="4" fill="#e0dbce" />
        <rect x="4" y="9" width="4" height="4" fill="#f5e211" />
        <rect x="9" y="9" width="4" height="4" fill="#f5e211" />
        <rect x="14" y="9" width="4" height="4" fill="#f5e211" />
      </g>

      {/* ZONA 3 (Estación 6): Poste de luz rural y rayo */}
      <g transform="translate(502 68)">
        <rect x="10" y="0" width="4" height="68" fill="#5c442c" />
        <rect x="0" y="8" width="24" height="4" fill="#2c2e2a" />
        <rect x="4" y="18" width="16" height="4" fill="#2c2e2a" />
        <rect x="24" y="2" width="6" height="4" fill="#f5e211" />
        <rect x="22" y="6" width="6" height="4" fill="#f5e211" />
        <rect x="24" y="10" width="4" height="4" fill="#f5e211" />
      </g>

      {/* ZONA 4 (Derecha, Estación 7): Finca campesina y cafetales en casa */}
      <g transform="translate(592 98)">
        <rect x="8" y="0" width="36" height="4" fill="#2c2e2a" />
        <rect x="4" y="4" width="44" height="6" fill="#ff705d" />
        <rect x="8" y="10" width="36" height="24" fill="#2c2e2a" />
        <rect x="10" y="10" width="32" height="22" fill="#f5f1e4" />
        <rect x="22" y="18" width="8" height="14" fill="#8b6b4a" />
        <rect x="13" y="14" width="6" height="6" fill="#dbeefb" />
        <rect x="33" y="14" width="6" height="6" fill="#dbeefb" />
      </g>

      {/* 4. Sendero escalonado Pixel-Art que une las 7 estaciones */}
      <g transform={`translate(0 ${OFFSET_Y})`}>
        <path
          d={sendero_escalonado}
          fill="none"
          stroke="#2c2e2a"
          strokeWidth="14"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          d={sendero_escalonado}
          fill="none"
          stroke="#f5f1e4"
          strokeWidth="8"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          d={sendero_escalonado}
          fill="none"
          stroke="#dcae82"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      </g>

      {/* 5. Plataformas / Estaciones Pixel-Art numeradas (1 a 7) */}
      {recorrido.map((r, i) => {
        const cx = Math.round(punto_x_recorrido(i));
        const cy = Math.round(punto_y_recorrido(r.emocion)) + OFFSET_Y;
        const es_activo = paso_activo === i;
        const resalta_fuente =
          fuente_activa !== 'TODAS' && coincide_fuente(r.fuente, fuente_activa);
        const color_bloque =
          r.emocion >= 4 ? '#8ed462' : r.emocion <= 2 ? '#ff705d' : '#f5e211';

        return (
          <g
            key={r.paso}
            onClick={() => onSelectPaso(i)}
            className="cursor-pointer"
          >
            {/* Sombra del bloque */}
            <rect x={cx - 14} y={cy - 10} width="30" height="24" fill="#2c2e2a" />
            {/* Borde exterior de selección */}
            {(es_activo || resalta_fuente) && (
              <rect
                x={cx - 18}
                y={cy - 14}
                width="36"
                height="28"
                fill="none"
                stroke="#ffffff"
                strokeWidth="3"
              />
            )}
            {/* Bloque pixelado de la estación */}
            <rect
              x={cx - 15}
              y={cy - 12}
              width="30"
              height="24"
              fill={color_bloque}
              stroke="#2c2e2a"
              strokeWidth="2.5"
            />
            <rect x={cx - 13} y={cy - 10} width="26" height="3" fill="#ffffff" opacity="0.45" />
            <text
              x={cx}
              y={cy + 4}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="#2c2e2a"
            >
              {i + 1}
            </text>
          </g>
        );
      })}

      {/* 6. Personaje Pixel-Art móvil con animaciones según el estado emocional */}
      <g
        style={{
          transform: `translate(${char_x - 14}px, ${char_y - 40}px)`,
          transition: 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <g className={clase_animacion}>
          {/* Efectos animados sobre la cabeza del personaje */}
          {estado_anim === 'salto_estrellas' && (
            <g className="pixel-fx-sparkle">
              <rect x="-8" y="-4" width="6" height="6" fill="#f5e211" stroke="#2c2e2a" strokeWidth="1.2" />
              <rect x="30" y="-4" width="6" height="6" fill="#f5e211" stroke="#2c2e2a" strokeWidth="1.2" />
              <rect x="11" y="-10" width="6" height="6" fill="#ff705d" stroke="#2c2e2a" strokeWidth="1.2" />
            </g>
          )}
          {estado_anim === 'alivio_escudo' && (
            <g className="pixel-fx-sparkle" transform="translate(8 -12)">
              <rect x="0" y="0" width="12" height="10" fill="#8ed462" stroke="#2c2e2a" strokeWidth="1.5" />
              <rect x="3" y="5" width="2" height="2" fill="#2c2e2a" />
              <rect x="5" y="7" width="2" height="2" fill="#2c2e2a" />
              <rect x="7" y="3" width="2" height="4" fill="#2c2e2a" />
            </g>
          )}
          {estado_anim === 'bloqueo_pregunta' && (
            <g transform="translate(7 -14)">
              <rect x="0" y="0" width="14" height="12" fill="#ff705d" stroke="#2c2e2a" strokeWidth="1.5" />
              <text x="7" y="9" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ffffff">
                ?
              </text>
            </g>
          )}
          {estado_anim === 'cansado_sudor' && (
            <g className="pixel-fx-sweat">
              <rect x="28" y="2" width="4" height="6" fill="#2ba0ff" stroke="#2c2e2a" strokeWidth="1" />
            </g>
          )}

          {/* Sprite 16-bit del estudiante */}
          <MatrizPixel
            filas={
              actual.emocion <= 2
                ? SPRITE_ESTUDIANTE_FRUSTRADO
                : SPRITE_ESTUDIANTE_VIAJERO
            }
            escala={2}
          />
        </g>
      </g>

      {/* 7. Cinta inferior de zonas del recorrido */}
      <g transform="translate(0 242)">
        <rect x="0" y="0" width="700" height="22" fill="#2c2e2a" />
        <text x="90" y="15" fontSize="10" fontWeight="700" fill="#f5e211">
          AULA RURAL · INICIO
        </text>
        <text x="350" y="15" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ff705d">
          VALLE DE DIFICULTAD · PREGUNTAS Y SOPA
        </text>
        <text x="684" y="15" textAnchor="end" fontSize="10" fontWeight="700" fill="#8ed462">
          CORTE DE LUZ Y FINCA EN CASA
        </text>
      </g>
    </svg>
  );
}
