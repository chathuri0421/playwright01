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
  //// Wait for cart item to show up
  await page.locator('div li').first().waitFor();

  //check if product is in cart
  const bool = await page.locator('h3:has-text("IPHONE 13 PRO")').isVisible();
  expect(bool).toBeTruthy();
  //click checkout button
  // await page.locator('text=Checkout').click();
  await page.getByRole('button', { name: 'Checkout❯', exact: true }).click();
  console.log("Checkout button clicked");
  

const countryInput = page.locator('[placeholder*="Select Country"]');
await countryInput.fill('India', { delay: 200 }); // type slowly to trigger dropdown


// wait for options to appear
const dropdown = page.locator('.ta-results');
await expect(dropdown).toBeVisible();

const dropdownCount = await dropdown.locator('button').count();
for (let i = 0; i < dropdownCount; ++i) {
  const optionText = (await dropdown.locator('button').nth(i).textContent()).trim();

  if (optionText === 'India') {
    await dropdown.locator('button').nth(i).click();
    console.log("Country selected: India");
    break;
  }
}


  await page.pause();
});
