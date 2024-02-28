import express from "express";

import * as cardioController from "../controllers/cardioController";

const router = express.Router();

router
  .route("/")
  .get(cardioController.getAllCardio)
  .post(cardioController.createCardio);

router
  .route("/:id")
  .get(cardioController.getCardio)
  .patch(cardioController.updateCardio)
  .delete(cardioController.deleteCardio);

export default router;
