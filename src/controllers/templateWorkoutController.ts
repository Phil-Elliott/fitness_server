import * as templateWorkoutService from "../services/templateWorkoutService";
import { catchAsync } from "../utils/catchAsync";

export const getAllTemplateWorkouts = catchAsync(async (req, res, next) => {
  const templateWorkouts = await templateWorkoutService.getAllTemplateWorkouts(
    req.auth.userId
  );
  res.status(200).json(templateWorkouts);
});

export const getTemplateWorkout = catchAsync(async (req, res, next) => {
  const templateWorkout = await templateWorkoutService.getTemplateWorkout(
    req.auth.userId,
    req.params.id
  );
  res.status(200).json(templateWorkout);
});

export const createTemplateWorkout = catchAsync(async (req, res, next) => {
  const newTemplateWorkout = await templateWorkoutService.createTemplateWorkout(
    req.auth.userId,
    req.body
  );
  res.status(201).json({ templateWorkout: newTemplateWorkout });
});

export const updateTemplateWorkout = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new Error("No data provided to update."));
  }

  const updatedTemplateWorkout =
    await templateWorkoutService.updateTemplateWorkout(req.auth.userId, {
      ...req.body,
      id: req.params.id,
    });
  res.status(200).json({ templateWorkout: updatedTemplateWorkout });
});

export const deleteTemplateWorkout = catchAsync(async (req, res, next) => {
  await templateWorkoutService.deleteTemplateWorkout(
    req.auth.userId,
    req.params.id
  );
  res.status(204).send();
});
