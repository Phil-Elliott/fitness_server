import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function setupUserTableForTestDatabase() {
  try {
    await db.execute(
      sql`INSERT INTO users (clerk_user_id, email, display_name) VALUES ('user_12543', 'johndoe@gmail.com', 'John Doe');`
    );
    await db.execute(
      sql`INSERT INTO users (clerk_user_id, email, display_name) VALUES ('user_13543', 'bobsmith@gmail.com', 'Bob Smith');`
    );
    await db.execute(
      sql`INSERT INTO users (clerk_user_id, email, display_name) VALUES ('user_1257753', 'elizebethOwens@aol.com', 'Elizebeth Owens');`
    );
  } catch (error) {
    console.error("Error setting up exercise table in test database:", error);
  }
}

export default setupUserTableForTestDatabase;
