import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { workoutExercises } from "./workoutExerciseSchema";

export const workoutExerciseSets = pgTable("workoutExerciseSets", {
  id: serial("id").primaryKey(),
  workout_exercise_id: integer("workout_exercise_id")
    .references(() => workoutExercises.id)
    .notNull(),
  set_number: integer("set_number"),
  repetitions: integer("repetitions"),
  weight: integer("weight"),
  weight_unit: varchar("weight_unit", { length: 256 }),
  user_input: varchar("user_input", { length: 256 }),
  created_at: varchar("created_at", { length: 256 }),
});
