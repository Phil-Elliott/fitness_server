import * as workoutExerciseDataAccess from "../dataAccess/workoutExerciseDataAccess";
import {
  NewWorkoutExercise,
  WorkoutExercise,
} from "../types/workoutExerciseTypes";

export const getAllWorkoutExercises = async (): Promise<WorkoutExercise[]> => {
  return await workoutExerciseDataAccess.getAllWorkoutExercises();
};

export const getWorkoutExercise = async (
  id: string
): Promise<WorkoutExercise> => {
  return await workoutExerciseDataAccess.getWorkoutExercise(id);
};

export const createWorkoutExercise = async (
  workoutExerciseData: NewWorkoutExercise
): Promise<WorkoutExercise> => {
  return await workoutExerciseDataAccess.createWorkoutExercise(
    workoutExerciseData
  );
};

export const updateWorkoutExercise = async (
  id: string,
  workoutExerciseData: WorkoutExercise
): Promise<WorkoutExercise> => {
  return await workoutExerciseDataAccess.updateWorkoutExercise(
    id,
    workoutExerciseData
  );
};

export const deleteWorkoutExercise = async (id: string): Promise<void> => {
  return await workoutExerciseDataAccess.deleteWorkoutExercise(id);
};
