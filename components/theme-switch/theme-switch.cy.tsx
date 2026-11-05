import { ThemeSwitch } from "./theme-switch";

describe("ThemeSwitch", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("renders the system theme by default", () => {
    cy.mount(<ThemeSwitch />);

    cy.get('[data-slot="select-trigger"]')
      .should("have.attr", "aria-expanded", "false")
      .and("contain.text", "System")
      .find(".lucide-sun-moon")
      .should("exist");
  });

  it("shows all translated theme options when opened", () => {
    cy.mount(<ThemeSwitch />);

    cy.get('[data-slot="select-trigger"]').click();

    cy.get('[data-slot="select-content"]')
      .should("be.visible")
      .find('[data-slot="select-item"]')
      .should("have.length", 3)
      .and("contain.text", "Light")
      .and("contain.text", "Dark")
      .and("contain.text", "System");
  });

  it("changes the selected theme and icon", () => {
    cy.mount(<ThemeSwitch />);
    const themes = [
      { label: "Light", icon: "sun" },
      { label: "Dark", icon: "moon" },
      { label: "System", icon: "sun-moon" },
    ];

    themes.forEach(({ label, icon }) => {
      cy.get('[data-slot="select-trigger"]').click();
      cy.get('[data-slot="select-item"]').contains(label).click();

      cy.get('[data-slot="select-trigger"]')
        .should("contain.text", label)
        .find("svg")
        .should("have.class", `lucide-${icon}`);
    });
  });

  it("renders a compact trigger without the selected theme label", () => {
    cy.mount(<ThemeSwitch compact />);

    cy.get('[data-slot="select-trigger"]')
      .should("not.contain", "System")
      .find(".lucide-sun-moon")
      .should("exist");
  });

  it("supports a custom trigger", () => {
    cy.mount(
      <ThemeSwitch
        renderTrigger={<button type="button" data-testid="custom-trigger" />}
      />,
    );

    cy.get('[data-testid="custom-trigger"]')
      .should("have.attr", "aria-haspopup", "listbox")
      .click();
    cy.get('[data-slot="select-item"]').contains("Dark").click();

    cy.get('[data-testid="custom-trigger"]')
      .should("contain.text", "Dark")
      .find(".lucide-moon")
      .should("exist");
  });
});
