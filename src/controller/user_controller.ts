// controllers/userController.ts
// @ts-nocheck
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createdMessage, Message } from "../constants/message.constant";
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
      // console.log("data image", req.body.fileDetails);
      console.log("user create", req.body);
      const { profileImage, ...data }: RegisterInput = req.body;
      // const { file, type } = data.profileImage;
      const newUser = await this.userService.createUser(data);

      if (profileImage) {
        const image = await this.mediaService.singleUpload(
          profileImage,
          MediaType.PROFILE_IMAGE
        );
        console.log("image", image);
        newUser.profile_image = image;
      }

      const user = await newUser.save();

      return res.status(StatusCodes.CREATED).json({
        message: createdMessage("User"),
        data: user,
      });
    }
  );
}

export default new UserController();
