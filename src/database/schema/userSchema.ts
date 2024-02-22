import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerk_user_id: varchar("clerk_user_id", { length: 256 }).unique(),
  email: varchar("email", { length: 256 }).unique(),
  display_name: varchar("display_name", { length: 256 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
});
