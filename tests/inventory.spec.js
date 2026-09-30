const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { credentials, products } = require('../utils/testData');

test.describe('Inventory', () => {
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    // Each test starts with an independent, authenticated browser context.
    await test.step('Log in and open the inventory', async () => {
      await loginPage.open();
      await loginPage.login(credentials.valid.username, credentials.valid.password);
      await expect(inventoryPage.productsHeading).toBeVisible();
    });
  });

  test('[INV-01] Verify the inventory page', async ({ page }) => {
    await test.step('Verify the inventory route and catalog size', async () => {
      await expect(page).toHaveURL(/\/inventory\.html$/);
      await expect(inventoryPage.productsHeading).toBeVisible();
      await expect(inventoryPage.productCards).toHaveCount(6);
    });
  });

  test('[INV-02] Verify product names and prices', async () => {
    await test.step('Compare every product to the expected catalog', async () => {
      for (const product of Object.values(products)) {
        const productCard = inventoryPage.productCard(product.name);
        await expect(productCard).toHaveCount(1);
        await expect(inventoryPage.productPrice(product.name)).toHaveText(
          product.price,
        );
      }
    });
  });

  test('[INV-03] Add a single product to the cart', async () => {
    const backpack = products.backpack;

    await test.step('Add the backpack', async () => {
      await inventoryPage.addProductToCart(backpack.name);
    });

    await test.step('Verify the cart button and count', async () => {
      await expect(inventoryPage.removeFromCartButton(backpack.name)).toBeVisible();
      await expect(inventoryPage.cartBadge).toHaveText('1');
    });
  });

  test('[INV-04] Add multiple products to the cart', async () => {
    await test.step('Add two different products', async () => {
      await inventoryPage.addProductToCart(products.backpack.name);
      await inventoryPage.addProductToCart(products.bikeLight.name);
    });

    await test.step('Verify both products and the cart count', async () => {
      await expect(
        inventoryPage.removeFromCartButton(products.backpack.name),
      ).toBeVisible();
      await expect(
        inventoryPage.removeFromCartButton(products.bikeLight.name),
      ).toBeVisible();
      await expect(inventoryPage.cartBadge).toHaveText('2');
    });
  });
});