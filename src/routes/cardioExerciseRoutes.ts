import express from "express";

import * as cardioExerciseController from "../controllers/cardioExerciseController";

const router = express.Router();

router
  .route("/")
  .get(cardioExerciseController.getAllCardioExercises)
  .post(cardioExerciseController.createCardioExercise);

router
  .route("/:id")
  .get(cardioExerciseController.getCardioExercise)
  .patch(cardioExerciseController.updateCardioExercise)
  .delete(cardioExerciseController.deleteCardioExercise);

export default router;
