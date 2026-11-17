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

  it('wins the medal of a case only when every task of that case is done', async () => {
    const p = await import('../../src/lib/progreso');
    p.marcar_tarea(1, 'partes');
    p.marcar_tarea(1, 'receta');
    expect(p.leer_progreso().resueltos).toEqual([]);
    expect(p.tarea_hecha(1, 'receta', p.leer_progreso())).toBe(true);
    expect(p.tarea_hecha(1, 'idea', p.leer_progreso())).toBe(false);
    p.marcar_tarea(1, 'idea');
    p.marcar_tarea(1, 'idea');
    const actual = p.leer_progreso();
    expect(actual.resueltos).toEqual([1]);
    expect(actual.tareas).toEqual(['1:partes', '1:receta', '1:idea']);
  });

  it('keeps the tasks of one case apart from the others', async () => {
    const p = await import('../../src/lib/progreso');
    p.marcar_tarea(2, 'abuelo');
    p.marcar_tarea(4, 'torre');
    expect(p.leer_progreso().resueltos).toEqual([]);
    p.marcar_tarea(2, 'inferencias');
    expect(p.leer_progreso().resueltos).toEqual([2]);
  });

  it('saves the progress in the browser under the project prefix', async () => {
    const p = await import('../../src/lib/progreso');
    p.marcar_tarea(3, 'clasificar');
    const crudo = localStorage.getItem('aventura_lectora:ruta');
    expect(crudo).not.toBeNull();
    expect(JSON.parse(crudo ?? '{}').tareas).toEqual(['3:clasificar']);
  });

  it('ignores the progress of the old five case version', async () => {
    localStorage.setItem(
      'aventura_lectora:progreso',
      JSON.stringify({ resueltos: [1, 5], visitados: [1, 2], ultimo: null }),
    );
    const p = await import('../../src/lib/progreso');
    expect(p.leer_progreso().resueltos).toEqual([]);
  });

  it('remembers the last place', async () => {
    const p = await import('../../src/lib/progreso');
    p.guardar_lugar('/unidad/3', 'practica');
    expect(p.leer_progreso().ultimo).toEqual({ ruta: '/unidad/3', seccion: 'practica' });
  });

  it('remembers read pages without duplicates', async () => {
    const p = await import('../../src/lib/progreso');
    p.marcar_pagina_leida('2/pistas');
    p.marcar_pagina_leida('2/pistas');
    p.marcar_pagina_leida('2/lupa');
    expect(p.leer_progreso().paginas_leidas).toEqual(['2/pistas', '2/lupa']);
  });

  it('survives broken data in storage', async () => {
    localStorage.setItem('aventura_lectora:ruta', JSON.stringify({ resueltos: 'x', tareas: null }));
    const p = await import('../../src/lib/progreso');
    const actual = p.leer_progreso();
    expect(actual.resueltos).toEqual([]);
    expect(actual.tareas).toEqual([]);
    p.marcar_tarea(1, 'partes');
    expect(p.leer_progreso().tareas).toEqual(['1:partes']);
  });

  it('names one detective or a pair of detectives', async () => {
    const p = await import('../../src/lib/progreso');
    expect(p.nombres_detectives({ modo: 'solo', nombres: [' Ana ', 'Luis'] })).toBe('Ana');
    expect(p.nombres_detectives({ modo: 'pareja', nombres: ['Ana', 'Luis'] })).toBe('Ana y Luis');
    expect(p.nombres_detectives({ modo: 'pareja', nombres: ['Ana', ''] })).toBe('Ana');
    expect(p.nombres_detectives({ modo: 'solo', nombres: ['', ''] })).toBe('');
  });
});
