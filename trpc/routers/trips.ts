import { db } from "@/db/drizzle";
import { trip } from "@/db/schema";
import { desc } from "drizzle-orm";
import { InferSelectModel } from "drizzle-orm/table";
import { protectedProcedure } from "../init";

export const tripsRouter = {
  list: protectedProcedure.query(
    async (): Promise<InferSelectModel<typeof trip>[]> => {
      const trips = await db.select().from(trip).orderBy(desc(trip.startDate));

      return trips;
    },
  ),
};
