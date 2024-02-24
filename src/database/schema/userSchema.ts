import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id", { length: 256 }).primaryKey(),
  email: varchar("email", { length: 256 }).unique(),
  display_name: varchar("display_name", { length: 256 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
});
