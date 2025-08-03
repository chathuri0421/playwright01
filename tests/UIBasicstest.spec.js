const { test, expect } = require('@playwright/test');

test('Browser Context Playwright test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());

  await page.locator('#username').fill('rahulshettyacademy');
  await page.locator("[type='password']").type("learning");
  await page.locator('#signInBtn').click();

  // Wait for the page to load or an element to appear after login
  await page.waitForSelector("[style*='block']", { state: 'visible' });
  const text = await page.locator("[style*='block']").textContent();
  console.log(text); // Log the text to verify
});

// test('Page Playwright test', async ({ page }) => {
//   await page.goto("https://google.com");
//   console.log(await page.title());
//   await expect(page).toHaveTitle("Google");
// });  