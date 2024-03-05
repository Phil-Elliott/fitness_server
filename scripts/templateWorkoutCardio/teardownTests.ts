import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function teardownTemplateWorkoutCardioTableForTestDatabase() {
  try {
    await db.execute(sql`DELETE FROM "templateWorkoutCardio"`);
    await db.execute(sql`DELETE FROM "templateWorkouts"`);
    await db.execute(sql`DELETE FROM routines`);
    await db.execute(sql`DELETE FROM users`);
    await db.execute(sql`DELETE FROM "cardioExercises"`);
  } catch (error) {
    console.error(
      "Error tearing down templateWorkoutCardio table in test database:",
      error
    );
  }
}

export default teardownTemplateWorkoutCardioTableForTestDatabase;
