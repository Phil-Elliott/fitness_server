import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function setupTemplateSchedulesForTestDatabase() {
  try {
    await db.execute(
      sql`INSERT INTO users (id, email, display_name) VALUES ('user_12543', 'johndoe@gmail.com', 'John Doe');`
    );

    const routine = await db.execute(
      sql`INSERT INTO routines (user_id, name, notes, frequency,  start_date, end_date, created_at) VALUES ('user_12543', 'Morning Routine', 'A routine to start the day', 'daily',  date '2025-09-20', date '2025-11-12', NOW()) RETURNING *;`
    );

    const routineId = routine.rows[0].id;

    const templateWorkout = await db.execute(
      sql`INSERT INTO "templateWorkouts" (user_id, routine_id, name, notes, rest_between_exercises, template_workout_status, frequency, duration_type, duration) VALUES ('user_12543', ${routineId}, 'Morning Workout', 'A workout to start the day', 60, 'active', 'daily', 'days', 10) RETURNING *;`
    );
    const templateWorkoutId = templateWorkout.rows[0].id as number;

    const cardioExercise = await db.execute(
      sql`INSERT INTO "cardioExercises" (name, description) VALUES ('Run', 'Run fast') RETURNING *;`
    );

    const cardioExerciseId = cardioExercise.rows[0].id;

    const templateCardio = await db.execute(
      sql`INSERT INTO "templateCardio" (user_id, routine_id, cardio_exercise_id, notes, template_cardio_status, frequency, duration_type, duration_value) VALUES ('user_12543', ${routineId}, ${cardioExerciseId}, 'Have a good exercise and take it easy', 'active', 'biweekly', 'days', 30) RETURNING *;`
    );

    const templateCardioId = templateCardio.rows[0].id;

    await db.execute(
      sql`INSERT INTO "templateSchedules" (template_workout_id, day_of_week, start_time, end_time) VALUES (${templateWorkoutId}, 'Day1', '08:00:00', '09:00:00');`
    );
    await db.execute(
      sql`INSERT INTO "templateSchedules" (template_workout_id, day_of_week, start_time, end_time) VALUES (${templateWorkoutId}, 'Day2', '08:00:00', '09:00:00');`
    );
    await db.execute(
      sql`INSERT INTO "templateSchedules" (template_cardio_id, day_of_week, start_time, end_time) VALUES (${templateCardioId}, 'Day3', '08:00:00', '09:00:00');`
    );
  } catch (error) {
    console.error(
      "Error setting up templateSchedules table in test database:",
      error
    );
  }
}

export default setupTemplateSchedulesForTestDatabase;
