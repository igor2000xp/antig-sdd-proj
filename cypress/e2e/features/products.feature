Feature: Browsing Products
  As a customer
  I want to browse the product catalog
  So that I can find items to purchase

  Scenario: View product list
    Given I am on the home page
    When I navigate to the products page
    Then I should see a list of available products
    And I should see product details including name and price
