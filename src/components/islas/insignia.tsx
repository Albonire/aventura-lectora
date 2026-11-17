// the four medals of the album (guide 2.1, figure 3). Shapes in src/lib/arte/piezas/medallas.ts.
import { medalla, MEDALLA_ALTO, MEDALLA_ANCHO } from '../../lib/arte/piezas/medallas';
import { Pieza } from './pieza';

interface Props {
  caso: number;
  size?: number;
  ganada?: boolean;
  titulo?: string;
}

export function Insignia({ caso, size = 120, ganada = true, titulo }: Props) {
  return (
    <svg
      viewBox={`0 0 ${MEDALLA_ANCHO} ${MEDALLA_ALTO}`}
      width={size}
      height={(size * MEDALLA_ALTO) / MEDALLA_ANCHO}
      role={titulo ? 'img' : undefined}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
      focusable="false"
      data-insignia={caso}
      data-ganada={ganada}
      style={{ opacity: ganada ? 1 : 0.45, filter: ganada ? 'none' : 'grayscale(1)' }}
    >
      <Pieza formas={medalla(caso)} detalle={size < 90 ? 'reducido' : 'completo'} escala={0.4} />
    </svg>
  );
}
