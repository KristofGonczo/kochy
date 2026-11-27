import { defineRelations, sql } from "drizzle-orm";
import {
  date,
  index,
  pgPolicy,
  pgRole,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export * from "./auth-schema";

export const appUser = pgRole("app_user", {
  createRole: false,
  createDb: false,
  inherit: true,
}).existing();

export const trip = pgTable.withRLS(
  "trip",
  {
    id: serial("id").primaryKey(),
    ownerId: text("owner_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    startDate: date("start_date", { mode: "date" }).notNull(),
    endDate: date("end_date", { mode: "date" }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("trip_owner_id_idx").on(table.ownerId),
    pgPolicy("trip_owner_isolation", {
      as: "permissive",
      for: "all",
      to: "app_user",
      using: sql`${table.ownerId} = current_setting('app.current_user_id', true)`,
      withCheck: sql`${table.ownerId} = current_setting('app.current_user_id', true)`,
    }),
  ],
);

export const relations = defineRelations({ trip, user }, (r) => ({
  trip: {
    owner: r.one.user({
      from: r.trip.ownerId,
      to: r.user.id,
    }),
  },
}));
