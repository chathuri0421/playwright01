const { test, expect } = require('@playwright/test');

test.only('Browser Context Playwright test', async ({ page }) => {
  // You can use the provided 'page' object directly
  await page.goto('https://rahulshettyacademy.com/client');
  // Add your test steps here
  await page.locator('#userEmail').fill('chathuriwathsala421@gmail.com');
  await page.locator('#userPassword').fill('Asaliya421_');
  await page.locator('[value="Login"]').click();
  // await page.waitForLoadState('networkidle');
  await page.locator('.card-body b').first().waitFor({ state: 'visible' });
  const titles = await page.locator('.card-body b').allTextContents();
  console.log(titles);
});