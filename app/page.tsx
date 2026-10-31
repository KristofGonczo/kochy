import { auth } from "@/lib/auth";
import { headers } from "next/dist/server/request/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main>
      <div>{JSON.stringify(session)}</div>
    </main>
  );
}
