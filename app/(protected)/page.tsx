import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-12">
      <section className="w-full max-w-xl space-y-4 rounded-lg border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Welcome, {session?.user.name}</h1>
        <p className="text-muted-foreground">You are signed in as {session?.user.email}.</p>
      </section>
    </main>
  );
}
