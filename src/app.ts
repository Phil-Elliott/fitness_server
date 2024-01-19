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

dotenv.config({ path: "./config.env" });

const app = express();

// Global middleware
app.use(logger);
app.use("/api", rateLimiter);
app.use(express.json({ limit: "10kb" }));
securityMiddleware(app);
app.use(cookieParser());

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});

// 404 route
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;
