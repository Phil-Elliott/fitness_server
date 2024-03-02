import express from "express";
import * as templateWorkoutController from "../controllers/templateWorkoutController";

const router = express.Router();

router
  .route("/")
  .get(templateWorkoutController.getAllTemplateWorkouts)
  .post(templateWorkoutController.createTemplateWorkout);

router
  .route("/:id")
  .get(templateWorkoutController.getTemplateWorkout)
  .patch(templateWorkoutController.updateTemplateWorkout)
  .delete(templateWorkoutController.deleteTemplateWorkout);

export default router;
