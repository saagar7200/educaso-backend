
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createdMessage,
  fetchedMessage,
  Message,
} from "../constants/message.constant";
import {
  RegisterInput,
  LoginInput,
} from "../validators/user.validator";
import AdminService from "../services/user/admin.service";
import asyncHandler from "express-async-handler";
import MediaService from "../services/media/media.service";
import { MediaType } from "../constants/global";
import AppError from "../utils/appError";
import BcryptService from "../utils/bcrypt.service";
import WebTokenService from "../utils/webToken.service";
import DotenvConfiguration from "../config/env.config";

export class AdminController {
  constructor(
    private readonly adminService = AdminService,
    private readonly bcryptService = BcryptService,
    private readonly webTokenService = WebTokenService
  ) {}

 

  getAll = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const [admins, adminCount] = await this.adminService.getAll();
      return res.status(StatusCodes.OK).json({
        message: fetchedMessage("Admins"),
        success: true,
        data: admins,
      });
    }
  );

  createUser = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      // console.log("data image", req.body.fileDetails);
      
    }
  );

  login = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    console.log("user create", req.body);
    const { email, password, userName }: LoginInput = req.body;

    if (!email && !userName) {
      throw AppError.BadRequest("email or user name not provided");
    }

    const admin = await this.adminService.getByEmail(email);
   
    if (!admin) {
        throw AppError.NotFound(
          "Email or password doesn't match"
        );
      }

    const isPasswordMatch = await this.bcryptService.compare(
      password,
      admin.password
    );

    if (!isPasswordMatch) {
      throw AppError.BadRequest("email or password doesn't match");
    }

    const userOption = {
      id: admin.id,
      email: admin.email,
    };

    const token = await this.webTokenService.generateAccessToken(
      userOption,
      admin.role
    );

    const data = {
      admin,
      accessToken: token,
    };

    return res.cookie('access-token', token, {
      maxAge:  4 * 24 * 60 * 60 * 1000, // Cookie expiration  in 4 days 
      httpOnly: true, 
      secure: DotenvConfiguration.NODE_ENV === 'production', 
      sameSite: 'strict' // Helps protect against CSRF attacks
    }).status(StatusCodes.CREATED).json({
      message: "Login successful",
      success: true,
      data,
    });
  });

 logout = (req, res) => {
    res.cookie('access-token', '', {
      maxAge: 0, // Expire the cookie immediately
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    }).status(200).json({
      message: 'Logout successful',
      success: true,
      data: null
    });
  };
  
}

export default new AdminController();
