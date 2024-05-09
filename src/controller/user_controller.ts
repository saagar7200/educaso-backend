// controllers/userController.ts
// @ts-nocheck
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createdMessage, Message } from "../constants/message.constant";
import {
  RegisterInput,
  UserLoginInput,
} from "../validators/user/user.validator";
import UserService from "../services/user/user.service";
import asyncHandler from "express-async-handler";
import MediaService from "../services/media/media.service";
import { MediaType } from "../constants/global";
import AppError from "../utils/appError";
import BcryptService from "../utils/bcrypt.service";
import WebTokenService from "../utils/webToken.service";

export class UserController {
  constructor(
    private readonly userService = UserService,
    private readonly mediaService = MediaService,
    private readonly bcryptService = BcryptService,
    private readonly webTokenService = WebTokenService
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
        success: true,
        data: user,
      });
    }
  );

  login = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    // console.log("data image", req.body.fileDetails);
    console.log("user create", req.body);
    const { email, password, userName }: UserLoginInput = req.body;
    // const { file, type } = data.profileImage;

    if (!email && !userName) {
      throw AppError.BadRequest("email or user name not provided");
    }

    const user = await this.userService.getByEmail(email);

    const isPasswordMatch = await this.bcryptService.compare(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      throw AppError.BadRequest("email or password does not match");
    }

    const userOption = {
      id: user.id,
      email: user.email,
    };

    const token = await this.webTokenService.generateAccessToken(
      userOption,
      user.role
    );

    const data = {
      user,
      accessToken: token,
    };

    return res.status(StatusCodes.CREATED).json({
      message: "Login successful",
      success: true,
      data,
    });
  });

  adminLogin = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      // console.log("data image", req.body.fileDetails);
      console.log("user create", req.body);
      const { email, password, userName }: UserLoginInput = req.body;
      // const { file, type } = data.profileImage;

      if (!email && !userName) {
        throw AppError.BadRequest("email or user name not provided");
      }

      const admin = await this.userService.getByEmail(email);
      if (!admin.role) {
        throw AppError.Unauthorized(Message.UNAUTHORIZED_MESSAGE);
      }
      const isPasswordMatch = await this.bcryptService.compare(
        password,
        admin.password
      );

      if (!isPasswordMatch) {
        throw AppError.BadRequest("email or password does not match");
      }

      const adminOption = {
        id: admin.id,
        email: admin.email,
      };

      const token = await this.webTokenService.generateAccessToken(
        adminOption,
        admin.role
      );

      const data = {
        user: admin,
        accessToken: token,
      };

      return res.status(StatusCodes.OK).json({
        message: "Login successful",
        success: true,
        data,
      });
    }
  );
}

export default new UserController();
