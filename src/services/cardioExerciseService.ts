import * as cardioExerciseDataAccess from "../dataAccess/cardioExerciseDataAccess";
import { cardioExercise } from "../types/cardioExerciseTypes";

export const getAllCardioExercises = async (): Promise<cardioExercise[]> => {
  return await cardioExerciseDataAccess.getAllCardioExercises();
};

export const getCardioExercise = async (
  id: string
): Promise<cardioExercise> => {
  return await cardioExerciseDataAccess.getCardioExercise(id);
};

export const createCardioExercise = async (
  cardioExerciseData: cardioExercise
): Promise<cardioExercise> => {
  return await cardioExerciseDataAccess.createCardioExercise(
    cardioExerciseData
  );
};

export const updateCardioExercise = async (
  id: string,
  cardioExerciseData: cardioExercise
): Promise<cardioExercise> => {
  return await cardioExerciseDataAccess.updateCardioExercise(
    id,
    cardioExerciseData
  );
};

export const deleteCardioExercise = async (id: string): Promise<void> => {
  return await cardioExerciseDataAccess.deleteCardioExercise(id);
};
