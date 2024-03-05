import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function teardownTemplateSchedulesTableForTestDatabase() {
  try {
    await db.execute(sql`DELETE FROM "templateWorkouts"`);
    await db.execute(sql`DELETE FROM "templateCardio"`);
    await db.execute(sql`DELETE FROM routines`);
    await db.execute(sql`DELETE FROM users`);
    await db.execute(sql`DELETE FROM "templateSchedules"`);
    await db.execute(sql`DELETE FROM exercises`);
    await db.execute(sql`DELETE FROM "cardioExercises"`);
  } catch (error) {
    console.error(
      "Error tearing down TemplateSchedules table in test database:",
      error
    );
  }
}

export default teardownTemplateSchedulesTableForTestDatabase;
