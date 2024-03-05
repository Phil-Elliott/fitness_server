import express from "express";

import * as templateScheduleController from "../controllers/templateScheduleController";

const router = express.Router();

router
  .route("/")
  .get(templateScheduleController.getAllTemplateSchedules)
  .post(templateScheduleController.createTemplateSchedule);

router
  .route("/:id")
  .get(templateScheduleController.getTemplateSchedule)
  .patch(templateScheduleController.updateTemplateSchedule)
  .delete(templateScheduleController.deleteTemplateSchedule);

export default router;
