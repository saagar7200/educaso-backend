// @ts-ignore
import { requestValidator } from "../middlewares/requestValidation.middleware";
import express from "express";

import { Upload } from "../middlewares/fileUpload.middleware";
import { authMiddleware } from "../middlewares/auth_middleware";
import { Role } from "../constants/global";
import {AdminController} from "../controller/admin.controller";
import { LoginInput } from "../validators/user.validator";
const router = express.Router();
const allowedAdmins = [Role.ADMIN, Role.SUPER_ADMIN];



const controller:any = new AdminController();

router.post(
  "/register",
  authMiddleware(allowedAdmins),
  Upload(),
  controller.createUser
);

router.post(
  "/login",
  requestValidator(LoginInput),

  controller.login
);

router.post(
  "/logout",
  controller.logout
);

router.get(
  "/",
  authMiddleware(allowedAdmins),
  controller.getAll
);




export default router;
