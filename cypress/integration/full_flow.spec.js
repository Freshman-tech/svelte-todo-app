describe("TODO: Workflow", function() {
  /**
   * Refactoring considerations
   * @see https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements
   * Do we need logs?
   * Can we DRY the get() at all?
   */
  it("Bla", function() {
    cy.visit("/");

    const PLACEHOLDER_VAL = "[placeholder='E.g. Build a web app']";

    cy.log("Check our empty state...");
    cy.contains("Add your first todo").should("be.visible");

    cy.log('Enter "test 1" into form input');
    cy.get(PLACEHOLDER_VAL).type("test 1");

    cy.log('Press "enter" to submit our form');
    cy.get(PLACEHOLDER_VAL).type("{enter}");

    cy.log("Check that there is a ToDo list item with the text 'test 1'");
    cy.get(".todo-item").should("contain", "test 1");

    cy.log("Check our empty state has disappeared");
    cy.contains("Add your first todo").should("not.be.visible");

    cy.log("Add 2 more items");
    cy.get(".js-todo-input")
      .type("test 2")
      .type("{enter}");
    cy.get(".js-todo-input")
      .type("test 3")
      .type("{enter}");

    cy.log("Check that there are now 3 items");
    cy.get(".todo-item").should("have.length", 3);

    cy.log("Mark the first item as done");
    cy.get(".tick")
      .first()
      .click();

    cy.log("Confirm the first item has the done class");
    cy.get(".todo-item")
      .first()
      .should("have.class", "done");

    cy.log("Confirm the first item's checkbox is checked'");
    cy.get(".todo-item [type='checkbox']")
      .first()
      .should("be.checked");

    cy.log("Delete our first item by clicking the 'X' button");
    cy.contains("li", "test 2")
      .find(".delete-todo")
      .click();

    cy.log("Check that there are now 2 items");
    cy.get(".todo-item").should("have.length", 2);

    cy.log("Delete our remaining elements");
    cy.contains("li", "test 1")
      .find(".delete-todo")
      .click();

    cy.log("Check that there is now 1 item");
    cy.get(".todo-item").should("have.length", 1);

    cy.contains("li", "test 3")
      .find(".delete-todo")
      .click();

    cy.log("Check that there are now 0 items");
    cy.get(".todo-item").should("not.exist");

    cy.log("Check our empty state...");
    cy.contains("Add your first todo").should("be.visible");
  });
});
