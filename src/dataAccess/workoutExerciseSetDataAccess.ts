import db from "../database/setup";
import { sql } from "drizzle-orm";
import AppError from "../utils/appError";
import buildUpdateQuery from "../utils/buildUpdateQuery";
import {
  NewWorkoutExerciseSet,
  WorkoutExerciseSet,
} from "../types/workoutExerciseSetTypes";

export const getAllWorkoutExerciseSets = async (): Promise<
  WorkoutExerciseSet[]
> => {
  const result = await db.execute(sql`SELECT * FROM "workoutExerciseSets"`);
  return result.rows as WorkoutExerciseSet[];
};

export const getWorkoutExerciseSet = async (
  id: string
): Promise<WorkoutExerciseSet> => {
  const result = await db.execute(
    sql`SELECT * FROM "workoutExerciseSets" WHERE id = ${id}`
  );
  if (result.rows.length === 0) {
    throw new AppError(`WorkoutExerciseSet with ID ${id} does not exist.`, 404);
  }
  return result.rows[0] as WorkoutExerciseSet;
};

export const createWorkoutExerciseSet = async (
  workoutExerciseSetData: NewWorkoutExerciseSet
): Promise<WorkoutExerciseSet> => {
  const result = await db.execute(
    sql`INSERT INTO "workoutExerciseSets" (workout_exercise_id, set_number, repetitions, weight, weight_unit, notes, created_at) VALUES (${workoutExerciseSetData.workout_exercise_id}, ${workoutExerciseSetData.set_number}, ${workoutExerciseSetData.repetitions}, ${workoutExerciseSetData.weight}, ${workoutExerciseSetData.weight_unit}, ${workoutExerciseSetData.notes}, NOW()) RETURNING *`
  );

  return result.rows[0] as WorkoutExerciseSet;
};

export const updateWorkoutExerciseSet = async (
  id: string,
  workoutExerciseSetData: Partial<WorkoutExerciseSet>
): Promise<WorkoutExerciseSet> => {
  const idResult = await db.execute(
    sql`SELECT id FROM "workoutExerciseSets" WHERE id = ${id}`
  );
  if (idResult.rows.length === 0) {
    throw new AppError(`workoutExerciseSet with ID ${id} does not exist.`, 404);
  }
  const updateQuery = buildUpdateQuery(
    "workoutExerciseSets",
    workoutExerciseSetData,
    "id",
    id
  );
  const result = await db.execute(updateQuery());
  return result.rows[0] as WorkoutExerciseSet;
};

export const deleteWorkoutExerciseSet = async (id: string): Promise<void> => {
  const idResult = await db.execute(
    sql`SELECT id FROM "workoutExerciseSets" WHERE id = ${id}`
  );
  if (idResult.rows.length === 0) {
    throw new AppError(`WorkoutExerciseSet with ID ${id} does not exist.`, 404);
  }

  await db.execute(sql`DELETE FROM "workoutExerciseSets" WHERE id = ${id}`);
  return;
};
