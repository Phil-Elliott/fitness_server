import * as exerciseDataAccess from "../dataAccess/exerciseDataAccess";

type Exercise = {
  id?: string;
  name: string;
  description: string;
};

export const getAllExercises = async () => {
  return await exerciseDataAccess.getAllExercises();
};

export const getExercise = async (id: string) => {
  return await exerciseDataAccess.getExercise(id);
};

export const createExercise = async (exerciseData: Exercise) => {
  return await exerciseDataAccess.createExercise(exerciseData);
};

export const updateExercise = async (id: string, exerciseData: Exercise) => {
  return await exerciseDataAccess.updateExercise(id, exerciseData);
};

export const deleteExercise = async (id: string) => {
  return await exerciseDataAccess.deleteExercise(id);
};
