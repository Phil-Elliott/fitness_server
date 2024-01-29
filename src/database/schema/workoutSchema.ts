import {
  integer,
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { routines } from "./routineSchema";

export const workouts = pgTable("workouts", {
  id: serial("id").primaryKey(),
  routine_id: integer("routine_id")
    .references(() => routines.id)
    .notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }),
  created_at: varchar("created_at", { length: 256 }).notNull(),
});
