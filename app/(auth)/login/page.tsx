import { LoginForm } from "@/components/auth/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <Card className="max-w-md w-full h-max m-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">
          Welcome back
        </CardTitle>
        <CardDescription>Sign in to continue to Kochy.</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
