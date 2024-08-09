import { requestValidator } from "../middlewares/requestValidation.middleware";
import express from "express";
import { authMiddleware } from "../middlewares/auth_middleware";
import { Role } from "../constants/global";
import { Upload } from "../middlewares/fileUpload.middleware";
import { testController } from "../controller/testPreparation.controller";
import TestInput from "../validators/testPreparation.validator";
const router = express.Router();

const controller: any = new testController();
router.get(
  "/",
  //   authMiddleware([Role.ADMIN, Role.SUPER_ADMIN, Role.USER]),

  controller.getAll
);
router.get(
  "/:id",
  //   authMiddleware([Role.ADMIN, Role.SUPER_ADMIN, Role.USER]),

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
  Upload(),
  // requestValidator(TestInput),
  controller.update
);
router.post(
  "/",
  Upload(),
    authMiddleware([Role.ADMIN, Role.SUPER_ADMIN]),
  // requestValidator(TestInput),
  controller.create
);

export default router;
