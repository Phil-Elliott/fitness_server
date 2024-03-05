import express from "express";
import * as templateWorkoutExerciseController from "../controllers/templateWorkoutExerciseController";

const router = express.Router();

router
  .route("/")
  .get(templateWorkoutExerciseController.getAllTemplateWorkoutExercises)
  .post(templateWorkoutExerciseController.createTemplateWorkoutExercise);

router
  .route("/:id")
  .get(templateWorkoutExerciseController.getTemplateWorkoutExercise)
  .patch(templateWorkoutExerciseController.updateTemplateWorkoutExercise)
  .delete(templateWorkoutExerciseController.deleteTemplateWorkoutExercise);

export default router;
