import db from "../database/setup";
import { sql } from "drizzle-orm";
import AppError from "../utils/appError";
import buildUpdateQuery from "../utils/buildUpdateQuery";
import { TemplateSchedule } from "../types/templateScheduleTypes";

export const getAllTemplateSchedules = async (): Promise<
  TemplateSchedule[]
> => {
  const result = await db.execute(sql`SELECT * FROM "templateSchedules"`);
  return result.rows as TemplateSchedule[];
};

export const getTemplateSchedule = async (
  id: string
): Promise<TemplateSchedule> => {
  const result = await db.execute(
    sql`SELECT * FROM "templateSchedules" WHERE id = ${id}`
  );
  if (result.rows.length === 0) {
    throw new AppError(`templateSchedule with ID ${id} does not exist.`, 404);
  }

  return result.rows[0] as TemplateSchedule;
};

export const createTemplateSchedule = async (
  templateScheduleData: TemplateSchedule
): Promise<TemplateSchedule> => {
  const result = await db.execute(
    sql`INSERT INTO "templateSchedules" (template_cardio_id, day_of_week, start_time, end_time) VALUES (${templateScheduleData.template_cardio_id}, ${templateScheduleData.day_of_week}, ${templateScheduleData.start_time}, ${templateScheduleData.end_time}) RETURNING *`
  );

  return result.rows[0] as TemplateSchedule;
};

export const updateTemplateSchedule = async (
  id: string,
  templateScheduleData: TemplateSchedule
): Promise<TemplateSchedule> => {
  const idResult = await db.execute(
    sql`SELECT id FROM "templateSchedules" WHERE id = ${id}`
  );
  if (idResult.rows.length === 0) {
    throw new AppError(`templateSchedule with ID ${id} does not exist.`, 404);
  }

  const updateQuery = buildUpdateQuery(
    "templateSchedules",
    templateScheduleData,
    "id",
    id
  );
  const result = await db.execute(updateQuery());

  return result.rows[0] as TemplateSchedule;
};

export const deleteTemplateSchedule = async (id: string) => {
  const idResult = await db.execute(
    sql`SELECT id FROM "templateSchedules" WHERE id = ${id}`
  );

  if (idResult.rows.length === 0) {
    throw new AppError(`templateSchedule with ID ${id} does not exist.`, 404);
  }

  await db.execute(sql`DELETE FROM "templateSchedules" WHERE id = ${id}`);
  return;
};
