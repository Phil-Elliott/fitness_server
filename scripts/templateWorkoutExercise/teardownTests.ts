import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function teardownTemplateWorkoutExerciseTableForTestDatabase() {
  try {
    await db.execute(sql`DELETE FROM "templateWorkoutExercises"`);
    await db.execute(sql`DELETE FROM "templateWorkouts"`);
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

export default teardownTemplateWorkoutExerciseTableForTestDatabase;
