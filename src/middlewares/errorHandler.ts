import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";

const errorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    // Operational error
    res.status(err.statusCode).json({
      status: err.status,
      error: err.message,
    });
  } else {
    // Programming or other unknown error
    console.error("ERROR 💥", err);
    res.status(500).json({
      status: "error",
      error: "Internal Server Error",
    });
  }
};

export default errorHandler;
