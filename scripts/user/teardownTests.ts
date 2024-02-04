import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function teardownUsersTableForTestDatabase() {
  try {
    await db.execute(sql`DELETE FROM users`);
  } catch (error) {
    console.error(
      "Error tearing down exercise table in test database exercise:",
      error
    );
  }
}

export default teardownUsersTableForTestDatabase;
