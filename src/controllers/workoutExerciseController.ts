import * as workoutExerciseService from "../services/workoutExerciseService";
import { catchAsync } from "../utils/catchAsync";

export const getAllWorkoutExercises = catchAsync(async (req, res, next) => {
  const workoutExercises =
    await workoutExerciseService.getAllWorkoutExercises();
  res.status(200).json(workoutExercises);
});

export const getWorkoutExercise = catchAsync(async (req, res, next) => {
  const workoutExercise = await workoutExerciseService.getWorkoutExercise(
    req.params.id
  );
  res.status(200).json(workoutExercise);
});

export const createWorkoutExercise = catchAsync(async (req, res, next) => {
  const newWorkoutExercise = await workoutExerciseService.createWorkoutExercise(
    req.body
  );
  res.status(201).json({ workoutExercise: newWorkoutExercise });
});

export const updateWorkoutExercise = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new Error("No data provided to update."));
  }

  const updatedWorkoutExercise =
    await workoutExerciseService.updateWorkoutExercise(req.params.id, req.body);
  res.status(200).json({ workoutExercise: updatedWorkoutExercise });
});

export const deleteWorkoutExercise = catchAsync(async (req, res, next) => {
  await workoutExerciseService.deleteWorkoutExercise(req.params.id);
  res.status(204).send();
});
