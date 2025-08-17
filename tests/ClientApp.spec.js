const { test, expect } = require('@playwright/test');
test.setTimeout(60000);
test.only('Browser Context Playwright test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  // Example login flow
  await page.locator('#userEmail').fill('chathuriwathsala421@gmail.com');
  await page.locator('#userPassword').fill('Asaliya421_');
  await page.locator('[value="Login"]').click();

  // Wait for products to load
  await page.waitForSelector('.card-body');

  // Get product titles
  const titles = await page.locator('.card-body b').allTextContents();
  console.log(titles);
  const productcount=titles.length;
  console.log("Total products found: " + productcount);
  const productName='IPHONE 13 PRO';
  const products = page.locator('.card-body');

  for(let i=0; i<productcount; i++)
  {
   
    if((await titles[i]) === productName) // Corrected locator
    // if(await products.nth(i).locator("b").textContent()===productName
    {
      console.log("Product found: " + productName);
      console.log(titles[i]);
      // in here if product name is correct then we add it to card
      await products.nth(i).locator('text= Add To Cart').click();
      console.log("Product added to cart: " + productName);
      break;

    }
  }

  await page.locator('[routerlink*="cart"]').click();
  console.log("Navigated to cart");
  await page.locator('div li').first().waitFor();
  //check if product is in cart
const bool = await page.locator('h3:has-text("IPHONE 13 PRO")').isVisible();
expect(bool).toBeTruthy();

  //  await page.pause();
});
