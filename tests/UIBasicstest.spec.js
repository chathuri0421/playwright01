const { test, expect } = require('@playwright/test');

test('Browser Context Playwright test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());

  await page.locator('#username').fill('rahulshettyacademy');
  await page.locator("[type='password']").type("learning");
  await page.locator('#signInBtn').click();

  await page.waitForSelector("[style*='block']", { state: 'visible' });
  const text = await page.locator("[style*='block']").textContent();
  console.log(text);
});

test('Page Playwright test', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const username = page.locator('#username');
  const signIn = page.locator('#signInBtn');
  const documentLink=page.locator('a[href*="documents-request"]');
  const dropdown = page.locator('select.form-control');
  
  // Select 'consult' from the dropdown
  await dropdown.selectOption('consult');
  
  // Wait for and click the last radio button (correct selector)
  await page.waitForSelector('input[type="radio"]', { state: 'visible', timeout: 10000 });
  await page.locator('input[type="radio"]').last().click();

  // Wait for and click the OK button (correct selector)
  await page.waitForSelector('#okayBtn', { state: 'visible', timeout: 10000 });
  await page.locator('#okayBtn').click();

  // Verify the last radio button is checked
  console.log(await page.locator('input[type="radio"]').last().isChecked());
  await expect(page.locator('input[type="radio"]').last()).toBeChecked();

  // Interact with the terms checkbox
  await page.locator('#terms').click();
  await expect(page.locator('#terms')).toBeChecked();
  await page.locator('#terms').check();
  await expect(page.locator('#terms')).toBeChecked(); // Corrected expectation
  await expect(documentLink).toHaveAttribute("class", "blinkingText");
  await documentLink.click();
  console.log("Link clicked, current URL:", await page.url());
   await page.pause(); // Pause for manual inspection
});
test('child window handle', async ({ browser }) => 
{
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const documentLink = page.locator("[href*='documents-request']");

const [newPage] = await Promise.all([
  context.waitForEvent('page'),
  documentLink.click(),
]);

const text = await newPage.locator(".red").textContent();
const arrayText = text.split("@");
arrayText[1];
console.log(text);
});

 
