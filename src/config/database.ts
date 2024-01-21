import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const isTestEnvironment = process.env.NODE_ENV === "test";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: isTestEnvironment ? process.env.TEST_DB_NAME : process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

export default pool;
