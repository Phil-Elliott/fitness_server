import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { exercises } from "./exerciseSchema";
import { workouts } from "./workoutSchema";

export const workoutExercises = pgTable("workoutExercises", {
  id: serial("id").primaryKey(),
  workout_id: integer("workout_id")
    .references(() => workouts.id)
    .notNull(),
  exercise_id: integer("exercise_id")
    .references(() => exercises.id)
    .notNull(),
  order_index: integer("order_index"),
});

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
