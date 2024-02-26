import * as workoutDataAccess from "../dataAccess/workoutDataAccess";
import { NewWorkout, Workout } from "../types/workoutTypes";

export const getAllWorkouts = async (userId: string): Promise<Workout[]> => {
  return await workoutDataAccess.getAllWorkouts(userId);
};

export const getWorkout = async (
  userId: string,
  workoutId: string
): Promise<Workout> => {
  return await workoutDataAccess.getWorkout(userId, workoutId);
};

export const createWorkout = async (
  userId: string,
  workoutData: NewWorkout
): Promise<Workout> => {
  return await workoutDataAccess.createWorkout(userId, workoutData);
};

export const updateWorkout = async (
  userId: string,
  workoutData: Workout
): Promise<Workout> => {
  return await workoutDataAccess.updateWorkout(userId, workoutData);
};

export const deleteWorkout = async (
  userId: string,
  workoutId: string
): Promise<void> => {
  return await workoutDataAccess.deleteWorkout(userId, workoutId);
};
