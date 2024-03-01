import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function teardownWorkoutCardioTableForTestDatabase() {
  try {
    await db.execute(sql`DELETE FROM "workoutCardio"`);
    await db.execute(sql`DELETE FROM workouts`);
    await db.execute(sql`DELETE FROM routines`);
    await db.execute(sql`DELETE FROM users`);
    await db.execute(sql`DELETE FROM cardioExercises`);
  } catch (error) {
    console.error(
      "Error tearing down workoutCardio table in test database:",
      error
    );
  }
}

export default teardownWorkoutCardioTableForTestDatabase;
