import { defineRelations } from "drizzle-orm";
import { date, index, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export * from "./auth-schema";

export const trip = pgTable(
  "trip",
  {
    id: serial("id").primaryKey(),
    ownerId: text("owner_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    startDate: date("start_date", { mode: "string" }).notNull(),
    endDate: date("end_date", { mode: "string" }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("trip_owner_id_idx").on(table.ownerId)],
);

export const relations = defineRelations({ trip, user }, (r) => ({
  trip: {
    owner: r.one.user({
      from: r.trip.ownerId,
      to: r.user.id,
    }),
  },
}));
