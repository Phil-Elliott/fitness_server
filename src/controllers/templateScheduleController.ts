import * as templateScheduleService from "../services/templateScheduleService";
import { catchAsync } from "../utils/catchAsync";

export const getAllTemplateSchedules = catchAsync(async (req, res, next) => {
  const templateSchedules =
    await templateScheduleService.getAllTemplateSchedules();
  res.status(200).json(templateSchedules);
});

export const getTemplateSchedule = catchAsync(async (req, res, next) => {
  const templateSchedule = await templateScheduleService.getTemplateSchedule(
    req.params.id
  );
  res.status(200).json(templateSchedule);
});

export const createTemplateSchedule = catchAsync(async (req, res, next) => {
  const newTemplateSchedule =
    await templateScheduleService.createTemplateSchedule(req.body);
  res.status(201).json({ templateSchedule: newTemplateSchedule });
});

export const updateTemplateSchedule = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new Error("No data provided to update."));
  }

  const updatedTemplateSchedule =
    await templateScheduleService.updateTemplateSchedule(
      req.params.id,
      req.body
    );
  res.status(200).json({ templateSchedule: updatedTemplateSchedule });
});

export const deleteTemplateSchedule = catchAsync(async (req, res, next) => {
  await templateScheduleService.deleteTemplateSchedule(req.params.id);
  res.status(204).send();
});
