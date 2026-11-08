import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { authClient } from "@/lib/auth-client";
import { createTestRouter, renderWithProviders } from "@/jest.setup";
import { SignupForm } from "@/components/auth/signup-form";

Object.defineProperty(window, "PointerEvent", {
  writable: true,
  value: class extends MouseEvent {},
});

jest.mock("@/lib/auth-client", () => ({
  authClient: {
    signUp: {
      email: jest.fn(),
    },
  },
}));

describe("SignupForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the signup fields and actions", () => {
    renderWithProviders(<SignupForm />);

    expect(screen.getByRole("textbox", { name: "Display Name" })).toHaveAttribute(
      "autocomplete",
      "name",
    );
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute(
      "autocomplete",
      "email",
    );
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "autocomplete",
      "new-password",
    );
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  it("submits signup details and navigates home", async () => {
    const user = userEvent.setup();
    const router = createTestRouter();
    (authClient.signUp.email as jest.Mock).mockResolvedValue({
      data: null,
      error: null,
    });
    renderWithProviders(<SignupForm />, router);

    await user.type(
      screen.getByRole("textbox", { name: "Display Name" }),
      "Test User",
    );
    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "user@example.com",
    );
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.type(screen.getByLabelText("Confirm Password"), "password123");
    await user.click(screen.getByRole("button", { name: "Sign up" }));

    await waitFor(() => {
      expect(authClient.signUp.email).toHaveBeenCalledWith({
        name: "Test User",
        email: "user@example.com",
        password: "password123",
        callbackURL: "/",
      });
      expect(router.push).toHaveBeenCalledWith("/");
      expect(router.refresh).toHaveBeenCalled();
    });
  });

  it("shows a validation error when passwords do not match", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SignupForm />);

    await user.type(
      screen.getByRole("textbox", { name: "Display Name" }),
      "Test User",
    );
    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "user@example.com",
    );
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.type(screen.getByLabelText("Confirm Password"), "different");
    await user.click(screen.getByRole("button", { name: "Sign up" }));

    expect(
      await screen.findByText("Passwords do not match."),
    ).toBeInTheDocument();
    expect(authClient.signUp.email).not.toHaveBeenCalled();
  });

  it("shows the authentication error and does not navigate", async () => {
    const user = userEvent.setup();
    const router = createTestRouter();
    (authClient.signUp.email as jest.Mock).mockResolvedValue({
      data: null,
      error: { message: "Email is already registered" },
    });
    renderWithProviders(<SignupForm />, router);

    await user.type(
      screen.getByRole("textbox", { name: "Display Name" }),
      "Test User",
    );
    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "user@example.com",
    );
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.type(screen.getByLabelText("Confirm Password"), "password123");
    await user.click(screen.getByRole("button", { name: "Sign up" }));

    expect(
      await screen.findByText("Email is already registered"),
    ).toBeInTheDocument();
    expect(router.push).not.toHaveBeenCalled();
  });

  it("shows the translated fallback for a non-Error rejection", async () => {
    const user = userEvent.setup();
    (authClient.signUp.email as jest.Mock).mockRejectedValue("network failure");
    renderWithProviders(<SignupForm />);

    await user.type(
      screen.getByRole("textbox", { name: "Display Name" }),
      "Test User",
    );
    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "user@example.com",
    );
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.type(screen.getByLabelText("Confirm Password"), "password123");
    await user.click(screen.getByRole("button", { name: "Sign up" }));

    expect(
      await screen.findByText("Unable to sign up. Please try again."),
    ).toBeInTheDocument();
  });

  it("navigates to login when the sign-in action is clicked", async () => {
    const user = userEvent.setup();
    const router = createTestRouter();
    renderWithProviders(<SignupForm />, router);

    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(router.push).toHaveBeenCalledWith("/login");
  });
});
