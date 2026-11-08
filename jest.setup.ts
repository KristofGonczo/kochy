import "@/app/globals.css";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import {
  AppRouterContext,
  type AppRouterInstance,
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { ReactElement, ReactNode } from "react";
import * as React from "react";
import messages from "./messages/en.json";

export function createTestRouter(
  overrides: Partial<AppRouterInstance> = {},
): AppRouterInstance {
  return {
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    bfcacheId: "jest-test",
    ...overrides,
  };
}

export function TestProviders({
  children,
  router = createTestRouter(),
}: {
  children?: ReactNode;
  router?: AppRouterInstance;
}) {
  // eslint-disable-next-line react/no-children-prop
  return React.createElement(NextIntlClientProvider, {
    locale: "en",
    messages,
    children: React.createElement(
      AppRouterContext.Provider,
      { value: router },
      children,
    ),
  });
}

export function renderWithProviders(
  ui: ReactElement,
  router?: AppRouterInstance,
) {
  return render(ui, {
    wrapper: ({ children }: { children: ReactNode }) =>
      React.createElement(TestProviders, { router }, children),
  });
}

jest.mock("next-themes", () => {
  const React = jest.requireActual<typeof import("react")>("react");
  const ThemeContext = React.createContext<{
    setTheme: (theme: string) => void;
    theme?: string;
  } | null>(null);

  function ThemeProvider({
    children,
    defaultTheme = "light",
  }: {
    children: React.ReactNode;
    defaultTheme?: string;
  }) {
    const [theme, setThemeState] = React.useState(() => {
      return window.localStorage.getItem("theme") ?? defaultTheme;
    });

    const setTheme = (nextTheme: string) => {
      setThemeState(nextTheme);
      window.localStorage.setItem("theme", nextTheme);
    };

    return React.createElement(
      ThemeContext.Provider,
      { value: { setTheme, theme } },
      children,
    );
  }

  function useTheme() {
    const context = React.useContext(ThemeContext);
    const [theme, setThemeState] = React.useState(
      () => window.localStorage.getItem("theme") ?? "system",
    );

    if (context) {
      return context;
    }

    return {
      theme,
      setTheme: (nextTheme: string) => {
        setThemeState(nextTheme);
        window.localStorage.setItem("theme", nextTheme);
      },
    };
  }

  return { ThemeProvider, useTheme };
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
