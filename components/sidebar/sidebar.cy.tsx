import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import Sidebar from "./sidebar";

function SidebarHarness({ initialOpen = true }: { initialOpen?: boolean }) {
  const [open, setOpen] = useState(initialOpen);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <Sidebar initialLocale="en" />
    </SidebarProvider>
  );
}

describe("Sidebar", () => {
  beforeEach(() => {
    cy.viewport(1280, 800);
  });

  it("renders the sidebar regions", () => {
    cy.mount(<SidebarHarness />);

    cy.get('[data-slot="sidebar-header"]').should("exist");
    cy.get('[data-slot="sidebar-content"]').should("exist");
    cy.get('[data-slot="sidebar-footer"]').should("exist");
  });

  it("opens the user menu and shows the logout action", () => {
    cy.mount(<SidebarHarness />);

    cy.get('[data-slot="sidebar-header"] [data-slot="avatar"]').should(
      "exist",
    );
    cy.get('[data-slot="sidebar-header"] [data-slot="dropdown-menu-trigger"]')
      .click()
      .get('[data-slot="dropdown-menu-item"]')
      .should("contain.text", "Log out")
      .find(".lucide-log-out")
      .should("exist");
  });

  it("signs the user out when logout is clicked", () => {
    cy.intercept("POST", "**/api/auth/sign-out", {
      statusCode: 200,
      body: {},
    }).as("signOut");

    cy.mount(<SidebarHarness />);
    cy.get('[data-slot="sidebar-header"] [data-slot="dropdown-menu-trigger"]')
      .click();
    cy.get('[data-slot="dropdown-menu-item"]').click();

    cy.wait("@signOut")
      .its("request.method")
      .should("equal", "POST");
  });

  it("renders expanded child controls", () => {
    cy.mount(<SidebarHarness />);

    cy.get('[data-slot="sidebar-footer"] [data-slot="select-trigger"]')
      .should("have.length", 2)
      .first()
      .should("contain.text", "English");
    cy.get('[data-slot="sidebar-footer"] [data-slot="select-trigger"]')
      .last()
      .should("contain.text", "System");
  });

  it("renders collapsed child controls", () => {
    cy.mount(<SidebarHarness initialOpen={false} />);

    cy.get('[data-slot="sidebar-footer"] [data-slot="select-trigger"]')
      .should("have.length", 2)
      .each(($trigger) => {
        cy.wrap($trigger).should("not.contain.text", "English");
        cy.wrap($trigger).should("not.contain.text", "System");
      });
  });
});
