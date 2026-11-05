import { mount } from "cypress/react";
import { createElement } from "react";
import TestProviders from "./test-providers";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add("mount", (component, options) =>
  mount(createElement(TestProviders, {}, component), options),
);
