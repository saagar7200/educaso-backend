// @ts-nocheck
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import http from "http";
import helmet from "helmet";
import { errorHandler, notFound } from "./middlewares/error_handler";
import dataSource from "./config/database.config";
import { getUploadFolderPath } from "./utils/path.util";
import authRouter from "./routes/auth_routes";
import AppError from "./utils/appError";
import fileUpload from "express-fileupload";

const app = express();
const httpServer = http.createServer(app);
async function bootStrap() {
  dotenv.config();
  const HOST = process.env.APP_HOST || "localhost";
  const PORT = process.env.PORT || 3000;

  const URL =
    `http://${HOST}:${process.env.PORT}` ||
    `http://localhost:${process.env.PORT}`;

  // dbConnect();
  process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });

  await dataSource.initialize();

  app.use(cors());
  app.use(morgan("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // This disables the Content-Security-Policy
  // and X-Download-Options headers.
  app.use(
    helmet({
      contentSecurityPolicy: false,
      xDownloadOptions: false,
    })
  );
  app.use(fileUpload());
  // static path for uploaded images
  app.use(express.static(getUploadFolderPath()));

  app.use("/api/user", authRouter);
  // app.use("/api/quiz/category", quizCategoryRouter);
  // app.use("/api/quiz", quizRouter);
  // app.use("/api/question", questionRouter);
  // app.use("/api", dashboardRouter);
  // app.use("/api/quiz/result", quizResultRouter);
  // app.use("/api/avatar", avatarRouter);

  app.use(notFound);
  app.use(errorHandler);
  // app.use(AppError);

  httpServer.listen(PORT, () => {
    console.log(`Server is running at ${URL}`);
  });

  // process.on("unhandledRejection", (err) => {
  //   console.log(`Error: ${err.message}`);
  //   console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  //   httpServer.close(() => {
  //     process.exit(1);
  //   });
  // });

  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    // Handle the error, or log it, or throw it...
  });
}

try {
  bootStrap();
} catch (error: unknown) {
  console.log(error);
  process.exit(1);
}
