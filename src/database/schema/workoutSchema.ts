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

export const workouts = pgTable("workouts", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .references(() => users.id)
    .notNull(),
  routine_id: integer("routine_id").references(() => routines.id),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }),
  date: varchar("date", { length: 256 }),
  status: varchar("status", { length: 256 }).notNull(),
  created_at: varchar("created_at", { length: 256 }).notNull(),
});

/*

user signs up
user could 

1) create a routine
  - will need to create a routine that has many workouts
  - these workouts will be completed regularly every week

2) create a workout
  - do the workout on the go
  - create a workout to do later? (should you and could you do this easily later)

*/
