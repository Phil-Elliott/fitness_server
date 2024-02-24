import * as userService from "../services/userService";
import { catchAsync } from "../utils/catchAsync";

export const getCurrentUser = catchAsync(async (req, res) => {
  const user = await userService.getCurrentUser(req.auth.userId);
  res.status(200).json(user);
});

export const createUser = catchAsync(async (req, res) => {
  const userId = req.auth.userId;
  const newUser = await userService.createUser({
    id: userId,
    ...req.body,
  });
  res.status(201).json({ user: newUser });
});

export const updateCurrentUser = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new Error("No data provided to update."));
  }

  const updatedUser = await userService.updateCurrentUser(
    req.auth.userId,
    req.body
  );
  res.status(200).json({ user: updatedUser });
});

export const deleteCurrentUser = catchAsync(async (req, res) => {
  await userService.deleteCurrentUser(req.auth.userId);
  res.status(204).send();
});
