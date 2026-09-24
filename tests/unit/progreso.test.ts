import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

function memoria(): Storage {
  const datos = new Map<string, string>();
  return {
    get length() {
      return datos.size;
    },
    clear: () => datos.clear(),
    getItem: (k) => datos.get(k) ?? null,
    key: (i) => [...datos.keys()][i] ?? null,
    removeItem: (k) => void datos.delete(k),
    setItem: (k, v) => void datos.set(k, v),
  };
}

describe('progreso', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubGlobal('localStorage', memoria());
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('tracks visited and solved cases', async () => {
    const p = await import('../../src/lib/progreso');
    expect(p.estado_de(1, p.leer_progreso())).toBe('sin_empezar');
    p.marcar_visitado(1);
    expect(p.estado_de(1, p.leer_progreso())).toBe('en_curso');
    p.marcar_resuelto(1);
    p.marcar_resuelto(1);
    const actual = p.leer_progreso();
    expect(actual.resueltos).toEqual([1]);
    expect(p.estado_de(1, actual)).toBe('resuelto');
  });

  it('remembers the last place', async () => {
    const p = await import('../../src/lib/progreso');
    p.guardar_lugar('/unidad/3', 'practica');
    expect(p.leer_progreso().ultimo).toEqual({ ruta: '/unidad/3', seccion: 'practica' });
  });
});
