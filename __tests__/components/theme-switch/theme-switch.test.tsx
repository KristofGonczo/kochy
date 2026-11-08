import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/test-utils";
import { ThemeSwitch } from "@/components/theme-switch/theme-switch";

describe("ThemeSwitch", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders the system theme by default", () => {
    renderWithProviders(<ThemeSwitch />);

    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveTextContent("System");
    expect(trigger.querySelector(".lucide-sun-moon")).toBeInTheDocument();
  });

  it("shows all translated theme options when opened", () => {
    renderWithProviders(<ThemeSwitch />);

    fireEvent.keyDown(screen.getByRole("combobox"), { key: "ArrowDown" });

    const listbox = screen.getByRole("listbox");
    expect(screen.getAllByRole("option")).toHaveLength(3);
    expect(listbox).toHaveTextContent("Light");
    expect(listbox).toHaveTextContent("Dark");
    expect(listbox).toHaveTextContent("System");
  });

  it("changes the selected theme and icon", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ThemeSwitch />);

    const themes = [
      { label: "Light", icon: "sun" },
      { label: "Dark", icon: "moon" },
      { label: "System", icon: "sun-moon" },
    ];

    for (const { label, icon } of themes) {
      fireEvent.keyDown(screen.getByRole("combobox"), { key: "ArrowDown" });
      await user.click(screen.getByRole("option", { name: label }));

      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveTextContent(label);
      expect(trigger.querySelector(`.lucide-${icon}`)).toBeInTheDocument();
    }
  });

  it("renders a compact trigger without the selected theme label", () => {
    renderWithProviders(<ThemeSwitch compact />);

    const trigger = screen.getByRole("combobox");
    expect(trigger).not.toHaveTextContent("System");
    expect(trigger.querySelector(".lucide-sun-moon")).toBeInTheDocument();
  });

  it("supports a custom trigger", async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <ThemeSwitch
        renderTrigger={<button type="button" data-testid="custom-trigger" />}
      />,
    );

    const trigger = screen.getByTestId("custom-trigger");
    expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    await user.click(screen.getByRole("option", { name: "Dark" }));

    expect(trigger).toHaveTextContent("Dark");
    expect(trigger.querySelector(".lucide-moon")).toBeInTheDocument();
  });
});
