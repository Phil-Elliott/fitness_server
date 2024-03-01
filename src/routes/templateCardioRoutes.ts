import express from "express";

import * as templateCardioController from "../controllers/templateCardioController";

const router = express.Router();

router
  .route("/")
  .get(templateCardioController.getAllTemplateCardio)
  .post(templateCardioController.createTemplateCardio);

router
  .route("/:id")
  .get(templateCardioController.getTemplateCardio)
  .patch(templateCardioController.updateTemplateCardio)
  .delete(templateCardioController.deleteTemplateCardio);

export default router;
