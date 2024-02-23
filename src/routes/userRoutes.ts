import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

router.route("/").post(userController.createUser);

router
  .route("/me")
  .get(userController.getCurrentUser)
  .patch(userController.updateCurrentUser)
  .delete(userController.deleteCurrentUser);

export default router;
