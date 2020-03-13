/**
 * Refactoring considerations
 * @see https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements
 * Can we DRY the get() at all?
 */
it("Should add, complete, and remove items", function() {
  cy.visit("/");

  const PLACEHOLDER_VAL = "[placeholder='E.g. Build a web app']";
  const EMPTY_STATE_TEXT = "Add your first todo";

  // cy.log("Check our empty state...");
  cy.contains(EMPTY_STATE_TEXT).should("be.visible");

  // cy.log('Enter "test 1" into form input');
  cy.get(PLACEHOLDER_VAL).type("test 1");

  // cy.log('Press "enter" to submit our form');
  cy.get(PLACEHOLDER_VAL).type("{enter}");

  // cy.log("Check that there is a ToDo list item with the text 'test 1'");
  cy.get("[data-cy='todo-item']").should("contain", "test 1");

  // cy.log("Check our empty state has disappeared");
  cy.contains(EMPTY_STATE_TEXT).should("not.be.visible");

  // cy.log("Add 2 more items");
  cy.get(PLACEHOLDER_VAL)
    .type("test 2")
    .type("{enter}");
  cy.get(PLACEHOLDER_VAL)
    .type("test 3")
    .type("{enter}");

  // cy.log("Check that there are now 3 items");
  cy.get("[data-cy='todo-item']").should("have.length", 3);

  // cy.log("Mark the first item as done");
  cy.get("[data-cy='visual-checkbox']")
    .first()
    .click();

  // cy.log("Confirm the first item has the done class");
  cy.get("[data-cy='todo-item']")
    .first()
    .should("have.class", "done");

  // cy.log("Confirm the first item's checkbox is checked'");
  cy.get("[data-cy='hidden-checkbox']")
    .first()
    .should("be.checked");

  // cy.log("Delete our first item by clicking the 'X' button");
  cy.contains("[data-cy='todo-item']", "test 2")
    .find("[data-cy='delete-button']")
    .click();

  // cy.log("Check that there are now 2 items");
  cy.get("[data-cy='todo-item']").should("have.length", 2);

  // cy.log("Delete our remaining elements");
  cy.contains("[data-cy='todo-item']", "test 1")
    .find("[data-cy='delete-button']")
    .click();

  // cy.log("Check that there is now 1 item");
  cy.get("[data-cy='todo-item']").should("have.length", 1);

  cy.contains("[data-cy='todo-item']", "test 3")
    .find("[data-cy='delete-button']")
    .click();

  // cy.log("Check that there are now 0 items");
  cy.get("[data-cy='todo-item']").should("not.exist");

  // cy.log("Check our empty state...");
  cy.contains(EMPTY_STATE_TEXT).should("be.visible");
});
