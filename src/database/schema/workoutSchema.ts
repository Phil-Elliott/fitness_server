import {
  integer,
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { routine } from "./routineSchema";

export const workout = pgTable("workout", {
  id: serial("id").primaryKey(),
  routine_id: integer("routine_id")
    .references(() => routine.id)
    .notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }),
  created_at: varchar("created_at", { length: 256 }),
});
