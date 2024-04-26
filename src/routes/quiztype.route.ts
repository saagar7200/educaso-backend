// @ts-ignore

import express from "express";
// import mediaService from "services/media/media.service";
import { Upload } from "../middlewares/fileUpload.middleware";
import { QuizTypeController } from "../controller/quiz.type.controller";
import { requestValidator } from "../middlewares/requestValidation.middleware";
import { QuizTypeInput } from "../validators/quiztype/quiztype.valodator";
const router = express.Router();

const controller = new QuizTypeController();

router.post(
  "/",
  Upload(),
  requestValidator(QuizTypeInput),
  controller.createQuizType
);

export default router;
