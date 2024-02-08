import express from "express";
import * as workoutController from "../controllers/workoutController";

const router = express.Router();

router
  .route("/")
  .get(workoutController.getAllWorkouts)
  .post(workoutController.createWorkout);

router
  .route("/:id")
  .get(workoutController.getWorkout)
  .patch(workoutController.updateWorkout)
  .delete(workoutController.deleteWorkout);

export default router;
