import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function setupExerciseTableForTestDatabase() {
  try {
    await db.execute(
      sql`INSERT INTO exercises (name, description) VALUES ('Bench Press', 'Lift the barbell from your chest to full extension');`
    );
    await db.execute(
      sql`INSERT INTO exercises (name, description) VALUES ('Squat', 'Lower your body until your thighs are parallel to the ground');`
    );
    await db.execute(
      sql`INSERT INTO exercises (name, description) VALUES ('Deadlift', 'Lift the barbell from the ground to full extension');`
    );
  } catch (error) {
    console.error("Error setting up exercise table in test database:", error);
  }
}

export default setupExerciseTableForTestDatabase;
