import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const isTestEnvironment = process.env.NODE_ENV === "test";

export default defineConfig({
  schema: "./src/database/schema",
  out: "./src/database/migrations",
  driver: "pg",
  dbCredentials: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST as string,
    database: (isTestEnvironment
      ? process.env.TEST_DB_NAME
      : process.env.DB_NAME) as string,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432"),
  },
  verbose: true,
  strict: true,
});
