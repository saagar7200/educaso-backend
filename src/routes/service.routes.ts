import { serviceInput } from "../validators/service.validator";
import { serviceController } from "../controller/service.controller";
import { requestValidator } from "../middlewares/requestValidation.middleware";
import express from "express";
import { authMiddleware } from "../middlewares/auth_middleware";
import { Role } from "../constants/global";
import { Upload } from "../middlewares/fileUpload.middleware";
const router = express.Router();

const controller = new serviceController();
router.get(
  "/",
//   authMiddleware([Role.ADMIN, Role.SUPER_ADMIN, Role.USER]),

  controller.getAll
);
router.get(
  "/:id",
  authMiddleware([Role.ADMIN, Role.SUPER_ADMIN, Role.USER]),

  controller.getOneById
);
router.delete(
  "/:id",
//   authMiddleware([Role.ADMIN, Role.SUPER_ADMIN]),

  controller.delete
);
router.put(
  "/:id",
//   authMiddleware([Role.ADMIN, Role.SUPER_ADMIN]),
  requestValidator(serviceInput),
  controller.update
);
router.post(
  "/",
  Upload(),
//   authMiddleware([Role.ADMIN, Role.SUPER_ADMIN]),
//   requestValidator(serviceInput),
  controller.create
);

export default router;
