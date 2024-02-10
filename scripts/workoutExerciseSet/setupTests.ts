import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function setupWorkoutExerciseSetTableForTestDatabase() {
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

    const workoutExercise = await db.execute(
      sql`INSERT INTO "workoutExercises" (workout_id, exercise_id, order_index) VALUES (${workoutId}, ${exerciseId}, 1) RETURNING *`
    );
    const workoutExerciseId = workoutExercise.rows[0].id as number;

    await db.execute(
      sql`INSERT INTO "workoutExerciseSets" (workout_exercise_id, set_number, repetitions, weight, weight_unit, user_input, created_at) VALUES (${workoutExerciseId}, 1, 10, 100, 'lbs', '10 reps at 100 lbs', NOW())`
    );
    await db.execute(
      sql`INSERT INTO "workoutExerciseSets" (workout_exercise_id, set_number, repetitions, weight, weight_unit, user_input, created_at) VALUES (${workoutExerciseId}, 2, 7, 100, 'lbs', '10 reps at 100 lbs', NOW())`
    );
    await db.execute(
      sql`INSERT INTO "workoutExerciseSets" (workout_exercise_id, set_number, repetitions, weight, weight_unit, user_input, created_at) VALUES (${workoutExerciseId}, 3, 12, 85, 'lbs', '10 reps at 100 lbs', NOW())`
    );
  } catch (error) {
    console.error(
      "Error setting up WorkoutExercise table in test database:",
      error
    );
  }
}

export default setupWorkoutExerciseSetTableForTestDatabase;
