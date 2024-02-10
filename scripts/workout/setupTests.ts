import { sql } from "drizzle-orm";
import db from "../../src/database/setup";

async function setupWorkoutTableForTestDatabase() {
  try {
    const user = await db.execute(
      sql`INSERT INTO users (clerk_user_id, email, display_name) VALUES ('73543', 'DebraHowlet@gmail.com', 'Debra Howlet') RETURNING *`
    );
    const userId = user.rows[0].id as number;

    const routine = await db.execute(
      sql`INSERT INTO routines (user_id, name, description, created_at) VALUES (${userId}, 'New Routine', 'A new routine to start the day', NOW()) RETURNING *`
    );
    const routineId = routine.rows[0].id as number;

    await db.execute(
      sql`INSERT INTO workouts (routine_id, name, description, created_at) VALUES (${routineId}, 'Morning Workout', 'A workout to start the day', NOW());`
    );
    await db.execute(
      sql`INSERT INTO workouts (routine_id, name, description, created_at) VALUES (${routineId}, 'Evening Workout', 'A workout to end the day', NOW());`
    );
    await db.execute(
      sql`INSERT INTO workouts (routine_id, name, description, created_at) VALUES (${routineId}, 'Afternoon Workout', 'A workout to break up the day', NOW());`
    );
  } catch (error) {
    console.error("Error setting up Workout table in test database:", error);
  }
}

export default setupWorkoutTableForTestDatabase;
