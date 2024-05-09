import { QuestionInput } from "../validators/question/question.validator";
import { QuestionController } from "../controller/question.controller";
import { requestValidator } from "../middlewares/requestValidation.middleware";
import express from "express";
import { authMiddleware } from "../middlewares/auth_middleware";
import { Role } from "../constants/global";
const router = express.Router();

const controller = new QuestionController();
router.get(
  "/",
  authMiddleware([Role.ADMIN, Role.SUPER_ADMIN, Role.USER]),
  controller.getAll
);
router.get(
  "/:id",
  authMiddleware([Role.ADMIN, Role.SUPER_ADMIN, Role.USER]),

  controller.getOneById
);
router.delete(
  "/:id",
  authMiddleware([Role.ADMIN, Role.SUPER_ADMIN]),
  controller.delete
);
router.put(
  "/:id",
  authMiddleware([Role.ADMIN, Role.SUPER_ADMIN]),
  requestValidator(QuestionInput),
  controller.update
);
router.post(
  "/",
  authMiddleware([Role.ADMIN, Role.SUPER_ADMIN]),
  requestValidator(QuestionInput),
  controller.create
);

export default router;
