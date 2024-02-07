import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function teardownRoutineTableForTestDatabase() {
  try {
    await db.execute(sql`DELETE FROM routines`);
    await db.execute(sql`DELETE FROM users`);
  } catch (error) {
    console.error(
      "Error tearing down routine table in test database routine:",
      error
    );
  }
}

export default teardownRoutineTableForTestDatabase;
