# SauceDemo Test Cases

All cases use the SauceDemo public test site. Valid authenticated cases use `standard_user` / `secret_sauce`; checkout uses Ada Lovelace, postal code 94000. Priorities are P1 (core flow) and P2 (supporting workflow).

| ID | Title | Objective | Preconditions | Test steps | Test data | Expected result | Priority |
|---|---|---|---|---|---|---|---|
| AUTH-01 | Login with valid credentials | Verify authenticated access | Login page is open | Enter credentials and submit | `standard_user` / `secret_sauce` | Redirect to inventory and display Products | P1 |
| AUTH-02 | Reject an invalid username | Verify username validation | Login page is open | Enter unknown username and valid password; submit | `unknown_user` / `secret_sauce` | Show `Epic sadface: Username and password do not match any user in this service`; remain on login | P1 |
| AUTH-03 | Reject an invalid password | Verify password validation | Login page is open | Enter valid username and incorrect password; submit | `standard_user` / `wrong_password` | Show `Epic sadface: Username and password do not match any user in this service`; remain on login | P1 |
| AUTH-04 | Require a username | Verify required username validation | Login page is open | Submit both fields empty | Empty username and password | Show `Epic sadface: Username is required` | P1 |
| AUTH-05 | Require a password | Verify required password validation | Login page is open | Enter username and submit without password | `standard_user` / empty | Show `Epic sadface: Password is required` | P1 |
| AUTH-06 | Logout and return to login | Verify logout behavior | User is logged in | Open menu; select Logout | Standard account | Login page and Login button are visible | P1 |
| INV-01 | Verify inventory page | Verify page route and catalog availability | User is logged in | Check URL, Products label, product count | Standard account | `/inventory.html`, Products, six products | P1 |
| INV-02 | Verify product names and prices | Validate displayed catalog data | User is logged in | Compare each product name and price with expected values | Six products in `testData.js` | Every listed name and price matches | P1 |
| INV-03 | Add a single product | Verify one-item cart behavior | User is logged in; cart is empty | Add Backpack | Sauce Labs Backpack | Button changes to Remove; cart badge is 1 | P1 |
| INV-04 | Add multiple products | Verify multiple-item cart behavior | User is logged in; cart is empty | Add Backpack and Bike Light | Two named products | Both buttons change to Remove; cart badge is 2 | P1 |
| CART-01 | Open cart | Verify cart navigation | User is logged in | Open cart control | Empty cart | Cart page is displayed | P1 |
| CART-02 | Verify selected cart products | Validate cart item details | User is logged in | Add Backpack and Bike Light; open cart; inspect rows | Both named products | Both items show correct names, prices, and quantity 1 | P1 |
| CART-03 | Remove a product | Verify item removal | User is logged in | Add Backpack; open cart; remove it | Sauce Labs Backpack | Removed item no longer appears; cart has no items | P1 |
| CART-04 | Continue shopping | Verify return navigation and cart persistence | User is logged in; cart contains an item | Open cart; select Continue Shopping | Sauce Labs Bike Light | Return to inventory; item and badge remain | P2 |
| CHK-01 | Enter customer information | Verify checkout form submission | User is logged in; Backpack is in cart | Begin checkout; enter details; continue | Ada Lovelace, 94000 | Checkout overview is displayed | P1 |
| CHK-02 | Verify checkout overview and totals | Validate item details and order calculations | Checkout overview is reached | Check item, quantity, subtotal, tax, and total | Backpack, quantity 1 | Price $29.99; subtotal $29.99; tax $2.40; total $32.39 | P1 |
| CHK-03 | Complete order | Verify successful purchase confirmation | Valid customer details entered; overview displayed | Select Finish | Backpack order | “Thank you for your order!” appears on completion page | P1 |