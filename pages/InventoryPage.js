// Keep inventory selectors and reusable product actions together.
class InventoryPage {
  constructor(page) {
    this.page = page;
    this.productsHeading = page.getByText('Products', { exact: true });
    this.productCards = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartButton = page.getByRole('button', { name: /Cart/ });
    this.openMenuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
  }

  productCard(productName) {
    // Scope actions to one product so repeated Add to cart buttons stay unambiguous.
    return this.productCards.filter({ hasText: productName });
  }

  productPrice(productName) {
    return this.productCard(productName).locator('.inventory_item_price');
  }

  removeFromCartButton(productName) {
    return this.productCard(productName).getByRole('button', { name: 'Remove' });
  }

  async addProductToCart(productName) {
    await this.productCard(productName)
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async removeProductFromCart(productName) {
    await this.removeFromCartButton(productName).click();
  }

  async openCart() {
    await this.cartButton.click();
  }

  async logout() {
    await this.openMenuButton.click();
    await this.logoutButton.click();
  }
}

module.exports = { InventoryPage };