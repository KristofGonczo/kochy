"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const ClientApiTest = () => {
  const trpc = useTRPC(); // use `import { trpc } from './utils/trpc'` if you're using the singleton pattern
  const userQuery = useQuery(trpc.hello.queryOptions({ text: "id_bilbo" }));

  return <div>{userQuery.data?.greeting}</div>;
};

export default ClientApiTest;
