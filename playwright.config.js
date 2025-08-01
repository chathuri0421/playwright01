// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 40 * 1000,
  expect: {
    // You can define expect settings here if needed
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
  },
});
