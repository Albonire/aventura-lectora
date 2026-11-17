import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { capas, referencias } from '../../src/lib/arte/capas';
import { id_degradado, materiales } from '../../src/lib/arte/paleta';
import { SOFIA } from '../../src/lib/arte/piezas/sofia';
import { MATEO } from '../../src/lib/arte/piezas/mateo';
import { CONEJO, ORUGA, TORTUGA } from '../../src/lib/arte/piezas/animales';
import { FLORES, PLANTAS, fondo, torre, CANAS_PORTADA } from '../../src/lib/arte/piezas/escena';
import { CELULAR, LIBRO, LUPA_SIMBOLO } from '../../src/lib/arte/piezas/objetos';
import { medalla } from '../../src/lib/arte/piezas/medallas';

const raiz = join(__dirname, '..', '..');
const leer = (ruta: string) => readFileSync(join(raiz, ruta), 'utf-8');
const defs = leer('src/components/ilustraciones/pintura_defs.astro');
// the gradients of the materials are written by a loop over the palette, so they are added by the same rule
const dibuja_todos = /en_uso\.map/.test(defs) && defs.includes('id={`al-g-${m}`}');
const ids_en_defs = new Set([
  ...[...defs.matchAll(/id="([^"]+)"/g)].map((m) => m[1]),
  ...(dibuja_todos ? Object.keys(materiales).map((m) => id_degradado(m as keyof typeof materiales)) : []),
]);

describe('consistencia del arte pintado', () => {
  const piezas = {
    sofia_lupa: SOFIA.lupa,
    sofia_senala: SOFIA.senala,
    mateo_libreta: MATEO.libreta,
    mateo_levanta: MATEO.levanta,
    conejo: CONEJO,
    tortuga: TORTUGA,
    oruga: ORUGA,
    fondo: fondo(),
    canas: CANAS_PORTADA,
    torre: torre(),
    libro: LIBRO,
    celular: CELULAR,
    lupa: LUPA_SIMBOLO,
    ...Object.fromEntries(Object.entries(PLANTAS).map(([k, v]) => [`planta_${k}`, v])),
    ...Object.fromEntries(Object.entries(FLORES).map(([k, v]) => [`flor_${k}`, v])),
    ...Object.fromEntries([1, 2, 3, 4].map((n) => [`medalla_${n}`, medalla(n)])),
  };

  it('every gradient and pattern a piece uses exists in the shared definitions', () => {
    for (const [nombre, formas] of Object.entries(piezas)) {
      for (const detalle of ['completo', 'reducido'] as const) {
        for (const id of referencias(capas(formas, { detalle }))) {
          expect(ids_en_defs.has(id), `${nombre} (${detalle}) uses #${id}`).toBe(true);
        }
      }
    }
  });

  it('the definitions write the gradient of every material that a piece uses', () => {
    expect(dibuja_todos).toBe(true);
  });

  it('the shared definitions are mounted once, in the base layout', () => {
    expect(leer('src/layouts/base_layout.astro').match(/<PinturaDefs/g)).toHaveLength(1);
  });

  it('no illustration component defines ids or defs', () => {
    const archivos: string[] = [];
    const recorrer = (dir: string) => {
      for (const e of readdirSync(join(raiz, dir), { withFileTypes: true })) {
        if (e.isDirectory()) recorrer(join(dir, e.name));
        else if (/\.(astro|tsx)$/.test(e.name)) archivos.push(join(dir, e.name));
      }
    };
    recorrer('src/components/ilustraciones');
    archivos.push('src/components/islas/insignia.tsx', 'src/components/islas/pieza.tsx');
    for (const a of archivos) {
      if (a.endsWith('pintura_defs.astro') || a.endsWith('escena_maripi.astro')) continue;
      const txt = leer(a);
      expect(/\sid=["{]/.test(txt), `${a} defines an id`).toBe(false);
      expect(/<defs/.test(txt), `${a} defines <defs>`).toBe(false);
    }
  });

  it('migrated art files have no hex colors: they come from paleta.ts', () => {
    const migrados = [
      'plantas', 'escena_base', 'escena_guia', 'libro', 'celular', 'lupa', 'portada_libro', 'portada_libro_vectorial', 'burbuja',
      'sofia', 'mateo', 'conejo', 'tortuga', 'oruga',
    ].map((n) => `src/components/ilustraciones/${n}.astro`);
    migrados.push(
      ...[1, 2, 3, 4].map((n) => `src/components/ilustraciones/portadas/portada_${n}.astro`),
      'src/components/islas/insignia.tsx',
    );
    for (const a of migrados) {
      expect(/#[0-9a-fA-F]{6}\b/.test(leer(a)), a).toBe(false);
    }
  });

  it('the pen filter is only used in big still scenes, never on the 3D cover or the stamp', () => {
    const con_filtro = ['escena_guia', 'portadas/portada_1', 'portadas/portada_2', 'portadas/portada_3', 'portadas/portada_4'];
    for (const n of con_filtro) {
      expect(leer(`src/components/ilustraciones/${n}.astro`), n).toContain('class="pintado"');
    }
    for (const a of [
      'src/components/ilustraciones/portada_libro.astro',
      'src/components/ilustraciones/portada_libro_vectorial.astro',
      'src/components/libro/tapa_libro.astro',
    ]) {
      expect(leer(a), a).not.toContain('pintado');
    }
  });
});
