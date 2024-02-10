import express from "express";
import * as workoutExerciseController from "../controllers/workoutExerciseController";

const router = express.Router();

router
  .route("/")
  .get(workoutExerciseController.getAllWorkoutExercises)
  .post(workoutExerciseController.createWorkoutExercise);

router
  .route("/:id")
  .get(workoutExerciseController.getWorkoutExercise)
  .patch(workoutExerciseController.updateWorkoutExercise)
  .delete(workoutExerciseController.deleteWorkoutExercise);

export default router;
