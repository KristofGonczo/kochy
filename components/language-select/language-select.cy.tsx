import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { LanguageSelect, type LanguageSelectValue } from "./language-select";
import { SidebarProvider } from "../ui/sidebar";

function LanguageSelectHarness({
  initialLocale,
  open = true,
  router,
  renderTrigger,
  setLocaleAction,
}: {
  initialLocale?: "en" | "hu";
  open?: boolean;
  router: AppRouterInstance;
  renderTrigger?: React.ReactElement;
  setLocaleAction: (locale: LanguageSelectValue) => Promise<void>;
}) {
  return (
    <AppRouterContext.Provider value={router}>
      <SidebarProvider open={open} onOpenChange={() => {}}>
        <LanguageSelect
          initialLocale={initialLocale}
          renderTrigger={renderTrigger}
          setLocaleAction={setLocaleAction}
        />
      </SidebarProvider>
    </AppRouterContext.Provider>
  );
}

function createRouter(refresh: () => void): AppRouterInstance {
  return {
    back: () => {},
    forward: () => {},
    refresh,
    push: () => {},
    replace: () => {},
    prefetch: async () => {},
    bfcacheId: "language-select-test",
  };
}

describe("LanguageSelect", () => {
  it("renders automatic locale selection by default", () => {
    const setLocaleAction = cy.stub().resolves();

    cy.mount(
      <LanguageSelectHarness
        router={createRouter(() => {})}
        setLocaleAction={setLocaleAction}
      />,
    );

    cy.get('[data-slot="select-trigger"]')
      .should("have.attr", "aria-label", "Language")
      .and("contain.text", "Auto")
      .find(".lucide-languages")
      .should("exist");
  });

  it("renders the initial locale and all supported options", () => {
    const setLocaleAction = cy.stub().resolves();

    cy.mount(
      <LanguageSelectHarness
        initialLocale="hu"
        router={createRouter(() => {})}
        setLocaleAction={setLocaleAction}
      />,
    );

    cy.get('[data-slot="select-trigger"]').should("contain.text", "Magyar").click();
    cy.get('[data-slot="select-content"]')
      .should("be.visible")
      .find('[data-slot="select-item"]')
      .should("have.length", 3)
      .and("contain.text", "Auto")
      .and("contain.text", "English")
      .and("contain.text", "Magyar");
  });

  it("hides the selected locale when the sidebar is collapsed", () => {
    const setLocaleAction = cy.stub().resolves();

    cy.mount(
      <LanguageSelectHarness
        initialLocale="en"
        open={false}
        router={createRouter(() => {})}
        setLocaleAction={setLocaleAction}
      />,
    );

    cy.get('[data-slot="select-trigger"]')
      .should("not.contain.text", "English")
      .find(".lucide-languages")
      .should("exist");
  });

  it("sets the selected locale and refreshes the router", () => {
    const refresh = cy.stub();
    const setLocaleAction = cy.stub().resolves();

    cy.mount(
      <LanguageSelectHarness
        router={createRouter(refresh)}
        setLocaleAction={setLocaleAction}
      />,
    );

    cy.get('[data-slot="select-trigger"]').click();
    cy.get('[data-slot="select-item"]').contains("Magyar").click();

    cy.wrap(setLocaleAction).should("have.been.calledOnceWith", "hu");
    cy.wrap(refresh).should("have.been.calledOnce");
    cy.get('[data-slot="select-trigger"]').should("contain.text", "Magyar");
  });

  it("supports a custom trigger", () => {
    const setLocaleAction = cy.stub().resolves();

    cy.mount(
      <LanguageSelectHarness
        router={createRouter(() => {})}
        renderTrigger={<button type="button" data-testid="custom-trigger" />}
        setLocaleAction={setLocaleAction}
      />,
    );

    cy.get('[data-testid="custom-trigger"]')
      .should("have.attr", "aria-haspopup", "listbox")
      .click();
    cy.get('[data-slot="select-item"]').contains("English").click();

    cy.get('[data-testid="custom-trigger"]').should("contain.text", "English");
  });
});
