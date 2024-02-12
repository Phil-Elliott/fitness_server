import express from "express";

import * as exerciseController from "../controllers/exerciseController";

const router = express.Router();

router
  .route("/")
  .get(exerciseController.getAllExercises)
  .post(exerciseController.createExercise);

router
  .route("/:id")
  .get(exerciseController.getExercise)
  .patch(exerciseController.updateExercise)
  .delete(exerciseController.deleteExercise);

export default router;
