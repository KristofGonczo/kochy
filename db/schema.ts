import { defineRelations } from "drizzle-orm";

export * from "./auth-schema";
export const relations = defineRelations({}, (r) => ({}));
