import db from "../database/setup";
import { sql } from "drizzle-orm";
import AppError from "../utils/appError";
import buildUpdateQuery from "../utils/buildUpdateQuery";
import {
  NewTemplateCardio,
  TemplateCardio,
} from "../types/templateCardioTypes";

export const getAllTemplateCardio = async (
  userId: string
): Promise<TemplateCardio[]> => {
  const result = await db.execute(
    sql`SELECT * FROM "templateCardio" WHERE user_id = ${userId}`
  );
  return result.rows as TemplateCardio[];
};

export const getTemplateCardio = async (
  userId: string,
  templateCardioId: string
): Promise<TemplateCardio> => {
  console.log(userId, templateCardioId);
  const result = await db.execute(
    sql`SELECT * FROM "templateCardio" WHERE user_id = ${userId} AND id = ${templateCardioId}`
  );
  if (result.rows.length === 0) {
    throw new AppError(
      `templateCardio with user_id = ${userId} and id ${templateCardioId} does not exist.`,
      404
    );
  }
  return result.rows[0] as TemplateCardio;
};

export const createTemplateCardio = async (
  userId: string,
  templateCardioData: NewTemplateCardio
): Promise<TemplateCardio> => {
  const result = await db.execute(
    sql`INSERT INTO "templateCardio" (user_id, routine_id, cardio_exercise_id, notes, template_cardio_status, frequency, duration_type, duration_value) VALUES (${userId}, ${templateCardioData.routine_id}, ${templateCardioData.cardio_exercise_id}, ${templateCardioData.notes}, ${templateCardioData.template_cardio_status}, ${templateCardioData.frequency}, ${templateCardioData.duration_type}, ${templateCardioData.duration_value}) RETURNING *`
  );

  return result.rows[0] as TemplateCardio;
};

export const updateTemplateCardio = async (
  userId: string,
  templateCardioData: TemplateCardio
): Promise<TemplateCardio> => {
  const idResult = await db.execute(
    sql`SELECT id FROM "templateCardio" WHERE user_id = ${userId} AND id = ${templateCardioData.id}`
  );
  if (idResult.rows.length === 0) {
    throw new AppError(
      `templateCardio with ID ${templateCardioData.id} and user id ${userId} does not exist.`,
      404
    );
  }
  const updateQuery = buildUpdateQuery(
    "templateCardio",
    templateCardioData,
    "user_id",
    userId,
    "id",
    templateCardioData.id
  );
  const result = await db.execute(updateQuery());
  return result.rows[0] as TemplateCardio;
};

export const deleteTemplateCardio = async (
  userId: string,
  templateCardioId: string
): Promise<void> => {
  const idResult = await db.execute(
    sql`SELECT id FROM "templateCardio" WHERE user_id = ${userId} AND id = ${templateCardioId}`
  );
  if (idResult.rows.length === 0) {
    throw new AppError(
      `templateCardio with ID ${templateCardioId} and user id ${userId} does not exist.`,
      404
    );
  }

  await db.execute(
    sql`DELETE FROM "templateCardio" WHERE user_id = ${userId} AND id = ${templateCardioId}`
  );
  return;
};
