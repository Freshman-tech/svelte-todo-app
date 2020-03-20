it("Should add, complete, and remove items", function() {
  cy.visit("/");

  // I know we were trying to write the test from a user's perspective,
  // but what if the placeholder value changes? This feels a bit brittle. 
  const PLACEHOLDER_VAL = "[placeholder='E.g. Build a web app']";
  // What happens if the heading changes?
  // Should we use a `data-test` attribute? 
  const EMPTY_STATE_TEXT = "Add your first todo";

  // cy.log("Check that we can see our empty state");
  cy.contains(EMPTY_STATE_TEXT).should("be.visible");

  // cy.log('Enter "test 1" into form input');
  cy.get(PLACEHOLDER_VAL).type("test 1{enter}");

  // cy.log("Check that there is a ToDo list item with the text 'test 1'");
  cy.get("[data-cy='todo-item']").should("contain", "test 1");

  // cy.log("Check our empty state has disappeared");
  cy.contains(EMPTY_STATE_TEXT).should("not.be.visible");

  // cy.log("Add 2 more items");
  cy.get(PLACEHOLDER_VAL)
    .type("test 2{enter}")
    .type("test 3{enter}");

  // cy.log("Check that there are now 3 items");
  cy.get("[data-cy='todo-item']").should("have.length", 3);

  // cy.log("Mark the first item as done");
  cy.contains("[data-cy='todo-item']", "test 1")
    .find("[data-cy='visual-checkbox']")
    .click();

  // cy.log("Confirm the first item has the done class");
  cy.contains("[data-cy='todo-item']", "test 1")
    .should("have.class", "done");

  // cy.log("Confirm the first item's checkbox is checked'");
  cy.contains("[data-cy='todo-item']", "test 1")
    .find("[data-cy='hidden-checkbox']")
    .should("be.checked");

  // cy.log("Delete our first item by clicking the 'x' button next to 'test 2'");
  cy.contains("[data-cy='todo-item']", "test 2")
    .find("[data-cy='delete-button']")
    .click();

  // cy.log("Check that there are now 2 items");
  cy.get("[data-cy='todo-item']").should("have.length", 2);

  // cy.log("Delete another ToDo item");
  cy.contains("[data-cy='todo-item']", "test 1")
    .find("[data-cy='delete-button']")
    .click();

  // cy.log("Check that there is now 1 item");
  cy.get("[data-cy='todo-item']").should("have.length", 1);

  // cy.log("Delete our final ToDo item");
  cy.contains("[data-cy='todo-item']", "test 3")
    .find("[data-cy='delete-button']")
    .click();

  // cy.log("Check that there are now 0 items");
  cy.get("[data-cy='todo-item']").should("not.exist");

  // cy.log("Check that we can see our empty state");
  cy.contains(EMPTY_STATE_TEXT).should("be.visible");
});
