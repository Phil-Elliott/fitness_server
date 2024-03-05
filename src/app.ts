import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
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

app.use("/api/v1/user", ClerkExpressRequireAuth(), routes.userRoutes);
app.use("/api/v1/routine", ClerkExpressRequireAuth(), routes.routineRoutes);
app.use(
  "/api/v1/templateWorkout",
  ClerkExpressRequireAuth(),
  routes.templateWorkoutRoutes
);
app.use(
  "/api/v1/templateWorkoutExercise",
  ClerkExpressRequireAuth(),
  routes.templateWorkoutExerciseRoutes
);
app.use("/api/v1/workout", ClerkExpressRequireAuth(), routes.workoutRoutes);
app.use("/api/v1/cardio", ClerkExpressRequireAuth(), routes.cardioRoutes);
app.use(
  "/api/v1/templateCardio",
  ClerkExpressRequireAuth(),
  routes.templateCardioRoutes
);
app.use(
  "/api/v1/workoutExercise",
  ClerkExpressRequireAuth(),
  routes.workoutExerciseRoutes
);
app.use(
  "/api/v1/workoutCardio",
  ClerkExpressRequireAuth(),
  routes.workoutCardioRoutes
);
app.use("/api/v1/exercise", ClerkExpressRequireAuth(), routes.exerciseRoutes);
app.use(
  "/api/v1/cardioExercise",
  ClerkExpressRequireAuth(),
  routes.cardioExerciseRoutes
);
app.use(
  "/api/v1/workoutExerciseSet",
  ClerkExpressRequireAuth(),
  routes.workoutExerciseSetRoutes
);

// Clerk's error handler
app.use((err: any, req: any, res: any, next: any) => {
  if (err && err.statusCode === 401) {
    return res.status(401).json({
      error: {
        name: err.name,
        message: err.message,
      },
    });
  }
  next(err);
});

// 404 route
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;
