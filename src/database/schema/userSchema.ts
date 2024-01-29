import {
  integer,
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerk_user_id: varchar("clerk_user_id", { length: 256 }),
  email: varchar("email", { length: 256 }).unique(),
  display_name: varchar("display_name", { length: 256 }).notNull(),
  created_at: varchar("created_at", { length: 256 }),
});
