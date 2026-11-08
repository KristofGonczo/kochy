import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { authClient } from "@/lib/auth-client";
import { createTestRouter, renderWithProviders } from "@/jest.setup";
import { LoginForm } from "@/components/auth/login-form";

Object.defineProperty(window, "PointerEvent", {
  writable: true,
  value: class extends MouseEvent {},
});

jest.mock("@/lib/auth-client", () => ({
  authClient: {
    signIn: {
      email: jest.fn(),
    },
  },
}));

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login fields and actions", () => {
    renderWithProviders(<LoginForm />);

    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute(
      "autocomplete",
      "email",
    );
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "autocomplete",
      "current-password",
    );
    expect(
      screen.getByRole("checkbox", { name: "Remember me" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
  });

  it.each([
    { rememberMe: false, clickRememberMe: false },
    { rememberMe: true, clickRememberMe: true },
  ])(
    "submits credentials with rememberMe=$rememberMe",
    async ({ rememberMe, clickRememberMe }) => {
      const user = userEvent.setup();
      const router = createTestRouter();
      (authClient.signIn.email as jest.Mock).mockResolvedValue({
        data: null,
        error: null,
      });
      renderWithProviders(<LoginForm />, router);

      await user.type(
        screen.getByRole("textbox", { name: "Email" }),
        "user@example.com",
      );
      await user.type(screen.getByLabelText("Password"), "password123");
      if (clickRememberMe) {
        await user.click(screen.getByRole("checkbox", { name: "Remember me" }));
      }
      await user.click(screen.getByRole("button", { name: "Sign in" }));

      await waitFor(() => {
        expect(authClient.signIn.email).toHaveBeenCalledWith({
          email: "user@example.com",
          password: "password123",
          rememberMe,
          callbackURL: "/",
        });
        expect(router.push).toHaveBeenCalledWith("/");
      });
    },
  );

  it("shows the authentication error and does not navigate", async () => {
    const user = userEvent.setup();
    const router = createTestRouter();
    (authClient.signIn.email as jest.Mock).mockResolvedValue({
      data: null,
      error: { message: "Invalid credentials" },
    });
    renderWithProviders(<LoginForm />, router);

    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "user@example.com",
    );
    await user.type(screen.getByLabelText("Password"), "wrong-password");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
    expect(router.push).not.toHaveBeenCalled();
  });

  it("shows the translated fallback for a non-Error rejection", async () => {
    const user = userEvent.setup();
    (authClient.signIn.email as jest.Mock).mockRejectedValue("network failure");
    renderWithProviders(<LoginForm />);

    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "user@example.com",
    );
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(
      await screen.findByText("Unable to sign in. Please try again."),
    ).toBeInTheDocument();
  });

  it("navigates to signup when the signup action is clicked", async () => {
    const user = userEvent.setup();
    const router = createTestRouter();
    renderWithProviders(<LoginForm />, router);

    await user.click(screen.getByRole("button", { name: "Sign up" }));

    expect(router.push).toHaveBeenCalledWith("/signup");
  });
});
