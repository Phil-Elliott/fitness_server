import * as userService from "../services/userService";
import { catchAsync } from "../utils/catchAsync";

export const getAllUsers = catchAsync(async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json(users);
});

export const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUser(req.params.id);
  res.status(200).json(user);
});

export const createUser = catchAsync(async (req, res) => {
  const newUser = await userService.createUser(req.body);
  res.status(201).json({ user: newUser });
});

export const updateUser = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new Error("No data provided to update."));
  }

  const updatedUser = await userService.updateUser(req.params.id, req.body);
  res.status(200).json({ user: updatedUser });
});

export const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.status(204).send();
});
