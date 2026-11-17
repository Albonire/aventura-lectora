// React twin of src/components/ilustraciones/pieza.astro: the same layers, drawn inside an <svg> of the parent.
import { capas, type Detalle, type Forma } from '../../lib/arte/capas';

interface Props {
  formas: Forma[];
  detalle?: Detalle;
  escala?: number;
}

export function Pieza({ formas, detalle = 'completo', escala = 1 }: Props) {
  const elementos = capas(formas, { detalle, escala });
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      {elementos.map((e, i) => (
        <path
          key={i}
          d={e.d}
          fill={e.fill ?? 'none'}
          stroke={e.stroke}
          strokeWidth={e.sw}
          strokeDasharray={e.da}
          opacity={e.op}
          transform={e.tr}
          className={e.cls}
        />
      ))}
    </g>
  );
}
