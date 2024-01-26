import {
  integer,
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { user } from "./userSchema";

export const routine = pgTable("routine", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .references(() => user.id)
    .notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }),
  created_at: varchar("created_at", { length: 256 }),
});

// Table exercises {
//   id integer [pk, increment]
//   name varchar
//   description text
// }

// Table workout_exercises {
//   id integer [pk, increment]
//   workout_id integer [ref: > workouts.id]
//   exercise_id integer [ref: > exercises.id]
//   order_index integer
//   // Additional attributes specific to the exercise in the context of the workout
// }

// Table exercise_sets {
//   id integer [pk, increment]
//   workout_exercise_id integer [ref: > workout_exercises.id]
//   set_number integer
//   repetitions integer
//   weight float
//   user_input text  // Any additional data the user inputs for the set
//   created_at timestamp
// }
