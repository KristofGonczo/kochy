import { caller } from "@/trpc/server";
import ClientApiTest from "./client-api-test";

export default async function Home() {
  const greeting = await caller.hello({ text: "world" });

  return (
    <main>
      <div>{greeting.greeting}</div>
      <ClientApiTest />
    </main>
  );
}
