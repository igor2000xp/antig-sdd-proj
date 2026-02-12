import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the home page", () => {
  cy.visit("/");
});

When("I navigate to the products page", () => {
  cy.get('a[href="/products"]').click();
});

Then("I should see a list of available products", () => {
  cy.get(".product-item").should("have.length.greaterThan", 0);
});

Then("I should see product details including name and price", () => {
  cy.get(".product-item").first().within(() => {
    cy.get(".product-name").should("be.visible");
    cy.get(".product-price").should("be.visible");
  });
});
