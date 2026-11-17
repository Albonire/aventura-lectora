import { defineConfig, devices } from '@playwright/test';
const launchOptions = { executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] };
export default defineConfig({
  testDir: 'tests/e2e', reporter: 'dot', use: { baseURL: 'http://localhost:4322', trace: 'off' },
  webServer: { command: 'pnpm exec astro preview --port 4322 --ignore-lock', url: 'http://localhost:4322', reuseExistingServer: true, timeout: 60_000 },
  projects: [{ name: 'escritorio', use: { ...devices['Desktop Chrome'], launchOptions } }, { name: 'celular', use: { ...devices['Pixel 5'], launchOptions } }],
});
