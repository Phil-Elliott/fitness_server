import db from "../database/setup";
import { sql } from "drizzle-orm";
import AppError from "../utils/appError";
import buildUpdateQuery from "../utils/buildUpdateQuery";
import {
  NewWorkoutExercise,
  WorkoutExercise,
} from "../types/workoutExerciseTypes";

export const getAllWorkoutExercises = async (): Promise<WorkoutExercise[]> => {
  const result = await db.execute(sql`SELECT * FROM "workoutExercises"`);
  return result.rows as WorkoutExercise[];
};

export const getWorkoutExercise = async (
  id: string
): Promise<WorkoutExercise> => {
  const result = await db.execute(
    sql`SELECT * FROM "workoutExercises" WHERE id = ${id}`
  );
  if (result.rows.length === 0) {
    throw new AppError(`workoutExercise with ID ${id} does not exist.`, 404);
  }
  return result.rows[0] as WorkoutExercise;
};

export const createWorkoutExercise = async (
  workoutExerciseData: NewWorkoutExercise
): Promise<WorkoutExercise> => {
  const result = await db.execute(
    sql`INSERT INTO "workoutExercises" (workout_id, exercise_id, order_index) VALUES (${workoutExerciseData.workout_id}, ${workoutExerciseData.exercise_id}, ${workoutExerciseData.order_index}) RETURNING *`
  );

  return result.rows[0] as WorkoutExercise;
};

export const updateWorkoutExercise = async (
  id: string,
  workoutExerciseData: Partial<WorkoutExercise>
): Promise<WorkoutExercise> => {
  const idResult = await db.execute(
    sql`SELECT id FROM "workoutExercises" WHERE id = ${id}`
  );
  if (idResult.rows.length === 0) {
    throw new AppError(`workoutExercise with ID ${id} does not exist.`, 404);
  }
  const updateQuery = buildUpdateQuery(
    "workoutExercises",
    workoutExerciseData,
    "id",
    id
  );
  const result = await db.execute(updateQuery());
  console.log(result);
  return result.rows[0] as WorkoutExercise;
};

export const deleteWorkoutExercise = async (id: string): Promise<void> => {
  const idResult = await db.execute(
    sql`SELECT id FROM "workoutExercises" WHERE id = ${id}`
  );
  if (idResult.rows.length === 0) {
    throw new AppError(`WorkoutExercise with ID ${id} does not exist.`, 404);
  }

  await db.execute(sql`DELETE FROM "workoutExercises" WHERE id = ${id}`);
  return;
};
