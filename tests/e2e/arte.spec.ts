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
