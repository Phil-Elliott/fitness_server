import db from "../database/setup";
import { sql } from "drizzle-orm";
import AppError from "../utils/appError";
import { User, NewUser } from "../types/userTypes";
import buildUpdateQuery from "../utils/buildUpdateQuery";

export const getAllUsers = async (): Promise<User[]> => {
  const result = await db.execute(sql`SELECT * FROM users`);
  return result.rows as User[];
};

export const getUser = async (id: string): Promise<User> => {
  const result = await db.execute(sql`SELECT * FROM users WHERE id = ${id}`);
  if (result.rows.length === 0) {
    throw new AppError(`User with ID ${id} does not exist.`, 404);
  }
  return result.rows[0] as User;
};

export const createUser = async (userData: NewUser): Promise<User> => {
  const result = await db.execute(
    sql`INSERT INTO users (clerk_user_id, display_name, email) VALUES (${userData.clerk_user_id}, ${userData.display_name}, ${userData.email}) RETURNING *`
  );

  console.log(result.rows[0]);
  return result.rows[0] as User;
};

export const updateUser = async (
  id: string,
  userData: Partial<User>
): Promise<User> => {
  const idResult = await db.execute(sql`SELECT id FROM users WHERE id = ${id}`);
  if (idResult.rows.length === 0) {
    throw new AppError(`User with ID ${id} does not exist.`, 404);
  }
  const updateQuery = buildUpdateQuery("users", userData, "id", id);
  const result = await db.execute(updateQuery());
  return result.rows[0] as User;
};

export const deleteUser = async (id: string): Promise<void> => {
  const idResult = await db.execute(sql`SELECT id FROM users WHERE id = ${id}`);
  if (idResult.rows.length === 0) {
    throw new AppError(`User with ID ${id} does not exist.`, 404);
  }

  await db.execute(sql`DELETE FROM users WHERE id = ${id}`);
  return;
};
