import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { cardio } from "./cardioSchema";
import { workouts } from "./workoutSchema";

export const workoutCardio = pgTable("workoutCardio", {
  id: serial("id").primaryKey(),
  cardio_id: integer("cardio_id").references(() => cardio.id),
  workout_id: integer("workout_id").references(() => workouts.id),
  order_index: integer("order_index"),
});
