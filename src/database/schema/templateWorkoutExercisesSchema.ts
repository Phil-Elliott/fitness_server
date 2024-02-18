import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { exercises } from "./exerciseSchema";
import { templateWorkouts } from "./templateWorkoutSchema";

export const templateWorkoutExercises = pgTable("templateWorkoutExercises", {
  id: serial("id").primaryKey(),
  templateWorkout_id: integer("templateWorkout_id")
    .references(() => templateWorkouts.id)
    .notNull(),
  exercise_id: integer("exercise_id")
    .references(() => exercises.id)
    .notNull(),
  order_index: integer("order_index").notNull(),
  sets: integer("sets").notNull(),
  restBetweenSets: integer("restBetweenSets").notNull(),
});
