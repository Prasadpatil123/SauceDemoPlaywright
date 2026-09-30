// Cart-row helpers keep each item's name, price, and quantity assertions together.
class CartPage {
  constructor(page) {
    this.page = page;
    this.cartHeading = page.getByText('Your Cart', { exact: true });
    this.cartItems = page.locator('.cart_item');
    this.continueShoppingButton = page.getByRole('button', {
      name: 'Continue Shopping',
    });
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  cartItem(productName) {
    return this.cartItems.filter({ hasText: productName });
  }

  itemName(productName) {
    return this.cartItem(productName).locator('.inventory_item_name');
  }

  itemPrice(productName) {
    return this.cartItem(productName).locator('.inventory_item_price');
  }

  itemQuantity(productName) {
    return this.cartItem(productName).locator('.cart_quantity');
  }

  async removeProductFromCart(productName) {
    await this.cartItem(productName)
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };