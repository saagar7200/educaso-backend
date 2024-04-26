import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
export const notFound = (req, res, next) => {
  const error = new Error(`Not found : ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("here call middleware ");
  if (err instanceof AppError) {
    console.log("from midleware ", err.message);
    // Handle custom errors (instances of AppError)
    res.status(err.statusCode).json({
      status: err.status,
      statusCode: err.statusCode,
      message: err.message,
    });
  } else {
    // Handle other types of errors
    console.error("Handle other types of errors", err); // Log the error
    res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};
