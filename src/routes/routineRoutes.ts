import express from "express";
import * as routineController from "../controllers/routineController";

const router = express.Router();

router
  .route("/")
  .get(routineController.getAllRoutines)
  .post(routineController.createRoutine);

router
  .route("/:id")
  .get(routineController.getRoutine)
  .patch(routineController.updateRoutine)
  .delete(routineController.deleteRoutine);

export default router;
