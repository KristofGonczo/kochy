import { SignupForm } from "@/components/auth/signup-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTranslations } from "next-intl/server";

export default async function SignupPage() {
  const t = await getTranslations("SignUp");

  return (
    <Card className="max-w-md w-full h-max m-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">
          {t("title")}
        </CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
    </Card>
  );
}
