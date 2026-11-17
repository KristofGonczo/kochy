import NoTrips from "@/components/pages/trips/no-trips/no-trips";
import TripCard from "@/components/pages/trips/trip-card/trip-card";
import TripsControls from "@/components/pages/trips/trips-controls/trips-controls";
import { caller } from "@/trpc/server";

export default async function Page() {
  const trips = await caller.trips.list();

  return (
    <>
      {trips.length === 0 ? (
        <section className="h-full flex items-center">
          <NoTrips />
        </section>
      ) : (
        <>
          <section>
            <TripsControls />
          </section>
          <section className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </section>
        </>
      )}
    </>
  );
}
