import { ChapterInput } from "../validators/chapter/chapter.validator";
import { ChapterController } from "../controller/chapter.controller";
import { requestValidator } from "../middlewares/requestValidation.middleware";
import express from "express";
const router = express.Router();

const controller = new ChapterController();
router.get("/", controller.getAll);
router.get("/:id", controller.getOneById);
router.delete("/:id", controller.delete);
router.put("/:id", requestValidator(ChapterInput), controller.update);
router.post("/", requestValidator(ChapterInput), controller.create);

export default router;
