import db from "../database/setup";
import { sql } from "drizzle-orm";

import buildUpdateQuery from "../utils/buildUpdateQuery";

type Exercise = {
  id?: string;
  name: string;
  description: string;
};

export const getAllExercises = async () => {
  const result = await db.execute(sql`SELECT * FROM exercises`);
  return result.rows;
};

export const getExercise = async (id: string) => {
  const result = await db.execute(
    sql`SELECT * FROM exercises WHERE id = ${id}`
  );
  return result.rows[0];
};

export const createExercise = async (exerciseData: Exercise) => {
  const result = await db.execute(
    sql`INSERT INTO exercises (name, description) VALUES (${exerciseData.name}, ${exerciseData.description}) RETURNING *`
  );
  return result.rows[0];
};

export const updateExercise = async (id: string, exerciseData: Exercise) => {
  const idResult = await db.execute(
    sql`SELECT id FROM exercises WHERE id = ${id}`
  );
  if (idResult.rows.length === 0) {
    throw new Error(`Exercise with ID ${id} does not exist.`);
  }

  const updateQuery = buildUpdateQuery("exercises", exerciseData, "id", id);
  const result = await db.execute(updateQuery());

  return result.rows[0];
};

export const deleteExercise = async (id: string) => {
  await db.execute(sql`DELETE FROM exercises WHERE id = ${id}`);
  return;
};
