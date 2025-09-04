describe("Should test with API", () => {
  let token;

  before(() => {
    cy.request({
      method: "POST",
      url: "/signin",
      body: {
        email: "jack@jack.com",
        redirecionar: false,
        senha: "1234",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");
      expect(response.body.token).to.not.be.empty;

      token = response.body.token;
    });
  });
  it("Should create an account", () => {
    cy.request({
      method: "POST",
      url: "/contas",
      headers: {
        Authorization: `JWT ${token}`,
      },
      body: {
        nome: "conta qualquer",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it("Should update an acount", () => {
    let id;
    cy.request({
      method: "GET",
      url: "/contas",
      headers: {
        Authorization: `JWT ${token}`,
      },
    }).then((response) => {
      id = response.body[0].id;

      let nomeAlterada = "conta Alterada";
      cy.request({
        method: "PUT",
        url: `/contas/${id}`,
        headers: {
          Authorization: `JWT ${token}`,
        },
        body: {
          nome: nomeAlterada,
        },
      }).then((response) => {
        expect(response.status).to.be.eq(200);
        expect(response.body.nome).to.be.eq(nomeAlterada);
      });
    });
  });

  it("Should not create an account with same name", () => {
    cy.request({
      method: "POST",
      url: "/contas",
      headers: {
        Authorization: `JWT ${token}`,
      },
      body: {
        nome: "conta qualquer",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.be.eq(
        "Já existe uma conta com esse nome!"
      );
    });
  });

  it("Should insert a transaction", () => {
    let id;
    cy.request({
      method: "GET",
      url: "/contas",
      headers: {
        Authorization: `JWT ${token}`,
      },
    }).then((response) => {
      id = response.body[0].id;

      cy.request({
        method: "POST",
        url: "/transacoes",
        headers: {
          Authorization: `JWT ${token}`,
        },
        body: {
          conta_id: `${id}`,
          data_transacao: new Date().toLocaleDateString("pt-BR"),
          data_pagamento: new Date().toLocaleDateString("pt-BR"),
          descricao: "testes",
          envolvido: "jack",
          status: false,
          tipo: "REC",
          valor: "123",
        },
      }).then((response) => {
        expect(response.status).to.be.eq(201);
        expect(response.body.descricao).to.be.eq("testes");
      });
    });
  });

  it("Should get balance", () => {
    let saldo;
    let id;
    cy.request({
      method: "GET",
      url: "/saldo",
      headers: {
        Authorization: `JWT ${token}`,
      },
    }).then((response) => {
      saldo = response.body[2].saldo;
      expect(response.body[2].saldo).to.eq("534.00");
    });
    cy.request({
      method: "GET",
      url: "/transacoes",
      headers: {
        Authorization: `JWT ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.be.eq(200);
      id = response.body[2].id;
      cy.request({
        method: "PUT",
        url: `/transacoes/${id}`,
        headers: {
          Authorization: `JWT ${token}`,
        },
        body: {
          status: true,
          conta_id: response.body[2].conta_id,
          data_transacao: new Date().toLocaleDateString("pt-BR"),
          data_pagamento: new Date().toLocaleDateString("pt-BR"),
          descricao: response.body[2].descricao,
          envolvido: response.body[2].envolvido,
          valor: response.body[2].valor,
          conta_id: response.body[2].conta_id,
        },
      }).then((response) => {
        expect(response.status).to.be.eq(200);
      });
    });
    cy.request({
      method: "GET",
      url: "/saldo",
      headers: {
        Authorization: `JWT ${token}`,
      },
    }).then((response) => {
      saldo = response.body[2].saldo;
      expect(response.body[2].saldo).to.eq("4034.00");
    });
  });
  it.only("Must delete a transaction", () => {
    let id;
    cy.request({
      method: "GET",
      url: "/transacoes",
      headers: {
        Authorization: `JWT ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.be.eq(200);
      id = response.body[0].id;
      cy.log(response.body);
      cy.log(id);

      cy.request({
        method: "DELETE",
        url: `/transacoes/${id}`,
        headers: {
          Authorization: `JWT ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.be.eq(204);
      });
    });
  });

  after(() => {
    cy.request({
      method: "GET",
      url: "/reset",
      headers: {
        Authorization: `JWT ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
