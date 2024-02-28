import db from "../database/setup";
import { sql } from "drizzle-orm";
import AppError from "../utils/appError";
import buildUpdateQuery from "../utils/buildUpdateQuery";
import { cardioExercise } from "../types/cardioExerciseTypes";

export const getAllCardioExercises = async (): Promise<cardioExercise[]> => {
  const result = await db.execute(sql`SELECT * FROM "cardioExercises"`);
  return result.rows as cardioExercise[];
};

export const getCardioExercise = async (
  id: string
): Promise<cardioExercise> => {
  const result = await db.execute(
    sql`SELECT * FROM "cardioExercises" WHERE id = ${id}`
  );
  if (result.rows.length === 0) {
    throw new AppError(`cardioExercise with ID ${id} does not exist.`, 404);
  }

  return result.rows[0] as cardioExercise;
};

export const createCardioExercise = async (
  cardioExerciseData: cardioExercise
): Promise<cardioExercise> => {
  const result = await db.execute(
    sql`INSERT INTO "cardioExercises" (name, description) VALUES (${cardioExerciseData.name}, ${cardioExerciseData.description}) RETURNING *`
  );
  return result.rows[0] as cardioExercise;
};

export const updateCardioExercise = async (
  id: string,
  cardioExerciseData: cardioExercise
): Promise<cardioExercise> => {
  const idResult = await db.execute(
    sql`SELECT id FROM "cardioExercises" WHERE id = ${id}`
  );
  if (idResult.rows.length === 0) {
    throw new AppError(`cardioExercise with ID ${id} does not exist.`, 404);
  }

  const updateQuery = buildUpdateQuery(
    "cardioExercises",
    cardioExerciseData,
    "id",
    id
  );
  const result = await db.execute(updateQuery());

  return result.rows[0] as cardioExercise;
};

export const deleteCardioExercise = async (id: string) => {
  const idResult = await db.execute(
    sql`SELECT id FROM "cardioExercises" WHERE id = ${id}`
  );

  if (idResult.rows.length === 0) {
    throw new AppError(`cardioExercise with ID ${id} does not exist.`, 404);
  }

  await db.execute(sql`DELETE FROM "cardioExercises" WHERE id = ${id}`);
  return;
};
