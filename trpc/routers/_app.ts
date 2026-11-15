import { createTRPCRouter } from "../init";
import { tripsRouter } from "./trips";

export const appRouter = createTRPCRouter({
  trips: tripsRouter,
});

export type AppRouter = typeof appRouter;
