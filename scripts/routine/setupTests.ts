import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function setupRoutineTableForTestDatabase() {
  try {
    let response = await db.execute(
      sql`INSERT INTO users (clerk_user_id, email, display_name) VALUES ('73543', 'johnBob@gmail.com', 'John Bob') RETURNING *`
    );

    let id = response.rows[0].id;

    await db.execute(
      sql`INSERT INTO routines (user_id, name, description, created_at) VALUES (${id}, 'Morning Routine', 'A routine to start the day', NOW());`
    );
    await db.execute(
      sql`INSERT INTO routines (user_id, name, description, created_at) VALUES (${id}, 'Evening Routine', 'A routine to end the day', NOW());`
    );
    await db.execute(
      sql`INSERT INTO routines (user_id, name, description, created_at) VALUES (${id}, 'Afternoon Routine', 'A routine to break up the day', NOW());`
    );
  } catch (error) {
    console.error("Error setting up Routine table in test database:", error);
  }
}

export default setupRoutineTableForTestDatabase;
