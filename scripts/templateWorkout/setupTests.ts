import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function setupTemplateWorkoutTableForTestDatabase() {
  try {
    await db.execute(
      sql`INSERT INTO users (id, email, display_name) VALUES ('user_12543', 'johndoe@gmail.com', 'John Doe');`
    );

    const routine = await db.execute(
      sql`INSERT INTO routines (user_id, name, notes, frequency,  start_date, end_date, created_at) VALUES ('user_12543', 'Morning Routine', 'A routine to start the day', 'daily',  date '2025-09-20', date '2025-11-12', NOW()) RETURNING *;`
    );

    const routineId = routine.rows[0].id;

    await db.execute(
      sql`INSERT INTO "templateWorkouts" (user_id, routine_id, name, notes, rest_between_exercises, template_workout_status, frequency, duration_type, duration_value) VALUES ('user_12543', ${routineId}, 'Morning Workout', 'A workout to start the day', 60, 'active', 'daily', 'days', 10);`
    );
    await db.execute(
      sql`INSERT INTO "templateWorkouts" (user_id, routine_id, name, notes, rest_between_exercises, template_workout_status, frequency, duration_type, duration_value) VALUES ('user_12543', ${routineId}, 'Evening Workout', 'A workout to end the day', 90, 'inactive', 'monthly', 'weeks', 2);`
    );
    await db.execute(
      sql`INSERT INTO "templateWorkouts" (user_id, routine_id, name, notes, rest_between_exercises, template_workout_status, frequency, duration_type, duration_value) VALUES ('user_12543', ${routineId}, 'Afternoon Workout', 'A workout to break up the day', 120, 'active', 'weekly', 'months', 4);`
    );
  } catch (error) {
    console.error("Error setting up Workout table in test database:", error);
  }
}

export default setupTemplateWorkoutTableForTestDatabase;

// export const statusEnum = pgEnum("workout_status", [
//   "not_started",
//   "incomplete",
//   "finished",
// ]);

// export const workouts = pgTable("workouts", {
//   id: serial("id").primaryKey(),
//   user_id: varchar("user_id", { length: 256 })
//     .references(() => users.id, { onDelete: "cascade" })
//     .notNull(),
//   routine_id: integer("routine_id").references(() => routines.id, {
//     onDelete: "cascade",
//   }),
//   name: varchar("name", { length: 256 }).notNull(),
//   notes: text("notes"),
//   date: date("date").notNull(),
//   workout_status: statusEnum("workout_status"),
//   created_at: timestamp("created_at").defaultNow(),
// });
