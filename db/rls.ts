import { sql } from "drizzle-orm";
import { rlsDb } from "./drizzle"; // configured with DATABASE_APP_USER_URL (app_user role)

export type RLSTransaction = Parameters<
  Parameters<typeof rlsDb.transaction>[0]
>[0];

export async function withUserRLS<T>(
  userId: string | undefined,
  fn: (tx: RLSTransaction) => Promise<T>,
): Promise<T> {
  if (!userId) {
    throw new Error("Unauthorized: missing userId for RLS context");
  }

  return rlsDb.transaction(async (tx) => {
    await tx.execute(
      sql`SELECT set_config('app.current_user_id', ${userId}, true)`,
    );
    return fn(tx);
  });
}
