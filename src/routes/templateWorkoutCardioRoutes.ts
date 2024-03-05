import express from "express";
import * as templateWorkoutCardioController from "../controllers/templateWorkoutCardioController";

const router = express.Router();

router
  .route("/")
  .get(templateWorkoutCardioController.getAllTemplateWorkoutCardio)
  .post(templateWorkoutCardioController.createTemplateWorkoutCardio);

router
  .route("/:id")
  .get(templateWorkoutCardioController.getTemplateWorkoutCardio)
  .patch(templateWorkoutCardioController.updateTemplateWorkoutCardio)
  .delete(templateWorkoutCardioController.deleteTemplateWorkoutCardio);

export default router;
