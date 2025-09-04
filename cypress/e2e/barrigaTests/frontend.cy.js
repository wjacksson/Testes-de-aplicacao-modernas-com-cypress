import loc from "../../support/locators";

describe("Should teste at a functional level", () => {
  beforeEach(() => {
    cy.login("jack@jack.com", "1234");
  });

  it("Insert an acount", () => {});
  it("Edit an acount", () => {});
  it("Should not create an acount with same name", () => {});
  it("Create a new transaction", () => {});
  it("Get balance", () => {});
  it("Remove a transaction", () => {});

  after(() => {
    cy.resetApp();
  });
});
