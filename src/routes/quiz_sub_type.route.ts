import { requestValidator } from "../middlewares/requestValidation.middleware";
import { QuizSubTypeController } from "../controller/quiz_sub_type.controller";
import express from "express";
import { QuizSubTypeInput } from "../validators/quizsubtype/quizsubtype.validator";
const router = express.Router();

const controller = new QuizSubTypeController();
router.get("/", controller.getAllSubQuizType);
router.get("/:id", controller.getOneById);
router.delete("/:id", controller.deleteQuizSubType);
router.put(
  "/:id",
  requestValidator(QuizSubTypeInput),
  controller.updateQuizSubType
);
router.post(
  "/",
  requestValidator(QuizSubTypeInput),
  controller.createQuizSubType
);

export default router;
