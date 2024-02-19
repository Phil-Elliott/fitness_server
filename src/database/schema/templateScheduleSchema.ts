import { integer, pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";
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
  templateWorkout_id: integer("templateWorkout_id").references(
    () => templateWorkouts.id
  ),
  templateCardio_id: integer("templateCardio_id").references(
    () => templateCardio.id
  ),
  dayOfWeek: daysOfWeekEnum("daysOfWeek"),
  startTime: varchar("startTime", { length: 256 }),
  endTime: varchar("endTime", { length: 256 }),
});
