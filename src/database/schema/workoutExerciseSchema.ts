import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { exercise } from "./exerciseSchema";
import { workout } from "./workoutSchema";

export const workoutExercise = pgTable("workoutExercise", {
  id: serial("id").primaryKey(),
  workout_id: integer("workout_id")
    .references(() => workout.id)
    .notNull(),
  exercise_id: integer("exercise_id")
    .references(() => exercise.id)
    .notNull(),
  order_index: integer("order_index"),
});

export const workoutExerciseSet = pgTable("workoutExerciseSet", {
  id: serial("id").primaryKey(),
  workout_exercise_id: integer("workout_exercise_id")
    .references(() => workoutExercise.id)
    .notNull(),
  set_number: integer("set_number"),
  repetitions: integer("repetitions"),
  weight: integer("weight"),
  weight_unit: varchar("weight_unit", { length: 256 }),
  user_input: varchar("user_input", { length: 256 }),
  created_at: varchar("created_at", { length: 256 }),
});
