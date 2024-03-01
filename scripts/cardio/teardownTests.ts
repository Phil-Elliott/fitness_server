import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function teardownCardioTableForTestDatabase() {
  try {
    await db.execute(sql`DELETE FROM cardio`);
    await db.execute(sql`DELETE FROM "cardioExercises"`);
    await db.execute(sql`DELETE FROM routines`);
    await db.execute(sql`DELETE FROM users`);
  } catch (error) {
    console.error("Error tearing down cardio table in test database:", error);
  }
}

export default teardownCardioTableForTestDatabase;
