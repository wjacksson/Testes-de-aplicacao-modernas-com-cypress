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
