import * as workoutCardioDataAccess from "../dataAccess/workoutCardioDataAccess";
import { NewWorkoutCardio, WorkoutCardio } from "../types/workoutCardioTypes";

export const getAllWorkoutCardio = async (): Promise<WorkoutCardio[]> => {
  return await workoutCardioDataAccess.getAllWorkoutCardio();
};

export const getWorkoutCardio = async (id: string): Promise<WorkoutCardio> => {
  return await workoutCardioDataAccess.getWorkoutCardio(id);
};

export const createWorkoutCardio = async (
  workoutCardioData: NewWorkoutCardio
): Promise<WorkoutCardio> => {
  return await workoutCardioDataAccess.createWorkoutCardio(workoutCardioData);
};

export const updateWorkoutCardio = async (
  id: string,
  workoutCardioData: WorkoutCardio
): Promise<WorkoutCardio> => {
  return await workoutCardioDataAccess.updateWorkoutCardio(
    id,
    workoutCardioData
  );
};

export const deleteWorkoutCardio = async (id: string): Promise<void> => {
  return await workoutCardioDataAccess.deleteWorkoutCardio(id);
};
