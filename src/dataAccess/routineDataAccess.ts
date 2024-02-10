import db from "../database/setup";
import { sql } from "drizzle-orm";
import AppError from "../utils/appError";
import buildUpdateQuery from "../utils/buildUpdateQuery";
import { NewRoutine, Routine } from "../types/routineTypes";

export const getAllRoutines = async (): Promise<Routine[]> => {
  const result = await db.execute(sql`SELECT * FROM routines`);
  return result.rows as Routine[];
};

export const getRoutine = async (id: string): Promise<Routine> => {
  const result = await db.execute(sql`SELECT * FROM routines WHERE id = ${id}`);
  if (result.rows.length === 0) {
    throw new AppError(`Routine with ID ${id} does not exist.`, 404);
  }
  return result.rows[0] as Routine;
};

export const createRoutine = async (
  RoutineData: NewRoutine
): Promise<Routine> => {
  const result = await db.execute(
    sql`INSERT INTO routines (user_id, name, description, created_at) VALUES (${RoutineData.user_id}, ${RoutineData.name}, ${RoutineData.description}, NOW()) RETURNING *`
  );

  return result.rows[0] as Routine;
};

export const updateRoutine = async (
  id: string,
  RoutineData: Partial<Routine>
): Promise<Routine> => {
  const idResult = await db.execute(
    sql`SELECT id FROM routines WHERE id = ${id}`
  );
  if (idResult.rows.length === 0) {
    throw new AppError(`Routine with ID ${id} does not exist.`, 404);
  }
  const updateQuery = buildUpdateQuery("routines", RoutineData, "id", id);
  const result = await db.execute(updateQuery());
  return result.rows[0] as Routine;
};

export const deleteRoutine = async (id: string): Promise<void> => {
  const idResult = await db.execute(
    sql`SELECT id FROM routines WHERE id = ${id}`
  );
  if (idResult.rows.length === 0) {
    throw new AppError(`routine with ID ${id} does not exist.`, 404);
  }

  await db.execute(sql`DELETE FROM routines WHERE id = ${id}`);
  return;
};
