const { test, expect } = require('@playwright/test');
const { zstdCompress } = require('zlib');

test.setTimeout(120000);

test.only('Browser Context Playwright test', async ({ page }) => {  
  
  await page.goto("https://www.srisrimadhara.com/");
  console.log(await page.title());
  
  
  await page.locator('//*[@id="site-navigation"]/li[2]/a').click();
  console.log(await page.title());
  
  
  await page.goto("https://www.srisrimadhara.com/shop/");
  
  
  await page.waitForSelector('.woocommerce-loop-product__title');
  
  
  const productNames = await page.locator('.woocommerce-loop-product__title').allInnerTexts();
  const productName = "Rose Glow Serum With Kojic Acid";
  const trimmedNames = productNames.map(name => name.trim());
  const count = trimmedNames.length;
  console.log('Product Names:', trimmedNames);
  console.log('Total Products:', count);

  
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

  
  await page.waitForLoadState('domcontentloaded');
  console.log("Navigated to product page:", await page.title());
  
  

  
  await page.locator('button[name="add-to-cart"]').click();
  console.log("Clicked Add to Cart button");
  await page.waitForTimeout(5000); 
  
  await page.locator('//*[@id="cart-sidebar"]/div[2]/div[2]/div[2]/p/a[1]').click();
  await page.locator('text="Proceed to checkout"').click();
  console.log("Clicked Proceed to Checkout button");
  await page.waitForTimeout(5000); 


  const firstNameInput = page.locator('#billing_first_name').first();
  await firstNameInput.scrollIntoViewIfNeeded();
  await firstNameInput.waitFor({ state: 'visible' });
  await firstNameInput.fill('Chathuri');
  await page.waitForTimeout(1000); 

  const HouseNoandStreetInput=page.locator("//*[@id='billing_address_1']")
  await HouseNoandStreetInput.scrollIntoViewIfNeeded();
  await HouseNoandStreetInput.fill('123 Main St');


 await page.locator('#select2-billing_state-container').click(); 


 await page.locator('.select2-search__field').fill('Nuwara Eliya');

 
 await page.locator('.select2-results__option', { hasText: 'Nuwara Eliya' }).click();

 console.log("Selected district: Nuwara Eliya");
 await page.waitForTimeout(1000); 
  
 

const cityDropdown = page.locator('#select2-billing_city-container');
await cityDropdown.scrollIntoViewIfNeeded();
await cityDropdown.click();


await page.locator('.select2-search__field').fill('Ambe');


const cityOptions = page.locator('ul.select2-results__options > li');
await cityOptions.first().waitFor({ state: 'visible' }); 


const optionCount = await cityOptions.count();
for (let i = 0; i < optionCount; i++) {
  const optionText = (await cityOptions.nth(i).textContent()).trim();
  console.log("Found option:", optionText);

  if (optionText === 'Ambewela') {
    await cityOptions.nth(i).click();
    console.log("City selected: Ambewela");
    break;
  }
}
await page.waitForTimeout(1000); 

const phoneInput = page.locator('#billing_phone');
await expect(phoneInput).toBeVisible();
await phoneInput.type('0771234567'); 
const phoneValue = await phoneInput.inputValue();
expect(phoneValue).toMatch(/^\d{10}$/); 
await page.waitForTimeout(1000); 

const mobileInput = page.locator('#billing_mobile');
await expect(mobileInput).toBeVisible();
await mobileInput.type('0719876543');
const mobileValue = await mobileInput.inputValue();
expect(mobileValue).toMatch(/^\d{10}$/); 
await page.waitForTimeout(1000); 


const emailInput = page.locator('#billing_email');
await expect(emailInput).toBeVisible();
await emailInput.type('testuser@example.com');
const emailValue = await emailInput.inputValue();
expect(emailValue).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/); 
await page.waitForTimeout(1000); 

const orderComments = page.locator('#order_comments');


await expect(orderComments).toBeVisible();


await orderComments.type('Please deliver between 9 AM and 12 PM.');
await page.waitForTimeout(1000); 

const commentValue = await orderComments.inputValue();
console.log("Order comment added:", commentValue);


});