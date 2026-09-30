const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { checkoutSummary, credentials, customer, products } = require('../utils/testData');

test.describe('Checkout', () => {
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await test.step('Log in and add the backpack', async () => {
      await loginPage.open();
      await loginPage.login(credentials.valid.username, credentials.valid.password);
      await inventoryPage.addProductToCart(products.backpack.name);
    });

    await test.step('Open the cart and begin checkout', async () => {
      await inventoryPage.openCart();
      await cartPage.checkout();
      await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    });
  });

  test('[CHK-01] Enter customer information', async ({ page }) => {
    await test.step('Enter customer details and continue', async () => {
      await checkoutPage.checkout(
        customer.firstName,
        customer.lastName,
        customer.postalCode,
      );
    });

    await test.step('Verify the checkout overview is displayed', async () => {
      await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
      await expect(checkoutPage.overviewHeading).toBeVisible();
    });
  });

  test('[CHK-02] Verify checkout item details and totals', async ({ page }) => {
    const backpack = products.backpack;

    await test.step('Enter customer details to reach the overview', async () => {
      await checkoutPage.checkout(
        customer.firstName,
        customer.lastName,
        customer.postalCode,
      );
      await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    });

    await test.step('Verify product, quantity, subtotal, tax, and total', async () => {
      await expect(checkoutPage.overviewItemName(backpack.name)).toHaveText(
        backpack.name,
      );
      await expect(checkoutPage.overviewItemPrice(backpack.name)).toHaveText(
        backpack.price,
      );
      await expect(checkoutPage.overviewItemQuantity(backpack.name)).toHaveText(
        '1',
      );
      await expect(checkoutPage.itemSubtotal).toHaveText(checkoutSummary.itemTotal);
      await expect(checkoutPage.tax).toHaveText(checkoutSummary.tax);
      await expect(checkoutPage.total).toHaveText(checkoutSummary.total);
    });
  });

  test('[CHK-03] Complete the order and verify confirmation', async ({ page }) => {
    await test.step('Enter customer details and review the order', async () => {
      await checkoutPage.checkout(
        customer.firstName,
        customer.lastName,
        customer.postalCode,
      );
      await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    });

    await test.step('Finish checkout and verify confirmation', async () => {
      await checkoutPage.completeOrder();
      await expect(checkoutPage.confirmationMessage).toBeVisible();
      await expect(page).toHaveURL(/\/checkout-complete\.html$/);
    });
  });
});