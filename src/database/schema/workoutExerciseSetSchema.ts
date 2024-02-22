import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { workoutExercises } from "./workoutExerciseSchema";

export const weightUnitEnum = pgEnum("weight_unit", ["lbs", "kg"]);

export const workoutExerciseSets = pgTable("workoutExerciseSets", {
  id: serial("id").primaryKey(),
  workout_exercise_id: integer("workout_exercise_id")
    .references(() => workoutExercises.id)
    .notNull(),
  set_number: integer("set_number"),
  repetitions: integer("repetitions"),
  weight: integer("weight"),
  weight_unit: weightUnitEnum("weight_unit"),
  notes: text("notes"),
  created_at: timestamp("created_at").defaultNow(),
});
