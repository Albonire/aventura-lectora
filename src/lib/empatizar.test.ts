import test from 'node:test';
import assert from 'node:assert/strict';
import {
  camino_escalonado_pixel,
  cifras,
  citas,
  coincide_fuente,
  como_podriamos,
  compactar_fila_pixel,
  estado_animacion_recorrido,
  insights,
  linea_svg_recorrido,
  personas,
  punto_x_recorrido,
  punto_y_recorrido,
  recorrido,
  resumen_por_fuente,
} from './empatizar';

test('coordenadas de la curva de recorrido calculan extremos, camino escalonado pixel y animaciones', () => {
  assert.equal(punto_x_recorrido(0, 7, 700), 50);
  assert.equal(punto_x_recorrido(6, 7, 700), 650);
  assert.equal(punto_y_recorrido(5, 180), 20);
  assert.equal(punto_y_recorrido(3, 180), 90);
  assert.equal(punto_y_recorrido(1, 180), 160);
  const linea = linea_svg_recorrido();
  assert.equal(linea.startsWith('M50.0,90.0 L150.0,20.0'), true);
  const escalonado = camino_escalonado_pixel();
  assert.equal(escalonado.startsWith('M50,90 H90 V55 H110 V20 H150'), true);
  assert.equal(estado_animacion_recorrido(5), 'salto_estrellas');
  assert.equal(estado_animacion_recorrido(4), 'alivio_escudo');
  assert.equal(estado_animacion_recorrido(3), 'atento_curioso');
  assert.equal(estado_animacion_recorrido(2), 'cansado_sudor');
  assert.equal(estado_animacion_recorrido(1), 'bloqueo_pregunta');
  assert.deepEqual(compactar_fila_pixel('..KKYY..G'), [
    { x: 2, w: 2, c: 'K' },
    { x: 4, w: 2, c: 'Y' },
    { x: 8, w: 1, c: 'G' },
  ]);
  assert.equal(recorrido.length, 7);
});

test('resumen por fuente contabiliza cifras, citas, mapa, recorrido y patrones', () => {
  const resumen_p = resumen_por_fuente('P');
  assert.equal(resumen_p.cifras, 1);
  assert.equal(resumen_p.citas, 3);
  assert.equal(resumen_p.pasos_recorrido, 5);
  assert.equal(coincide_fuente(['B', 'P'], 'P'), true);
  assert.equal(coincide_fuente(['B', 'P'], 'D'), false);
  assert.equal(cifras.length, 6);
  assert.equal(citas.length, 6);
});

test('perfiles apuntan a insights y preguntas validas', () => {
  assert.equal(personas.length, 5);
  for (const p of personas) {
    for (const idx of p.insights_vinculados) {
      assert.equal(idx >= 0 && idx < insights.length, true);
    }
    for (const idx of p.preguntas_vinculadas) {
      assert.equal(idx >= 0 && idx < como_podriamos.length, true);
    }
  }
});
