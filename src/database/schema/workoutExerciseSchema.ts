import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { exercises } from "./exerciseSchema";
import { workouts } from "./workoutSchema";

export const workoutExercises = pgTable("workoutExercises", {
  id: serial("id").primaryKey(),
  workout_id: integer("workout_id")
    .references(() => workouts.id, { onDelete: "cascade" })
    .notNull(),
  exercise_id: integer("exercise_id")
    .references(() => exercises.id)
    .notNull(),
  order_index: integer("order_index"),
});
