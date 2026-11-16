import { describe, expect, it } from 'vitest';
import act from '../../src/data/actividades/unidad_4.json' with { type: 'json' };
import {
  TORRE_VACIA,
  armar_torre,
  campo_completo,
  chequeo_completo,
  frase_de,
  iniciador_de,
  piso_completo,
  torre_completa,
  type PisoTorre,
} from '../../src/lib/torre';
import type { TorreGuardada } from '../../src/lib/tipos';

const pisos = act.torre.pisos as PisoTorre[];
const [base, centro, cima] = pisos;

const llena: TorreGuardada = {
  situacion: 'huerta',
  iniciadores: { postura: 'Yo pienso que en nuestra vereda', ejemplo: 'Por ejemplo, cuando en el salón' },
  textos: {
    postura: 'hace falta cuidar la quebrada',
    razon_1: 'de ahí sale el agua de las fincas',
    razon_2: 'la gente bota basura cerca',
    ejemplo: 'hablamos del agua, todos teníamos una historia.',
  },
  chequeo: [],
};

describe('torre de argumentos', () => {
  it('has three floors with the sentence starters of the design', () => {
    expect(pisos.map((p) => p.id)).toEqual(['base', 'centro', 'cima']);
    expect(base.campos[0].iniciadores).toEqual([
      'Yo pienso que en nuestra escuela',
      'Yo pienso que en nuestra vereda',
    ]);
    expect(centro.campos.map((c) => c.iniciadores[0])).toEqual([
      'Porque en primer lugar,',
      'Además, he visto que',
    ]);
    expect(cima.campos[0].iniciadores).toEqual([
      'Por ejemplo, cuando en la finca',
      'Por ejemplo, cuando en el salón',
    ]);
    for (const piso of pisos) for (const campo of piso.campos) expect(campo.ejemplo.length).toBeGreaterThan(20);
  });

  it('uses the first starter until the student picks another one', () => {
    expect(iniciador_de(base.campos[0], TORRE_VACIA)).toBe('Yo pienso que en nuestra escuela');
    expect(iniciador_de(base.campos[0], llena)).toBe('Yo pienso que en nuestra vereda');
    const rara = { ...TORRE_VACIA, iniciadores: { postura: 'otra cosa' } };
    expect(iniciador_de(base.campos[0], rara)).toBe('Yo pienso que en nuestra escuela');
  });

  it('asks for at least three words of the student after the starter', () => {
    const corta = { ...TORRE_VACIA, textos: { postura: 'hace falta' } };
    expect(campo_completo(base.campos[0], corta)).toBe(false);
    expect(campo_completo(base.campos[0], llena)).toBe(true);
  });

  it('needs both reasons to complete the middle floor', () => {
    const una = { ...llena, textos: { ...llena.textos, razon_2: '' } };
    expect(piso_completo(centro, una)).toBe(false);
    expect(torre_completa(pisos, una)).toBe(false);
    expect(torre_completa(pisos, llena)).toBe(true);
    expect(torre_completa(pisos, TORRE_VACIA)).toBe(false);
  });

  it('joins starter and text into sentences, from the base to the top', () => {
    expect(frase_de(base.campos[0], llena)).toBe(
      'Yo pienso que en nuestra vereda hace falta cuidar la quebrada.',
    );
    expect(frase_de(base.campos[0], TORRE_VACIA)).toBe('');
    expect(armar_torre(pisos, llena)).toBe(
      'Yo pienso que en nuestra vereda hace falta cuidar la quebrada. Porque en primer lugar, de ahí sale el agua de las fincas. Además, he visto que la gente bota basura cerca. Por ejemplo, cuando en el salón hablamos del agua, todos teníamos una historia.',
    );
  });

  it('has a self check of three points and knows when it is complete', () => {
    const puntos = act.torre.autochequeo;
    expect(puntos.map((p) => p.texto)).toEqual([
      'Dije claramente qué pienso',
      'Expliqué por qué con dos razones',
      'Puse un ejemplo real de mi vereda o colegio',
    ]);
    expect(chequeo_completo(puntos, llena)).toBe(false);
    expect(chequeo_completo(puntos, { ...llena, chequeo: ['postura', 'razones', 'ejemplo'] })).toBe(
      true,
    );
  });
});
