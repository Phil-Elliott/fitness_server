import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function teardownCardioExerciseTableForTestDatabase() {
  try {
    await db.execute(sql`DELETE FROM "cardioExercises"`);
  } catch (error) {
    console.error(
      "Error tearing down cardioExercise table in test database:",
      error
    );
  }
}

export default teardownCardioExerciseTableForTestDatabase;
