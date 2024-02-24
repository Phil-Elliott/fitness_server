import db from "../database/setup";
import { sql } from "drizzle-orm";
import AppError from "../utils/appError";
import { User, NewUser } from "../types/userTypes";
import buildUpdateQuery from "../utils/buildUpdateQuery";

export const getCurrentUser = async (id: string): Promise<User> => {
  const result = await db.execute(sql`SELECT * FROM users WHERE id = ${id}`);
  if (result.rows.length === 0) {
    throw new AppError(`User with id ${id} does not exist.`, 404);
  }
  return result.rows[0] as User;
};

export const createUser = async (userData: NewUser): Promise<User> => {
  const existingUserResult = await db.execute(
    sql`SELECT * FROM users WHERE id = ${userData.id} OR email = ${userData.email}`
  );

  if (existingUserResult.rows.length > 0) {
    throw new AppError("User already exists", 400);
  }

  const result = await db.execute(
    sql`INSERT INTO users (id, display_name, email, created_at) VALUES (${userData.id}, ${userData.display_name}, ${userData.email}, NOW()) RETURNING *`
  );

  return result.rows[0] as User;
};

export const updateCurrentUser = async (
  id: string,
  userData: Partial<User>
): Promise<User> => {
  const idResult = await db.execute(sql`SELECT id FROM users WHERE id = ${id}`);
  if (idResult.rows.length === 0) {
    throw new AppError(`User with id ${id} does not exist.`, 404);
  }
  const updateQuery = buildUpdateQuery("users", userData, "id", id);
  const result = await db.execute(updateQuery());
  return result.rows[0] as User;
};

// deletes a user and deletes all routines associated with that user
export const deleteCurrentUser = async (id: string): Promise<void> => {
  const idResult = await db.execute(sql`SELECT id FROM users WHERE id = ${id}`);
  if (idResult.rows.length === 0) {
    throw new AppError(`User with id ${id} does not exist.`, 404);
  }

  await db.execute(sql`DELETE FROM users WHERE id = ${id}`);
  return;
};
