import * as templateCardioService from "../services/templateCardioService";
import { catchAsync } from "../utils/catchAsync";

export const getAllTemplateCardio = catchAsync(async (req, res, next) => {
  const templateCardio = await templateCardioService.getAllTemplateCardio(
    req.auth.userId
  );
  res.status(200).json(templateCardio);
});

export const getTemplateCardio = catchAsync(async (req, res, next) => {
  const templateCardio = await templateCardioService.getTemplateCardio(
    req.auth.userId,
    req.params.id
  );
  res.status(200).json(templateCardio);
});

export const createTemplateCardio = catchAsync(async (req, res, next) => {
  const newTemplateCardio = await templateCardioService.createTemplateCardio(
    req.auth.userId,
    req.body
  );
  res.status(201).json({ templateCardio: newTemplateCardio });
});

export const updateTemplateCardio = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new Error("No data provided to update."));
  }

  const updatedTemplateCardio =
    await templateCardioService.updateTemplateCardio(req.auth.userId, {
      ...req.body,
      id: req.params.id,
    });
  res.status(200).json({ templateCardio: updatedTemplateCardio });
});

export const deleteTemplateCardio = catchAsync(async (req, res, next) => {
  await templateCardioService.deleteTemplateCardio(
    req.auth.userId,
    req.params.id
  );
  res.status(204).send();
});
