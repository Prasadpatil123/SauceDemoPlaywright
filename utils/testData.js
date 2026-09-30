const credentials = {
  valid: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  invalidUsername: {
    username: 'unknown_user',
    password: 'secret_sauce',
  },
  invalidPassword: {
    username: 'standard_user',
    password: 'wrong_password',
  },
};

const messages = {
  usernameRequired: 'Epic sadface: Username is required',
  passwordRequired: 'Epic sadface: Password is required',
  invalidCredentials:
    'Epic sadface: Username and password do not match any user in this service',
};

const customer = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  postalCode: '94000',
};

const products = {
  backpack: { name: 'Sauce Labs Backpack', price: '$29.99' },
  bikeLight: { name: 'Sauce Labs Bike Light', price: '$9.99' },
  boltTShirt: { name: 'Sauce Labs Bolt T-Shirt', price: '$15.99' },
  fleeceJacket: { name: 'Sauce Labs Fleece Jacket', price: '$49.99' },
  onesie: { name: 'Sauce Labs Onesie', price: '$7.99' },
  redTShirt: {
    name: 'Test.allTheThings() T-Shirt (Red)',
    price: '$15.99',
  },
};

const checkoutSummary = {
  itemTotal: 'Item total: $29.99',
  tax: 'Tax: $2.40',
  total: 'Total: $32.39',
};

module.exports = { checkoutSummary, credentials, customer, messages, products };