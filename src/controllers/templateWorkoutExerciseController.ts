import * as templateWorkoutExerciseService from "../services/templateWorkoutExerciseService";
import { catchAsync } from "../utils/catchAsync";

export const getAllTemplateWorkoutExercises = catchAsync(
  async (req, res, next) => {
    const templateWorkoutExercises =
      await templateWorkoutExerciseService.getAllTemplateWorkoutExercises();
    res.status(200).json(templateWorkoutExercises);
  }
);

export const getTemplateWorkoutExercise = catchAsync(async (req, res, next) => {
  const templateWorkoutExercise =
    await templateWorkoutExerciseService.getTemplateWorkoutExercise(
      req.params.id
    );
  res.status(200).json(templateWorkoutExercise);
});

export const createTemplateWorkoutExercise = catchAsync(
  async (req, res, next) => {
    const newTemplateWorkoutExercise =
      await templateWorkoutExerciseService.createTemplateWorkoutExercise(
        req.body
      );
    res
      .status(201)
      .json({ templateWorkoutExercise: newTemplateWorkoutExercise });
  }
);

export const updateTemplateWorkoutExercise = catchAsync(
  async (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return next(new Error("No data provided to update."));
    }

    const updatedTemplateWorkoutExercise =
      await templateWorkoutExerciseService.updateTemplateWorkoutExercise(
        req.params.id,
        req.body
      );
    res
      .status(200)
      .json({ templateWorkoutExercise: updatedTemplateWorkoutExercise });
  }
);

export const deleteTemplateWorkoutExercise = catchAsync(
  async (req, res, next) => {
    await templateWorkoutExerciseService.deleteTemplateWorkoutExercise(
      req.params.id
    );
    res.status(204).send();
  }
);
