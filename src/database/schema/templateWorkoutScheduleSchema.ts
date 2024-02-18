import { integer, pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { templateWorkouts } from "./templateWorkoutSchema";

export const daysOfWeekEnum = pgEnum("daysOfWeek", [
  "Day1",
  "Day2",
  "Day3",
  "Day4",
  "Day5",
  "Day6",
  "Day7",
]);

export const templateWorkoutSchedules = pgTable("templateWorkoutSchedules", {
  id: serial("id").primaryKey(),
  templateWorkout_id: integer("templateWorkout_id")
    .references(() => templateWorkouts.id)
    .notNull(),
  dayOfWeek: daysOfWeekEnum("daysOfWeek").notNull(),
  startTime: varchar("startTime", { length: 256 }),
  endTime: varchar("endTime", { length: 256 }),
});
