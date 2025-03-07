import loc from "../../support/locators";

describe("Your balley", () => {
  beforeEach(() => {
    cy.login("jack@jack.com", "1234");
  });

  it("Insert an acount", () => {
    cy.get(loc.MENU.SETTING).click();
    cy.get(loc.MENU.CONTAS).click();
    cy.get(loc.CONTAS.NOME).type("jackCount");
    cy.get(loc.CONTAS.BTN_SALVAR).click();
    cy.get(loc.MESSAGE).should("contain", "Conta inserida com sucesso!");
  });
  it("Edit an acount", () => {
    cy.get(loc.MENU.SETTING).click();
    cy.get(loc.MENU.CONTAS).click();
    cy.contains("td", "Conta para alterar") // Localiza o <td> que contém "jackCount"
      .siblings("td") // Seleciona os irmãos <td>
      .find("i.far.fa-edit") // Busca o <i> dentro do <td> irmão
      .click(); // Opcional, caso queira clicar no ícone
    cy.get(loc.CONTAS.NOME).clear().type("Conta alterada");
    cy.get(loc.CONTAS.BTN_SALVAR).click();
    cy.get(loc.MESSAGE).should("contain", "atualizada com sucesso!");
  });
  it("Should not create an acount with same name", () => {
    cy.get(loc.MENU.SETTING).click();
    cy.get(loc.MENU.CONTAS).click();
    cy.get(loc.CONTAS.NOME).type("Conta mesmo nome");
    cy.get(loc.CONTAS.BTN_SALVAR).click();
    cy.get(loc.MESSAGE).should("contain", "code 400");
  });
  it("Create a new transaction", () => {
    cy.get(loc.MENU.MOVIMENTACAO).click();
    cy.get(loc.MOVIMENTACAO.DERSCRICAO).type("teste");
    cy.get(loc.MOVIMENTACAO.INTERESSADO).type("Jack");
    cy.get('[data-test="conta"]').select("Conta para movimentacoes");
    cy.get(loc.MOVIMENTACAO.VALOR).type("123");
    cy.get(loc.MOVIMENTACAO.STATUS).click();
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click();
    cy.get(loc.MESSAGE).should("contain", "Movimentação inserida com sucesso!");
    cy.get("small.d-none.d-md-block").contains("Jack").should("exist");
  });
  it.only("Get balance", () => {
    cy.get(loc.MENU.HOME).click();
    cy.get("td")
      .contains("Conta para saldo")
      .siblings("td")
      .should("contain", "534,00");
    cy.get(loc.MENU.EXTRATO).click();
    cy.get('span:contains("Movimentacao 1, calculo saldo")')
      .parents("div")
      .first()
      .find("i.fas.fa-edit")
      .click();
    cy.wait(2000);
    cy.get('[data-test="conta"]').select("Conta para saldo");
    cy.wait(3000);
    cy.get(loc.MOVIMENTACAO.STATUS).click();
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click();

    cy.get(loc.MENU.HOME).click();
    cy.get("td")
      .contains("Conta para saldo")
      .siblings("td")
      .should("contain", "4.03499999,00");
  });
  it("Remove a transaction", () => {
    cy.get(loc.MENU.EXTRATO).click();
    cy.get('span:contains("Movimentacao para exclusao")')
      .parents("div") // Sobe por todas as <div> acima
      .first() // Opcional: se houver várias, pega a primeira
      .find("i.far.fa-trash-alt")
      .click();
    cy.get(loc.MESSAGE).should("contain", "Movimentação removida com sucesso!");
  });

  after(() => {
    cy.resetApp();
  });
});
