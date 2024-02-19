import {
  integer,
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./userSchema";
import { routines } from "./routineSchema";
import { cardioExercises } from "./cardioExerciseSchema";

export const statusEnum = pgEnum("status", ["active", "inactive"]);

export const frequencyEnum = pgEnum("frequency", [
  "daily",
  "weekly",
  "biweekly",
  "monthly",
]);

export const durationTypeEnum = pgEnum("durationType", [
  "days",
  "weeks",
  "months",
]);

export const templateCardio = pgTable("templateCardio", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .references(() => users.id)
    .notNull(),
  routine_id: integer("routine_id").references(() => routines.id),
  cardio_exercise_id: integer("cardio_exercise_id").references(
    () => cardioExercises.id
  ),
  notes: varchar("notes", { length: 256 }),
  status: statusEnum("status"),
  frequency: frequencyEnum("frequency"),
  durationType: durationTypeEnum("durationType"),
  durationValue: integer("durationValue"),
  created_at: varchar("created_at", { length: 256 }),
});
