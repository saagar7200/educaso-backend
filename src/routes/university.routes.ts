import { universityController } from "../controller/university.controller";
import express from "express";
import { Upload } from "../middlewares/fileUpload.middleware";
import { universityInput } from "../validators/university.validator";
import { authMiddleware } from "../middlewares/auth_middleware";
import { Role } from "../constants/global";
import { requestValidator } from "../middlewares/requestValidation.middleware";

const router = express.Router();

const controller: any = new universityController();

router.post(
  "/",

  authMiddleware([Role.ADMIN, Role.SUPER_ADMIN]),

  Upload(),
  controller.create
);

router.put(
  "/:id",
  authMiddleware([Role.ADMIN, Role.SUPER_ADMIN]),
  requestValidator(universityInput),
  Upload(),
  controller.update
);

router.delete(
  "/:id",
  authMiddleware([Role.ADMIN, Role.SUPER_ADMIN]),

  controller.delete
);

router.get(
  "/",
  // authMiddleware([Role.ADMIN, Role.SUPER_ADMIN]),

  controller.getAll
);
router.get(
  "/:id",
  // authMiddleware([Role.ADMIN, Role.SUPER_ADMIN, Role.USER]),

  controller.getOneById
);
export default router;
