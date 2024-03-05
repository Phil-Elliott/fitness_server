import * as templateWorkoutExerciseDataAccess from "../dataAccess/templateWorkoutExerciseDataAccess";
import {
  NewTemplateWorkoutExercise,
  TemplateWorkoutExercise,
} from "../types/templateWorkoutExerciseTypes";

export const getAllTemplateWorkoutExercises = async (): Promise<
  TemplateWorkoutExercise[]
> => {
  return await templateWorkoutExerciseDataAccess.getAllTemplateWorkoutExercises();
};

export const getTemplateWorkoutExercise = async (
  id: string
): Promise<TemplateWorkoutExercise> => {
  return await templateWorkoutExerciseDataAccess.getTemplateWorkoutExercise(id);
};

export const createTemplateWorkoutExercise = async (
  templateWorkoutExerciseData: NewTemplateWorkoutExercise
): Promise<TemplateWorkoutExercise> => {
  return await templateWorkoutExerciseDataAccess.createTemplateWorkoutExercise(
    templateWorkoutExerciseData
  );
};

export const updateTemplateWorkoutExercise = async (
  id: string,
  templateWorkoutExerciseData: TemplateWorkoutExercise
): Promise<TemplateWorkoutExercise> => {
  return await templateWorkoutExerciseDataAccess.updateTemplateWorkoutExercise(
    id,
    templateWorkoutExerciseData
  );
};

export const deleteTemplateWorkoutExercise = async (
  id: string
): Promise<void> => {
  return await templateWorkoutExerciseDataAccess.deleteTemplateWorkoutExercise(
    id
  );
};
