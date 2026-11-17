import { describe, expect, it } from 'vitest';
import { elegir_voz, partir_frases } from '../../src/lib/voz';

const v = (name: string, lang: string) => ({ name, lang });

describe('elegir_voz', () => {
  it('prefers a natural voice over the compact factory one', () => {
    const voces = [v('Spanish Compact', 'es-MX'), v('Microsoft Salome Online (Natural)', 'es-CO')];
    expect(elegir_voz(voces)?.name).toBe('Microsoft Salome Online (Natural)');
  });
  it('prefers the Google voice of the phone over a plain one', () => {
    const voces = [v('espanol', 'es-US'), v('Google espanol de Estados Unidos', 'es-US')];
    expect(elegir_voz(voces)?.name).toBe('Google espanol de Estados Unidos');
  });
  it('prefers a Latin American accent over Spain', () => {
    const voces = [v('Voz uno', 'es-ES'), v('Voz dos', 'es_MX')];
    expect(elegir_voz(voces)?.name).toBe('Voz dos');
  });
  it('ignores other languages and gives null when no Spanish voice exists', () => {
    expect(elegir_voz([v('Google US English', 'en-US')])).toBeNull();
    expect(elegir_voz([])).toBeNull();
  });
  it('always makes the same choice', () => {
    const voces = [v('B', 'es-MX'), v('A', 'es-MX')];
    expect(elegir_voz(voces)?.name).toBe('A');
    expect(elegir_voz([...voces].reverse())?.name).toBe('A');
  });
});

describe('partir_frases', () => {
  it('cuts after . ? ! and : keeping the signs', () => {
    expect(partir_frases('Hola. ¿Cómo estás? ¡Muy bien! Mira: un libro')).toEqual([
      'Hola.',
      '¿Cómo estás?',
      '¡Muy bien!',
      'Mira:',
      'un libro',
    ]);
  });
  it('does not lose any word', () => {
    const t = 'Sofía dijo: "Vamos a leer." Mateo asintió\ny corrió.';
    expect(partir_frases(t).join(' ')).toBe(t.replace(/\s+/g, ' '));
  });
  it('gives nothing for an empty text', () => {
    expect(partir_frases('  ')).toEqual([]);
  });
});
