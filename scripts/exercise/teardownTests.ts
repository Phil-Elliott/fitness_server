import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function teardownExerciseTableForTestDatabase() {
  try {
    await db.execute(sql`DELETE FROM exercises`);
  } catch (error) {
    console.error(
      "Error tearing down exercise table in test database exercise:",
      error
    );
  }
}

export default teardownExerciseTableForTestDatabase;
