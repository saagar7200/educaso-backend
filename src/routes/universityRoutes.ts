//@ts-nocheck

import express from "express";
import {
  createUniversityController,
  deleteUniversityController,
  getUniversityController,
  getSingleUniversityController,
  univeristyPhotoController,
  updateUniversityController,
} from "../controller/universitycontroller";
import { isAdmin, authMiddleware } from "../middlewares/auth_middleware";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/",
  authMiddleware,
  isAdmin,
  formidable(),
  createUniversityController
);
//routes
router.put(
  "/update-univetsity/:pid",
  authMiddleware,
  isAdmin,
  formidable(),
  updateUniversityController
);

//get univetsity
router.get("/get-product", getUniversityController);

//single univetsity
router.get("/get-product/:slug", getSingleUniversityController);

//get photo
router.get("/university-photo/:pid", univeristyPhotoController);

//delete univetsity
router.delete("/univetsity/:pid", deleteUniversityController);

export default router;