import {
  integer,
  pgEnum,
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  date,
} from "drizzle-orm/pg-core";
import { users } from "./userSchema";

export const statusEnum = pgEnum("routine_status", ["active", "inactive"]);

export const frequency = pgEnum("frequency", [
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

export const routines = pgTable("routines", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .references(() => users.id)
    .notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  notes: text("notes"),
  status: statusEnum("routine_status").notNull(),
  frequency: frequency("frequency"),
  duration_type: durationTypeEnum("duration_type"),
  duration_value: integer("duration_value"),
  start_date: date("start_date").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});
