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

export const statusEnum = pgEnum("status", [
  "not_started",
  "incomplete",
  "finished",
]);

export const workouts = pgTable("workouts", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .references(() => users.id)
    .notNull(),
  routine_id: integer("routine_id").references(() => routines.id),
  name: varchar("name", { length: 256 }).notNull(),
  notes: varchar("notes", { length: 256 }),
  date: varchar("date", { length: 256 }),
  status: statusEnum("status"),
  created_at: varchar("created_at", { length: 256 }).notNull(),
});
