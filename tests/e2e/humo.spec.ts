import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import type { Locator, Page } from '@playwright/test';
import act2 from '../../src/data/actividades/unidad_2.json' with { type: 'json' };

// islands below the fold hydrate when they are close to the viewport: wait until that happened
async function hidratada(zona: Locator) {
  await zona.scrollIntoViewIfNeeded();
  const isla = zona.locator('xpath=ancestor-or-self::astro-island[1]');
  if ((await isla.count()) > 0) await expect(isla).not.toHaveAttribute('ssr', /.*/);
}

// the four pages of a case: /unidad/N, /pistas, /lupa and /cerrar
const PAGINAS = ['', '/pistas', '/lupa', '/cerrar'];
const CASOS = [1, 2, 3, 4, 5];
const RUTAS_CASOS = CASOS.flatMap((n) => PAGINAS.map((p) => `/unidad/${n}${p}`));

const RUTAS = ['/', '/programa', ...RUTAS_CASOS, '/cierre', '/ficha', '/docentes', '/referencias'];

const boton_menu = (page: Page) => page.locator('summary').filter({ hasText: 'Menú' });

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

test('el texto del proyecto no usa raya larga ni emojis en la interfaz', async ({ page }) => {
  for (const ruta of RUTAS) {
    await page.goto(ruta);
    const texto = await page.evaluate(() => document.body.innerText);
    // en dash and em dash, built from char codes so this file has none of them
    const rayas = new RegExp(`[${String.fromCharCode(0x2013)}${String.fromCharCode(0x2014)}]`);
    expect(texto, ruta).not.toMatch(rayas);
    expect(texto, ruta).not.toMatch(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u);
    expect(texto.toLowerCase(), ruta).not.toMatch(/\b(imprime|imprimir|recorta tu|colorea)\b/);
  }
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
});

test.describe('movimiento reducido', () => {
  test.use({ reducedMotion: 'reduce' });

  test('no hay pines ni patrones activos y el contenido esta completo', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('.apertura-activa')).toHaveCount(0);
    await expect(page.locator('#portadilla')).toBeVisible();
    await page.goto('/unidad/2/pistas');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('.camara-activa')).toHaveCount(0);
    await expect(page.locator('.sendero-activo')).toHaveCount(0);
    await expect(page.locator('.pin-spacer')).toHaveCount(0);
    await expect(page.getByText('Hoja 1').first()).toBeAttached();
    await page.goto('/unidad/3/pistas');
    await expect(page.locator('.lupas-activo')).toHaveCount(0);
    await expect(page.getByRole('heading', { name: /Lupa 3: lo que pienso/ })).toBeVisible();
  });
});

test.describe('sin JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('la lectura y las pistas se leen completas', async ({ page }) => {
    await page.goto('/unidad/1/pistas');
    await expect(page.getByText('En un valle lleno de pasto y flores')).toBeVisible();
    await expect(page.getByText('¿Por qué crees que la tortuga propone una carrera')).toBeVisible();
    await page.goto('/unidad/1');
    await expect(page.getByText('Leer no se limita a pronunciar')).toBeVisible();
    await page.goto('/unidad/2/pistas');
    await expect(page.getByText('Este dice cómo hacer algo en orden').first()).toBeAttached();
    await page.goto('/');
    await expect(page.getByText('Universidad Santo Tomás').first()).toBeVisible();
  });
});

test.describe('actividades', () => {
  test('el cuestionario del caso 1 se resuelve, marca el caso y se recuerda', async ({ page }) => {
    await page.goto('/unidad/1/lupa');
    const tarjeta = page.getByRole('region', { name: 'Cuestionario sobre la lectura' });
    await hidratada(tarjeta);
    await expect(tarjeta).toBeVisible();
    for (let i = 0; i < 6; i++) {
      // wrong first, then the right one
      const opciones = tarjeta.getByRole('list', { name: 'Opciones' }).getByRole('button');
      const total = await opciones.count();
      let acierto = false;
      for (let k = 0; k < total && !acierto; k++) {
        await opciones.nth(k).click();
        acierto = (await tarjeta.getByText('Correcta').count()) > 0;
      }
      expect(acierto).toBe(true);
      await tarjeta.getByRole('button', { name: /Siguiente pregunta|Ver mi resultado/ }).click();
    }
    await expect(tarjeta.getByText('Resolviste las 6 preguntas')).toBeVisible();
    const progreso = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('aventura_lectora:progreso') ?? '{}'),
    );
    expect(progreso.resueltos).toContain(1);
    await page.reload();
    await expect(
      page
        .getByRole('region', { name: 'Cuestionario sobre la lectura' })
        .getByText('Resolviste las 6 preguntas'),
    ).toBeVisible();
  });

  test('el clasificador de textos se completa con el menu Enviar a (solo teclado)', async ({
    page,
  }) => {
    await page.goto('/unidad/2/lupa');
    const zona = page.getByRole('region', { name: 'Clasificador de textos' });
    await hidratada(zona);
    const items = act2.clasificador.items;
    const cajas = Object.fromEntries(act2.clasificador.cajas.map((c) => [c.id, c.titulo]));
    for (const item of items) {
      const tarjeta = zona.locator('li', { hasText: item.texto }).first();
      await tarjeta.getByRole('combobox').selectOption({ label: cajas[item.caja] });
    }
    await zona.getByRole('button', { name: 'Revisar', exact: true }).click();
    await expect(
      zona.getByText(`Muy bien: las ${items.length} tarjetas están en su caja.`),
    ).toBeVisible();
  });

  test('la sopa de letras responde al teclado', async ({ page }) => {
    await page.goto('/unidad/1/pistas');
    const rejilla = page.getByRole('grid', { name: 'Sopa de letras' });
    await hidratada(rejilla);
    await rejilla.locator('[data-fila="0"][data-col="0"]').focus();
    await page.keyboard.press('Enter');
    await expect(page.getByText(/Inicio en fila 1, columna 1/)).toBeVisible();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');
    await expect(
      page.getByRole('status').filter({ hasText: /Esa línea|Encontraste|Ya habías/ }),
    ).toBeVisible();
  });

  test('el reto del caso 1 se descarga como PDF', async ({ page }) => {
    await page.goto('/unidad/1/cerrar');
    const reto = page.getByRole('article').filter({ hasText: 'Mi bitácora de detective lector' });
    await hidratada(reto);
    await reto.getByLabel('Tu nombre').fill('Ana Prueba');
    await reto.getByLabel('Predicción 1').fill('Creo que la cigarra canta.');
    const descarga = page.waitForEvent('download');
    await reto.getByRole('button', { name: 'Descargar PDF' }).click();
    const archivo = await descarga;
    expect(archivo.suggestedFilename()).toBe('aventura_lectora_caso_1_reto.pdf');
  });

  test('el certificado y el expediente se descargan', async ({ page }) => {
    await page.goto('/cierre');
    await hidratada(page.locator('#cert-nombre'));
    await page.locator('#cert-nombre').fill('Ana Prueba');
    const uno = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Descargar certificado' }).click();
    expect((await uno).suggestedFilename()).toBe('certificado_aventura_lectora.pdf');

    await hidratada(page.locator('#exp-nombre'));
    await page.locator('#exp-nombre').fill('Ana Prueba');
    await page.getByRole('button', { name: 'Armar mi expediente' }).click();
    const dos = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Armar con lo que tengo' }).click();
    expect((await dos).suggestedFilename()).toBe('expediente_del_detective_lector.pdf');
  });
});

test('la camara del comic avanza con el teclado', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/unidad/2/pistas');
  await page.waitForLoadState('networkidle');
  const comic = page.locator('#comic-camara');
  await expect(comic).toHaveClass(/camara-activa/);
  await comic.scrollIntoViewIfNeeded();
  const caja = await comic.boundingBox();
  await page.evaluate(
    (y) => window.scrollTo(0, y + 10),
    (caja?.y ?? 0) + (await page.evaluate(() => window.scrollY)),
  );
  await page.waitForTimeout(500);
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(1200);
  await expect(comic.locator('[data-contador]')).toHaveText('2 de 6');
});

test.describe('recursos de terceros', () => {
  test('no cargan nada externo hasta que el estudiante lo pide', async ({ page }) => {
    const externos: string[] = [];
    page.on('request', (r) => {
      const u = r.url();
      if (!u.startsWith('http://localhost') && !u.startsWith('data:')) externos.push(u);
    });
    for (const p of PAGINAS) {
      await page.goto(`/unidad/4${p}`);
      await page.waitForLoadState('networkidle');
      await expect(page.locator('iframe')).toHaveCount(0);
    }
    expect(externos).toEqual([]);
  });

  test('el juego del laberinto se muestra dentro de la pagina al pulsar', async ({ page }) => {
    await page.goto('/unidad/4/pistas');
    const tarjeta = page.getByRole('region', { name: 'El laberinto de la información' });
    await hidratada(tarjeta);
    await tarjeta.getByRole('button', { name: /Cargar el recurso/ }).click();
    const marco = tarjeta.locator('iframe');
    await expect(marco).toHaveAttribute(
      'src',
      'https://view.genially.com/664dca9c96d30b00146b5513',
    );
    await expect(marco).toHaveAttribute('title', 'El laberinto de la información');
  });

  test('el video de YouTube usa la version sin cookies', async ({ page }) => {
    await page.goto('/unidad/1/pistas');
    const tarjeta = page.getByRole('region', { name: 'El mensaje oculto' });
    await hidratada(tarjeta);
    await tarjeta.getByRole('button', { name: /Cargar el video/ }).click();
    await expect(tarjeta.locator('iframe')).toHaveAttribute(
      'src',
      /^https:\/\/www\.youtube-nocookie\.com\/embed\/yVYG4uvefCQ/,
    );
  });

  test('los recursos que no permiten iframe se integran como actividad con enlace', async ({
    page,
  }) => {
    await page.goto('/unidad/1/pistas');
    const tarjeta = page.getByRole('region', { name: /La liebre y la tortuga: la fábula/ });
    await tarjeta.scrollIntoViewIfNeeded();
    await expect(tarjeta.getByText('Lee y compara')).toBeVisible();
    await expect(tarjeta.getByRole('link', { name: /Abrir en otra pestaña/ })).toHaveAttribute(
      'href',
      /culturagenial\.com/,
    );
  });

  test('cada caso muestra sus recursos de terceros dentro de la pagina', async ({ page }) => {
    // resources that load in a frame after a click, per case (the youtube video has its own button)
    const esperados: Record<number, number> = { 1: 1, 2: 2, 3: 3, 4: 3, 5: 3 };
    for (const [caso, cantidad] of Object.entries(esperados)) {
      let total = 0;
      for (const p of PAGINAS) {
        await page.goto(`/unidad/${caso}${p}`);
        total += await page.getByRole('button', { name: /Cargar el recurso/ }).count();
      }
      expect(total, `caso ${caso}`).toBe(cantidad);
    }
  });
});

test.describe('libro de cuatro paginas por caso', () => {
  test('cada pagina muestra solo sus secciones', async ({ page }) => {
    const secciones: Record<string, string[]> = {
      '': ['portada', 'mision', 'introduccion', 'contenidos'],
      '/pistas': ['desarrollo'],
      '/lupa': ['practica'],
      '/cerrar': ['reto', 'cierre-caso'],
    };
    const todas = Object.values(secciones).flat();
    for (const [p, propias] of Object.entries(secciones)) {
      await page.goto(`/unidad/3${p}`);
      for (const id of todas) {
        const esperado = propias.includes(id) ? 1 : 0;
        await expect(page.locator(`main section[id="${id}"]`), `${p || '/'} ${id}`).toHaveCount(
          esperado,
        );
      }
    }
  });

  test('con Siguiente se recorre todo el libro hasta las referencias', async ({ page }) => {
    await page.goto('/programa');
    const visitadas: string[] = ['/programa'];
    for (let i = 0; i < 40; i++) {
      const siguiente = page.locator('a[rel="next"]');
      if ((await siguiente.count()) === 0) break;
      const href = await siguiente.first().getAttribute('href');
      visitadas.push(href ?? '');
      await page.goto(href ?? '/');
    }
    expect(visitadas).toEqual(['/programa', ...RUTAS_CASOS, '/cierre', '/referencias']);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Referencias');
  });

  test('cada enlace de la ficha llega a una pagina que tiene esa seccion', async ({ page }) => {
    await page.goto('/ficha');
    const enlaces = await page
      .locator('main a[href^="/"]')
      .evaluateAll((els) => [...new Set(els.map((e) => e.getAttribute('href') ?? ''))]);
    const internos = enlaces.filter((h) => h.includes('#'));
    expect(internos.length).toBeGreaterThan(30);
    for (const href of internos) {
      const [ruta, ancla] = href.split('#');
      await page.goto(ruta || '/');
      await expect(page.locator(`[id="${ancla}"]`), href).toBeAttached();
    }
  });

  test('llegar al final de una pagina la marca como leida en el indice', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/unidad/2/lupa');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const enlace = page.locator('.curso-indice a[data-pagina="2/lupa"]');
    await expect(enlace).toHaveAttribute('data-leida', 'true');
    await expect(enlace).toContainText('Leída');
    const progreso = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('aventura_lectora:progreso') ?? '{}'),
    );
    expect(progreso.paginas_leidas).toContain('2/lupa');
    expect(progreso.visitados).toContain(2);
  });

  test('en celular el indice esta dentro del menu', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/unidad/3/pistas');
    await expect(page.locator('.curso-indice')).toBeHidden();
    await boton_menu(page).click();
    const indice = page.getByRole('navigation', { name: 'Índice del curso en el menú' });
    await expect(indice).toBeVisible();
    await expect(indice.getByRole('link', { name: /Seguir las pistas/ }).first()).toHaveAttribute(
      'aria-current',
      'page',
    );
  });
});
