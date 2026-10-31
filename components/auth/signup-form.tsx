"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setIsSubmitting(true);

    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword"));
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await authClient.signUp.email({
        name: String(formData.get("name")),
        email: String(formData.get("email")),
        password,
        callbackURL: "/",
      });

      if (result.error) {
        setError(
          result.error.message ??
            "Unable to create your account. Please try again.",
        );
        setIsSubmitting(false);
        return;
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to create your account. Please try again.",
      );
      setIsSubmitting(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <Form action={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Display name</FieldLabel>
          <Input
            required
            autoComplete="name"
            id="name"
            name="name"
            type="text"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            required
            autoComplete="email"
            id="email"
            name="email"
            type="email"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            required
            autoComplete="new-password"
            id="password"
            name="password"
            type="password"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
          <Input
            required
            id="confirmPassword"
            name="confirmPassword"
            type="password"
          />
        </Field>
        <Field>
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Creating account..." : "Sign up"}
          </Button>
          {error && (
            <FieldDescription className="text-destructive">
              {error}
            </FieldDescription>
          )}
        </Field>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button
            variant="link"
            className="px-0"
            onClick={() => router.push("/login")}
          >
            Sign in
          </Button>
        </p>
      </FieldGroup>
    </Form>
  );
}
