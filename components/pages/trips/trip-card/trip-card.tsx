import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trip as tripSchema } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { getFormatter } from "next-intl/server";
import Link from "next/link";

const TripCard = async ({
  trip,
}: {
  trip: InferSelectModel<typeof tripSchema>;
}) => {
  const formatter = await getFormatter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link className="hover:underline" href={`/trips/${trip.id}`}>
            {trip.name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          <span className="text-muted-foreground">Start: </span>
          {formatter.dateTime(trip.startDate)}
        </p>
        <p>
          <span className="text-muted-foreground">End: </span>
          {formatter.dateTime(trip.endDate)}
        </p>
      </CardContent>
    </Card>
  );
};

export default TripCard;
