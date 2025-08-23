const { test, expect } = require('@playwright/test');

test.setTimeout(120000);

test.only('Browser Context Playwright test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Navigate to the main page
  await page.goto("https://www.srisrimadhara.com/");
  console.log(await page.title());
  
  // Navigate to the Shop page
  await page.locator('//*[@id="site-navigation"]/li[2]/a').click();
  console.log(await page.title());
  
  // Ensure on shop page
  await page.goto("https://www.srisrimadhara.com/shop/");
  
  // Wait for products to load
  await page.waitForSelector('.woocommerce-loop-product__title');
  
  // Get product names
  const productNames = await page.locator('.woocommerce-loop-product__title').allInnerTexts();
  const productName = "Rose Glow Serum With Kojic Acid";
  const trimmedNames = productNames.map(name => name.trim());
  const count = trimmedNames.length;
  console.log('Product Names:', trimmedNames);
  console.log('Total Products:', count);

  // Find and click the target product
  let productFound = false;
  for (let i = 0; i < count; i++) {
    if (trimmedNames[i] === productName) {
      console.log(`Product "${productName}" found at index ${i}`);
      await page.locator('.woocommerce-loop-product__title').nth(i).click();
      productFound = true;
      break;
    }
  }

  if (!productFound) {
    console.error(`Product "${productName}" not found`);
    await context.close();
    return;
  }

  // Wait for the product page to load
  await page.waitForLoadState('domcontentloaded');
  console.log("Navigated to product page:", await page.title());

  // Click the "Add to Cart" button (use a more robust locator)
  await page.locator('button[name="add-to-cart"]').click();
  console.log("Clicked Add to Cart button");
  
  // Optionally, verify the cart update or next steps
  await page.waitForTimeout(2000); // Wait for any async updates
  console.log("Test completed");
  await page.locator('a:has-text("View cart").added_to_cart').click();
  console.log("Navigated to cart page:", await page.title());

});