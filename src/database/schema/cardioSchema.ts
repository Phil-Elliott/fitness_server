import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  date,
} from "drizzle-orm/pg-core";
import { users } from "./userSchema";
import { routines } from "./routineSchema";
import { cardioExercises } from "./cardioExerciseSchema";

export const cardio = pgTable("cardio", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  routine_id: integer("routine_id").references(() => routines.id, {
    onDelete: "cascade",
  }),
  cardio_exercise_id: integer("cardio_exercise_id").references(
    () => cardioExercises.id
  ),
  duration: integer("duration"),
  distance: integer("distance"),
  date: date("date").notNull(),
  notes: text("notes"),
  created_at: timestamp("created_at").defaultNow(),
});
