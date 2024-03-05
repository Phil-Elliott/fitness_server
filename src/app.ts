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
import configureRoutes from "./routes/routeConfig";

dotenv.config({ path: "./config.env" });

const app = express();

// Global middleware
app.use(logger);
app.use("/api", rateLimiter);
app.use(express.json({ limit: "10kb" }));
securityMiddleware(app);
app.use(cookieParser());

configureRoutes(app);

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
