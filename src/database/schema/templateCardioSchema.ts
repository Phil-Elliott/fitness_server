import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./userSchema";
import { routines } from "./routineSchema";
import { cardioExercises } from "./cardioExerciseSchema";

export const statusEnum = pgEnum("template_cardio_status", [
  "active",
  "inactive",
]);

export const frequencyEnum = pgEnum("frequency", [
  "daily",
  "weekly",
  "biweekly",
  "monthly",
]);

export const durationTypeEnum = pgEnum("duration_type", [
  "days",
  "weeks",
  "months",
]);

export const templateCardio = pgTable("templateCardio", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id", { length: 256 })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  routine_id: integer("routine_id").references(() => routines.id, {
    onDelete: "cascade",
  }),
  cardio_exercise_id: integer("cardio_exercise_id").references(
    () => cardioExercises.id
  ),
  notes: text("notes"),
  template_cardio_status: statusEnum("template_cardio_status"),
  frequency: frequencyEnum("frequency"),
  duration_type: durationTypeEnum("duration_type"),
  duration_value: integer("duration_value"),
  created_at: timestamp("created_at").defaultNow(),
});
