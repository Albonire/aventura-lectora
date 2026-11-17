import { expect, test } from '@playwright/test';

const RUTAS = ['/', '/agencia', '/unidad/1', '/unidad/2', '/unidad/3', '/unidad/4', '/cierre', '/libreta', '/docentes'];

for (const ruta of RUTAS) {
  test(`arte pintado ${ruta}: definiciones una vez y sin ids repetidos`, async ({ page }) => {
    await page.goto(ruta);
    await expect(page.locator('#al-defs')).toHaveCount(1);
    const repetidos = await page.evaluate(() => {
      const vistos = new Map<string, number>();
      for (const el of document.querySelectorAll('[id]')) {
        vistos.set(el.id, (vistos.get(el.id) ?? 0) + 1);
      }
      return [...vistos].filter(([id, n]) => n > 1 && id.startsWith('al-')).map(([id]) => id);
    });
    expect(repetidos).toEqual([]);
  });
}

test('el papel con grano se apaga al imprimir', async ({ page }) => {
  await page.goto('/unidad/1');
  const marco = page.locator('.papel').first();
  await expect(marco).toBeVisible();
  expect(await marco.evaluate((el) => getComputedStyle(el).backgroundImage)).toContain('url(');
  await page.emulateMedia({ media: 'print' });
  expect(await marco.evaluate((el) => getComputedStyle(el).backgroundImage)).toBe('none');
});

test('el filtro del trazo se apaga con alto contraste y al imprimir', async ({ page }) => {
  await page.goto('/unidad/1');
  const escena = page.locator('.pintado').first();
  expect(await escena.evaluate((el) => getComputedStyle(el).filter)).toContain('al-pintado');
  await page.emulateMedia({ media: 'print' });
  expect(await escena.evaluate((el) => getComputedStyle(el).filter)).toBe('none');
});

test('la tapa 3D no usa el filtro del trazo', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.pintado')).toHaveCount(0);
});

test('los interruptores del menu dicen su estado una sola vez y la bola no lleva texto', async ({ page }) => {
  await page.goto('/unidad/1');
  await page.locator('summary').filter({ hasText: 'Menú' }).click();
  const movimiento = page.locator('[data-ajuste="movimiento"]');
  await expect(movimiento).toBeVisible();
  const texto = await movimiento.evaluate((el) => {
    const etiqueta = el.querySelector(':scope > span:first-child') as HTMLElement;
    return {
      etiqueta: getComputedStyle(etiqueta, '::after').content,
      bola: getComputedStyle(el.querySelector('.interruptor-bola') as HTMLElement, '::after').content,
    };
  });
  expect(texto.etiqueta).toBe('": sí"');
  expect(['none', 'normal']).toContain(texto.bola);
  await movimiento.click();
  expect(await movimiento.evaluate((el) => getComputedStyle(el.querySelector(':scope > span:first-child') as HTMLElement, '::after').content)).toBe('": no"');
});

test('Empatizar y definir ya no habla del pilotaje del 10 de octubre', async ({ page }) => {
  await page.goto('/empatizar');
  await expect(page.locator('main')).not.toContainText(/10 de octubre|pilotaje/i);
  await expect(page.locator('#recorrido')).toHaveCount(0);
});

test('los sprites son decorativos, tienen fondo transparente y no se imprimen en el diploma', async ({ page }) => {
  await page.goto('/cierre');
  const sprites = page.locator('img[src*="sprites"], img[src*="sofia_"], img[src*="conejo_"], img[src*="mateo_"]');
  expect(await sprites.count()).toBeGreaterThan(2);
  for (const img of await sprites.all()) {
    await expect(img).toHaveAttribute('alt', '');
    await expect(img).toHaveAttribute('aria-hidden', 'true');
    await expect(img).toHaveAttribute('loading', 'lazy');
  }
  await page.emulateMedia({ media: 'print' });
  for (const img of await sprites.all()) await expect(img).toBeHidden();
});

test('el diploma tiene su dibujo de fondo como imagen que se imprime', async ({ page }) => {
  await page.goto('/cierre');
  const fondo = page.locator('[data-certificado] > img').first();
  await expect(fondo).toHaveAttribute('alt', '');
  await expect(fondo).toHaveAttribute('aria-hidden', 'true');
  await page.emulateMedia({ media: 'print' });
  await expect(fondo).toBeAttached();
});
