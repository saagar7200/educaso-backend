// @ts-ignore
import { requestValidator } from "../middlewares/requestValidation.middleware";
import express from "express";

// import mediaService from "services/media/media.service";
import { Upload } from "../middlewares/fileUpload.middleware";
import { authMiddleware } from "../middlewares/auth_middleware";
import { Role } from "../constants/global";
const router = express.Router();
const allowedAdmins = [Role.ADMIN, Role.SUPER_ADMIN];



// const controller = new UserController();

router.post(
  "/register",
  Upload(),
  // controller.createUser
);

router.post(
  "/login",

  // controller.login
);
router.post(
  "/admin/login",
  // requestValidator(UserLoginInput),

  // controller.adminLogin
);
router.get(
  "/all-users",
  authMiddleware(Object.values(Role)),
  // controller.getAllUsers
);

router.get(
  "/all-admins",
  authMiddleware(allowedAdmins),
  // controller.getAllAdmins
);


export default router;
