import { integer, pgEnum, pgTable, serial, time } from "drizzle-orm/pg-core";
import { templateWorkouts } from "./templateWorkoutSchema";
import { templateCardio } from "./templateCardioSchema";

export const daysOfWeekEnum = pgEnum("daysOfWeek", [
  "Day1",
  "Day2",
  "Day3",
  "Day4",
  "Day5",
  "Day6",
  "Day7",
]);

export const templateSchedules = pgTable("templateSchedules", {
  id: serial("id").primaryKey(),
  template_workout_id: integer("template_workout_id").references(
    () => templateWorkouts.id,
    { onDelete: "cascade" }
  ),
  template_cardio_id: integer("template_cardio_id").references(
    () => templateCardio.id,
    { onDelete: "cascade" }
  ),
  day_of_week: daysOfWeekEnum("day_of_week"),
  start_time: time("start_time", { withTimezone: true }),
  end_time: time("end_time", { withTimezone: true }),
});

// Could maybe add up the projected end time based off of rests given and i could also show time remaining for the workout while the user is working out
