/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
beforeEach(() => {
    cy.visit("/login");
    cy.get(`[data-cy=input-email]`).type("filipo@gmail.com");
    cy.get(`[data-cy=input-password]`).type("filipo123");
    cy.get(`[data-cy=login-button]`).click();

    cy.get(`[data-cy=new-user-link]`).click();
    cy.visit("/new-user");

});

describe("New user", () => {
    it("Should add user", () => {
        cy.get(`[data-cy=input-firstName]`).type("John");
        cy.get(`[data-cy=input-lastName]`).type("Doe");
        cy.get(`[data-cy=input-new-user-email]`).type(`john${Math.random()}.doe@test.com`);
        cy.get(`[data-cy=input-username]`).type(`jDo3`);
        cy.get(`[data-cy=input-new-user-password]`).type("jDo3!");

        cy.get(`[data-cy=create-user-button]`).click()
            .should(() => {
                expect(localStorage.getItem("token")).to.be.string;
                expect(localStorage.getItem("userId")).to.be.string;
            });
        cy.location('pathname').should('match', /\/$/);
    });
});
