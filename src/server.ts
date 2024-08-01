// @ts-nocheck
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import http from "http";
import helmet from "helmet";
import { errorHandler, notFound } from "./middlewares/error_handler";
import dataSource, { connectDatabase } from "./config/database.config";
import { getUploadFolderPath } from "./utils/path.util";


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

  await connectDatabase();

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
  app.use('/',(req,res) => {
    res.send('server is running')
  })

  // app.use("/api/v1/auth", authRouter);


  app.use(notFound);
  app.use(errorHandler);
  // app.use(AppError);

  httpServer.listen(PORT, () => {
    console.log(`Server is running at ${URL}`);
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    httpServer.close(() => {
      process.exit(1);
    });
  });
}

try {
  bootStrap();
} catch (error: unknown) {
  console.log(error);
  process.exit(1);
}
