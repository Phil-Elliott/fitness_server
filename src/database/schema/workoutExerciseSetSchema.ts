import { integer, pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { workoutExercises } from "./workoutExerciseSchema";

export const weightUnitEnum = pgEnum("weightUnit", ["lbs", "kg"]);

export const workoutExerciseSets = pgTable("workoutExerciseSets", {
  id: serial("id").primaryKey(),
  workout_exercise_id: integer("workout_exercise_id")
    .references(() => workoutExercises.id)
    .notNull(),
  set_number: integer("set_number"),
  repetitions: integer("repetitions"),
  weight: integer("weight"),
  weight_unit: weightUnitEnum("weight_unit"),
  notes: varchar("notes", { length: 256 }),
  created_at: varchar("created_at", { length: 256 }),
});
