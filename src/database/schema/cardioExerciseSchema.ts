import { integer, pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const cardioExercises = pgTable("cardioExercises", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  description: varchar("description", { length: 256 }),
});
