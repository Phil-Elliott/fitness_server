import db from "../database/setup";
import { sql } from "drizzle-orm";
import AppError from "../utils/appError";
import buildUpdateQuery from "../utils/buildUpdateQuery";
import {
  NewTemplateWorkout,
  TemplateWorkout,
} from "../types/templateWorkoutTypes";

export const getAllTemplateWorkouts = async (
  userId: string
): Promise<TemplateWorkout[]> => {
  const result = await db.execute(
    sql`SELECT * FROM "templateWorkouts" WHERE user_id = ${userId}`
  );
  return result.rows as TemplateWorkout[];
};

export const getTemplateWorkout = async (
  userId: string,
  templateWorkoutId: string
): Promise<TemplateWorkout> => {
  const result = await db.execute(
    sql`SELECT * FROM "templateWorkouts" WHERE user_id = ${userId} AND id = ${templateWorkoutId}`
  );
  if (result.rows.length === 0) {
    throw new AppError(
      `templateWorkout with user_id = ${userId} and id ${templateWorkoutId} does not exist.`,
      404
    );
  }
  return result.rows[0] as TemplateWorkout;
};

export const createTemplateWorkout = async (
  userId: string,
  templateWorkoutData: NewTemplateWorkout
): Promise<TemplateWorkout> => {
  const result = await db.execute(
    sql`INSERT INTO "templateWorkouts" (user_id, routine_id, name, notes, rest_between_exercises, template_workout_status, frequency, duration_type, duration) VALUES (${userId}, ${templateWorkoutData.routine_id}, ${templateWorkoutData.name}, ${templateWorkoutData.notes}, ${templateWorkoutData.rest_between_exercises}, ${templateWorkoutData.template_workout_status}, ${templateWorkoutData.frequency}, ${templateWorkoutData.duration_type}, ${templateWorkoutData.duration}) RETURNING *`
  );

  return result.rows[0] as TemplateWorkout;
};

export const updateTemplateWorkout = async (
  userId: string,
  templateWorkoutData: TemplateWorkout
): Promise<TemplateWorkout> => {
  const idResult = await db.execute(
    sql`SELECT id FROM "templateWorkouts" WHERE user_id = ${userId} AND id = ${templateWorkoutData.id}`
  );
  if (idResult.rows.length === 0) {
    throw new AppError(
      `templateWorkout with ID ${templateWorkoutData.id} and user id ${userId} does not exist.`,
      404
    );
  }
  const updateQuery = buildUpdateQuery(
    "templateWorkouts",
    templateWorkoutData,
    "user_id",
    userId,
    "id",
    templateWorkoutData.id
  );
  const result = await db.execute(updateQuery());
  return result.rows[0] as TemplateWorkout;
};

export const deleteTemplateWorkout = async (
  userId: string,
  templateWorkoutId: string
): Promise<void> => {
  const idResult = await db.execute(
    sql`SELECT id FROM "templateWorkouts" WHERE user_id = ${userId} AND id = ${templateWorkoutId}`
  );
  if (idResult.rows.length === 0) {
    throw new AppError(
      `templateWorkout with ID ${templateWorkoutId} and user id ${userId} does not exist.`,
      404
    );
  }

  await db.execute(
    sql`DELETE FROM "templateWorkouts" WHERE user_id = ${userId} AND id = ${templateWorkoutId}`
  );
  return;
};
