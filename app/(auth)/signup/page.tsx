import { SignupForm } from "@/components/auth/signup-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignupPage() {
  return (
    <Card className="max-w-md w-full h-max m-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">
          Create an account
        </CardTitle>
        <CardDescription>Sign up to get started with Kochy.</CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
    </Card>
  );
}
