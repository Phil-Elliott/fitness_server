import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function setupTemplateCardioTableForTestDatabase() {
  try {
    await db.execute(
      sql`INSERT INTO users (id, email, display_name) VALUES ('user_12543', 'johndoe@gmail.com', 'John Doe');`
    );

    const routine = await db.execute(
      sql`INSERT INTO routines (user_id, name, notes, frequency,  start_date, end_date, created_at) VALUES ('user_12543', 'Morning Routine', 'A routine to start the day', 'daily',  date '2025-09-20', date '2025-11-12', NOW()) RETURNING *;`
    );

    const routineId = routine.rows[0].id;

    const cardioExercise = await db.execute(
      sql`INSERT INTO "cardioExercises" (name, description) VALUES ('Run', 'Run fast') RETURNING *;`
    );

    const cardioExerciseId = cardioExercise.rows[0].id;

    await db.execute(
      sql`INSERT INTO "templateCardio" (user_id, routine_id, cardio_exercise_id, notes, template_cardio_status, frequency, duration_type, duration_value) VALUES ('user_12543', ${routineId}, ${cardioExerciseId}, 'Have a good exercise and take it easy', 'active', 'biweekly', 'days', 30);`
    );
    await db.execute(
      sql`INSERT INTO "templateCardio" (user_id, routine_id, cardio_exercise_id, notes, template_cardio_status, frequency, duration_type, duration_value) VALUES ('user_12543', ${routineId}, ${cardioExerciseId}, 'A cardio to break up the day', 'inactive', 'weekly', 'weeks', 2);`
    );
    await db.execute(
      sql`INSERT INTO "templateCardio" (user_id, routine_id, cardio_exercise_id, notes, template_cardio_status, frequency, duration_type, duration_value) VALUES ('user_12543', ${routineId}, ${cardioExerciseId}, 'A cardio to end the day', 'active', 'monthly', 'months', 1);`
    );
  } catch (error) {
    console.error(
      "Error setting up templateCardio table in test database:",
      error
    );
  }
}

export default setupTemplateCardioTableForTestDatabase;
