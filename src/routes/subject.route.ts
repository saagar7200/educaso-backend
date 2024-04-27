import { SubjectInput } from "../validators/subject/subject.validator";
import { SubjectController } from "../controller/subject.controller";
import { requestValidator } from "../middlewares/requestValidation.middleware";
import express from "express";
const router = express.Router();

const controller = new SubjectController();
router.get("/", controller.getAll);
router.get("/:id", controller.getOneById);
router.delete("/:id", controller.delete);
router.put("/:id", requestValidator(SubjectInput), controller.update);
router.post("/", requestValidator(SubjectInput), controller.create);

export default router;
