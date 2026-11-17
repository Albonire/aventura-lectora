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
  mapa,
  patrones,
  personas,
  resumen_por_fuente,
} from '../../src/lib/empatizar';

describe('datos y logica de empatizar y definir (Maripi)', () => {
  it('conserva las 4 fuentes documentales y todas las colecciones base', () => {
    expect(claves_fuentes).toEqual(['B', 'E', 'F', 'D']);
    expect(Object.keys(fuentes)).toHaveLength(4);
    expect(cifras).toHaveLength(6);
    expect(citas).toHaveLength(3);
    expect(mapa).toHaveLength(4);
    expect(dolores).toHaveLength(6);
    expect(ganancias).toHaveLength(5);
    expect(patrones).toHaveLength(7);
    expect(personas).toHaveLength(5);
    expect(insights).toHaveLength(6);
    expect(como_podriamos).toHaveLength(6);
  });

  it('resume hallazgos por fuente y filtra correctamente con coincide_fuente', () => {
    const bitacora = resumen_por_fuente('B');
    expect(bitacora.cifras).toBe(4);
    expect(bitacora.citas).toBe(1);
    expect(bitacora.patrones).toBe(5);
    expect(bitacora.total).toBeGreaterThan(8);

    expect(coincide_fuente('E', 'TODAS')).toBe(true);
    expect(coincide_fuente('E', 'E')).toBe(true);
    expect(coincide_fuente('E', 'B')).toBe(false);
    expect(coincide_fuente(['B', 'E'], 'E')).toBe(true);
    expect(coincide_fuente(['B', 'E'], 'F')).toBe(false);
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

  it('no menciona el pilotaje del 10 de octubre en ningun dato', () => {
    const todo = JSON.stringify({ fuentes, cifras, citas, mapa, dolores, ganancias, patrones, personas, insights });
    expect(todo).not.toMatch(/octubre|pilot/i);
    // cada evidencia usa solo fuentes que existen
    for (const c of [...cifras, ...citas]) expect(claves_fuentes).toContain(c.fuente);
    for (const m of mapa) for (const [, f] of m.items) expect(claves_fuentes).toContain(f);
    for (const p of patrones) for (const f of p.f) expect(claves_fuentes).toContain(f);
    for (const p of personas) for (const f of p.fuentes_base) expect(claves_fuentes).toContain(f);
  });
});
