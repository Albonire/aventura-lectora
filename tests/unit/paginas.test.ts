import { describe, expect, it } from 'vitest';
import {
  TOTAL_CASOS,
  destino_de,
  estacion_de_caso,
  estaciones,
  etiqueta_caso,
  folio,
  id_pagina,
  orden_libro,
  pagina_de_seccion,
  paginas_caso,
  ruta_pagina,
  ruta_seccion,
  vecinos,
} from '../../src/config/paginas';

describe('las seis estaciones', () => {
  it('follows the route of the design document: start, three missions, final challenge and achievement', () => {
    expect(estaciones.map((e) => `${e.codigo} ${e.etiqueta}`)).toEqual([
      '00 Inicio',
      '01 Misión 1',
      '02 Misión 2',
      '03 Misión 3',
      '04 Desafío final',
      '05 Logro',
    ]);
    expect(estaciones.map((e) => e.titulo)).toEqual([
      'Apertura de la Agencia',
      'Leo y comprendo el rastro',
      'Pistas y "Cuéntame, abuelo"',
      'Detectives de noticias',
      'Mi voz cuenta en Maripí',
      'Cierre del expediente',
    ]);
  });

  it('has four cases with pages and two stations with a page of their own', () => {
    expect(estaciones.filter((e) => e.caso).map((e) => e.caso)).toEqual([1, 2, 3, 4]);
    expect(TOTAL_CASOS).toBe(4);
    expect(estaciones[0].href).toBe('/agencia');
    expect(estaciones[5].href).toBe('/cierre');
    expect(etiqueta_caso(4)).toBe('Desafío final');
    expect(estacion_de_caso(2).recompensa).toBe('Insignia Lupa de Plata');
    expect(() => estacion_de_caso(5)).toThrow();
  });
});

describe('los cuatro pasos fijos de cada mision', () => {
  it('keeps the same four steps in the same order', () => {
    expect(paginas_caso.map((p) => p.titulo)).toEqual([
      'Abrir el caso',
      'Seguir las pistas',
      'Entrenar la lupa',
      'Cerrar el caso',
    ]);
    const todas = paginas_caso.flatMap((p) => p.secciones);
    expect(new Set(todas).size).toBe(todas.length);
  });

  it('builds routes and section links', () => {
    expect(ruta_pagina(3)).toBe('/unidad/3');
    expect(ruta_pagina(3, 'pistas')).toBe('/unidad/3/pistas');
    expect(ruta_seccion(2, 'reto')).toBe('/unidad/2/cerrar#reto');
    expect(ruta_seccion(4, 'practica')).toBe('/unidad/4/lupa#practica');
    expect(pagina_de_seccion('desarrollo')?.slug).toBe('pistas');
    expect(() => ruta_seccion(1, 'no-existe')).toThrow();
  });

  it('numbers the steps and builds the key used to remember them', () => {
    expect(folio('abrir')).toBe('Paso 1 de 4');
    expect(folio('cerrar')).toBe('Paso 4 de 4');
    expect(id_pagina(4, 'lupa')).toBe('4/lupa');
  });
});

describe('orden de lectura', () => {
  it('goes from the cover to the closing station through sixteen case pages', () => {
    const orden = orden_libro();
    expect(orden).toHaveLength(2 + 16 + 1);
    expect(orden[0]).toEqual({ tipo: 'inicio' });
    expect(orden[1]).toEqual({ tipo: 'agencia' });
    expect(orden.at(-1)).toEqual({ tipo: 'cierre' });
  });

  it('reaches every route with next and ends on the certificate', () => {
    let actual = orden_libro()[0];
    const visitadas = new Set<string>();
    for (let i = 0; i < 40; i += 1) {
      const { siguiente } = vecinos(actual);
      if (!siguiente) break;
      visitadas.add(siguiente.href);
      actual = orden_libro().find((u) => destino_de(u).href === siguiente.href) ?? actual;
    }
    expect(visitadas.size).toBe(18);
    expect(destino_de(actual).href).toBe('/cierre');
  });

  it('links the last step of a mission to the first step of the next station', () => {
    const { siguiente, anterior } = vecinos({ tipo: 'caso', caso: 1, pagina: 'cerrar' });
    expect(siguiente).toEqual({
      href: '/unidad/2',
      titulo: 'Abrir el caso',
      contexto: 'Misión 2: Pistas y "Cuéntame, abuelo"',
    });
    expect(anterior?.href).toBe('/unidad/1/lupa');
  });

  it('links the agency to mission 1 and the final challenge to the closing', () => {
    expect(vecinos({ tipo: 'agencia' }).siguiente?.href).toBe('/unidad/1');
    expect(vecinos({ tipo: 'agencia' }).anterior?.href).toBe('/');
    expect(vecinos({ tipo: 'caso', caso: 1, pagina: 'abrir' }).anterior?.href).toBe('/agencia');
    expect(vecinos({ tipo: 'caso', caso: 4, pagina: 'cerrar' }).siguiente?.href).toBe('/cierre');
    expect(vecinos({ tipo: 'cierre' }).siguiente).toBeNull();
    expect(vecinos({ tipo: 'inicio' }).anterior).toBeNull();
  });
});
