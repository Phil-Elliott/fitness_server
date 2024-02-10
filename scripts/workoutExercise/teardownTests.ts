import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function teardownWorkoutExerciseTableForTestDatabase() {
  try {
    await db.execute(sql`DELETE FROM "workoutExercises"`);
    await db.execute(sql`DELETE FROM workouts`);
    await db.execute(sql`DELETE FROM routines`);
    await db.execute(sql`DELETE FROM users`);
    await db.execute(sql`DELETE FROM exercises`);
  } catch (error) {
    console.error(
      "Error tearing down workoutExercise table in test database workoutExercise:",
      error
    );
  }
}

export default teardownWorkoutExerciseTableForTestDatabase;
