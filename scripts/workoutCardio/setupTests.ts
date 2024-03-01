import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function setupWorkoutCardioTableForTestDatabase() {
  try {
    await db.execute(
      sql`INSERT INTO users (id, email, display_name) VALUES ('user_12543', 'johndoe@gmail.com', 'John Doe');`
    );

    const routine = await db.execute(
      sql`INSERT INTO routines (user_id, name, notes, frequency,  start_date, end_date, created_at) VALUES ('user_12543', 'Morning Routine', 'A routine to start the day', 'daily',  date '2025-09-20', date '2025-11-12', NOW()) RETURNING *;`
    );

    const routineId = routine.rows[0].id;

    const workout = await db.execute(
      sql`INSERT INTO workouts (user_id, routine_id, name, notes, date, workout_status, created_at) VALUES ('user_12543', ${routineId}, 'Morning Workout', 'A workout to start the day', date '2024-02-26', 'incomplete', NOW()) RETURNING *`
    );

    const workoutId = workout.rows[0].id;

    const cardioExercise = await db.execute(
      sql`INSERT INTO "cardioExercises" (name, description) VALUES ('Run', 'Run fast') RETURNING *;`
    );

    const cardioExerciseId = cardioExercise.rows[0].id;

    const cardio = await db.execute(
      sql`INSERT INTO cardio (user_id, routine_id, cardio_exercise_id, duration, distance, date, notes) VALUES ('user_12543', ${routineId}, ${cardioExerciseId}, 30, 5, date '2024-02-26', 'A cardio to start the day') RETURNING *;`
    );

    const cardioId = cardio.rows[0].id;

    await db.execute(
      sql`INSERT INTO "workoutCardio" (workout_id, cardio_id, order_index) VALUES (${workoutId}, ${cardioId}, 1)`
    );
    await db.execute(
      sql`INSERT INTO "workoutCardio" (workout_id, cardio_id, order_index) VALUES (${workoutId}, ${cardioId}, 2)`
    );
    await db.execute(
      sql`INSERT INTO "workoutCardio" (workout_id, cardio_id, order_index) VALUES (${workoutId}, ${cardioId}, 3)`
    );
  } catch (error) {
    console.error(
      "Error setting up WorkoutExercise table in test database:",
      error
    );
  }
}

export default setupWorkoutCardioTableForTestDatabase;
