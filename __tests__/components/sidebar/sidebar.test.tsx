import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createTestRouter, renderWithProviders } from "@/jest.setup";
import { authClient } from "@/lib/auth-client";
import Sidebar from "@/components/sidebar/sidebar";

jest.mock("@/lib/auth-client", () => ({
  authClient: {
    useSession: jest.fn(() => ({
      data: { user: { name: "Test User" } },
    })),
    signOut: jest.fn(() => Promise.resolve()),
  },
}));

function SidebarHarness({ initialOpen = true }: { initialOpen?: boolean }) {
  return (
    <SidebarProvider
      open={initialOpen}
      onOpenChange={jest.fn()}
    >
      <Sidebar initialLocale="en" />
    </SidebarProvider>
  );
}

describe("Sidebar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the sidebar regions", () => {
    renderWithProviders(<SidebarHarness />);

    expect(document.querySelector('[data-slot="sidebar-header"]')).toBeInTheDocument();
    expect(document.querySelector('[data-slot="sidebar-content"]')).toBeInTheDocument();
    expect(document.querySelector('[data-slot="sidebar-footer"]')).toBeInTheDocument();
  });

  it("opens the user menu and shows the logout action", () => {
    renderWithProviders(<SidebarHarness />);

    const header = document.querySelector<HTMLElement>(
      '[data-slot="sidebar-header"]',
    );
    expect(header).toBeInTheDocument();
    expect(header?.querySelector('[data-slot="avatar"]')).toBeInTheDocument();
    expect(header).not.toBeNull();
    fireEvent.click(within(header as HTMLElement).getByRole("button"));

    expect(screen.getByRole("menuitem", { name: /log out/i })).toHaveTextContent(
      "Log out",
    );
    expect(
      screen.getByRole("menuitem", { name: /log out/i }).querySelector(
        ".lucide-log-out",
      ),
    ).toBeInTheDocument();
  });

  it("signs the user out when logout is clicked", async () => {
    const router = createTestRouter();
    renderWithProviders(<SidebarHarness />, router);
    const header = document.querySelector<HTMLElement>(
      '[data-slot="sidebar-header"]',
    );
    expect(header).not.toBeNull();
    fireEvent.click(within(header as HTMLElement).getByRole("button"));
    fireEvent.click(screen.getByRole("menuitem", { name: /log out/i }));

    await waitFor(() => {
      expect(authClient.signOut).toHaveBeenCalledTimes(1);
      expect(router.push).toHaveBeenCalledWith("/login");
    });
  });

  it("renders expanded child controls", () => {
    renderWithProviders(<SidebarHarness />);

    const footer = document.querySelector<HTMLElement>(
      '[data-slot="sidebar-footer"]',
    );
    expect(footer).not.toBeNull();
    expect(
      within(footer as HTMLElement).getByRole("button", { name: "Language" }),
    ).toHaveTextContent("English");
    expect(
      within(footer as HTMLElement).getByRole("button", { name: "Theme" }),
    ).toHaveTextContent("System");
  });

  it("renders collapsed child controls", () => {
    renderWithProviders(<SidebarHarness initialOpen={false} />);

    const footer = document.querySelector<HTMLElement>(
      '[data-slot="sidebar-footer"]',
    );
    expect(footer).not.toBeNull();
    expect(
      within(footer as HTMLElement).getByRole("button", { name: "Language" }),
    ).toHaveTextContent("English");
    expect(
      within(footer as HTMLElement).getByRole("button", { name: "Theme" }),
    ).toHaveTextContent("System");
  });
});
