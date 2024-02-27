import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function setupWorkoutExerciseSetTableForTestDatabase() {
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

    const workoutExercise = await db.execute(
      sql`INSERT INTO "workoutExercises" (workout_id, exercise_id, order_index) VALUES (${workoutId}, ${exerciseId}, 1) returning *`
    );
    const workoutExerciseId = workoutExercise.rows[0].id as number;

    await db.execute(
      sql`INSERT INTO "workoutExerciseSets" (workout_exercise_id, set_number, repetitions, weight, weight_unit, notes, created_at) VALUES (${workoutExerciseId}, 1, 10, 100, 'lbs', '10 reps at 100 lbs', NOW())`
    );
    await db.execute(
      sql`INSERT INTO "workoutExerciseSets" (workout_exercise_id, set_number, repetitions, weight, weight_unit, notes, created_at) VALUES (${workoutExerciseId}, 2, 7, 100, 'lbs', '10 reps at 100 lbs', NOW())`
    );
    await db.execute(
      sql`INSERT INTO "workoutExerciseSets" (workout_exercise_id, set_number, repetitions, weight, weight_unit, notes, created_at) VALUES (${workoutExerciseId}, 3, 12, 85, 'lbs', '10 reps at 100 lbs', NOW())`
    );
  } catch (error) {
    console.error(
      "Error setting up WorkoutExerciseSet table in test database:",
      error
    );
  }
}

export default setupWorkoutExerciseSetTableForTestDatabase;

/*

export const weightUnitEnum = pgEnum("weight_unit", ["lbs", "kg"]);

export const workoutExerciseSets = pgTable("workoutExerciseSets", {
  id: serial("id").primaryKey(),
  workout_exercise_id: integer("workout_exercise_id")
    .references(() => workoutExercises.id, { onDelete: "cascade" })
    .notNull(),
  set_number: integer("set_number"),
  repetitions: integer("repetitions"),
  weight: integer("weight"),
  weight_unit: weightUnitEnum("weight_unit"),
  notes: text("notes"),
  created_at: timestamp("created_at").defaultNow(),
});



*/
