import {
  integer,
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./userSchema";

export const statusEnum = pgEnum("status", ["active", "inactive"]);

export const frequency = pgEnum("frequency", [
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

export const routines = pgTable("routines", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .references(() => users.id)
    .notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  notes: varchar("description", { length: 256 }),
  status: statusEnum("status"),
  frequency: frequency("frequency"),
  durationType: durationTypeEnum("durationType"),
  durationValue: integer("duration"),
  created_at: varchar("created_at", { length: 256 }),
});
