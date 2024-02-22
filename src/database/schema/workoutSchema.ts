import {
  integer,
  pgEnum,
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  date,
} from "drizzle-orm/pg-core";
import { users } from "./userSchema";
import { routines } from "./routineSchema";

export const statusEnum = pgEnum("workout_status", [
  "not_started",
  "incomplete",
  "finished",
]);

export const workouts = pgTable("workouts", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .references(() => users.id)
    .notNull(),
  routine_id: integer("routine_id").references(() => routines.id),
  name: varchar("name", { length: 256 }).notNull(),
  notes: text("notes"),
  date: date("date").notNull(),
  workout_status: statusEnum("workout_status"),
  created_at: timestamp("created_at").defaultNow(),
});
