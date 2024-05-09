// @ts-ignore

import express from "express";
// import mediaService from "services/media/media.service";
import { Upload } from "../middlewares/fileUpload.middleware";
import { QuizTypeController } from "../controller/quiz.type.controller";
import { requestValidator } from "../middlewares/requestValidation.middleware";
import { QuizTypeInput } from "../validators/quiztype/quiztype.valodator";
import { authMiddleware } from "../middlewares/auth_middleware";
import { Role } from "../constants/global";
const router = express.Router();

const controller = new QuizTypeController();

router.post(
  "/",
  authMiddleware([Role.ADMIN, Role.SUPER_ADMIN]),
  requestValidator(QuizTypeInput),
  controller.createQuizType
);

router.put(
  "/:id",
  authMiddleware([Role.ADMIN, Role.SUPER_ADMIN]),
  requestValidator(QuizTypeInput),
  controller.updateQuizType
);

router.delete(
  "/:id",
  authMiddleware([Role.ADMIN, Role.SUPER_ADMIN]),

  controller.deleteQuizType
);

router.get(
  "/:id",
  authMiddleware([Role.ADMIN, Role.SUPER_ADMIN, Role.USER]),
  controller.getOneById
);

router.get(
  "/",
  authMiddleware([Role.ADMIN, Role.SUPER_ADMIN, Role.USER]),
  controller.getAllQuizType
);

export default router;
