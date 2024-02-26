import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function setupRoutineTableForTestDatabase() {
  try {
    await db.execute(
      sql`INSERT INTO users (id, email, display_name) VALUES ('user_12543', 'johndoe@gmail.com', 'John Doe');`
    );

    await db.execute(
      sql`INSERT INTO routines (user_id, name, notes, frequency,  start_date, end_date, created_at) VALUES ('user_12543', 'Morning Routine', 'A routine to start the day', 'daily',  date '2025-09-20', date '2025-11-12', NOW());`
    );
    await db.execute(
      sql`INSERT INTO routines (user_id, name, notes, frequency,  start_date, end_date, created_at) VALUES ('user_12543', 'Afternoon Routine', 'A routine for the middle of the day', 'daily', date '2026-02-08', date '2026-04-18', NOW());`
    );
    await db.execute(
      sql`INSERT INTO routines (user_id, name, notes, frequency,  start_date, end_date, created_at) VALUES ('user_12543', 'Evening Routine', 'A routine to end the day', 'daily',  date '2024-03-02', date '2024-05-03', NOW());`
    );
  } catch (error) {
    console.error("Error setting up Routine table in test database:", error);
  }
}

export default setupRoutineTableForTestDatabase;
