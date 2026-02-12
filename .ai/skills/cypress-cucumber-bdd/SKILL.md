---
name: cypress-cucumber-bdd
description: Behavior-Driven Development patterns for Cypress with Cucumber. Use when writing E2E tests with Gherkin syntax, creating step definitions, or implementing BDD test scenarios. Covers feature files, step definitions, page objects, and Cypress best practices.
argument-hint: [feature-name]
allowed-tools: Read Write Grep
metadata:
  author: ai-factory
  version: "1.0"
  category: testing
---

# Cypress + Cucumber BDD Patterns

End-to-end testing patterns using Cypress with Cucumber (Badeball preprocessor) for BDD-style tests.

## Setup

### cypress.config.ts
```typescript
import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    specPattern: '**/*.feature',
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      
      on('file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      
      return config;
    },
  },
});
```

### .cypress-cucumber-preprocessorrc.json
```json
{
  "stepDefinitions": "cypress/e2e/**/*.ts",
  "json": {
    "enabled": true,
    "output": "cypress/reports/cucumber-json/report.json"
  }
}
```

## Feature Files

### Basic Feature Structure
```gherkin
# cypress/e2e/features/shopping-cart.feature
Feature: Shopping Cart
  As a customer
  I want to manage items in my shopping cart
  So that I can purchase products

  Background:
    Given I am on the products page
    And the cart is empty

  Scenario: Add product to cart
    When I click "Add to Cart" on "Product 1"
    Then the cart should contain 1 item
    And the cart total should be "$10.00"

  Scenario: Remove product from cart
    Given I have added "Product 1" to the cart
    When I remove "Product 1" from the cart
    Then the cart should be empty

  Scenario: Update product quantity
    Given I have added "Product 1" to the cart
    When I update the quantity of "Product 1" to 3
    Then the cart should contain 3 items
    And the cart total should be "$30.00"

  Scenario Outline: Add multiple products
    When I add <quantity> of "<product>" to the cart
    Then the cart should contain <quantity> items
    And the cart total should be "<total>"

    Examples:
      | product   | quantity | total   |
      | Product 1 | 1        | $10.00  |
      | Product 2 | 2        | $40.00  |
      | Product 3 | 5        | $150.00 |
```

### Complex Feature with Data Tables
```gherkin
Feature: Checkout Process
  As a customer
  I want to complete the checkout process
  So that I can purchase my items

  Scenario: Complete checkout with valid information
    Given I have the following items in my cart:
      | Product   | Quantity | Price  |
      | Product 1 | 2        | $10.00 |
      | Product 2 | 1        | $20.00 |
    When I proceed to checkout
    And I fill in the shipping information:
      | Field       | Value          |
      | Full Name   | John Doe       |
      | Address     | 123 Main St    |
      | City        | New York       |
      | Postal Code | 10001          |
      | Country     | USA            |
    And I fill in the payment information:
      | Field       | Value            |
      | Card Number | 1234567890123456 |
      | Expiry Date | 12/25            |
      | CVV         | 123              |
    And I submit the order
    Then I should see the order confirmation page
    And the cart should be empty
```

## Step Definitions

### Basic Steps
```typescript
// cypress/e2e/step_definitions/shopping-cart.steps.ts
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I am on the products page', () => {
  cy.visit('/products');
});

Given('the cart is empty', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('cart');
  });
});

When('I click {string} on {string}', (button: string, product: string) => {
  cy.contains('.product-card', product)
    .find('button')
    .contains(button)
    .click();
});

Then('the cart should contain {int} item(s)', (count: number) => {
  cy.get('[data-testid="cart-count"]').should('have.text', count.toString());
});

Then('the cart total should be {string}', (total: string) => {
  cy.get('[data-testid="cart-total"]').should('have.text', total);
});
```

### Steps with Data Tables
```typescript
import { DataTable } from '@badeball/cypress-cucumber-preprocessor';

Given('I have the following items in my cart:', (dataTable: DataTable) => {
  const items = dataTable.hashes();
  items.forEach((item) => {
    cy.visit('/products');
    cy.contains('.product-card', item.Product)
      .find('button')
      .contains('Add to Cart')
      .click();
    
    if (parseInt(item.Quantity) > 1) {
      cy.get('[data-testid="cart-icon"]').click();
      cy.contains('.cart-item', item.Product)
        .find('input[type="number"]')
        .clear()
        .type(item.Quantity);
    }
  });
});

When('I fill in the shipping information:', (dataTable: DataTable) => {
  const data = dataTable.rowsHash();
  cy.get('[data-testid="shipping-fullname"]').type(data['Full Name']);
  cy.get('[data-testid="shipping-address"]').type(data['Address']);
  cy.get('[data-testid="shipping-city"]').type(data['City']);
  cy.get('[data-testid="shipping-postalcode"]').type(data['Postal Code']);
  cy.get('[data-testid="shipping-country"]').type(data['Country']);
});
```

### Reusable Steps
```typescript
// cypress/e2e/step_definitions/common.steps.ts
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I am logged in as {string}', (username: string) => {
  cy.login(username, 'password123');
});

When('I navigate to {string}', (page: string) => {
  cy.visit(page);
});

Then('I should see {string}', (text: string) => {
  cy.contains(text).should('be.visible');
});

Then('I should not see {string}', (text: string) => {
  cy.contains(text).should('not.exist');
});

Then('the URL should be {string}', (url: string) => {
  cy.url().should('include', url);
});
```

## Page Objects

### Page Object Pattern
```typescript
// cypress/support/page-objects/ProductsPage.ts
export class ProductsPage {
  visit() {
    cy.visit('/products');
  }

  searchFor(query: string) {
    cy.get('[data-testid="search-input"]').type(query);
  }

  filterByCategory(category: string) {
    cy.get('[data-testid="category-filter"]').select(category);
  }

  addToCart(productName: string) {
    cy.contains('.product-card', productName)
      .find('button')
      .contains('Add to Cart')
      .click();
  }

  getProductCount() {
    return cy.get('.product-card').its('length');
  }

  getProductByName(name: string) {
    return cy.contains('.product-card', name);
  }
}
```

### Using Page Objects in Steps
```typescript
import { ProductsPage } from '../support/page-objects/ProductsPage';

const productsPage = new ProductsPage();

Given('I am on the products page', () => {
  productsPage.visit();
});

When('I search for {string}', (query: string) => {
  productsPage.searchFor(query);
});

When('I filter by category {string}', (category: string) => {
  productsPage.filterByCategory(category);
});

When('I add {string} to cart', (productName: string) => {
  productsPage.addToCart(productName);
});
```

## Custom Commands

### cypress/support/commands.ts
```typescript
declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
      addToCart(productId: string, quantity?: number): Chainable<void>;
      clearCart(): Chainable<void>;
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.session([username, password], () => {
    cy.visit('/login');
    cy.get('[data-testid="username"]').type(username);
    cy.get('[data-testid="password"]').type(password);
    cy.get('[data-testid="login-button"]').click();
    cy.url().should('not.include', '/login');
  });
});

Cypress.Commands.add('addToCart', (productId: string, quantity = 1) => {
  cy.request('POST', '/api/cart', { productId, quantity });
});

Cypress.Commands.add('clearCart', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('cart');
  });
});

Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});
```

## Best Practices

### 1. Use Data-TestId Attributes
```html
<!-- Good -->
<button data-testid="add-to-cart-btn">Add to Cart</button>

<!-- Avoid -->
<button class="btn btn-primary">Add to Cart</button>
```

### 2. Write Descriptive Scenarios
```gherkin
# Good
Scenario: Customer adds product to cart and proceeds to checkout
  Given I am on the products page
  When I add "Laptop" to the cart
  And I proceed to checkout
  Then I should see the checkout page

# Avoid
Scenario: Test cart
  When I click button
  Then something happens
```

### 3. Use Background for Common Setup
```gherkin
Feature: Shopping Cart

  Background:
    Given I am logged in as "customer@example.com"
    And I am on the products page
    And the cart is empty

  Scenario: Add product
    # Background steps run before this
```

### 4. Keep Steps Reusable
```typescript
// Good - Reusable
When('I click the {string} button', (buttonText: string) => {
  cy.contains('button', buttonText).click();
});

// Avoid - Too specific
When('I click the add to cart button on product 1', () => {
  cy.get('#product-1 .add-to-cart').click();
});
```

### 5. Use Scenario Outlines for Similar Tests
```gherkin
Scenario Outline: Validate form field <field>
  When I submit the form without "<field>"
  Then I should see "<error>"

  Examples:
    | field    | error                      |
    | name     | Name is required           |
    | email    | Email is required          |
    | password | Password is required       |
```

### 6. Handle Async Operations
```typescript
// Wait for API calls
When('I submit the form', () => {
  cy.intercept('POST', '/api/orders').as('createOrder');
  cy.get('[data-testid="submit-btn"]').click();
  cy.wait('@createOrder');
});

// Wait for elements
Then('I should see the confirmation message', () => {
  cy.get('[data-testid="confirmation"]', { timeout: 10000 })
    .should('be.visible');
});
```

## Running Tests

```bash
# Run all E2E tests
npm run e2e

# Run in headed mode
npm run e2e:open

# Run specific feature
npx cypress run --spec "cypress/e2e/features/shopping-cart.feature"

# Run with specific browser
npx cypress run --browser chrome
```

## Debugging

### Use cy.debug()
```typescript
When('I add product to cart', () => {
  cy.get('[data-testid="product"]').debug();
  cy.get('[data-testid="add-to-cart"]').click();
});
```

### Use cy.pause()
```typescript
When('I fill the form', () => {
  cy.pause(); // Pauses execution
  cy.get('[data-testid="name"]').type('John');
});
```

### Screenshots and Videos
Cypress automatically captures screenshots on failure and records videos of test runs.

## Common Patterns

### API Mocking
```typescript
Given('the API returns products', () => {
  cy.intercept('GET', '/api/products', {
    fixture: 'products.json'
  }).as('getProducts');
});
```

### Local Storage Management
```typescript
Given('I have items in cart', () => {
  cy.window().then((win) => {
    win.localStorage.setItem('cart', JSON.stringify([
      { id: '1', name: 'Product 1', quantity: 2 }
    ]));
  });
});
```

### File Upload
```typescript
When('I upload a product image', () => {
  cy.get('[data-testid="file-input"]')
    .selectFile('cypress/fixtures/product-image.jpg');
});
```
