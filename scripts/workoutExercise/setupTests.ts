import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function setupWorkoutExerciseTableForTestDatabase() {
  try {
    const user = await db.execute(
      sql`INSERT INTO users (clerk_user_id, email, display_name) VALUES ('843543', 'johnHowlet@gmail.com', 'John Howlet') RETURNING *`
    );
    const userId = user.rows[0].id as number;

    const routine = await db.execute(
      sql`INSERT INTO routines (user_id, name, description, created_at) VALUES (${userId}, 'New Routine', 'A new routine to start the day', NOW()) RETURNING *`
    );
    const routineId = routine.rows[0].id as number;

    const workout = await db.execute(
      sql`INSERT INTO workouts (routine_id, name, description, created_at) VALUES (${routineId}, 'Morning Workout', 'A workout to start the day', NOW()) RETURNING *`
    );
    const workoutId = workout.rows[0].id as number;

    const exercise = await db.execute(
      sql`INSERT INTO exercises (name, description) VALUES ('Push Ups', 'A classic exercise to build upper body strength') RETURNING *`
    );
    const exerciseId = exercise.rows[0].id as number;

    await db.execute(
      sql`INSERT INTO "workoutExercises" (workout_id, exercise_id, order_index) VALUES (${workoutId}, ${exerciseId}, 1);`
    );
    await db.execute(
      sql`INSERT INTO "workoutExercises" (workout_id, exercise_id, order_index) VALUES (${workoutId}, ${exerciseId}, 2);`
    );
    await db.execute(
      sql`INSERT INTO "workoutExercises" (workout_id, exercise_id, order_index) VALUES (${workoutId}, ${exerciseId}, 3);`
    );
  } catch (error) {
    console.error(
      "Error setting up WorkoutExercise table in test database:",
      error
    );
  }
}

export default setupWorkoutExerciseTableForTestDatabase;
