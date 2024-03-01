import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function setupCardioTableForTestDatabase() {
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
      sql`INSERT INTO cardio (user_id, routine_id, cardio_exercise_id, duration, distance, date, notes) VALUES ('user_12543', ${routineId}, ${cardioExerciseId}, 30, 5, date '2024-02-26', 'A cardio to start the day');`
    );
    await db.execute(
      sql`INSERT INTO cardio (user_id, routine_id, cardio_exercise_id, duration, distance, date, notes) VALUES ('user_12543', ${routineId}, ${cardioExerciseId}, 45, 10, date '2024-02-29', 'A cardio to end the day');`
    );
    await db.execute(
      sql`INSERT INTO cardio (user_id, routine_id, cardio_exercise_id, duration, distance, date, notes) VALUES ('user_12543', ${routineId}, ${cardioExerciseId}, 60, 15, date '2024-01-18', 'A cardio to break up the day');`
    );
  } catch (error) {
    console.error("Error setting up cardio table in test database:", error);
  }
}

export default setupCardioTableForTestDatabase;

/*
- use same user id
- create a routine and get the routine id
- create a cardio exercise and get the cardio exercise id
- create some cardio items
- also create a cardio item with a different user id


*/

// export const cardio = pgTable("cardio", {
//   id: serial("id").primaryKey(),
//   user_id: varchar("user_id", { length: 256 })
//     .references(() => users.id, { onDelete: "cascade" })
//     .notNull(),
//   routine_id: integer("routine_id").references(() => routines.id, {
//     onDelete: "cascade",
//   }),
//   cardio_exercise_id: integer("cardio_exercise_id").references(
//     () => cardioExercises.id
//   ),
//   duration: integer("duration"),
//   distance: integer("distance"),
//   date: date("date").notNull(),
//   notes: text("notes"),
//   created_at: timestamp("created_at").defaultNow(),
// });
