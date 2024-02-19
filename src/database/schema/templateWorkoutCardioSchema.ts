import {
  integer,
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { templateWorkouts } from "./templateWorkoutSchema";
import { cardioExercises } from "./cardioExerciseSchema";

export const templateWorkoutCardio = pgTable("templateWorkoutCardio", {
  id: serial("id").primaryKey(),
  templateWorkout_id: integer("templateWorkout_id").references(
    () => templateWorkouts.id
  ),
  cardio_exercise_id: integer("cardio_exercise_id").references(
    () => cardioExercises.id
  ),
  duration: integer("duration"),
  distance: integer("distance"),
  order_index: integer("order_index").notNull(),
});
