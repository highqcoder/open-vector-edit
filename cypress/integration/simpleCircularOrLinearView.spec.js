// import dragMock from 'drag-mock'

describe("tabs", function() {
  beforeEach(() => {
    cy.visit("/#/SimpleCircularOrLinearView");
  });
  it("can click and right click a part and have the handlers passed on the part be hit!", function() {
    cy.get(`.veRowViewPart path`)
      .first()
      .click({ force: true })
      .trigger("contextmenu", { force: true });
    cy.contains("Part Clicked!");
    cy.contains("Part Right Clicked!");
  });
  it("can toggle not passing in sequence data without any issue", function() {
    //this just tests that this toggle doesn't throw an error
    cy.tgToggle("noSequence");
    cy.get(`.veLinearView`);
  });
  it("can toggle part colors", function() {
    cy.get(`path[stroke="red"]`).should("not.exist");
    cy.tgToggle("togglePartColor");
    cy.get(`path[stroke="red"]`).should("exist");
  });
  it("can toggle a part hover", function() {
    cy.tgToggle("circular");
    cy.get(".veCircularViewLabelText.veAnnotationHovered").should("not.exist");
    cy.tgToggle("hoverPart");
    cy.get(".veCircularViewLabelText.veAnnotationHovered").should("exist");
  });
  it("can toggle changing size", function() {
    cy.get(`.veLinearView`)
      .invoke("outerHeight")
      .should("equal", 300);
    cy.get(`.veLinearView`)
      .invoke("outerWidth")
      .should("equal", 300);
    cy.tgToggle("changeSize");
    cy.get(`.veLinearView`)
      .invoke("outerHeight")
      .should("equal", 500);
    cy.get(`.veLinearView`)
      .invoke("outerWidth")
      .should("equal", 500);
  });
});
