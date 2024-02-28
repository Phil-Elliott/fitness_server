import db from "../database/setup";
import { sql } from "drizzle-orm";
import AppError from "../utils/appError";
import buildUpdateQuery from "../utils/buildUpdateQuery";
import { NewWorkoutCardio, WorkoutCardio } from "../types/workoutCardioTypes";

export const getAllWorkoutCardio = async (): Promise<WorkoutCardio[]> => {
  const result = await db.execute(sql`SELECT * FROM "workoutCardio"`);
  return result.rows as WorkoutCardio[];
};

export const getWorkoutCardio = async (id: string): Promise<WorkoutCardio> => {
  const result = await db.execute(
    sql`SELECT * FROM "workoutCardio" WHERE id = ${id}`
  );
  if (result.rows.length === 0) {
    throw new AppError(`workoutCardio with ID ${id} does not exist.`, 404);
  }
  return result.rows[0] as WorkoutCardio;
};

export const createWorkoutCardio = async (
  workoutCardioData: NewWorkoutCardio
): Promise<WorkoutCardio> => {
  const result = await db.execute(
    sql`INSERT INTO "workoutCardio" (workout_id, cardio_id, order_index) VALUES (${workoutCardioData.workout_id}, ${workoutCardioData.cardio_id}, ${workoutCardioData.order_index}) RETURNING *`
  );

  return result.rows[0] as WorkoutCardio;
};

export const updateWorkoutCardio = async (
  id: string,
  workoutCardioData: Partial<WorkoutCardio>
): Promise<WorkoutCardio> => {
  const idResult = await db.execute(
    sql`SELECT id FROM "workoutCardio" WHERE id = ${id}`
  );
  if (idResult.rows.length === 0) {
    throw new AppError(`workoutCardio with ID ${id} does not exist.`, 404);
  }
  const updateQuery = buildUpdateQuery(
    "workoutCardio",
    workoutCardioData,
    "id",
    id
  );
  const result = await db.execute(updateQuery());
  return result.rows[0] as WorkoutCardio;
};

export const deleteWorkoutCardio = async (id: string): Promise<void> => {
  const idResult = await db.execute(
    sql`SELECT id FROM "workoutCardio" WHERE id = ${id}`
  );
  if (idResult.rows.length === 0) {
    throw new AppError(`WorkoutCardio with ID ${id} does not exist.`, 404);
  }

  await db.execute(sql`DELETE FROM "workoutCardio" WHERE id = ${id}`);
  return;
};
