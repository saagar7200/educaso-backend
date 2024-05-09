import { requestValidator } from "../middlewares/requestValidation.middleware";
import { QuizSubTypeController } from "../controller/quiz_sub_type.controller";
import express from "express";
import { QuizSubTypeInput } from "../validators/quizsubtype/quizsubtype.validator";
import { Role } from "../constants/global";
import { authMiddleware } from "../middlewares/auth_middleware";
const router = express.Router();

const controller = new QuizSubTypeController();
router.get(
  "/",
  authMiddleware([Role.ADMIN, Role.SUPER_ADMIN, Role.USER]),
  controller.getAllSubQuizType
);
router.get(
  "/:id",
  authMiddleware([Role.ADMIN, Role.SUPER_ADMIN, Role.USER]),

  controller.getOneById
);
router.delete(
  "/:id",
  authMiddleware([Role.ADMIN, Role.SUPER_ADMIN]),
  controller.deleteQuizSubType
);
router.put(
  "/:id",
  authMiddleware([Role.ADMIN, Role.SUPER_ADMIN]),
  requestValidator(QuizSubTypeInput),
  controller.updateQuizSubType
);
router.post(
  "/",
  authMiddleware([Role.ADMIN, Role.SUPER_ADMIN]),
  requestValidator(QuizSubTypeInput),
  controller.createQuizSubType
);

export default router;
