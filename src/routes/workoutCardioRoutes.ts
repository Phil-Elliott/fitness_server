import express from "express";
import * as workoutCardioController from "../controllers/workoutCardioController";

const router = express.Router();

router
  .route("/")
  .get(workoutCardioController.getAllWorkoutCardio)
  .post(workoutCardioController.createWorkoutCardio);

router
  .route("/:id")
  .get(workoutCardioController.getWorkoutCardio)
  .patch(workoutCardioController.updateWorkoutCardio)
  .delete(workoutCardioController.deleteWorkoutCardio);

export default router;
