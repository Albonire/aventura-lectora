import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { SPRITES, datos_sprite, type NombreSprite } from '../../src/lib/sprites';

const carpeta = join(__dirname, '..', '..', 'src', 'assets', 'sprites');

describe('sprites en crayon', () => {
  it('every sprite of the catalog has its file and every file is in the catalog', () => {
    const archivos = readdirSync(carpeta).map((f) => f.replace(/\.webp$/, '')).sort();
    expect(archivos).toEqual(Object.keys(SPRITES).sort());
  });

  it('the sizes of the catalog are the real ones and every sprite has a transparent background', async () => {
    for (const [nombre, [w, h]] of Object.entries(SPRITES)) {
      const meta = await sharp(join(carpeta, `${nombre}.webp`)).metadata();
      expect([meta.width, meta.height], nombre).toEqual([w, h]);
      expect(meta.hasAlpha, nombre).toBe(true);
      // the corners are outside the drawing: they must be transparent
      const { data } = await sharp(join(carpeta, `${nombre}.webp`)).raw().toBuffer({ resolveWithObject: true });
      expect(data[3], `${nombre} esquina`).toBe(0);
    }
  });

  it('keeps the shape when it is shown smaller and never grows it', () => {
    const grande = datos_sprite('sofia_celebra');
    const mitad = datos_sprite('sofia_celebra', 100);
    expect(mitad.alto).toBe(100);
    expect(mitad.ancho).toBe(Math.round((grande.ancho * 100) / grande.alto));
    expect(datos_sprite('oruga_camina', 500).alto).toBe(80);
    expect(() => datos_sprite('no_existe' as NombreSprite)).toThrow();
  });
});
