// the content rules of the prototype: short readings, hints that say where to read again,
// real diagnosis figures, only two authors and one school
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import act1 from '../../src/data/actividades/unidad_1.json' with { type: 'json' };
import act2 from '../../src/data/actividades/unidad_2.json' with { type: 'json' };
import act3 from '../../src/data/actividades/unidad_3.json' with { type: 'json' };
import act4 from '../../src/data/actividades/unidad_4.json' with { type: 'json' };
import agencia from '../../src/data/agencia.json' with { type: 'json' };
import { autoras, integrantes, sitio } from '../../src/config/sitio';
import { caso_completo, insignias, tareas_de } from '../../src/lib/insignias';
import { TOTAL_GRUPO, ajustes, diagnostico, porcentaje } from '../../src/data/prototipado';
import { referencias } from '../../src/data/referencias';

const palabras = (t: string) => t.trim().split(/\s+/).filter(Boolean).length;
const total = (parrafos: { texto: string }[]) => parrafos.reduce((n, p) => n + palabras(p.texto), 0);

describe('lecturas cortas', () => {
  it('keeps the fable at 200 words or less, moral included', () => {
    const n = total(act1.fabula.parrafos) + palabras(act1.fabula.moraleja);
    expect(n).toBeGreaterThanOrEqual(150);
    expect(n).toBeLessThanOrEqual(200);
  });

  it('keeps the traditional tale between 150 and 250 words', () => {
    const n = total(act2.relato.parrafos);
    expect(n).toBeGreaterThanOrEqual(150);
    expect(n).toBeLessThanOrEqual(250);
  });

  it('keeps the recipe short and with its steps in order', () => {
    const receta = act1.receta;
    const n =
      palabras(receta.entrada) +
      receta.ingredientes.reduce((a, i) => a + palabras(i), 0) +
      total(receta.pasos);
    expect(n).toBeLessThanOrEqual(150);
    expect(receta.pasos.map((p) => p.id)).toEqual(['fogon', 'agua', 'panela', 'chocolate', 'batir']);
  });

  it('has two phone messages of three or four lines, marked as made up', () => {
    expect(act3.mensajes).toHaveLength(2);
    for (const m of act3.mensajes) {
      expect(m.lineas.length).toBeGreaterThanOrEqual(3);
      expect(m.lineas.length).toBeLessThanOrEqual(4);
    }
    expect(act3.marca).toMatch(/inventados para practicar/);
  });

  it('opens the agency with a short story too', () => {
    expect(palabras(agencia.relato.join(' '))).toBeLessThanOrEqual(250);
  });
});

describe('pistas de Sofía', () => {
  const lugar = /párrafo|línea|frase|moraleja|nota|palabra|pregunta|mensaje|pista/i;

  it('gives every quiz question at least two graded hints that say where to look', () => {
    const preguntas = [...act1.quiz, ...act2.quiz, ...act3.quiz];
    expect(preguntas).toHaveLength(9);
    for (const p of preguntas) {
      expect(p.pistas.length, p.id).toBeGreaterThanOrEqual(2);
      for (const pista of p.pistas) {
        expect(pista, p.id).toMatch(lugar);
        expect(pista.toLowerCase(), p.id).not.toMatch(/^incorrecto/);
      }
      expect(p.opciones.map((o) => o.id)).toContain(p.correcta);
    }
  });

  it('gives a hint to every card that can be misplaced', () => {
    const items = [...act1.partes.items, ...act3.clasificar.items, ...act4.practica.items];
    for (const item of items) expect(item.pista.length, item.id).toBeGreaterThan(20);
  });

  it('never tells the answer away in the first hint of a quiz question', () => {
    for (const p of [...act1.quiz, ...act2.quiz, ...act3.quiz]) {
      const correcta = p.opciones.find((o) => o.id === p.correcta)?.texto ?? '';
      expect(p.pistas[0]).not.toContain(correcta);
    }
  });
});

describe('retos de cada estacion', () => {
  it('sorts the fable into beginning, middle and end', () => {
    expect(act1.partes.cajas.map((c) => c.titulo)).toEqual(['Inicio', 'Nudo', 'Desenlace']);
    const cajas = new Set(act1.partes.cajas.map((c) => c.id));
    for (const item of act1.partes.items) expect(cajas.has(item.caja)).toBe(true);
  });

  it('classifies sentences as checkable fact or opinion or rumor, half and half', () => {
    expect(act3.clasificar.cajas.map((c) => c.titulo)).toEqual([
      'Hecho comprobable',
      'Opinión o rumor',
    ]);
    const hechos = act3.clasificar.items.filter((i) => i.caja === 'hecho');
    expect(hechos).toHaveLength(3);
    expect(act3.clasificar.items).toHaveLength(6);
  });

  it('asks the three questions of the family challenge', () => {
    expect(act2.abuelo.campos.map((c) => c.etiqueta)).toEqual([
      '1. ¿Qué abuelo o familiar me contó la historia?',
      '2. ¿De qué trata el mito, leyenda o copla de Maripí?',
      '3. ¿Qué enseñanza nos deja?',
    ]);
  });
});

describe('insignias', () => {
  it('has the four medals of the passport in order', () => {
    expect(insignias.map((i) => i.nombre)).toEqual([
      'Lupa de Bronce',
      'Lupa de Plata',
      'Detector de Verdades',
      'Voz de Detective',
    ]);
  });

  it('wins a medal only with every task of its case', () => {
    expect(tareas_de(1)).toEqual(['partes', 'receta', 'idea']);
    expect(caso_completo(1, ['1:partes', '1:receta'])).toBe(false);
    expect(caso_completo(1, ['1:partes', '1:receta', '1:idea'])).toBe(true);
    expect(caso_completo(2, ['1:partes', '1:receta', '1:idea'])).toBe(false);
    expect(caso_completo(9, [])).toBe(false);
  });
});

describe('contexto y autoria', () => {
  it('names only the two authors and the school of Maripí', () => {
    expect(autoras).toEqual(['Luz Marina Castillo Cuadrado', 'Ingrid Yuliana González Flores']);
    expect(integrantes).toHaveLength(2);
    expect(sitio.institucion).toBe('Institución Educativa Jorge Eliécer Gaitán');
    expect(sitio.municipio).toBe('Maripí, Boyacá, Colombia');
    expect(sitio.docente).toBe('Gustavo Alberto Orozco Bohórquez');
    expect(sitio.asesora).toBe('Marcela Zambrano');
  });

  it('shows the diagnosis figures of 5 May 2026 for the 13 students', () => {
    expect(TOTAL_GRUPO).toBe(13);
    expect(Object.fromEntries(diagnostico.map((d) => [d.id, d.de_13]))).toEqual({
      entusiasmo: 10,
      inferencia: 10,
      celular: 9,
      sin_datos: 4,
      guia: 3,
    });
    expect(porcentaje(10)).toBe('76,9 %');
    expect(porcentaje(4)).toBe('30,8 %');
  });

  it('links every adjustment of the pilot to a place of the prototype', () => {
    expect(ajustes.length).toBeGreaterThanOrEqual(5);
    for (const a of ajustes) {
      expect(a.donde.href.startsWith('/')).toBe(true);
      expect(a.ajuste.length).toBeGreaterThan(30);
    }
  });

  it('publishes only references that were opened and matched', () => {
    const publicadas = referencias.filter((r) => r.verificado);
    expect(publicadas.length).toBeGreaterThanOrEqual(3);
    for (const r of publicadas) expect(r.verificado_el).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    for (const r of referencias.filter((x) => !x.verificado)) expect(r.nota).toBeTruthy();
  });
});

describe('textos del proyecto', () => {
  // former team members, the teacher of another seminar and other cities must not come back
  const prohibidos = [
    'Selene',
    'Maribel',
    'Silvia Gabriela',
    'Caballero Valle',
    'León Grillo',
    'Rincón Pérez',
    'Murcia',
    'Bogotá',
    'Medellín',
  ];
  const raya_larga = String.fromCharCode(0x2014);

  function archivos(carpeta: string): string[] {
    return readdirSync(carpeta).flatMap((nombre) => {
      const ruta = join(carpeta, nombre);
      if (statSync(ruta).isDirectory()) return archivos(ruta);
      return /\.(astro|tsx?|mdx?|json|css)$/.test(nombre) ? [ruta] : [];
    });
  }

  it('has no em dash and no removed names in the source of the site', () => {
    const fuentes = [...archivos('src'), 'CLAUDE.md', 'README.md', 'SPECS.md', 'CONTENIDO.md', 'RECURSOS.md'];
    for (const ruta of fuentes) {
      const texto = readFileSync(ruta, 'utf8');
      expect(texto.includes(raya_larga), ruta).toBe(false);
      for (const palabra of prohibidos) expect(texto.includes(palabra), `${ruta}: ${palabra}`).toBe(false);
    }
  });
});
