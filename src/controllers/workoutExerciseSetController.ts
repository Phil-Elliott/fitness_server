import * as workoutExerciseSetService from "../services/workoutExerciseSetService";
import { catchAsync } from "../utils/catchAsync";

export const getAllWorkoutSets = catchAsync(async (req, res, next) => {
  const workoutSets =
    await workoutExerciseSetService.getAllWorkoutExerciseSets();
  res.status(200).json(workoutSets);
});

export const getWorkoutSet = catchAsync(async (req, res, next) => {
  const workoutSet = await workoutExerciseSetService.getWorkoutExerciseSet(
    req.params.id
  );
  res.status(200).json(workoutSet);
});

export const createWorkoutSet = catchAsync(async (req, res, next) => {
  const newWorkoutSet =
    await workoutExerciseSetService.createWorkoutExerciseSet(req.body);
  res.status(201).json({ set: newWorkoutSet });
});

export const updateWorkoutSet = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new Error("No data provided to update."));
  }

  const updatedWorkoutSet =
    await workoutExerciseSetService.updateWorkoutExerciseSet(
      req.params.id,
      req.body
    );
  res.status(200).json({ set: updatedWorkoutSet });
});

export const deleteWorkoutSet = catchAsync(async (req, res, next) => {
  await workoutExerciseSetService.deleteWorkoutExerciseSet(req.params.id);
  res.status(204).send();
});
