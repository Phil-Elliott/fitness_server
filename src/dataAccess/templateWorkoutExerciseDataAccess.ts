import db from "../database/setup";
import { sql } from "drizzle-orm";
import AppError from "../utils/appError";
import buildUpdateQuery from "../utils/buildUpdateQuery";
import {
  NewTemplateWorkoutExercise,
  TemplateWorkoutExercise,
} from "../types/templateWorkoutExerciseTypes";

export const getAllTemplateWorkoutExercises = async (): Promise<
  TemplateWorkoutExercise[]
> => {
  const result = await db.execute(
    sql`SELECT * FROM "templateWorkoutExercises"`
  );
  return result.rows as TemplateWorkoutExercise[];
};

export const getTemplateWorkoutExercise = async (
  id: string
): Promise<TemplateWorkoutExercise> => {
  const result = await db.execute(
    sql`SELECT * FROM "templateWorkoutExercises" WHERE id = ${id}`
  );
  if (result.rows.length === 0) {
    throw new AppError(
      `templateWorkoutExercise with ID ${id} does not exist.`,
      404
    );
  }
  return result.rows[0] as TemplateWorkoutExercise;
};

export const createTemplateWorkoutExercise = async (
  templateWorkoutExerciseData: NewTemplateWorkoutExercise
): Promise<TemplateWorkoutExercise> => {
  console.log(templateWorkoutExerciseData);
  const result = await db.execute(
    sql`INSERT INTO "templateWorkoutExercises" (template_workout_id, exercise_id, order_index, sets, rest_between_sets) VALUES (${templateWorkoutExerciseData.template_workout_id}, ${templateWorkoutExerciseData.exercise_id}, ${templateWorkoutExerciseData.order_index}, ${templateWorkoutExerciseData.sets}, ${templateWorkoutExerciseData.rest_between_sets}) RETURNING *`
  );

  return result.rows[0] as TemplateWorkoutExercise;
};

export const updateTemplateWorkoutExercise = async (
  id: string,
  templateWorkoutExerciseData: Partial<TemplateWorkoutExercise>
): Promise<TemplateWorkoutExercise> => {
  const idResult = await db.execute(
    sql`SELECT id FROM "templateWorkoutExercises" WHERE id = ${id}`
  );
  if (idResult.rows.length === 0) {
    throw new AppError(
      `templateWorkoutExercise with ID ${id} does not exist.`,
      404
    );
  }
  const updateQuery = buildUpdateQuery(
    "templateWorkoutExercises",
    templateWorkoutExerciseData,
    "id",
    id
  );
  const result = await db.execute(updateQuery());
  return result.rows[0] as TemplateWorkoutExercise;
};

export const deleteTemplateWorkoutExercise = async (
  id: string
): Promise<void> => {
  const idResult = await db.execute(
    sql`SELECT id FROM "templateWorkoutExercises" WHERE id = ${id}`
  );
  if (idResult.rows.length === 0) {
    throw new AppError(
      `templateWorkoutExercise with ID ${id} does not exist.`,
      404
    );
  }

  await db.execute(
    sql`DELETE FROM "templateWorkoutExercises" WHERE id = ${id}`
  );
  return;
};
