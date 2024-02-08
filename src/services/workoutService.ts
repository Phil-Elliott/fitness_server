import * as workoutDataAccess from "../dataAccess/workoutDataAccess";
import { NewWorkout, Workout } from "../types/workoutTypes";

export const getAllWorkouts = async (): Promise<Workout[]> => {
  return await workoutDataAccess.getAllWorkouts();
};

export const getWorkout = async (id: string): Promise<Workout> => {
  return await workoutDataAccess.getWorkout(id);
};

export const createWorkout = async (
  workoutData: NewWorkout
): Promise<Workout> => {
  return await workoutDataAccess.createWorkout(workoutData);
};

export const updateWorkout = async (
  id: string,
  workoutData: Workout
): Promise<Workout> => {
  return await workoutDataAccess.updateWorkout(id, workoutData);
};

export const deleteWorkout = async (id: string): Promise<void> => {
  return await workoutDataAccess.deleteWorkout(id);
};
