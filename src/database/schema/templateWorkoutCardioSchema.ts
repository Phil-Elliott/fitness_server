import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { templateWorkouts } from "./templateWorkoutSchema";
import { cardioExercises } from "./cardioExerciseSchema";

export const templateWorkoutCardio = pgTable("templateWorkoutCardio", {
  id: serial("id").primaryKey(),
  template_workout_id: integer("template_workout_id").references(
    () => templateWorkouts.id
  ),
  cardio_exercise_id: integer("cardio_exercise_id").references(
    () => cardioExercises.id
  ),
  duration: integer("duration"),
  distance: integer("distance"),
  order_index: integer("order_index").notNull(),
});
