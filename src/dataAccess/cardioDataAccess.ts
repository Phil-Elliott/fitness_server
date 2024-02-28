import db from "../database/setup";
import { sql } from "drizzle-orm";
import AppError from "../utils/appError";
import buildUpdateQuery from "../utils/buildUpdateQuery";
import { NewCardio, cardio } from "../types/cardioTypes";

export const getAllCardio = async (userId: string): Promise<cardio[]> => {
  const result = await db.execute(
    sql`SELECT * FROM cardio WHERE user_id = ${userId}`
  );
  return result.rows as cardio[];
};

export const getCardio = async (
  userId: string,
  cardioId: string
): Promise<cardio> => {
  const result = await db.execute(
    sql`SELECT * FROM cardio WHERE user_id = ${userId} AND id = ${cardioId}`
  );
  if (result.rows.length === 0) {
    throw new AppError(
      `cardio with user_id = ${userId} and id ${cardioId} does not exist.`,
      404
    );
  }
  return result.rows[0] as cardio;
};

export const createCardio = async (
  userId: string,
  cardioData: NewCardio
): Promise<cardio> => {
  const result = await db.execute(
    sql`INSERT INTO cardio (user_id, routine_id, cardio_exercise_id, duration, distance, date, notes) VALUES (${userId}, ${cardioData.routine_id}, ${cardioData.cardio_exercise_id}, ${cardioData.duration}, ${cardioData.distance}, ${cardioData.date}, ${cardioData.notes}) RETURNING *`
  );

  return result.rows[0] as cardio;
};

export const updateCardio = async (
  userId: string,
  cardioData: cardio
): Promise<cardio> => {
  const idResult = await db.execute(
    sql`SELECT id FROM cardio WHERE user_id = ${userId} AND id = ${cardioData.id}`
  );
  if (idResult.rows.length === 0) {
    throw new AppError(
      `cardio with ID ${cardioData.id} and user id ${userId} does not exist.`,
      404
    );
  }
  const updateQuery = buildUpdateQuery(
    "cardio",
    cardioData,
    "user_id",
    userId,
    "id",
    cardioData.id
  );
  const result = await db.execute(updateQuery());
  return result.rows[0] as cardio;
};

export const deleteCardio = async (
  userId: string,
  cardioId: string
): Promise<void> => {
  const idResult = await db.execute(
    sql`SELECT id FROM cardio WHERE user_id = ${userId} AND id = ${cardioId}`
  );
  if (idResult.rows.length === 0) {
    throw new AppError(
      `cardio with ID ${cardioId} and user id ${userId} does not exist.`,
      404
    );
  }

  await db.execute(
    sql`DELETE FROM cardio WHERE user_id = ${userId} AND id = ${cardioId}`
  );
  return;
};
