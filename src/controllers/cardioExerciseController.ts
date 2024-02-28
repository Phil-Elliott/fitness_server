import * as cardioExerciseService from "../services/cardioExerciseService";
import { catchAsync } from "../utils/catchAsync";

export const getAllCardioExercises = catchAsync(async (req, res, next) => {
  const cardioExercises = await cardioExerciseService.getAllCardioExercises();
  res.status(200).json(cardioExercises);
});

export const getCardioExercise = catchAsync(async (req, res, next) => {
  const cardioExercise = await cardioExerciseService.getCardioExercise(
    req.params.id
  );
  res.status(200).json(cardioExercise);
});

export const createCardioExercise = catchAsync(async (req, res, next) => {
  const newCardioExercise = await cardioExerciseService.createCardioExercise(
    req.body
  );
  res.status(201).json({ cardioExercise: newCardioExercise });
});

export const updateCardioExercise = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new Error("No data provided to update."));
  }

  const updatedCardioExercise =
    await cardioExerciseService.updateCardioExercise(req.params.id, req.body);
  res.status(200).json({ cardioExercise: updatedCardioExercise });
});

export const deleteCardioExercise = catchAsync(async (req, res, next) => {
  await cardioExerciseService.deleteCardioExercise(req.params.id);
  res.status(204).send();
});
