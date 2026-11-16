import { describe, expect, it } from 'vitest';
import { corregir, ubicar } from '../../src/lib/clasificar';

const items = [
  { id: 'a', texto: 'Había una vez...', caja: 'narrativo' },
  { id: 'b', texto: 'Paso 1: lava las manos.', caja: 'instructivo' },
  { id: 'c', texto: 'El trapiche muele caña desde 1950.', caja: 'informativo' },
];

describe('DragSort correction', () => {
  it('marks each card as right, wrong or not placed', () => {
    let asignaciones = ubicar({}, 'a', 'narrativo');
    asignaciones = ubicar(asignaciones, 'b', 'informativo');
    const r = corregir(items, asignaciones);
    expect(r.resultados).toEqual({ a: 'bien', b: 'mal', c: 'sin_ubicar' });
    expect(r.aciertos).toBe(1);
    expect(r.completo).toBe(false);
  });

  it('is complete and perfect when every card is in its box', () => {
    const asignaciones = { a: 'narrativo', b: 'instructivo', c: 'informativo' };
    const r = corregir(items, asignaciones);
    expect(r.aciertos).toBe(3);
    expect(r.completo).toBe(true);
  });

  it('lets a card go back to the tray', () => {
    const asignaciones = ubicar({ a: 'narrativo' }, 'a', null);
    expect(corregir(items, asignaciones).resultados.a).toBe('sin_ubicar');
  });
});
