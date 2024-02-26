import db from "../database/setup";
import { sql } from "drizzle-orm";
import AppError from "../utils/appError";
import buildUpdateQuery from "../utils/buildUpdateQuery";
import { NewWorkout, Workout } from "../types/workoutTypes";

export const getAllWorkouts = async (userId: string): Promise<Workout[]> => {
  const result = await db.execute(
    sql`SELECT * FROM Workouts WHERE user_id = ${userId}`
  );
  return result.rows as Workout[];
};

export const getWorkout = async (
  userId: string,
  workoutId: string
): Promise<Workout> => {
  const result = await db.execute(
    sql`SELECT * FROM Workouts WHERE user_id = ${userId} AND id = ${workoutId}`
  );
  if (result.rows.length === 0) {
    throw new AppError(
      `Workout with user_id = ${userId} and id ${workoutId} does not exist.`,
      404
    );
  }
  return result.rows[0] as Workout;
};

export const createWorkout = async (
  userId: string,
  workoutData: NewWorkout
): Promise<Workout> => {
  const result = await db.execute(
    sql`INSERT INTO workouts (user_id, routine_id, name, notes, date, workout_status, created_at) VALUES (${userId}, ${workoutData.routine_id}, ${workoutData.name}, ${workoutData.notes}, ${workoutData.date},  ${workoutData.workout_status}, NOW()) RETURNING *`
  );

  return result.rows[0] as Workout;
};

export const updateWorkout = async (
  userId: string,
  workoutData: Workout
): Promise<Workout> => {
  const idResult = await db.execute(
    sql`SELECT id FROM Workouts WHERE user_id = ${userId} AND id = ${workoutData.id}`
  );
  if (idResult.rows.length === 0) {
    throw new AppError(
      `Workout with ID ${workoutData.id} and user id ${userId} does not exist.`,
      404
    );
  }
  const updateQuery = buildUpdateQuery(
    "workouts",
    workoutData,
    "user_id",
    userId,
    "id",
    workoutData.id
  );
  const result = await db.execute(updateQuery());
  return result.rows[0] as Workout;
};

export const deleteWorkout = async (
  userId: string,
  workoutId: string
): Promise<void> => {
  const idResult = await db.execute(
    sql`SELECT id FROM workouts WHERE user_id = ${userId} AND id = ${workoutId}`
  );
  if (idResult.rows.length === 0) {
    throw new AppError(
      `Workout with ID ${workoutId} and user id ${userId} does not exist.`,
      404
    );
  }

  await db.execute(
    sql`DELETE FROM workouts WHERE user_id = ${userId} AND id = ${workoutId}`
  );
  return;
};
