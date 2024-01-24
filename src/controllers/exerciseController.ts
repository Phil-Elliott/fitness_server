import * as exerciseService from "../services/exerciseService";
import { catchAsync } from "../utils/catchAsync";

export const getAllExercises = catchAsync(async (req, res, next) => {
  const exercises = await exerciseService.getAllExercises();
  res.status(200).json(exercises);
});

export const getExercise = catchAsync(async (req, res, next) => {
  const exercise = await exerciseService.getExercise(req.params.id);
  res.status(200).json(exercise);
});

export const createExercise = catchAsync(async (req, res, next) => {
  const newExercise = await exerciseService.createExercise(req.body);
  res.status(201).json({ exercise: newExercise });
});

export const updateExercise = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new Error("No data provided to update."));
  }

  const updatedExercise = await exerciseService.updateExercise(
    req.params.id,
    req.body
  );
  res.status(200).json({ exercise: updatedExercise });
});

export const deleteExercise = catchAsync(async (req, res, next) => {
  await exerciseService.deleteExercise(req.params.id);
  res.status(204).send();
});
