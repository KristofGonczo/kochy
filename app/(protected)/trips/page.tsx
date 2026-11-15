import NoTrips from "@/components/no-trips/no-trips";
import { caller } from "@/trpc/server";

export default async function Page() {
  const trips = await caller.trips.list();

  return (
    <section className="h-full flex items-center">
      {trips.length === 0 ? <NoTrips /> : JSON.stringify(trips)}
    </section>
  );
}
