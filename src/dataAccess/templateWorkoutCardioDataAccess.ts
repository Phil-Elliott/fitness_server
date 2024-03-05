import db from "../database/setup";
import { sql } from "drizzle-orm";
import AppError from "../utils/appError";
import buildUpdateQuery from "../utils/buildUpdateQuery";
import {
  NewTemplateWorkoutCardio,
  TemplateWorkoutCardio,
} from "../types/templateWorkoutCardioTypes";

export const getAllTemplateWorkoutCardio = async (): Promise<
  TemplateWorkoutCardio[]
> => {
  const result = await db.execute(sql`SELECT * FROM "templateWorkoutCardio"`);
  return result.rows as TemplateWorkoutCardio[];
};

export const getTemplateWorkoutCardio = async (
  id: string
): Promise<TemplateWorkoutCardio> => {
  const result = await db.execute(
    sql`SELECT * FROM "templateWorkoutCardio" WHERE id = ${id}`
  );
  if (result.rows.length === 0) {
    throw new AppError(
      `templateWorkoutCardio with ID ${id} does not exist.`,
      404
    );
  }
  return result.rows[0] as TemplateWorkoutCardio;
};

export const createTemplateWorkoutCardio = async (
  templateWorkoutCardioData: NewTemplateWorkoutCardio
): Promise<TemplateWorkoutCardio> => {
  const result = await db.execute(
    sql`INSERT INTO "templateWorkoutCardio" (template_workout_id, cardio_exercise_id, duration, distance, order_index) VALUES (${templateWorkoutCardioData.template_workout_id}, ${templateWorkoutCardioData.cardio_exercise_id}, ${templateWorkoutCardioData.duration}, ${templateWorkoutCardioData.distance}, ${templateWorkoutCardioData.order_index}) RETURNING *`
  );

  return result.rows[0] as TemplateWorkoutCardio;
};

export const updateTemplateWorkoutCardio = async (
  id: string,
  templateWorkoutCardioData: Partial<TemplateWorkoutCardio>
): Promise<TemplateWorkoutCardio> => {
  const idResult = await db.execute(
    sql`SELECT id FROM "templateWorkoutCardio" WHERE id = ${id}`
  );
  if (idResult.rows.length === 0) {
    throw new AppError(
      `templateWorkoutCardio with ID ${id} does not exist.`,
      404
    );
  }
  const updateQuery = buildUpdateQuery(
    "templateWorkoutCardio",
    templateWorkoutCardioData,
    "id",
    id
  );
  const result = await db.execute(updateQuery());
  return result.rows[0] as TemplateWorkoutCardio;
};

export const deleteTemplateWorkoutCardio = async (
  id: string
): Promise<void> => {
  const idResult = await db.execute(
    sql`SELECT id FROM "templateWorkoutCardio" WHERE id = ${id}`
  );
  if (idResult.rows.length === 0) {
    throw new AppError(
      `templateWorkoutCardio with ID ${id} does not exist.`,
      404
    );
  }

  await db.execute(sql`DELETE FROM "templateWorkoutCardio" WHERE id = ${id}`);
  return;
};
