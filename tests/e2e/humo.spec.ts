import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import type { Locator, Page } from '@playwright/test';
import act1 from '../../src/data/actividades/unidad_1.json' with { type: 'json' };
import act2 from '../../src/data/actividades/unidad_2.json' with { type: 'json' };
import act3 from '../../src/data/actividades/unidad_3.json' with { type: 'json' };

// islands below the fold hydrate when they are close to the viewport: wait until that happened
async function hidratada(zona: Locator) {
  await zona.scrollIntoViewIfNeeded();
  const isla = zona.locator('xpath=ancestor-or-self::astro-island[1]');
  if ((await isla.count()) > 0) await expect(isla).not.toHaveAttribute('ssr', /.*/);
}

// scrolls the page screen by screen, as a reader does, so every island that hydrates when visible gets its turn
async function recorrer(page: Page) {
  const alto = await page.evaluate(() => document.documentElement.scrollHeight);
  const paso = Math.max(300, (page.viewportSize()?.height ?? 700) - 200);
  for (let y = 0; y <= alto; y += paso) {
    await page.evaluate((destino) => window.scrollTo(0, destino), y);
    await page.waitForTimeout(120);
  }
}

// the four steps of a case: /unidad/N, /pistas, /lupa and /cerrar
const PASOS = ['', '/pistas', '/lupa', '/cerrar'];
const CASOS = [1, 2, 3, 4];
const RUTAS_CASOS = CASOS.flatMap((n) => PASOS.map((p) => `/unidad/${n}${p}`));

// reading order of the students
const RECORRIDO = ['/', '/agencia', ...RUTAS_CASOS, '/cierre'];
const RUTAS = [...RECORRIDO, '/libreta', '/docentes', '/empatizar', '/referencias'];

const boton_menu = (page: Page) => page.locator('summary').filter({ hasText: 'Menú' });

// state of a student who already finished the whole route
const PROGRESO_COMPLETO = {
  'aventura_lectora:ruta': {
    resueltos: [1, 2, 3, 4],
    visitados: [1, 2, 3, 4],
    paginas_leidas: [],
    tareas: [
      '1:partes',
      '1:receta',
      '1:idea',
      '2:inferencias',
      '2:abuelo',
      '3:clasificar',
      '3:verificar',
      '4:torre',
      '4:autochequeo',
    ],
    ultimo: null,
  },
  'aventura_lectora:pasaporte': {
    activo: true,
    modo: 'pareja',
    nombres: ['Ana', 'Luis'],
    fecha: '2026-11-16',
  },
  'aventura_lectora:abuelo': {
    quien: 'Mi abuela Rosa',
    trama: 'Un duende escondía las totumas del trapiche cuando alguien trabajaba de afán.',
    ensenanza: 'Nos enseña que hay que trabajar con calma y compartir.',
  },
};

async function sembrar(page: Page, datos: Record<string, unknown>) {
  await page.addInitScript((d) => {
    for (const [clave, valor] of Object.entries(d)) {
      if (localStorage.getItem(clave) === null) localStorage.setItem(clave, JSON.stringify(valor));
    }
  }, datos);
}

for (const ruta of RUTAS) {
  test.describe(`ruta ${ruta}`, () => {
    test('carga sin errores de consola y con un solo h1', async ({ page }) => {
      const errores: string[] = [];
      page.on('console', (m) => {
        if (m.type() === 'error') errores.push(m.text());
      });
      page.on('pageerror', (e) => errores.push(e.message));
      const respuesta = await page.goto(ruta);
      expect(respuesta?.status()).toBe(200);
      await page.waitForLoadState('networkidle');
      await expect(page.locator('h1')).toHaveCount(1);
      expect(errores).toEqual([]);
    });

    test('sin violaciones serias de accesibilidad (axe)', async ({ page }) => {
      await page.goto(ruta);
      await page.waitForLoadState('load');
      await page.waitForTimeout(600);
      const resultado = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      const graves = resultado.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical',
      );
      expect(
        graves.map(
          (v) =>
            `${v.id}: ${v.nodes
              .map((n) => n.target.join(' '))
              .slice(0, 3)
              .join(' | ')}`,
        ),
      ).toEqual([]);
    });

    test('no hay desbordamiento horizontal a 360px', async ({ page }) => {
      await page.setViewportSize({ width: 360, height: 740 });
      await page.goto(ruta);
      await page.waitForLoadState('networkidle');
      const desborde = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(desborde).toBeLessThanOrEqual(1);
    });
  });
}

test.describe('contexto, autoria y textos', () => {
  test('ninguna pagina usa raya larga, emojis ni nombres de otras docentes, ciudades o colegios', async ({
    page,
  }) => {
    // en dash and em dash, built from char codes so this file has none of them
    const rayas = new RegExp(`[${String.fromCharCode(0x2013)}${String.fromCharCode(0x2014)}]`);
    const emojis = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;
    const ajenos =
      /Selene|Maribel|Silvia Gabriela|Caballero Valle|León Grillo|Rincón Pérez|Murcia|Bogotá|Medellín/;
    for (const ruta of RUTAS) {
      await page.goto(ruta);
      const texto = await page.evaluate(() => document.body.innerText);
      expect(texto, ruta).not.toMatch(rayas);
      expect(texto, ruta).not.toMatch(emojis);
      expect(texto, ruta).not.toMatch(ajenos);
      expect(texto, ruta).not.toContain('[PENDIENTE');
    }
  });

  test('el pie de cada pagina trae la institucion, las dos autoras y los datos del modulo', async ({
    page,
  }) => {
    for (const ruta of ['/', '/agencia', '/unidad/2/lupa', '/cierre', '/docentes']) {
      await page.goto(ruta);
      const pie = page.locator('[data-pie]');
      await expect(pie, ruta).toContainText('Institución Educativa Jorge Eliécer Gaitán');
      await expect(pie, ruta).toContainText('Maripí, Boyacá, Colombia');
      await expect(pie, ruta).toContainText(
        'Luz Marina Castillo Cuadrado e Ingrid Yuliana González Flores',
      );
      await expect(pie, ruta).toContainText('Gamificación (Tecnología Educativa)');
      await expect(pie, ruta).toContainText('Gustavo Alberto Orozco Bohórquez');
      await expect(pie, ruta).toContainText('Marcela Zambrano');
    }
  });

  test('la ficha docente muestra el diagnostico del 5 de mayo y los ajustes del piloto', async ({
    page,
  }) => {
    await page.goto('/docentes');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Ficha docente y prototipado 2.2',
    );
    await expect(page.getByRole('heading', { name: 'Diagnóstico del 5 de mayo de 2026' })).toBeVisible();
    const cifras = { entusiasmo: '10/13', inferencia: '10/13', celular: '9/13', sin_datos: '4/13', guia: '3/13' };
    for (const [id, valor] of Object.entries(cifras)) {
      await expect(page.locator(`[data-cifra="${id}"]`)).toContainText(valor);
    }
    await expect(page.locator('[data-ajustes] > li')).toHaveCount(7);
    await expect(page.locator('[data-tabla-estaciones] tbody tr')).toHaveCount(6);
    for (let etapa = 1; etapa <= 7; etapa += 1) {
      await expect(page.locator(`#etapa-${etapa}`)).toBeVisible();
    }
  });

  test('las referencias publican solo las fuentes verificadas', async ({ page }) => {
    await page.goto('/referencias');
    const lista = page.locator('#lista');
    await expect(lista).toContainText('Rodríguez Basto');
    await expect(lista).toContainText('Llumiquinga Haro');
    await expect(lista).not.toContainText('Novoa Velandia');
    await expect(lista).not.toContainText('Cid-Sillero');
  });
});

test.describe('interruptores y menu', () => {
  test('el interruptor Movimiento cambia el atributo del html y se recuerda', async ({ page }) => {
    await page.goto('/');
    await boton_menu(page).click();
    const boton = page.getByRole('switch', { name: /Movimiento/ });
    await expect(boton).toHaveAttribute('aria-checked', 'true');
    await boton.click();
    await expect(page.locator('html')).toHaveAttribute('data-movimiento', 'no');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-movimiento', 'no');
  });

  test('la letra grande sube la escala base', async ({ page }) => {
    await page.goto('/');
    await boton_menu(page).click();
    await page.getByRole('switch', { name: /Letra grande/ }).click();
    await expect(page.locator('html')).toHaveAttribute('data-letra', 'grande');
    const tamano = await page.evaluate(() => getComputedStyle(document.documentElement).fontSize);
    expect(tamano).toBe('18px');
  });

  test('el menu principal lleva a la Libreta de campo de Mateo', async ({ page }) => {
    await page.goto('/unidad/1');
    await boton_menu(page).click();
    await page.locator('[data-menu-libreta]').click();
    await expect(page).toHaveURL(/\/libreta$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Libreta de campo de Mateo');
  });

  test('en celular la ruta de la aventura esta dentro del menu', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/unidad/2/lupa');
    await expect(page.locator('[data-indice="lateral"]')).toBeHidden();
    await boton_menu(page).click();
    const indice = page.locator('[data-indice="menu"]');
    await expect(indice).toBeVisible();
    await expect(indice.locator('a[aria-current="page"]')).toContainText('Entrenar la lupa');
  });
});

test.describe('sin JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('las lecturas, la ruta y la ficha se leen completas', async ({ page }) => {
    await page.goto('/unidad/1/pistas');
    await expect(page.getByText('Era día de molienda en la vereda')).toBeVisible();
    await expect(page.getByText(act1.fabula.moraleja)).toBeVisible();
    await expect(page.getByText('Al final, bate con el molinillo')).toBeVisible();
    await page.goto('/unidad/2/pistas');
    await expect(page.getByText('Cuentan los abuelos que en un trapiche viejo')).toBeVisible();
    await page.goto('/unidad/3/pistas');
    await expect(page.getByText(act3.mensajes[1].lineas[1])).toBeVisible();
    await page.goto('/');
    await expect(page.locator('[data-indice-libro] > li')).toHaveCount(6);
    await page.goto('/libreta');
    await expect(page.locator('[data-ficha="1"]')).toContainText(act2.abuelo.campos[2].etiqueta);
  });
});

test.describe('movimiento reducido', () => {
  test.use({ reducedMotion: 'reduce' });

  test('la portada no tiene pines y muestra todo su contenido', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('.apertura-activa')).toHaveCount(0);
    await expect(page.locator('.pin-spacer')).toHaveCount(0);
    await expect(page.locator('#portadilla')).toBeVisible();
  });
});

test.describe('ruta de seis estaciones', () => {
  test('el mapa de la ruta muestra las seis estaciones con sus recompensas', async ({ page }) => {
    await page.goto('/');
    const estaciones = page.locator('[data-indice-libro] > li');
    await expect(estaciones).toHaveCount(6);
    const esperado = [
      ['00', 'Apertura de la Agencia', 'Pasaporte de detective'],
      ['01', 'Leo y comprendo el rastro', 'Lupa de Bronce'],
      ['02', 'Pistas y "Cuéntame, abuelo"', 'Lupa de Plata'],
      ['03', 'Detectives de noticias', 'Detector de Verdades'],
      ['04', 'Mi voz cuenta en Maripí', 'Voz de Detective'],
      ['05', 'Cierre del expediente', 'Certificado de Detective Lector'],
    ];
    for (const [i, [codigo, titulo, premio]] of esperado.entries()) {
      const li = estaciones.nth(i);
      await expect(li).toHaveAttribute('data-codigo', codigo);
      await expect(li).toContainText(titulo);
      await expect(li).toContainText(premio);
    }
  });

  test('con Siguiente se recorre toda la ruta, de la portada al certificado', async ({ page }) => {
    await page.goto('/agencia');
    const visitadas = ['/agencia'];
    for (let i = 0; i < 30; i += 1) {
      const siguiente = page.locator('a[rel="next"]');
      if ((await siguiente.count()) === 0) break;
      const destino = await siguiente.getAttribute('href');
      await page.goto(destino ?? '/');
      visitadas.push(new URL(page.url()).pathname.replace(/\/$/, '') || '/');
    }
    expect(visitadas).toEqual(RECORRIDO.slice(1));
  });

  test('cada mision tiene la barra fija de cuatro pasos con el paso actual marcado', async ({
    page,
  }) => {
    const nombres = [
      '1. Abrir el caso',
      '2. Seguir las pistas',
      '3. Entrenar la lupa',
      '4. Cerrar el caso',
    ];
    for (const caso of CASOS) {
      for (const [i, paso] of PASOS.entries()) {
        await page.goto(`/unidad/${caso}${paso}`);
        const barra = page.locator('[data-pasos-caso] a');
        await expect(barra).toHaveCount(4);
        for (const [n, nombre] of nombres.entries()) await expect(barra.nth(n)).toContainText(nombre);
        await expect(page.locator('[data-pasos-caso] a[aria-current="page"]')).toContainText(
          nombres[i],
        );
      }
    }
  });

  test('cada pagina muestra solo las secciones de su paso', async ({ page }) => {
    const esperado: Record<string, string[]> = {
      '': ['portada', 'mision', 'introduccion'],
      '/pistas': ['desarrollo'],
      '/lupa': ['practica'],
      '/cerrar': ['reto', 'cierre-caso'],
    };
    for (const [paso, ids] of Object.entries(esperado)) {
      await page.goto(`/unidad/3${paso}`);
      const presentes = await page.evaluate(() =>
        Array.from(document.querySelectorAll('main > section[id]')).map((s) => s.id),
      );
      expect(presentes, paso).toEqual(ids);
    }
  });

  test('las etiquetas de estrategia aparecen en las misiones 1 y 3', async ({ page }) => {
    await page.goto('/unidad/1');
    const uno = page.locator('[data-estrategias]');
    for (const etiqueta of ['predigo', 'pregunto', 'opino']) await expect(uno).toContainText(etiqueta);
    await page.goto('/unidad/3');
    const tres = page.locator('[data-estrategias]');
    for (const etiqueta of ['comparo', 'verifico', 'argumento']) {
      await expect(tres).toContainText(etiqueta);
    }
  });

  test('llegar al final de un paso lo marca como leido', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/unidad/3/pistas');
    await page.locator('[data-fin-pagina]').scrollIntoViewIfNeeded();
    await expect(page.locator('[data-aviso-pagina]')).toContainText('Paso leído: Seguir las pistas');
    const enlace = page.locator('[data-indice="lateral"] a[data-pagina="3/pistas"]');
    await expect(enlace).toHaveAttribute('data-leida', 'true');
  });
});

test.describe('lecturas cortas con voz pausada', () => {
  test('cada lectura cabe en el limite de palabras', async ({ page }) => {
    await page.goto('/unidad/1/pistas');
    const fabula = Number(await page.locator('#fabula').getAttribute('data-palabras'));
    expect(fabula).toBeLessThanOrEqual(200);
    await page.goto('/unidad/2/pistas');
    const relato = Number(await page.locator('#relato').getAttribute('data-palabras'));
    expect(relato).toBeGreaterThanOrEqual(150);
    expect(relato).toBeLessThanOrEqual(250);
    await page.goto('/unidad/3/pistas');
    await expect(page.locator('#mensaje-m1 ol > li')).toHaveCount(4);
    await expect(page.locator('#mensaje-m2 ol > li')).toHaveCount(4);
  });

  test('las lecturas y las consignas tienen el boton Escuchar con voz pausada', async ({ page }) => {
    const minimos: Record<string, number> = {
      '/': 1,
      '/agencia': 2,
      '/unidad/1': 2,
      '/unidad/1/pistas': 2,
      '/unidad/1/lupa': 1,
      '/unidad/1/cerrar': 1,
      '/unidad/2/pistas': 1,
      '/unidad/2/lupa': 1,
      '/unidad/2/cerrar': 1,
      '/unidad/3/pistas': 3,
      '/unidad/3/lupa': 1,
      '/unidad/3/cerrar': 1,
      '/unidad/4/pistas': 1,
      '/unidad/4/lupa': 1,
    };
    for (const [ruta, minimo] of Object.entries(minimos)) {
      await page.goto(ruta);
      await page.waitForLoadState('networkidle');
      await recorrer(page);
      await expect
        .poll(() => page.getByRole('button', { name: 'Escuchar con voz pausada' }).count(), {
          message: ruta,
        })
        .toBeGreaterThanOrEqual(minimo);
    }
  });

  test('la voz lee en español y a velocidad 0.9', async ({ page }) => {
    // record what the page asks the browser to say
    await page.addInitScript(() => {
      const dichos: { texto: string; rate: number; lang: string }[] = [];
      (window as unknown as { __dichos: typeof dichos }).__dichos = dichos;
      window.speechSynthesis.speak = (frase: SpeechSynthesisUtterance) => {
        dichos.push({ texto: frase.text, rate: frase.rate, lang: frase.lang });
      };
    });
    await page.goto('/unidad/1/pistas');
    const boton = page.locator('#fabula').getByRole('button', { name: 'Escuchar con voz pausada' });
    await boton.click();
    const dichos = await page.evaluate(
      () => (window as unknown as { __dichos: { texto: string; rate: number; lang: string }[] }).__dichos,
    );
    expect(dichos).toHaveLength(1);
    expect(dichos[0].rate).toBeCloseTo(0.9, 5);
    expect(dichos[0].lang.toLowerCase()).toMatch(/^es/);
    expect(dichos[0].texto).toContain('Era día de molienda en la vereda');
    await expect(page.locator('#fabula').getByRole('button', { name: 'Detener' })).toBeVisible();
  });
});

test.describe('pistas graduadas de Sofía', () => {
  test('una respuesta incorrecta muestra la burbuja de Sofía con una pista concreta y luego otra mas precisa', async ({
    page,
  }) => {
    await page.goto('/unidad/1/cerrar');
    const quiz = page.getByRole('region', { name: 'La idea principal y los detalles' });
    await hidratada(quiz);
    const pregunta = act1.quiz[0];
    const incorrectas = pregunta.opciones.filter((o) => o.id !== pregunta.correcta);

    await quiz.getByRole('button', { name: new RegExp(incorrectas[0].texto) }).click();
    await expect(quiz.getByText('Pista de Sofía (1 de 2)')).toBeVisible();
    await expect(quiz.locator('[data-pista-sofia]')).toHaveText(pregunta.pistas[0]);
    await expect(quiz.locator('[data-cara="sofia"]')).toBeVisible();
    await expect(quiz.getByText(/^Incorrecto/)).toHaveCount(0);

    await quiz.getByRole('button', { name: new RegExp(incorrectas[1].texto) }).click();
    await expect(quiz.getByText('Pista de Sofía (2 de 2)')).toBeVisible();
    await expect(quiz.locator('[data-pista-sofia]')).toHaveText(pregunta.pistas[1]);
    await expect(quiz.locator('[data-pista-sofia]')).toContainText('párrafo 5');

    const correcta = pregunta.opciones.find((o) => o.id === pregunta.correcta)?.texto ?? '';
    await quiz.getByRole('button', { name: new RegExp(correcta) }).click();
    await expect(quiz.getByText(/Excelente deducción/)).toBeVisible();
    await expect(quiz.locator('[data-pista-sofia]')).toHaveCount(0);
  });

  test('una tarjeta mal clasificada recibe su pista y la lectura se puede volver a abrir', async ({
    page,
  }) => {
    await page.goto('/unidad/3/lupa');
    const actividad = page.getByRole('region', { name: 'Detector de Verdades' });
    await hidratada(actividad);
    // every card goes to the "fact" box: the three rumors are wrong
    for (const item of act3.clasificar.items) {
      await actividad
        .getByRole('group', { name: `Mover a una caja: ${item.texto}` })
        .getByRole('button', { name: 'Hecho comprobable' })
        .click();
    }
    await actividad.getByRole('button', { name: 'Revisar' }).click();
    const primera_mal = act3.clasificar.items.find((i) => i.caja !== 'hecho');
    await expect(actividad.getByText('Pista de Sofía')).toBeVisible();
    await expect(actividad.locator('[data-pista-sofia]')).toHaveText(primera_mal?.pista ?? '');
    const releer = page.locator('[data-releer]').first();
    await releer.locator('summary').click();
    await expect(releer).toContainText(act3.mensajes[0].lineas[0]);
  });

  test('la pista de prueba de la Agencia ensena la mecanica', async ({ page }) => {
    await page.goto('/agencia');
    const prueba = page.locator('#prueba');
    await hidratada(prueba.getByRole('button', { name: 'En la tienda del pueblo' }));
    await prueba.getByRole('button', { name: 'En la tienda del pueblo' }).click();
    await expect(prueba.locator('[data-pista-sofia]')).toContainText('Vuelve a leer la nota');
    await prueba.getByRole('button', { name: 'Donde se lee despacio y con calma' }).click();
    await expect(prueba.getByText(/Primera pista resuelta/)).toBeVisible();
  });
});

test.describe('pasaporte e insignias', () => {
  test('la Agencia activa el pasaporte de una pareja y el carne se recuerda', async ({ page }) => {
    await page.goto('/agencia');
    const prueba = page.locator('#prueba');
    const pasaporte = page.locator('#pasaporte');
    await hidratada(pasaporte.getByRole('button', { name: 'Activar mi pasaporte' }));
    await expect(pasaporte.getByRole('button', { name: 'Activar mi pasaporte' })).toBeDisabled();
    await hidratada(prueba.getByRole('button', { name: 'Donde se lee despacio y con calma' }));
    await prueba.getByRole('button', { name: 'Donde se lee despacio y con calma' }).click();
    await pasaporte.getByText('Trabajo en pareja de detectives').click();
    await pasaporte.getByLabel('Nombre del primer detective').fill('Ana');
    await pasaporte.getByLabel('Nombre del segundo detective').fill('Luis');
    await pasaporte.getByRole('button', { name: 'Activar mi pasaporte' }).click();
    const carne = pasaporte.locator('[data-carne]');
    await expect(carne).toContainText('Ana y Luis');
    await expect(carne).toContainText('Pareja de detectives lectores');
    await expect(carne).toContainText('I.E. Jorge Eliécer Gaitán');
    await expect(carne.locator('[data-insignia]')).toHaveCount(4);
    await page.reload();
    await expect(page.locator('[data-carne]')).toContainText('Ana y Luis');
  });

  test('la Mision 1 completa gana la Lupa de Bronce y el progreso sobrevive a recargar', async ({
    page,
  }) => {
    // step 3: parts of the fable
    await page.goto('/unidad/1/lupa');
    const partes = page.getByRole('region', { name: 'Inicio, nudo y desenlace' });
    await hidratada(partes);
    const nombres_cajas = Object.fromEntries(act1.partes.cajas.map((c) => [c.id, c.titulo]));
    for (const item of act1.partes.items) {
      await partes
        .getByRole('group', { name: `Mover a una caja: ${item.texto}` })
        .getByRole('button', { name: nombres_cajas[item.caja], exact: true })
        .click();
    }
    await partes.getByRole('button', { name: 'Revisar' }).click();
    await expect(partes.getByText(/Las 5 tarjetas están en su caja/)).toBeVisible();

    // step 3: recipe in order. The stored order is written directly, as the arrows would leave it
    await page.evaluate((orden) => {
      localStorage.setItem('aventura_lectora:pasos:1:receta', JSON.stringify(orden));
    }, act1.receta.pasos.map((p) => p.id));
    await page.reload();
    const receta = page.getByRole('region', { name: 'Ordena la receta' });
    await hidratada(receta);
    await receta.getByRole('button', { name: 'Revisar el orden' }).click();
    await expect(receta.getByText(/La receta quedó en su orden/)).toBeVisible();

    // step 4: the medal is not won yet
    await page.goto('/unidad/1/cerrar');
    const insignia = page.locator('[data-insignia-caso="1"]');
    await hidratada(insignia);
    await expect(insignia).toContainText('Completa estos pasos para ganarla');
    const quiz = page.getByRole('region', { name: 'La idea principal y los detalles' });
    await hidratada(quiz);
    for (const pregunta of act1.quiz) {
      const correcta = pregunta.opciones.find((o) => o.id === pregunta.correcta)?.texto ?? '';
      await quiz.getByRole('button', { name: new RegExp(correcta.replace(/[.?]/g, '\\$&')) }).click();
      await quiz.getByRole('button', { name: /Siguiente pregunta|Ver mi resultado/ }).click();
    }
    await expect(insignia).toContainText('¡Ganaste esta insignia!');

    const guardado = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('aventura_lectora:ruta') ?? '{}'),
    );
    expect(guardado.resueltos).toEqual([1]);
    expect(guardado.tareas).toEqual(['1:partes', '1:receta', '1:idea']);

    await page.reload();
    await expect(page.locator('[data-insignia-caso="1"]')).toContainText('¡Ganaste esta insignia!');
    await page.goto('/cierre');
    const medallas = page.locator('[data-pasaporte-medallas] [data-insignia]');
    await expect(medallas).toHaveCount(4);
    await expect(medallas.nth(0)).toHaveAttribute('data-ganada', 'true');
    await expect(medallas.nth(1)).toHaveAttribute('data-ganada', 'false');
  });
});

test.describe('reto familiar y libreta de campo', () => {
  test('el formulario de tres campos registra el relato y cuenta para la Lupa de Plata', async ({
    page,
  }) => {
    await page.goto('/unidad/2/cerrar');
    const reto = page.getByRole('region', { name: 'Cuéntame, abuelo' });
    await hidratada(reto);
    for (const campo of act2.abuelo.campos) await expect(reto.getByLabel(campo.etiqueta)).toBeVisible();
    await expect(reto.locator('textarea, input[type="text"]')).toHaveCount(3);
    await reto.getByLabel(act2.abuelo.campos[0].etiqueta).fill('Mi abuelo Chepe');
    await reto.getByLabel(act2.abuelo.campos[1].etiqueta).fill('Una copla sobre la molienda y el trapiche.');
    await reto.getByLabel(act2.abuelo.campos[2].etiqueta).fill('Nos enseña a trabajar con calma.');
    await expect(reto.getByText(/Relato registrado/)).toBeVisible();
    const tareas = await page.evaluate(
      () => JSON.parse(localStorage.getItem('aventura_lectora:ruta') ?? '{}').tareas,
    );
    expect(tareas).toContain('2:abuelo');
  });

  test('el boton destacado abre la ficha de la Libreta de campo de Mateo', async ({ page }) => {
    await page.goto('/unidad/2/cerrar');
    const enlace = page.locator('[data-libreta]');
    await hidratada(enlace);
    await expect(enlace).toContainText(
      'Imprimir o ver la ficha: Libreta de campo de Mateo (sin internet)',
    );
    await enlace.click();
    await expect(page).toHaveURL(/\/libreta$/);
    const ficha = page.locator('[data-ficha="1"]');
    for (const campo of act2.abuelo.campos) await expect(ficha).toContainText(campo.etiqueta);
    await expect(page.getByRole('button', { name: 'Imprimir una ficha (media carta)' })).toBeVisible();
  });

  test('al imprimir solo queda la ficha, en media carta', async ({ page }) => {
    await page.goto('/libreta');
    const regla = await page.locator('#pagina-impresion').textContent();
    expect(regla).toContain('5.5in 8.5in');
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('[data-ficha="1"]')).toBeVisible();
    await expect(page.locator('[data-cabecera]')).toBeHidden();
    await expect(page.locator('[data-pie]')).toBeHidden();
    await expect(page.getByRole('heading', { level: 1 })).toBeHidden();
    await expect(page.locator('[data-ficha="2"]')).toBeHidden();
  });
});

test.describe('desafio final: torre de argumentos', () => {
  test('la torre se arma con frases iniciadoras y el autochequeo gana la Voz de Detective', async ({
    page,
  }) => {
    await page.goto('/unidad/4/cerrar');
    const torre = page.getByRole('region', { name: 'Arma tu torre de argumentos' });
    await hidratada(torre);
    // no free text area: only short guided lines
    await expect(torre.locator('textarea')).toHaveCount(0);
    for (const frase of [
      'Yo pienso que en nuestra escuela...',
      'Yo pienso que en nuestra vereda...',
      'Por ejemplo, cuando en la finca...',
      'Por ejemplo, cuando en el salón...',
    ]) {
      await expect(torre.getByText(frase, { exact: true }).first()).toBeVisible();
    }
    const chequeo = torre.getByRole('checkbox');
    await expect(chequeo).toHaveCount(3);
    await expect(chequeo.first()).toBeDisabled();

    await torre.getByText('¿Hay que cuidar más la quebrada de la vereda?').click();
    await torre.getByText('Yo pienso que en nuestra vereda...', { exact: true }).click();
    const linea = (inicio: string) => torre.getByRole('textbox', { name: `Termina la frase: ${inicio}...` });
    await linea('Yo pienso que en nuestra vereda').fill('hay que cuidar la quebrada');
    await linea('Porque en primer lugar,').fill('de ahí sale el agua de las fincas');
    await linea('Además, he visto que').fill('la gente bota basura cerca');
    await linea('Por ejemplo, cuando en la finca').fill('llovió duro, el agua bajó sucia');

    await expect(torre.locator('[data-torre-texto]')).toHaveText(
      'Yo pienso que en nuestra vereda hay que cuidar la quebrada. Porque en primer lugar, de ahí sale el agua de las fincas. Además, he visto que la gente bota basura cerca. Por ejemplo, cuando en la finca llovió duro, el agua bajó sucia.',
    );
    for (const punto of [
      '1. Dije claramente qué pienso',
      '2. Expliqué por qué con dos razones',
      '3. Puse un ejemplo real de mi vereda o colegio',
    ]) {
      await torre.getByText(punto).click();
    }
    await expect(torre.getByText(/Tu torre quedó firme/)).toBeVisible();
    const insignia = page.locator('[data-insignia-caso="4"]');
    await hidratada(insignia);
    await expect(insignia).toContainText('¡Ganaste esta insignia!');
  });
});

test.describe('cierre del expediente', () => {
  test('muestra las cuatro medallas, el relato familiar y el certificado con el nombre de la pareja', async ({
    page,
  }) => {
    await sembrar(page, PROGRESO_COMPLETO);
    await page.goto('/cierre');
    const medallas = page.locator('[data-pasaporte-medallas] [data-insignia]');
    await hidratada(medallas.first());
    await expect(medallas).toHaveCount(4);
    for (let i = 0; i < 4; i += 1) await expect(medallas.nth(i)).toHaveAttribute('data-ganada', 'true');
    for (const nombre of ['Lupa de Bronce', 'Lupa de Plata', 'Detector de Verdades', 'Voz de Detective']) {
      await expect(page.locator('[data-pasaporte-medallas]')).toContainText(nombre);
    }

    await page.locator('#relato').scrollIntoViewIfNeeded();
    const relato = page.locator('[data-relato-familiar]');
    await expect(relato).toContainText('Mi abuela Rosa');
    await expect(relato).toContainText('círculo de lectura');

    const certificado = page.locator('[data-certificado]');
    await hidratada(certificado);
    await expect(certificado).toContainText('Certificado Oficial de Detective Lector');
    await expect(certificado).toContainText(
      'Institución Educativa Jorge Eliécer Gaitán (Maripí, Boyacá)',
    );
    await expect(page.locator('[data-certificado-nombre]')).toHaveText('Ana y Luis');
    await expect(certificado).toContainText('Luz Marina Castillo Cuadrado');
    await expect(certificado).toContainText('Ingrid Yuliana González Flores');
  });

  test('el boton de impresion imprime solo el certificado', async ({ page }) => {
    await sembrar(page, PROGRESO_COMPLETO);
    await page.addInitScript(() => {
      (window as unknown as { __impresiones: number }).__impresiones = 0;
      window.print = () => {
        (window as unknown as { __impresiones: number }).__impresiones += 1;
      };
    });
    await page.goto('/cierre');
    const boton = page.getByRole('button', { name: 'Imprimir certificado' });
    await hidratada(boton);
    await expect(boton).toBeEnabled();
    await boton.click();
    await expect
      .poll(() => page.evaluate(() => (window as unknown as { __impresiones: number }).__impresiones))
      .toBe(1);
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('[data-certificado]')).toBeVisible();
    await expect(page.locator('#pasaporte')).toBeHidden();
    await expect(page.locator('#relato')).toBeHidden();
    await expect(page.locator('[data-cabecera]')).toBeHidden();
    await expect(boton).toBeHidden();
  });

  test('el certificado tambien se descarga en PDF', async ({ page }) => {
    await sembrar(page, PROGRESO_COMPLETO);
    await page.goto('/cierre');
    const boton = page.getByRole('button', { name: 'Descargar en PDF' });
    await hidratada(boton);
    const [descarga] = await Promise.all([page.waitForEvent('download'), boton.click()]);
    expect(descarga.suggestedFilename()).toBe('certificado_detective_lector.pdf');
  });

  test('en un celular compartido la docente puede borrar el progreso', async ({ page }) => {
    await sembrar(page, PROGRESO_COMPLETO);
    await page.goto('/docentes');
    const boton = page.locator('[data-reiniciar]');
    await boton.scrollIntoViewIfNeeded();
    await boton.click();
    await expect(page.locator('[data-reiniciar-estado]')).toContainText('Pulsa otra vez');
    await boton.click();
    await expect(page.locator('[data-reiniciar-estado]')).toContainText('Progreso borrado');
    const quedan = await page.evaluate(() =>
      Object.keys(localStorage).filter((k) => k.startsWith('aventura_lectora:') && !k.endsWith(':ajustes')),
    );
    expect(quedan).toEqual([]);
  });
});

test.describe('sin recursos externos', () => {
  test('el recorrido no pide nada a otros servidores', async ({ page }) => {
    const externas: string[] = [];
    page.on('request', (r) => {
      const url = new URL(r.url());
      if (url.protocol.startsWith('http') && url.hostname !== 'localhost') externas.push(r.url());
    });
    for (const ruta of RECORRIDO) {
      await page.goto(ruta);
      await page.waitForLoadState('networkidle');
      await expect(page.locator('iframe, video, audio')).toHaveCount(0);
    }
    expect(externas).toEqual([]);
  });
});

test.describe('portada como libro', () => {
  const tamanos = [
    { nombre: 'escritorio', ancho: 1440, alto: 900, largo: 1 },
    { nombre: 'celular', ancho: 390, alto: 844, largo: 1.5 },
    { nombre: 'celular pequeno', ancho: 360, alto: 640, largo: 1.5 },
  ];
  for (const t of tamanos) {
    test(`el libro se abre con el scroll y la portadilla queda a la vista (${t.nombre})`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: t.ancho, height: t.alto });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await expect(page.locator('.apertura-activa')).toHaveCount(1);
      await expect(page.getByRole('link', { name: 'Abrir la Agencia' }).first()).toHaveAttribute(
        'href',
        '/agencia',
      );
      await page.evaluate((y) => window.scrollTo(0, y), Math.round(t.alto * t.largo));
      await page.waitForTimeout(1600);
      const caja = await page.locator('#portadilla').boundingBox();
      expect(caja).not.toBeNull();
      // the title page is inside the screen once the book is open (centered on phones)
      const centro = (caja?.x ?? 0) + (caja?.width ?? 0) / 2;
      expect(centro).toBeGreaterThan(0);
      expect(centro).toBeLessThan(t.ancho);
    });
  }

  test('la portadilla nombra a las autoras y lleva a la Agencia', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => window.scrollTo(0, 900));
    await page.waitForTimeout(1600);
    const portadilla = page.locator('#portadilla');
    await expect(portadilla).toContainText('Luz Marina Castillo Cuadrado');
    await expect(portadilla).toContainText('Ingrid Yuliana González Flores');
    await expect(portadilla).toContainText('Gustavo Alberto Orozco Bohórquez');
    const boton = portadilla.getByRole('link', { name: 'Abrir la Agencia' });
    await expect(boton).toBeVisible();
    await boton.click();
    await expect(page).toHaveURL(/.*\/agencia/);
  });

  test('un clic en el boton O baja para abrir el libro lo abre', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: /baja para abrir el libro/ }).click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500);
  });

  test('la portada recuerda donde iba el estudiante', async ({ page }) => {
    await sembrar(page, {
      'aventura_lectora:ruta': {
        resueltos: [],
        visitados: [2],
        paginas_leidas: [],
        tareas: [],
        ultimo: { ruta: '/unidad/2/lupa', seccion: 'practica' },
      },
    });
    await page.goto('/');
    const caja = page.locator('#indice [data-seguir-caja]');
    await expect(caja).toContainText('Misión 2: Pistas y "Cuéntame, abuelo", entrenar la lupa');
    await expect(caja.locator('[data-seguir-enlace]')).toHaveAttribute(
      'href',
      '/unidad/2/lupa#practica',
    );
  });
});
