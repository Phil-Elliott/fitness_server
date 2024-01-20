import express from "express";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import AppError from "./utils/appError";
import {
  errorHandler,
  logger,
  rateLimiter,
  securityMiddleware,
} from "./middlewares";

import pool from "./config/database";
import routineRoutes from "./routes/routineRoutes";
import exerciseRoutes from "./routes/exerciseRoutes";
import userRoutes from "./routes/userRoutes";
import workoutExerciseRoutes from "./routes/workoutExerciseRoutes";
import workoutRoutes from "./routes/workoutRoutes";

dotenv.config({ path: "./config.env" });

const app = express();

// Global middleware
app.use(logger);
app.use("/api", rateLimiter);
app.use(express.json({ limit: "10kb" }));
securityMiddleware(app);
app.use(cookieParser());

// ROUTES
app.use("/api/v1/", exerciseRoutes);
app.use("/api/v1/", routineRoutes);
app.use("/api/v1/", userRoutes);
app.use("/api/v1/", workoutExerciseRoutes);
app.use("/api/v1/", workoutRoutes);

// 404 route
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;
