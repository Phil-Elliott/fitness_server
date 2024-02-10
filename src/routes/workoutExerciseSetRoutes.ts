import express from "express";
import * as workoutExerciseSetController from "../controllers/workoutExerciseSetController";

const router = express.Router();

router
  .route("/")
  .get(workoutExerciseSetController.getAllWorkoutSets)
  .post(workoutExerciseSetController.createWorkoutSet);

router
  .route("/:id")
  .get(workoutExerciseSetController.getWorkoutSet)
  .patch(workoutExerciseSetController.updateWorkoutSet)
  .delete(workoutExerciseSetController.deleteWorkoutSet);

export default router;
