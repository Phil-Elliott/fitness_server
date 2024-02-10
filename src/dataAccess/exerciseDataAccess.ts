import db from "../database/setup";
import { sql } from "drizzle-orm";
import AppError from "../utils/appError";
import buildUpdateQuery from "../utils/buildUpdateQuery";
import { Exercise } from "../types/exerciseTypes";

export const getAllExercises = async (): Promise<Exercise[]> => {
  const result = await db.execute(sql`SELECT * FROM exercises`);
  return result.rows as Exercise[];
};

export const getExercise = async (id: string): Promise<Exercise> => {
  const result = await db.execute(
    sql`SELECT * FROM exercises WHERE id = ${id}`
  );
  if (result.rows.length === 0) {
    throw new AppError(`Exercise with ID ${id} does not exist.`, 404);
  }

  return result.rows[0] as Exercise;
};

export const createExercise = async (
  exerciseData: Exercise
): Promise<Exercise> => {
  const result = await db.execute(
    sql`INSERT INTO exercises (name, description) VALUES (${exerciseData.name}, ${exerciseData.description}) RETURNING *`
  );
  return result.rows[0] as Exercise;
};

export const updateExercise = async (
  id: string,
  exerciseData: Exercise
): Promise<Exercise> => {
  const idResult = await db.execute(
    sql`SELECT id FROM exercises WHERE id = ${id}`
  );
  if (idResult.rows.length === 0) {
    throw new AppError(`Exercise with ID ${id} does not exist.`, 404);
  }

  const updateQuery = buildUpdateQuery("exercises", exerciseData, "id", id);
  const result = await db.execute(updateQuery());

  return result.rows[0] as Exercise;
};

export const deleteExercise = async (id: string) => {
  const idResult = await db.execute(
    sql`SELECT id FROM exercises WHERE id = ${id}`
  );

  if (idResult.rows.length === 0) {
    throw new AppError(`Exercise with ID ${id} does not exist.`, 404);
  }

  await db.execute(sql`DELETE FROM exercises WHERE id = ${id}`);
  return;
};
