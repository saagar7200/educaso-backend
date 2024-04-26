// controllers/userController.ts
// @ts-nocheck
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createdMessage, Message } from "../constants/message.constant";
import AppError from "../utils/appError";
import { RegisterInput } from "../validators/user/user.validator";
import UserService from "../services/user/user.service";
import asyncHandler from "express-async-handler";
import MediaService from "../services/media/media.service";
import { MediaType } from "../constants/global";

export class UserController {
  constructor(
    private readonly userService = UserService,
    private readonly mediaService = MediaService
  ) {}

  createUser = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      console.log("data", req.files.file);
      console.log("data", req.files.profileImage);
      console.log("data");
      const data: RegisterInput = req.body;
      // const { file, type } = data.profileImage;
      const newUser = await this.userService.createUser(data);

      if (req.files) {
        const image = await this.mediaService.singleUpload(
          req.files.file,
          MediaType.PROFILE_IMAGE
        );
        console.log("image", image);
      }

      return res.status(StatusCodes.CREATED).json({
        message: createdMessage("User"),
        data: newUser,
      });
    }
  );
}

export default new UserController();
