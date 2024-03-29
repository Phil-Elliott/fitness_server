import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function setupWorkoutTableForTestDatabase() {
  try {
    await db.execute(
      sql`INSERT INTO users (id, email, display_name) VALUES ('user_12543', 'johndoe@gmail.com', 'John Doe');`
    );

    const routine = await db.execute(
      sql`INSERT INTO routines (user_id, name, notes, frequency,  start_date, end_date, created_at) VALUES ('user_12543', 'Morning Routine', 'A routine to start the day', 'daily',  date '2025-09-20', date '2025-11-12', NOW()) RETURNING *;`
    );

    const routineId = routine.rows[0].id;

    await db.execute(
      sql`INSERT INTO workouts (user_id, routine_id, name, notes, date, workout_status, created_at) VALUES ('user_12543', ${routineId}, 'Morning Workout', 'A workout to start the day', date '2024-02-26', 'incomplete', NOW());`
    );
    await db.execute(
      sql`INSERT INTO workouts (user_id, routine_id, name, notes, date, workout_status, created_at) VALUES ('user_12543', ${routineId}, 'Evening Workout', 'A workout to end the day', date '2024-02-29', 'not_started', NOW());`
    );
    await db.execute(
      sql`INSERT INTO workouts (user_id, routine_id, name, notes, date, workout_status, created_at) VALUES ('user_12543', ${routineId}, 'Afternoon Workout', 'A workout to break up the day', date '2024-01-18', 'finished', NOW());`
    );
  } catch (error) {
    console.error(
      "Error setting up template workout table in test database:",
      error
    );
  }
}

export default setupWorkoutTableForTestDatabase;
