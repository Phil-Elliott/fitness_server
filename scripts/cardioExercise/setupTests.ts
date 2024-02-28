import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function setupCardioExerciseTableForTestDatabase() {
  try {
    await db.execute(
      sql`INSERT INTO "cardioExercises" (name, description) VALUES ('Run', 'Run fast');`
    );
    await db.execute(
      sql`INSERT INTO "cardioExercises" (name, description) VALUES ('Bike', 'Bike fast');`
    );
    await db.execute(
      sql`INSERT INTO "cardioExercises" (name, description) VALUES ('Swim', 'Swim fast');`
    );
  } catch (error) {
    console.error(
      "Error setting up cardioExercise table in test database:",
      error
    );
  }
}

export default setupCardioExerciseTableForTestDatabase;
