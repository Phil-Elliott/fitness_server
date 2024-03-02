import * as templateWorkoutDataAccess from "../dataAccess/templateWorkoutDataAccess";
import {
  NewTemplateWorkout,
  TemplateWorkout,
} from "../types/templateWorkoutTypes";

export const getAllTemplateWorkouts = async (
  userId: string
): Promise<TemplateWorkout[]> => {
  return await templateWorkoutDataAccess.getAllTemplateWorkouts(userId);
};

export const getTemplateWorkout = async (
  userId: string,
  templateWorkoutId: string
): Promise<TemplateWorkout> => {
  return await templateWorkoutDataAccess.getTemplateWorkout(
    userId,
    templateWorkoutId
  );
};

export const createTemplateWorkout = async (
  userId: string,
  templateWorkoutData: NewTemplateWorkout
): Promise<TemplateWorkout> => {
  return await templateWorkoutDataAccess.createTemplateWorkout(
    userId,
    templateWorkoutData
  );
};

export const updateTemplateWorkout = async (
  userId: string,
  templateWorkoutData: TemplateWorkout
): Promise<TemplateWorkout> => {
  return await templateWorkoutDataAccess.updateTemplateWorkout(
    userId,
    templateWorkoutData
  );
};

export const deleteTemplateWorkout = async (
  userId: string,
  templateWorkoutId: string
): Promise<void> => {
  return await templateWorkoutDataAccess.deleteTemplateWorkout(
    userId,
    templateWorkoutId
  );
};
