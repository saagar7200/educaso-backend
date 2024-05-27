import { ChapterInput } from "../validators/chapter/chapter.validator";
import { ChapterController } from "../controller/chapter.controller";
import { requestValidator } from "../middlewares/requestValidation.middleware";
import express from "express";
import { authMiddleware } from "../middlewares/auth_middleware";
import { Role } from "../constants/global";
import { QuizSubTypeSubjectInput } from "../validators/exam-subject-setup/exam-subject-setup.validator";
import { ExamChapterSetupController } from "../controller/exam_setup_chapter.controller";
import { QuizSubTypeSubjectChapterInput } from "../validators/exam-chapter-setup/exam-chapter-setup.validator";
const router = express.Router();

const controller = new ExamChapterSetupController();
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

  requestValidator(QuizSubTypeSubjectChapterInput),
  controller.update
);
router.post(
  "/",
  authMiddleware([Role.ADMIN, Role.SUPER_ADMIN]),
  requestValidator(QuizSubTypeSubjectChapterInput),
  controller.create
);

export default router;
