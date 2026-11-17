// React twin of src/components/ilustraciones/sprite.astro, for the islands.
import { datos_sprite, type NombreSprite } from '../../lib/sprites';

interface Props {
  nombre: NombreSprite;
  alto?: number;
  className?: string;
}

export function Sprite({ nombre, alto, className = '' }: Props) {
  const d = datos_sprite(nombre, alto);
  return (
    <img
      src={d.src}
      width={d.ancho}
      height={d.alto}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      draggable={false}
      className={`block select-none ${className}`}
    />
  );
}
