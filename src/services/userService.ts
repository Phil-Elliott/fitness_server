import * as userDataAccess from "../dataAccess/userDataAccess";
import { User, NewUser } from "../types/userTypes";

export const getCurrentUser = async (id: string): Promise<User> => {
  return await userDataAccess.getCurrentUser(id);
};

export const createUser = async (userData: NewUser): Promise<User> => {
  return await userDataAccess.createUser(userData);
};

export const updateCurrentUser = async (
  id: string,
  userData: Partial<User>
): Promise<User> => {
  return await userDataAccess.updateCurrentUser(id, userData);
};

export const deleteCurrentUser = async (id: string): Promise<void> => {
  await userDataAccess.deleteCurrentUser(id);
};
