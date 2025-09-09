// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 10 * 1000,
  expect: { timeout: 5000 },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
    video: {
      mode: 'off',
      size: { width: 1280, height: 720 },
      
    },
  },
});
