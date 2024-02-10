import * as workoutExerciseSetDataAccess from "../dataAccess/workoutExerciseSetDataAccess";
import {
  NewWorkoutExerciseSet,
  WorkoutExerciseSet,
} from "../types/workoutExerciseSetTypes";

export const getAllWorkoutExerciseSets = async (): Promise<
  WorkoutExerciseSet[]
> => {
  return await workoutExerciseSetDataAccess.getAllWorkoutExerciseSets();
};

export const getWorkoutExerciseSet = async (
  id: string
): Promise<WorkoutExerciseSet> => {
  return await workoutExerciseSetDataAccess.getWorkoutExerciseSet(id);
};

export const createWorkoutExerciseSet = async (
  workoutExerciseSetData: NewWorkoutExerciseSet
): Promise<WorkoutExerciseSet> => {
  return await workoutExerciseSetDataAccess.createWorkoutExerciseSet(
    workoutExerciseSetData
  );
};

export const updateWorkoutExerciseSet = async (
  id: string,
  workoutExerciseSetData: WorkoutExerciseSet
): Promise<WorkoutExerciseSet> => {
  return await workoutExerciseSetDataAccess.updateWorkoutExerciseSet(
    id,
    workoutExerciseSetData
  );
};

export const deleteWorkoutExerciseSet = async (id: string): Promise<void> => {
  return await workoutExerciseSetDataAccess.deleteWorkoutExerciseSet(id);
};
