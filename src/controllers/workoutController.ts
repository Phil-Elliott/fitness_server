import * as workoutService from "../services/workoutService";
import { catchAsync } from "../utils/catchAsync";

export const getAllWorkouts = catchAsync(async (req, res, next) => {
  const workouts = await workoutService.getAllWorkouts();
  res.status(200).json(workouts);
});

export const getWorkout = catchAsync(async (req, res, next) => {
  const workout = await workoutService.getWorkout(req.params.id);
  res.status(200).json(workout);
});

export const createWorkout = catchAsync(async (req, res, next) => {
  const newWorkout = await workoutService.createWorkout(req.body);
  res.status(201).json({ workout: newWorkout });
});

export const updateWorkout = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new Error("No data provided to update."));
  }

  const updatedWorkout = await workoutService.updateWorkout(
    req.params.id,
    req.body
  );
  res.status(200).json({ workout: updatedWorkout });
});

export const deleteWorkout = catchAsync(async (req, res, next) => {
  await workoutService.deleteWorkout(req.params.id);
  res.status(204).send();
});
