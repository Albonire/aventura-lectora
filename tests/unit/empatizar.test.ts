import { describe, expect, it } from 'vitest';
import {
  cifras,
  citas,
  claves_fuentes,
  coincide_fuente,
  como_podriamos,
  dolores,
  fuentes,
  ganancias,
  insights,
  linea_svg_recorrido,
  mapa,
  patrones,
  personas,
  punto_x_recorrido,
  punto_y_recorrido,
  recorrido,
  resumen_por_fuente,
} from '../../src/lib/empatizar';

describe('datos y logica de empatizar y definir (Maripi)', () => {
  it('conserva las 5 fuentes documentales y todas las colecciones base', () => {
    expect(claves_fuentes).toEqual(['B', 'P', 'E', 'F', 'D']);
    expect(Object.keys(fuentes)).toHaveLength(5);
    expect(cifras).toHaveLength(6);
    expect(citas).toHaveLength(6);
    expect(mapa).toHaveLength(4);
    expect(dolores).toHaveLength(6);
    expect(ganancias).toHaveLength(6);
    expect(recorrido).toHaveLength(7);
    expect(patrones).toHaveLength(7);
    expect(personas).toHaveLength(5);
    expect(insights).toHaveLength(6);
    expect(como_podriamos).toHaveLength(6);
  });

  it('calcula coordenadas y ruta SVG para la curva de emocion del recorrido', () => {
    expect(punto_x_recorrido(0, 7, 700)).toBe(50);
    expect(punto_x_recorrido(6, 7, 700)).toBe(650);
    // emocion 5 queda arriba (y=20) y emocion 1 abajo (y=160) en alto 180
    expect(punto_y_recorrido(5, 180)).toBe(20);
    expect(punto_y_recorrido(3, 180)).toBe(90);
    expect(punto_y_recorrido(1, 180)).toBe(160);

    const path = linea_svg_recorrido();
    expect(path.startsWith('M50.0,90.0 L150.0,20.0')).toBe(true);
    expect(path.split(' ')).toHaveLength(7);
  });

  it('resume hallazgos por fuente y filtra correctamente con coincide_fuente', () => {
    const bitacora = resumen_por_fuente('B');
    expect(bitacora.cifras).toBe(3);
    expect(bitacora.citas).toBe(1);
    expect(bitacora.pasos_recorrido).toBe(1);
    expect(bitacora.patrones).toBe(5);
    expect(bitacora.total).toBeGreaterThan(10);

    expect(coincide_fuente('P', 'TODAS')).toBe(true);
    expect(coincide_fuente('P', 'P')).toBe(true);
    expect(coincide_fuente('P', 'B')).toBe(false);
    expect(coincide_fuente(['B', 'P', 'E'], 'E')).toBe(true);
    expect(coincide_fuente(['B', 'P', 'E'], 'F')).toBe(false);
  });

  it('conecta cada perfil con indices validos de insights y preguntas como podriamos', () => {
    for (const p of personas) {
      expect(p.insights_vinculados.length).toBeGreaterThan(0);
      expect(p.preguntas_vinculadas.length).toBeGreaterThan(0);
      for (const idx of p.insights_vinculados) {
        expect(idx).toBeGreaterThanOrEqual(0);
        expect(idx).toBeLessThan(insights.length);
      }
      for (const idx of p.preguntas_vinculadas) {
        expect(idx).toBeGreaterThanOrEqual(0);
        expect(idx).toBeLessThan(como_podriamos.length);
      }
    }
    expect(como_podriamos.filter((c) => c.principal)).toHaveLength(2);
  });
});
