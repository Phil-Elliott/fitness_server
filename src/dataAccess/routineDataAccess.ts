import db from "../database/setup";
import { sql } from "drizzle-orm";
import AppError from "../utils/appError";
import buildUpdateQuery from "../utils/buildUpdateQuery";
import { NewRoutine, Routine } from "../types/routineTypes";

export const getAllRoutines = async (userId: string): Promise<Routine[]> => {
  const result = await db.execute(
    sql`SELECT * FROM routines where user_id = ${userId}`
  );
  return result.rows as Routine[];
};

export const getRoutine = async (
  userId: string,
  routineId: string
): Promise<Routine> => {
  const result = await db.execute(
    sql`SELECT * FROM routines WHERE user_id = ${userId} AND id = ${routineId}`
  );
  if (result.rows.length === 0) {
    throw new AppError(`Could not find a routine for that user`, 404);
  }
  return result.rows[0] as Routine;
};

export const createRoutine = async (
  userId: string,
  routineData: NewRoutine
): Promise<Routine> => {
  console.log(routineData, "routineData", userId, "userId");

  const result = await db.execute(
    sql`INSERT INTO routines (user_id, name, notes, frequency,  start_date, end_date, created_at) VALUES (${userId}, ${routineData.name}, ${routineData.notes}, ${routineData.frequency}, date '2025-09-20', date '2025-11-12', NOW()) RETURNING *`
  );

  console.log("result");

  return result.rows[0] as Routine;
};

export const updateRoutine = async (
  userId: string,
  routineData: Routine
): Promise<Routine> => {
  const idResult = await db.execute(
    sql`SELECT id FROM routines WHERE user_id = ${userId} AND id = ${routineData.id}`
  );
  if (idResult.rows.length === 0) {
    throw new AppError(
      `Routine with ID ${routineData.id} does not exist.`,
      404
    );
  }
  const updateQuery = buildUpdateQuery(
    "routines",
    routineData,
    "user_id",
    userId,
    "id",
    routineData.id
  );
  const result = await db.execute(updateQuery());
  return result.rows[0] as Routine;
};

export const deleteRoutine = async (
  userId: string,
  routineId: string
): Promise<void> => {
  const idResult = await db.execute(
    sql`SELECT id FROM routines WHERE user_id = ${userId} AND id = ${routineId}`
  );
  if (idResult.rows.length === 0) {
    throw new AppError(
      `routine with ID routineId does not exist for user with id userId.`,
      404
    );
  }

  await db.execute(
    sql`DELETE FROM routines WHERE user_id = ${userId} AND id = ${routineId}`
  );
  return;
};
