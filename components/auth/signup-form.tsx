"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useTranslations } from "next-intl";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export function SignupForm() {
  const router = useRouter();
  const t = useTranslations("SignUp");

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setIsSubmitting(true);

    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword"));
    if (password !== confirmPassword) {
      setError(t("passwordsDoNotMatch"));
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
        setError(result.error.message ?? t("error"));
        setIsSubmitting(false);
        return;
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : t("error"));
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
          <FieldLabel htmlFor="name">{t("displayName")}</FieldLabel>
          <Input
            required
            autoComplete="name"
            id="name"
            name="name"
            type="text"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">{t("email")}</FieldLabel>
          <Input
            required
            autoComplete="email"
            id="email"
            name="email"
            type="email"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">{t("password")}</FieldLabel>
          <Input
            required
            autoComplete="new-password"
            id="password"
            name="password"
            type="password"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="confirmPassword">
            {t("confirmPassword")}
          </FieldLabel>
          <Input
            required
            id="confirmPassword"
            name="confirmPassword"
            type="password"
          />
        </Field>
        <Field>
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? t("creatingAccount") : t("signUp")}
          </Button>
          {error && (
            <FieldDescription className="text-destructive">
              {error}
            </FieldDescription>
          )}
        </Field>
        <p className="text-center text-sm text-muted-foreground">
          {t("haveAccount")}{" "}
          <Button
            variant="link"
            className="px-0"
            onClick={() => router.push("/login")}
          >
            {t("signIn")}
          </Button>
        </p>
      </FieldGroup>
    </Form>
  );
}
