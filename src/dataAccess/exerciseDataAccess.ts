import pool from "../config/database";
import buildUpdateQuery from "../utils/buildUpdateQuery";

type Exercise = {
  id?: string;
  name: string;
  description: string;
};

export const getAllExercises = async () => {
  const result = await pool.query("SELECT * FROM exercises");
  return result.rows;
};

export const getExercise = async (id: string) => {
  const result = await pool.query("SELECT * FROM exercises WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

export const createExercise = async (exerciseData: Exercise) => {
  const result = await pool.query(
    "INSERT INTO exercises (name, description) VALUES ($1, $2) RETURNING *",
    [exerciseData.name, exerciseData.description]
  );
  return result.rows[0];
};

export const updateExercise = async (id: string, exerciseData: Exercise) => {
  const idResult = await pool.query("SELECT id FROM exercises WHERE id = $1", [
    id,
  ]);
  if (idResult.rows.length === 0) {
    throw new Error(`Exercise with ID ${id} does not exist.`);
  }

  const { query, params } = buildUpdateQuery(
    "exercises",
    exerciseData,
    "id",
    id
  );
  const result = await pool.query(query, params);
  return result.rows[0];
};

export const deleteExercise = async (id: string) => {
  return pool.query("DELETE FROM exercises WHERE id = $1", [id]);
};
