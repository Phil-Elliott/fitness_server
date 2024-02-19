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

export const templateWorkouts = pgTable("templateWorkouts", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .references(() => users.id)
    .notNull(),
  routine_id: integer("routine_id").references(() => routines.id),
  name: varchar("name", { length: 256 }).notNull(),
  notes: varchar("description", { length: 256 }),
  restBetweenExercises: integer("restBetweenSets"),
  status: statusEnum("status"),
  frequency: frequencyEnum("frequency"),
  durationType: durationTypeEnum("durationType"),
  durationValue: integer("duration"),
  created_at: varchar("created_at", { length: 256 }).notNull(),
});
