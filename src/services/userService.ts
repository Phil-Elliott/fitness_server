import * as userDataAccess from "../dataAccess/userDataAccess";
import { User, NewUser } from "../types/userTypes";

export const getCurrentUser = async (clerk_user_id: string): Promise<User> => {
  return await userDataAccess.getCurrentUser(clerk_user_id);
};

export const createUser = async (userData: NewUser): Promise<User> => {
  return await userDataAccess.createUser(userData);
};

export const updateCurrentUser = async (
  clerk_user_id: string,
  userData: Partial<User>
): Promise<User> => {
  return await userDataAccess.updateCurrentUser(clerk_user_id, userData);
};

export const deleteCurrentUser = async (
  clerk_user_id: string
): Promise<void> => {
  await userDataAccess.deleteCurrentUser(clerk_user_id);
};
