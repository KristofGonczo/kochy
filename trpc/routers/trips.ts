import { db } from "@/db/drizzle";
import { trip } from "@/db/schema";
import { desc } from "drizzle-orm";
import { InferSelectModel } from "drizzle-orm/table";
import { z } from "zod";
import { protectedProcedure } from "../init";

export const tripsRouter = {
  list: protectedProcedure.query(
    async (): Promise<InferSelectModel<typeof trip>[]> => {
      const trips = await db.select().from(trip).orderBy(desc(trip.startDate));

      return trips;
    },
  ),
  create: protectedProcedure
    .input(
      z
        .object({
          name: z.string().trim().min(1, { message: "Trips.nameRequired" }),
          from: z.iso.datetime().nonoptional({ message: "Trips.fromRequired" }),
          to: z.iso.datetime().nonoptional({ message: "Trips.toRequired" }),
        })
        .refine((input) => input.from <= input.to, {
          path: ["to"],
          message: "Trips.toBeforeFrom",
        }),
    )
    .mutation(async ({ ctx, input }) => {
      const [createdTrip] = await db
        .insert(trip)
        .values({
          ownerId: ctx.user.id,
          name: input.name,
          startDate: new Date(input.from),
          endDate: new Date(input.to),
        })
        .returning();

      return createdTrip;
    }),
};
