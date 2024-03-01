import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function teardownWorkoutTableForTestDatabase() {
  try {
    await db.execute(sql`DELETE FROM workouts`);
    await db.execute(sql`DELETE FROM routines`);
    await db.execute(sql`DELETE FROM users`);
  } catch (error) {
    console.error(
      "Error tearing down workout table in test database templateWorkout:",
      error
    );
  }
}

export default teardownWorkoutTableForTestDatabase;
