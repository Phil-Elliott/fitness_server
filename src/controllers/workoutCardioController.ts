import * as workoutCardioService from "../services/workoutCardioService";
import { catchAsync } from "../utils/catchAsync";

export const getAllWorkoutCardio = catchAsync(async (req, res, next) => {
  const workoutCardio = await workoutCardioService.getAllWorkoutCardio();
  res.status(200).json(workoutCardio);
});

export const getWorkoutCardio = catchAsync(async (req, res, next) => {
  const workoutCardio = await workoutCardioService.getWorkoutCardio(
    req.params.id
  );
  res.status(200).json(workoutCardio);
});

export const createWorkoutCardio = catchAsync(async (req, res, next) => {
  const newWorkoutCardio = await workoutCardioService.createWorkoutCardio(
    req.body
  );
  res.status(201).json({ workoutCardio: newWorkoutCardio });
});

export const updateWorkoutCardio = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new Error("No data provided to update."));
  }

  const updatedWorkoutCardio = await workoutCardioService.updateWorkoutCardio(
    req.params.id,
    req.body
  );
  res.status(200).json({ workoutCardio: updatedWorkoutCardio });
});

export const deleteWorkoutCardio = catchAsync(async (req, res, next) => {
  await workoutCardioService.deleteWorkoutCardio(req.params.id);
  res.status(204).send();
});
