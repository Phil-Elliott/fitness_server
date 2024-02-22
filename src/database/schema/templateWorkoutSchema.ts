import {
  integer,
  pgEnum,
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./userSchema";
import { routines } from "./routineSchema";

export const statusEnum = pgEnum("template_workout_status", [
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

export const templateWorkouts = pgTable("templateWorkouts", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  routine_id: integer("routine_id").references(() => routines.id, {
    onDelete: "cascade",
  }),
  name: varchar("name", { length: 256 }).notNull(),
  notes: text("notes"),
  rest_between_exercises: integer("rest_between_exercises"),
  template_workout_status: statusEnum("template_workout_status"),
  frequency: frequencyEnum("frequency"),
  duration_type: durationTypeEnum("duration_type"),
  duration_value: integer("duration"),
  created_at: timestamp("created_at").defaultNow(),
});
