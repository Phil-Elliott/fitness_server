import * as routineService from "../services/routineService";
import { catchAsync } from "../utils/catchAsync";

export const getAllRoutines = catchAsync(async (req, res, next) => {
  const routines = await routineService.getAllRoutines();
  res.status(200).json(routines);
});

export const getRoutine = catchAsync(async (req, res, next) => {
  const routine = await routineService.getRoutine(req.params.id);
  res.status(200).json(routine);
});

export const createRoutine = catchAsync(async (req, res, next) => {
  const newRoutine = await routineService.createRoutine(req.body);
  res.status(201).json({ routine: newRoutine });
});

export const updateRoutine = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new Error("No data provided to update."));
  }

  const updatedRoutine = await routineService.updateRoutine(
    req.params.id,
    req.body
  );
  res.status(200).json({ routine: updatedRoutine });
});

export const deleteRoutine = catchAsync(async (req, res, next) => {
  await routineService.deleteRoutine(req.params.id);
  res.status(204).send();
});
