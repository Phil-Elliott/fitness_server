import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function setupTemplateWorkoutExerciseTableForTestDatabase() {
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

    const exercise = await db.execute(
      sql`INSERT INTO exercises (name, description) VALUES ('Push Ups', 'A classic exercise to build upper body strength') RETURNING *`
    );
    const exerciseId = exercise.rows[0].id as number;

    await db.execute(
      sql`INSERT INTO "templateWorkoutExercises" (template_workout_id, exercise_id, order_index, sets, rest_between_sets) VALUES (${templateWorkoutId}, ${exerciseId}, 1, 3, 60);`
    );
    await db.execute(
      sql`INSERT INTO "templateWorkoutExercises" (template_workout_id, exercise_id, order_index, sets, rest_between_sets) VALUES (${templateWorkoutId}, ${exerciseId}, 2, 10, 90);`
    );
    await db.execute(
      sql`INSERT INTO "templateWorkoutExercises" (template_workout_id, exercise_id, order_index, sets, rest_between_sets) VALUES (${templateWorkoutId}, ${exerciseId}, 3, 4, 120);`
    );
  } catch (error) {
    console.error(
      "Error setting up templateWorkoutExercise table in test database:",
      error
    );
  }
}

export default setupTemplateWorkoutExerciseTableForTestDatabase;

// export const templateWorkoutExercises = pgTable("templateWorkoutExercises", {
//   id: serial("id").primaryKey(),
//   template_workout_id: integer("template_workout_id")
//     .references(() => templateWorkouts.id, { onDelete: "cascade" })
//     .notNull(),
//   exercise_id: integer("exercise_id")
//     .references(() => exercises.id)
//     .notNull(),
//   order_index: integer("order_index").notNull(),
//   sets: integer("sets").notNull(),
//   rest_between_sets: integer("rest_between_sets").notNull(),
// });
