import "@/app/globals.css";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import {
  AppRouterContext,
  type AppRouterInstance,
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { ReactElement, ReactNode } from "react";
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
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextIntlClientProvider locale="en" messages={messages}>
        <AppRouterContext.Provider value={router}>
          {children}
        </AppRouterContext.Provider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}

export function renderWithProviders(
  ui: ReactElement,
  router?: AppRouterInstance,
) {
  return render(ui, {
    wrapper: ({ children }: { children: ReactNode }) => (
      <TestProviders router={router}>{children}</TestProviders>
    ),
  });
}
