import * as routineDataAccess from "../dataAccess/routineDataAccess";
import { NewRoutine, Routine } from "../types/routineTypes";

export const getAllRoutines = async (
  clerk_user_id: string
): Promise<Routine[]> => {
  return await routineDataAccess.getAllRoutines(clerk_user_id);
};

export const getRoutine = async (id: string): Promise<Routine> => {
  return await routineDataAccess.getRoutine(id);
};

export const createRoutine = async (
  RoutineData: NewRoutine
): Promise<Routine> => {
  return await routineDataAccess.createRoutine(RoutineData);
};

export const updateRoutine = async (
  id: string,
  routineData: Routine
): Promise<Routine> => {
  return await routineDataAccess.updateRoutine(id, routineData);
};

export const deleteRoutine = async (id: string): Promise<void> => {
  return await routineDataAccess.deleteRoutine(id);
};
