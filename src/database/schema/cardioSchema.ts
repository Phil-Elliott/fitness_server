import { integer, pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { routines } from "./routineSchema";
import { cardioExercises } from "./cardioExerciseSchema";

export const cardio = pgTable("cardio", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id"),
  routine_id: integer("routine_id").references(() => routines.id),
  cardio_exercise_id: integer("cardio_exercise_id").references(
    () => cardioExercises.id
  ),
  duration: integer("duration"),
  distance: integer("distance"),
  date: varchar("date", { length: 256 }),
  notes: varchar("notes", { length: 256 }),
  created_at: varchar("created_at", { length: 256 }),
});
