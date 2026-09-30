const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { credentials, messages } = require('../utils/testData');

test.describe('Authentication', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('[AUTH-01] Login with valid credentials', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await test.step('Submit valid credentials', async () => {
      await loginPage.login(
        credentials.valid.username,
        credentials.valid.password,
      );
    });

    await test.step('Verify successful login', async () => {
      await expect(page).toHaveURL(/\/inventory\.html$/);
      await expect(inventoryPage.productsHeading).toBeVisible();
    });
  });

  test('[AUTH-02] Reject an invalid username', async () => {
    await test.step('Submit an unknown username', async () => {
      await loginPage.login(
        credentials.invalidUsername.username,
        credentials.invalidUsername.password,
      );
    });

    await test.step('Verify the invalid-credentials error', async () => {
      await expect(loginPage.errorMessage).toHaveText(
        messages.invalidCredentials,
      );
    });
  });

  test('[AUTH-03] Reject an invalid password', async () => {
    await test.step('Submit an incorrect password', async () => {
      await loginPage.login(
        credentials.invalidPassword.username,
        credentials.invalidPassword.password,
      );
    });

    await test.step('Verify the invalid-credentials error', async () => {
      await expect(loginPage.errorMessage).toHaveText(
        messages.invalidCredentials,
      );
    });
  });

  test('[AUTH-04] Require a username', async () => {
    await test.step('Submit both fields empty', async () => {
      await loginPage.login('', '');
    });

    await test.step('Verify the username-required error', async () => {
      await expect(loginPage.errorMessage).toHaveText(
        messages.usernameRequired,
      );
    });
  });

  test('[AUTH-05] Require a password', async () => {
    await test.step('Submit a username without a password', async () => {
      await loginPage.login(credentials.valid.username, '');
    });

    await test.step('Verify the password-required error', async () => {
      await expect(loginPage.errorMessage).toHaveText(
        messages.passwordRequired,
      );
    });
  });

  test('[AUTH-06] Logout and return to the login page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await test.step('Log in with the standard account', async () => {
      await loginPage.login(credentials.valid.username, credentials.valid.password);
    });

    await test.step('Log out from the navigation menu', async () => {
      await inventoryPage.logout();
    });

    await test.step('Verify the login page is displayed', async () => {
      await expect(page).toHaveURL('/');
      await expect(loginPage.loginButton).toBeVisible();
    });
  });
});