const { test, expect } = require('@playwright/test');
const { zstdCompress } = require('zlib');

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
  //cursor come to the button change the button colour?
  

  // Click the "Add to Cart" button (use a more robust locator)
  await page.locator('button[name="add-to-cart"]').click();
  console.log("Clicked Add to Cart button");
  await page.waitForTimeout(5000); // Wait for 5 seconds to ensure the cart is updated
  //click view cart button
  await page.locator('//*[@id="cart-sidebar"]/div[2]/div[2]/div[2]/p/a[1]').click();
  await page.locator('text="Proceed to checkout"').click();
  console.log("Clicked Proceed to Checkout button");
  await page.waitForTimeout(5000); // Wait for 5 seconds to ensure the checkout page is loaded

 //fill feilds
  const firstNameInput = page.locator('#billing_first_name').first();
  await firstNameInput.scrollIntoViewIfNeeded();
  await firstNameInput.waitFor({ state: 'visible' });
  await firstNameInput.fill('Chathuri');
  await page.waitForTimeout(1000); 

  const HouseNoandStreetInput=page.locator("//*[@id='billing_address_1']")
  await HouseNoandStreetInput.scrollIntoViewIfNeeded();
  await HouseNoandStreetInput.fill('123 Main St');

 // Select District = Nuwara Eliya
 await page.locator('#select2-billing_state-container').click();  // open the dropdown

 // Type "Nuwara Eliya" into the search box that appears
 await page.locator('.select2-search__field').fill('Nuwara Eliya');

 // Wait for option and click
 await page.locator('.select2-results__option', { hasText: 'Nuwara Eliya' }).click();

 console.log("Selected district: Nuwara Eliya");
 await page.waitForTimeout(1000); 
  
 
// ✅ Open City dropdown
const cityDropdown = page.locator('#select2-billing_city-container');
await cityDropdown.scrollIntoViewIfNeeded();
await cityDropdown.click();

// ✅ Type partial text "Abe"
await page.locator('.select2-search__field').fill('Ambe');

// ✅ Wait for filtered options to appear
const cityOptions = page.locator('ul.select2-results__options > li');
await cityOptions.first().waitFor({ state: 'visible' }); 

// ✅ Loop through filtered options and pick "Abewela"
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
// ✅ Phone Number 1
const phoneInput = page.locator('#billing_phone');
await expect(phoneInput).toBeVisible();
await phoneInput.type('0771234567'); // valid SL mobile number
const phoneValue = await phoneInput.inputValue();
expect(phoneValue).toMatch(/^\d{10}$/); // regex check for 10 digits
await page.waitForTimeout(1000); 
// ✅ Phone Number 2 (optional)
const mobileInput = page.locator('#billing_mobile');
await expect(mobileInput).toBeVisible();
await mobileInput.type('0719876543');
const mobileValue = await mobileInput.inputValue();
expect(mobileValue).toMatch(/^\d{10}$/); // also 10 digits
await page.waitForTimeout(1000); 

// ✅ Email Address
const emailInput = page.locator('#billing_email');
await expect(emailInput).toBeVisible();
await emailInput.type('testuser@example.com');
const emailValue = await emailInput.inputValue();
expect(emailValue).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/); // simple email regex
await page.waitForTimeout(1000); 
// // ✅ Locate the checkbox

// const shipCheckbox = page.locator('#ship-to-different-address-checkbox');
// await page.waitForTimeout(1000); 
// // ✅ Ensure it's visible
// await expect(shipCheckbox).toBeVisible();

// // ✅ Tick the checkbox if not already checked
// if (!(await shipCheckbox.isChecked())) {
//   await shipCheckbox.check();
//   console.log("Checkbox is now checked");
// } else {
//   console.log("Checkbox was already checked");
// }

// // ✅ Optional: assert that it is checked
// await expect(shipCheckbox).toBeChecked();

// ✅ Locate the textarea
const orderComments = page.locator('#order_comments');

// ✅ Ensure it's visible
await expect(orderComments).toBeVisible();

// ✅ Fill the comment
await orderComments.type('Please deliver between 9 AM and 12 PM.');
await page.waitForTimeout(1000); 
// ✅ Optional: verify the value
const commentValue = await orderComments.inputValue();
console.log("Order comment added:", commentValue);


});