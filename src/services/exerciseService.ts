import * as exerciseDataAccess from "../dataAccess/exerciseDataAccess";
import { Exercise } from "../types/exerciseTypes";

export const getAllExercises = async (): Promise<Exercise[]> => {
  return await exerciseDataAccess.getAllExercises();
};

export const getExercise = async (id: string): Promise<Exercise> => {
  return await exerciseDataAccess.getExercise(id);
};

export const createExercise = async (
  exerciseData: Exercise
): Promise<Exercise> => {
  return await exerciseDataAccess.createExercise(exerciseData);
};

export const updateExercise = async (
  id: string,
  exerciseData: Exercise
): Promise<Exercise> => {
  return await exerciseDataAccess.updateExercise(id, exerciseData);
};

export const deleteExercise = async (id: string): Promise<void> => {
  return await exerciseDataAccess.deleteExercise(id);
};
