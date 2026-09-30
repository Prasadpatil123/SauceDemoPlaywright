// Reusable checkout form actions and overview selectors are centralized here.
class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByLabel('First Name');
    this.lastNameInput = page.getByLabel('Last Name');
    this.postalCodeInput = page.getByLabel('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.overviewHeading = page.getByText('Checkout: Overview', { exact: true });
    this.overviewItems = page.locator('.cart_item');
    this.itemSubtotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');
    this.confirmationMessage = page.getByText('Thank you for your order!', {
      exact: true,
    });
  }

  overviewItem(productName) {
    return this.overviewItems.filter({ hasText: productName });
  }

  overviewItemName(productName) {
    return this.overviewItem(productName).locator('.inventory_item_name');
  }

  overviewItemPrice(productName) {
    return this.overviewItem(productName).locator('.inventory_item_price');
  }

  overviewItemQuantity(productName) {
    return this.overviewItem(productName).locator('.cart_quantity');
  }

  async checkout(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async completeOrder() {
    await this.finishButton.click();
  }
}

module.exports = { CheckoutPage };