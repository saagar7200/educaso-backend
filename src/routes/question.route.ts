import { QuestionInput } from "../validators/question/question.validator";
import { QuestionController } from "../controller/question.controller";
import { requestValidator } from "../middlewares/requestValidation.middleware";
import express from "express";
const router = express.Router();

const controller = new QuestionController();
router.get("/", controller.getAll);
router.get("/:id", controller.getOneById);
router.delete("/:id", controller.delete);
router.put("/:id", requestValidator(QuestionInput), controller.update);
router.post("/", requestValidator(QuestionInput), controller.create);

export default router;
