import * as userDataAccess from "../dataAccess/userDataAccess";
import { User, NewUser } from "../types/userTypes";

export const getAllUsers = async (): Promise<User[]> => {
  return await userDataAccess.getAllUsers();
};

export const getUser = async (id: string): Promise<User> => {
  return await userDataAccess.getUser(id);
};

export const createUser = async (userData: NewUser): Promise<User> => {
  return await userDataAccess.createUser(userData);
};

export const updateUser = async (
  id: string,
  userData: Partial<User>
): Promise<User> => {
  return await userDataAccess.updateUser(id, userData);
};

export const deleteUser = async (id: string): Promise<void> => {
  await userDataAccess.deleteUser(id);
};
