import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { ReactElement } from "react";
import { renderWithProviders, createTestRouter } from "@/test-utils";
import { SidebarProvider } from "../ui/sidebar";
import { LanguageSelect, type LanguageSelectValue } from "./language-select";

function LanguageSelectHarness({
  initialLocale,
  open = true,
  router,
  renderTrigger,
  setLocaleAction,
}: {
  initialLocale?: "en" | "hu";
  open?: boolean;
  router: ReturnType<typeof createTestRouter>;
  renderTrigger?: ReactElement;
  setLocaleAction: (locale: LanguageSelectValue) => Promise<void>;
}) {
  return (
    <AppRouterContext.Provider value={router}>
      <SidebarProvider open={open} onOpenChange={jest.fn()}>
        <LanguageSelect
          initialLocale={initialLocale}
          renderTrigger={renderTrigger}
          setLocaleAction={setLocaleAction}
        />
      </SidebarProvider>
    </AppRouterContext.Provider>
  );
}

describe("LanguageSelect", () => {
  it("renders automatic locale selection by default", () => {
    renderWithProviders(
      <LanguageSelectHarness
        router={createTestRouter()}
        setLocaleAction={jest.fn().mockResolvedValue(undefined)}
      />,
    );

    const trigger = screen.getByRole("combobox", { name: "Language" });
    expect(trigger).toHaveTextContent("Auto");
    expect(trigger.querySelector(".lucide-languages")).toBeInTheDocument();
  });

  it("renders the initial locale and all supported options", () => {
    renderWithProviders(
      <LanguageSelectHarness
        initialLocale="hu"
        router={createTestRouter()}
        setLocaleAction={jest.fn().mockResolvedValue(undefined)}
      />,
    );

    const trigger = screen.getByRole("combobox", { name: "Language" });
    expect(trigger).toHaveTextContent("Magyar");
    fireEvent.keyDown(trigger, { key: "ArrowDown" });

    const listbox = screen.getByRole("listbox");
    expect(within(listbox).getAllByRole("option")).toHaveLength(3);
    expect(listbox).toHaveTextContent("Auto");
    expect(listbox).toHaveTextContent("English");
    expect(listbox).toHaveTextContent("Magyar");
  });

  it("hides the selected locale when the sidebar is collapsed", () => {
    renderWithProviders(
      <LanguageSelectHarness
        initialLocale="en"
        open={false}
        router={createTestRouter()}
        setLocaleAction={jest.fn().mockResolvedValue(undefined)}
      />,
    );

    const trigger = screen.getByRole("combobox", { name: "Language" });
    expect(trigger).not.toHaveTextContent("English");
    expect(trigger.querySelector(".lucide-languages")).toBeInTheDocument();
  });

  it("sets the selected locale and refreshes the router", async () => {
    const user = userEvent.setup();
    const router = createTestRouter();
    const setLocaleAction = jest.fn().mockResolvedValue(undefined);
    renderWithProviders(
      <LanguageSelectHarness
        router={router}
        setLocaleAction={setLocaleAction}
      />,
    );

    fireEvent.keyDown(screen.getByRole("combobox", { name: "Language" }), {
      key: "ArrowDown",
    });
    await user.click(screen.getByRole("option", { name: "Magyar" }));

    await waitFor(() => {
      expect(setLocaleAction).toHaveBeenCalledWith("hu");
      expect(router.refresh).toHaveBeenCalledTimes(1);
    });
    expect(screen.getByRole("combobox", { name: "Language" })).toHaveTextContent(
      "Magyar",
    );
  });

  it("supports a custom trigger", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <LanguageSelectHarness
        router={createTestRouter()}
        renderTrigger={<button type="button" data-testid="custom-trigger" />}
        setLocaleAction={jest.fn().mockResolvedValue(undefined)}
      />,
    );

    const trigger = screen.getByTestId("custom-trigger");
    expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    await user.click(screen.getByRole("option", { name: "English" }));

    await waitFor(() => expect(trigger).toHaveTextContent("English"));
  });
});
