import * as cardioService from "../services/cardioService";
import { catchAsync } from "../utils/catchAsync";

export const getAllCardio = catchAsync(async (req, res, next) => {
  const cardio = await cardioService.getAllCardio(req.auth.userId);
  res.status(200).json(cardio);
});

export const getCardio = catchAsync(async (req, res, next) => {
  const cardio = await cardioService.getCardio(req.auth.userId, req.params.id);
  res.status(200).json(cardio);
});

export const createCardio = catchAsync(async (req, res, next) => {
  const newCardio = await cardioService.createCardio(req.auth.userId, req.body);
  res.status(201).json({ cardio: newCardio });
});

export const updateCardio = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new Error("No data provided to update."));
  }

  const updatedCardio = await cardioService.updateCardio(req.auth.userId, {
    ...req.body,
    id: req.params.id,
  });
  res.status(200).json({ cardio: updatedCardio });
});

export const deleteCardio = catchAsync(async (req, res, next) => {
  await cardioService.deleteCardio(req.auth.userId, req.params.id);
  res.status(204).send();
});
