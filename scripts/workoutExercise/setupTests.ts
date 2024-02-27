import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function setupWorkoutExerciseTableForTestDatabase() {
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

// export const workoutExercises = pgTable("workoutExercises", {
//   id: serial("id").primaryKey(),
//   workout_id: integer("workout_id")
//     .references(() => workouts.id, { onDelete: "cascade" })
//     .notNull(),
//   exercise_id: integer("exercise_id")
//     .references(() => exercises.id)
//     .notNull(),
//   order_index: integer("order_index"),
// });
