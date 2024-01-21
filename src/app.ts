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
import * as routes from "./routes";

dotenv.config({ path: "./config.env" });

const app = express();

// Global middleware
app.use(logger);
app.use("/api", rateLimiter);
app.use(express.json({ limit: "10kb" }));
securityMiddleware(app);
app.use(cookieParser());

// ROUTES
app.use("/api/v1/", routes.exerciseRoutes);
app.use("/api/v1/", routes.routineRoutes);
app.use("/api/v1/", routes.userRoutes);
app.use("/api/v1/", routes.workoutExerciseRoutes);
app.use("/api/v1/", routes.workoutRoutes);

// 404 route
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;
