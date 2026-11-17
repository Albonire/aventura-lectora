// the crayon sprites of the characters (src/assets/sprites, cut from the sheet by scripts/preparar_imagenes.mjs).
// They have a transparent background, so they sit on any light color of the site: cream, white, yellow or sky blue.
// Size in pixels of every file, so the page reserves the space before the image loads.

export const SPRITES = {
  sofia_celebra: [140, 209],
  sofia_camina: [120, 190],
  sofia_parada: [109, 191],
  sofia_lupa: [136, 192],
  mateo_celebra: [144, 212],
  mateo_camina: [106, 217],
  mateo_escribe: [120, 217],
  mateo_libreta: [131, 215],
  conejo_corre: [111, 169],
  conejo_camina: [106, 170],
  conejo_celebra: [102, 166],
  conejo_guina: [101, 162],
  conejo_frente: [72, 144],
  conejo_alegre: [73, 146],
  tortuga_libro: [115, 110],
  tortuga_celebra: [93, 118],
  oruga_camina: [130, 80],
  oruga_guina: [132, 80],
  oruga_sombrero: [132, 90],
} as const satisfies Record<string, readonly [number, number]>;

export type NombreSprite = keyof typeof SPRITES;

const archivos = import.meta.glob<unknown>('../assets/sprites/*.webp', { eager: true, import: 'default' });

// Astro gives an object with the address; plain Vite (the tests) gives the address itself
function direccion(valor: unknown): string {
  return typeof valor === 'string' ? valor : (valor as { src: string }).src;
}

export interface DatosSprite {
  src: string;
  ancho: number;
  alto: number;
}

// address and shape of a sprite shown at a height in pixels (never above its own size, or it would be blurry)
export function datos_sprite(nombre: NombreSprite, alto?: number): DatosSprite {
  const [w, h] = SPRITES[nombre];
  const ruta = Object.keys(archivos).find((k) => k.endsWith(`/${nombre}.webp`));
  if (!ruta) throw new Error(`No existe el sprite ${nombre}`);
  const alto_final = Math.min(alto ?? h, h);
  return { src: direccion(archivos[ruta]), ancho: Math.round((w * alto_final) / h), alto: alto_final };
}
