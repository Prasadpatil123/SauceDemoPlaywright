const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { credentials, products } = require('../utils/testData');

test.describe('Shopping cart', () => {
  let inventoryPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await test.step('Log in and open the inventory', async () => {
      await loginPage.open();
      await loginPage.login(credentials.valid.username, credentials.valid.password);
      await expect(inventoryPage.productsHeading).toBeVisible();
    });
  });

  test('[CART-01] Open the cart', async ({ page }) => {
    await test.step('Open the cart from the inventory', async () => {
      await inventoryPage.openCart();
    });

    await test.step('Verify the cart page', async () => {
      await expect(page).toHaveURL(/\/cart\.html$/);
      await expect(cartPage.cartHeading).toBeVisible();
    });
  });

  test('[CART-02] Verify selected products in the cart', async ({ page }) => {
    await test.step('Add two products and open the cart', async () => {
      await inventoryPage.addProductToCart(products.backpack.name);
      await inventoryPage.addProductToCart(products.bikeLight.name);
      await inventoryPage.openCart();
    });

    await test.step('Verify each selected item and its quantity', async () => {
      for (const product of [products.backpack, products.bikeLight]) {
        const item = cartPage.cartItem(product.name);
        await expect(item).toHaveCount(1);
        await expect(cartPage.itemName(product.name)).toHaveText(product.name);
        await expect(cartPage.itemPrice(product.name)).toHaveText(product.price);
        await expect(cartPage.itemQuantity(product.name)).toHaveText('1');
      }
      await expect(page).toHaveURL(/\/cart\.html$/);
    });
  });

  test('[CART-03] Remove a product from the cart', async () => {
    const backpack = products.backpack;

    await test.step('Add the backpack and open the cart', async () => {
      await inventoryPage.addProductToCart(backpack.name);
      await inventoryPage.openCart();
    });

    await test.step('Remove the item and verify the cart is empty', async () => {
      await cartPage.removeProductFromCart(backpack.name);
      await expect(cartPage.cartItem(backpack.name)).toHaveCount(0);
      await expect(cartPage.cartItems).toHaveCount(0);
    });
  });

  test('[CART-04] Continue shopping and retain cart selection', async ({ page }) => {
    await test.step('Add an item and open the cart', async () => {
      await inventoryPage.addProductToCart(products.bikeLight.name);
      await inventoryPage.openCart();
    });

    await test.step('Continue shopping and verify the selection remains', async () => {
      await cartPage.continueShopping();
      await expect(page).toHaveURL(/\/inventory\.html$/);
      await expect(inventoryPage.cartBadge).toHaveText('1');
      await expect(
        inventoryPage.removeFromCartButton(products.bikeLight.name),
      ).toBeVisible();
    });
  });
});