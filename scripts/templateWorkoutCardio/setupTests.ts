import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function setupTemplateWorkoutCardioTableForTestDatabase() {
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

    await db.execute(
      sql`INSERT INTO "templateWorkoutCardio" (template_workout_id, cardio_exercise_id, duration, distance, order_index) VALUES (${templateWorkoutId}, ${cardioExerciseId}, 30, 10, 1)`
    );
    await db.execute(
      sql`INSERT INTO "templateWorkoutCardio" (template_workout_id, cardio_exercise_id, duration, distance, order_index) VALUES (${templateWorkoutId}, ${cardioExerciseId}, 20, 8, 2)`
    );
    await db.execute(
      sql`INSERT INTO "templateWorkoutCardio" (template_workout_id, cardio_exercise_id, duration, distance, order_index) VALUES (${templateWorkoutId}, ${cardioExerciseId}, 35, 7, 3)`
    );
  } catch (error) {
    console.error(
      "Error setting up WorkoutExercise table in test database:",
      error
    );
  }
}

export default setupTemplateWorkoutCardioTableForTestDatabase;

// export const templateWorkoutCardio = pgTable("templateWorkoutCardio", {
//   id: serial("id").primaryKey(),
//   template_workout_id: integer("template_workout_id").references(
//     () => templateWorkouts.id,
//     { onDelete: "cascade" }
//   ),
//   cardio_exercise_id: integer("cardio_exercise_id").references(
//     () => cardioExercises.id
//   ),
//   duration: integer("duration"),
//   distance: integer("distance"),
//   order_index: integer("order_index").notNull(),
// });
