import db from "../database/setup";
import { sql } from "drizzle-orm";
import AppError from "../utils/appError";
import buildUpdateQuery from "../utils/buildUpdateQuery";
import { NewWorkout, Workout } from "../types/workoutTypes";

export const getAllWorkouts = async (): Promise<Workout[]> => {
  const result = await db.execute(sql`SELECT * FROM Workouts`);
  return result.rows as Workout[];
};

export const getWorkout = async (id: string): Promise<Workout> => {
  const result = await db.execute(sql`SELECT * FROM Workouts WHERE id = ${id}`);
  if (result.rows.length === 0) {
    throw new AppError(`Workout with ID ${id} does not exist.`, 404);
  }
  return result.rows[0] as Workout;
};

export const createWorkout = async (
  workoutData: NewWorkout
): Promise<Workout> => {
  const result = await db.execute(
    sql`INSERT INTO workouts (routine_id, name, description, created_at) VALUES (${workoutData.routine_id}, ${workoutData.name}, ${workoutData.description}, NOW()) RETURNING *`
  );

  return result.rows[0] as Workout;
};

export const updateWorkout = async (
  id: string,
  workoutData: Partial<Workout>
): Promise<Workout> => {
  const idResult = await db.execute(
    sql`SELECT id FROM Workouts WHERE id = ${id}`
  );
  if (idResult.rows.length === 0) {
    throw new AppError(`Workout with ID ${id} does not exist.`, 404);
  }
  const updateQuery = buildUpdateQuery("workouts", workoutData, "id", id);
  const result = await db.execute(updateQuery());
  return result.rows[0] as Workout;
};

export const deleteWorkout = async (id: string): Promise<void> => {
  const idResult = await db.execute(
    sql`SELECT id FROM workouts WHERE id = ${id}`
  );
  if (idResult.rows.length === 0) {
    throw new AppError(`Workout with ID ${id} does not exist.`, 404);
  }

  await db.execute(sql`DELETE FROM workouts WHERE id = ${id}`);
  return;
};
