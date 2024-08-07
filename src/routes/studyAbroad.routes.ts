import { Upload } from "../middlewares/fileUpload.middleware";
import { studyAbroadController } from "../controller/studyAbroad.controller";
import express from "express";
import { requestValidator } from "../middlewares/requestValidation.middleware";
import { studyAbroadInput } from "../validators/studyabroad.validator";
import { authMiddleware } from "../middlewares/auth_middleware";
import { Role } from "../constants/global";

const router = express.Router();

const controller: any = new studyAbroadController();

router.post("/", Upload(), controller.create);

router.put(
  "/:id",
  // authMiddleware([Role.ADMIN, Role.SUPER_ADMIN]),
  // requestValidator(studyAbroadInput),
  Upload(),
  controller.update
);

router.delete(
  "/:id",
  // authMiddleware([Role.ADMIN, Role.SUPER_ADMIN]),

  controller.delete
);

router.get("/", controller.getAll);
router.get(
  "/:id",
  // authMiddleware([Role.ADMIN, Role.SUPER_ADMIN, Role.USER]),

  controller.getOneById
);
export default router;
