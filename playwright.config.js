// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 10* 1000,
  expect: {
    // You can define expect settings here if needed
    timeout: 5000, // Default timeout for expect assertions
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
  },
});
