"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    try {
      setError(null);
      setIsSubmitting(true);

      const result = await authClient.signIn.email({
        email: String(formData.get("email")),
        password: String(formData.get("password")),
        rememberMe: formData.get("rememberMe") === "on",
        callbackURL: "/",
      });

      if (result.error) throw new Error(result.error.message);

      router.push("/");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to sign in. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form action={handleSubmit}>
      <FieldGroup>
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
            autoComplete="current-password"
            id="password"
            name="password"
            type="password"
          />
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="remember-me" name="rememberMe" />
          <Label htmlFor="remember-me" className="text-muted-foreground">
            Remember me
          </Label>
        </Field>
        <Field>
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
          {error && (
            <FieldDescription className="text-destructive">
              {error}
            </FieldDescription>
          )}
        </Field>
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Button
            variant="link"
            className="px-0"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </Button>
        </p>
      </FieldGroup>
    </Form>
  );
}
