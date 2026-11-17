import { describe, expect, it } from 'vitest';
import {
  aplanar,
  caja,
  circ,
  contenido,
  dentro,
  elip,
  parsear,
  polo,
  principal,
  ruido,
  temblar,
} from '../../src/lib/arte/geometria';
import { capas, linea, mancha, referencias, relleno, sombrear } from '../../src/lib/arte/capas';
import { CREMA, LUZ, TINTA, color, materiales, mezclar } from '../../src/lib/arte/paleta';

describe('geometria del arte', () => {
  it('reads absolute paths and rejects the ones the pen cannot move', () => {
    expect(parsear('M0 0L10 0 10 10Z').map((s) => s.c)).toEqual(['M', 'L', 'L', 'Z']);
    expect(() => parsear('M0 0l10 0')).toThrow(/no permitido/);
    expect(() => parsear('M0 0H10')).toThrow(/no permitido/);
    expect(() => parsear('M0 0L10')).toThrow(/mal formado/);
  });

  it('builds circles, ellipses and boxes that are closed shapes', () => {
    for (const d of [circ(50, 50, 20), elip(50, 50, 30, 10), caja(0, 0, 40, 20, 5), caja(0, 0, 40, 20)]) {
      const polis = aplanar(parsear(d));
      expect(polis).toHaveLength(1);
      expect(d.endsWith('Z')).toBe(true);
    }
    const c = aplanar(parsear(circ(50, 50, 20)));
    expect(dentro([50, 50], c)).toBe(true);
    expect(dentro([75, 50], c)).toBe(false);
  });

  it('finds the point farthest from the edge of a circle', () => {
    const { centro, radio } = polo(aplanar(parsear(circ(60, 40, 24))));
    expect(radio).toBeGreaterThan(21);
    expect(Math.hypot(centro[0] - 60, centro[1] - 40)).toBeLessThan(5);
  });

  it('noise is smooth, bounded and repeatable', () => {
    expect(ruido(3.3, 4.4, 11)).toBe(ruido(3.3, 4.4, 11));
    expect(ruido(3.3, 4.4, 11)).not.toBe(ruido(3.3, 4.4, 12));
    for (let i = 0; i < 200; i += 1) {
      const v = ruido(i * 0.37, i * 0.91, 5);
      expect(v).toBeGreaterThanOrEqual(-1);
      expect(v).toBeLessThanOrEqual(1);
    }
    expect(Math.abs(ruido(5.0, 5.0, 3) - ruido(5.01, 5.0, 3))).toBeLessThan(0.1);
  });
});

describe('temblar: el pulso de la plumilla', () => {
  const d = 'M10 10L60 10C80 10 90 30 90 50L90 90L10 90Z';

  it('is repeatable: same path and seed give the same pen', () => {
    expect(temblar(d, 1, 11)).toBe(temblar(d, 1, 11));
    expect(temblar(d, 1, 11)).not.toBe(temblar(d, 1, 12));
  });

  it('keeps the shape closed and never moves a corner more than the amplitude', () => {
    const corto = 'M10 10L30 10L30 30L10 30Z';
    const original = parsear(corto);
    const movido = parsear(temblar(corto, 1.2, 11));
    expect(movido.map((s) => s.c)).toEqual(original.map((s) => s.c));
    original.forEach((s, i) => {
      s.p.forEach((v, j) => expect(Math.abs(movido[i].p[j] - v)).toBeLessThanOrEqual(1.2 + 0.1));
    });
  });

  it('cuts long lines into pieces so they can wave', () => {
    const recta = parsear(temblar('M0 0L200 0', 1, 11));
    expect(recta.length).toBeGreaterThan(5);
    const ys = recta.map((s) => s.p[1]);
    expect(Math.max(...ys) - Math.min(...ys)).toBeGreaterThan(0.3);
  });

  it('moves two shapes that share a point in the same way', () => {
    const a = parsear(temblar('M40 40L80 40', 1, 11))[0].p;
    const b = parsear(temblar('M40 40L40 90', 1, 11))[0].p;
    expect(a).toEqual(b);
  });

  it('does nothing with amplitude 0', () => {
    expect(temblar(d, 0, 11)).toBe(d);
  });
});

describe('capas: how a shape is painted', () => {
  const cabeza = relleno(circ(100, 100, 40), 'piel_sofia', { vol: 0.6, brillo: 0.6, trama: true });

  it('leaves a dark rim on the shadow side: a smaller copy moved toward the light', () => {
    const polis = aplanar(parsear(cabeza.d));
    const sh = sombrear(polis, 0.6);
    expect(sh).not.toBeNull();
    const { copia } = sh!;
    expect(copia.k).toBeLessThan(1);
    expect(copia.k).toBeGreaterThan(0.7);
    // the copy keeps to the light side: it is moved up and to the left
    const [cx, cy] = principal(polis).reduce((a, p) => [a[0] + p[0], a[1] + p[1]], [0, 0]).map((v) => v / principal(polis).length);
    const ccx = copia.poli.reduce((a, p) => a + p[0], 0) / copia.poli.length;
    const ccy = copia.poli.reduce((a, p) => a + p[1], 0) / copia.poli.length;
    expect(ccx - cx).toBeLessThan(0);
    expect(ccy - cy).toBeLessThan(0);
    expect(Math.sign(ccx - cx)).toBe(Math.sign(LUZ.x));
    expect(contenido(copia.poli, polis, 1.2)).toBe(true);
  });

  it('never lets the smaller copy leave a thin shape', () => {
    const brazo = 'M10 10C60 10 120 40 140 90L125 100C100 55 50 30 10 30Z';
    const sh = sombrear(aplanar(parsear(brazo)), 0.9);
    if (sh) expect(contenido(sh.copia.poli, aplanar(parsear(brazo)), 1.2)).toBe(true);
  });

  it('orders the layers: rim, hatching, volume, highlight, ink, second pass', () => {
    const el = capas([cabeza]);
    expect(el[0].fill).toBe(materiales.piel_sofia.sombra);
    expect(el[1].cls).toBe('trama');
    expect(el[2].fill).toBe('url(#al-g-piel_sofia)');
    expect(el[2].tr).toMatch(/^matrix\(/);
    expect(el[3].fill).toBe(materiales.piel_sofia.luz);
    expect(el[4].stroke).toBe(TINTA);
    expect(el[5].stroke).toBe(TINTA);
    expect(el[5].sw).toBeLessThan(el[4].sw!);
    expect(el).toHaveLength(6);
  });

  it('the reduced detail drops hatching, highlight and the second pass', () => {
    const el = capas([cabeza], { detalle: 'reducido' });
    expect(el.some((e) => e.cls === 'trama')).toBe(false);
    expect(el).toHaveLength(3);
  });

  it('draws a flat shape with fill and outline in one element', () => {
    const el = capas([relleno(caja(0, 0, 30, 30), 'blanco', { vol: 0, grosor: 3 })], { detalle: 'reducido' });
    expect(el).toHaveLength(1);
    expect(el[0].fill).toBe('url(#al-g-blanco)');
    expect(el[0].stroke).toBe(TINTA);
  });

  it('background shapes have no outline and middle ones a soft thin one', () => {
    const fondo = capas([relleno(circ(50, 50, 30), 'loma', { plano: 'fondo' })])[0];
    expect(fondo.stroke).toBeUndefined();
    const medio = capas([relleno(circ(50, 50, 30), 'hoja', { plano: 'medio' })]);
    expect(medio.at(-1)?.stroke).toBe(materiales.hoja.trazo);
    expect(medio.at(-1)?.sw).toBe(2);
  });

  it('lines and spots keep to their colors and skip the fine ones in the reduced detail', () => {
    const formas = [
      linea('M0 0L40 0', 'tinta', 3),
      linea('M0 5L40 5', 'piel_sofia.sombra', 2, { fino: true }),
      mancha(circ(10, 10, 5), 'rubor', 0.8),
    ];
    const completo = capas(formas);
    expect(completo[0].stroke).toBe(TINTA);
    expect(completo[1].stroke).toBe(materiales.piel_sofia.sombra);
    expect(completo[2].fill).toBe('url(#al-rubor)');
    expect(capas(formas, { detalle: 'reducido' })).toHaveLength(2);
  });

  it('is repeatable and caches by list', () => {
    const formas = [cabeza];
    expect(capas(formas)).toBe(capas(formas));
    expect(JSON.stringify(capas([cabeza]))).toBe(JSON.stringify(capas([cabeza])));
  });

  it('lists the gradients it needs so they can be checked against the shared definitions', () => {
    expect(referencias(capas([cabeza, mancha(circ(0, 0, 4), 'rubor')]))).toEqual(
      expect.arrayContaining(['al-g-piel_sofia', 'al-trama', 'al-rubor']),
    );
  });
});

describe('paleta', () => {
  it('derives every tone from one rule', () => {
    const r = materiales.chaqueta;
    expect(r.base).toBe('#facc15');
    expect(r.luz).toBe(mezclar('#facc15', CREMA, 0.5));
    expect(r.sombra).toBe(mezclar('#facc15', TINTA, 0.3));
  });

  it('light is lighter and shadow is darker than the base for every material', () => {
    const brillo = (h: string) => {
      const n = Number.parseInt(h.slice(1), 16);
      return 0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
    };
    for (const [nombre, r] of Object.entries(materiales)) {
      expect(brillo(r.luz), nombre).toBeGreaterThanOrEqual(brillo(r.base) - 1);
      expect(brillo(r.sombra), nombre).toBeLessThanOrEqual(brillo(r.base) + 1);
    }
  });

  it('the light comes from the top left', () => {
    expect(LUZ.x).toBeLessThan(0);
    expect(LUZ.y).toBeLessThan(0);
    expect(Math.hypot(LUZ.x, LUZ.y)).toBeCloseTo(1, 5);
  });

  it('resolves color references and refuses unknown ones', () => {
    expect(color('tinta')).toBe(TINTA);
    expect(color('piel_mateo')).toBe('#a9703f');
    expect(color('piel_mateo.sombra')).toBe(materiales.piel_mateo.sombra);
    expect(() => color('inventado')).toThrow();
    expect(() => color('piel_mateo.nada')).toThrow();
  });

  it('keeps the colors of the style guide as base tones', () => {
    expect(materiales.chaqueta.base).toBe('#facc15');
    expect(materiales.lima.base).toBe('#84cc16');
    expect(materiales.cielo.base).toBe('#0284c7');
    expect(materiales.coral.base).toBe('#f43f5e');
    expect(materiales.crema.base).toBe(CREMA);
  });
});

describe('compactar: el trazado corto de la pagina', () => {
  it('draws the same points as the absolute path, with relative commands', async () => {
    const { compactar, parsear } = await import('../../src/lib/arte/geometria');
    const abs = 'M110.4 210.2L130.4 210.2C140.1 210 150.3 220.5 150 230.9Q150 240.7 140 240.1Z';
    const corto = compactar(abs);
    expect(corto.length).toBeLessThan(abs.length);
    expect(corto).toMatch(/^M110.4 210.2l/);
    expect(corto.endsWith('z')).toBe(true);
    // rebuilding the absolute points from the relative steps gives the rounded originals
    let x = 0;
    let y = 0;
    const pts: number[][] = [];
    for (const m of corto.matchAll(/([MlcqzL])([^a-zA-Z]*)/g)) {
      const n = (m[2].match(/-?\d*\.?\d+/g) ?? []).map(Number);
      if (m[1] === 'M') { x = n[0]; y = n[1]; pts.push([x, y]); }
      else if (m[1] === 'l' || m[1] === 'c' || m[1] === 'q') {
        const fin = n.slice(-2);
        x += fin[0]; y += fin[1]; pts.push([Math.round(x * 10) / 10, Math.round(y * 10) / 10]);
      }
    }
    const esperado = parsear(abs).filter((s) => s.c !== 'Z').map((s) => [s.p[s.p.length - 2], s.p[s.p.length - 1]]);
    expect(pts).toEqual(esperado);
  });
});
