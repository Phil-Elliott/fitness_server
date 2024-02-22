import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { cardio } from "./cardioSchema";
import { workouts } from "./workoutSchema";

export const workoutCardio = pgTable("workoutCardio", {
  id: serial("id").primaryKey(),
  cardio_id: integer("cardio_id").references(() => cardio.id, {
    onDelete: "cascade",
  }),
  workout_id: integer("workout_id").references(() => workouts.id, {
    onDelete: "cascade",
  }),
  order_index: integer("order_index"),
});
