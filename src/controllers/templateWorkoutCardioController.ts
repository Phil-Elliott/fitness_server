import * as templateWorkoutCardioService from "../services/templateWorkoutCardioService";
import { catchAsync } from "../utils/catchAsync";

export const getAllTemplateWorkoutCardio = catchAsync(
  async (req, res, next) => {
    const templateWorkoutCardio =
      await templateWorkoutCardioService.getAllTemplateWorkoutCardio();
    res.status(200).json(templateWorkoutCardio);
  }
);

export const getTemplateWorkoutCardio = catchAsync(async (req, res, next) => {
  const templateWorkoutCardio =
    await templateWorkoutCardioService.getTemplateWorkoutCardio(req.params.id);
  res.status(200).json(templateWorkoutCardio);
});

export const createTemplateWorkoutCardio = catchAsync(
  async (req, res, next) => {
    const newTemplateWorkoutCardio =
      await templateWorkoutCardioService.createTemplateWorkoutCardio(req.body);
    res.status(201).json({ templateWorkoutCardio: newTemplateWorkoutCardio });
  }
);

export const updateTemplateWorkoutCardio = catchAsync(
  async (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return next(new Error("No data provided to update."));
    }

    const updatedTemplateWorkoutCardio =
      await templateWorkoutCardioService.updateTemplateWorkoutCardio(
        req.params.id,
        req.body
      );
    res
      .status(200)
      .json({ templateWorkoutCardio: updatedTemplateWorkoutCardio });
  }
);

export const deleteTemplateWorkoutCardio = catchAsync(
  async (req, res, next) => {
    await templateWorkoutCardioService.deleteTemplateWorkoutCardio(
      req.params.id
    );
    res.status(204).send();
  }
);
