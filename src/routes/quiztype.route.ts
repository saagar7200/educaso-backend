// @ts-ignore

import express from "express";
// import mediaService from "services/media/media.service";
import { Upload } from "../middlewares/fileUpload.middleware";
import { QuizTypeController } from "../controller/quiz.type.controller";
import { requestValidator } from "../middlewares/requestValidation.middleware";
import { QuizTypeInput } from "../validators/quiztype/quiztype.valodator";
const router = express.Router();

const controller = new QuizTypeController();

router.post("/", requestValidator(QuizTypeInput), controller.createQuizType);
router.put("/:id", requestValidator(QuizTypeInput), controller.updateQuizType);
router.delete("/:id", controller.deleteQuizType);
router.get("/:id", controller.getOneById);
router.get("/", controller.getAllQuizType);

export default router;
