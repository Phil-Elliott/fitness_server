import * as routineDataAccess from "../dataAccess/routineDataAccess";
import { NewRoutine, Routine } from "../types/routineTypes";

export const getAllRoutines = async (userId: string): Promise<Routine[]> => {
  return await routineDataAccess.getAllRoutines(userId);
};

export const getRoutine = async (
  userId: string,
  routineId: string
): Promise<Routine> => {
  return await routineDataAccess.getRoutine(userId, routineId);
};

export const createRoutine = async (
  userId: string,
  routineData: NewRoutine
): Promise<Routine> => {
  return await routineDataAccess.createRoutine(userId, routineData);
};

export const updateRoutine = async (
  userId: string,
  routineData: Routine
): Promise<Routine> => {
  return await routineDataAccess.updateRoutine(userId, routineData);
};

export const deleteRoutine = async (
  userId: string,
  routineId: string
): Promise<void> => {
  return await routineDataAccess.deleteRoutine(userId, routineId);
};
