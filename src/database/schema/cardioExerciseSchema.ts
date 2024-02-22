import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core";

export const cardioExercises = pgTable("cardioExercises", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description"),
});
