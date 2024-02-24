import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function setupRoutineTableForTestDatabase() {
  try {
    const response = await db.execute(
      sql`INSERT INTO users (clerk_user_id, email, display_name) VALUES ('user_12543', 'johndoe@gmail.com', 'John Doe') returning *;`
    );

    const id = response.rows[0].id;

    await db.execute(
      sql`INSERT INTO routines (user_id, name, notes, routine_status, frequency, duration_type, duration_value, start_date, created_at) VALUES (${id}, 'Morning Routine', 'A routine to start the day', 'active', 'daily', 'days', 10, date '2025-01-01', NOW());`
    );
    // await db.execute(
    //   sql`INSERT INTO routines (user_id, name, notes, status, frequency, duration_type, start_date, created_at) VALUES (${id}, 'Afternoon Routine', 'A routine to start the afternoon', 'active', 'daily', 'days', NOW());`
    // );
    // await db.execute(
    //   sql`INSERT INTO routines (user_id, name, notes, status, frequency, duration_type, start_date, created_at) VALUES (${id}, 'Night Routine', 'A routine to start the night', 'active', 'daily', 'days', NOW());`
    // );
  } catch (error) {
    console.error("Error setting up Routine table in test database:", error);
  }
}

export default setupRoutineTableForTestDatabase;

// export const routines = pgTable("routines", {
//   id: serial("id").primaryKey(),
//   user_id: integer("user_id")
//     .references(() => users.id, { onDelete: "cascade" })
//     .notNull(),
//   name: varchar("name", { length: 256 }).notNull(),
//   notes: text("notes"),
//   status: statusEnum("routine_status").notNull(),
//   frequency: frequency("frequency"),
//   duration_type: durationTypeEnum("duration_type"),
//   duration_value: integer("duration_value"),
//   start_date: date("start_date").notNull(),
//   created_at: timestamp("created_at").defaultNow(),
// });
