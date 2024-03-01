import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function teardownTemplateWorkoutTableForTestDatabase() {
  try {
    await db.execute(sql`DELETE FROM templateWorkouts`);
    await db.execute(sql`DELETE FROM routines`);
    await db.execute(sql`DELETE FROM users`);
  } catch (error) {
    console.error(
      "Error tearing down workout table in test database workout:",
      error
    );
  }
}

export default teardownTemplateWorkoutTableForTestDatabase;
