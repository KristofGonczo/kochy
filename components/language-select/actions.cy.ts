import { persistLocaleCookie } from "./actions";

describe("persistLocaleCookie", () => {
  it("deletes the locale cookie when automatic locale selection is used", () => {
    const cookieStore = {
      delete: cy.stub(),
      set: cy.stub(),
    };

    persistLocaleCookie(cookieStore, "auto");

    cy.wrap(cookieStore.delete).should("have.been.calledOnceWith", "locale");
    cy.wrap(cookieStore.set).should("not.have.been.called");
  });

  it("sets the locale cookie for a supported locale", () => {
    const cookieStore = {
      delete: cy.stub(),
      set: cy.stub(),
    };

    persistLocaleCookie(cookieStore, "en");

    cy.wrap(cookieStore.set).should("have.been.calledOnceWith", "locale", "en");
    cy.wrap(cookieStore.delete).should("not.have.been.called");
  });
});
