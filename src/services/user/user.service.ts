import AppError from "../../utils/appError";
import BcryptService from "../../utils/bcrypt.service";
import { notFoundMessage } from "../../constants/message.constant";
import jwt from "jsonwebtoken";
import { Role } from "../../constants/global";

class UserService {
  constructor(
    private readonly becryptService = BcryptService,
  ) {}
  async createUser(data: any) {
    console.log("data service", data);

    // const existingUser = await this.UserRepository.findOne({
    //   where: {
    //     email: data.email,
    //   },
    // });

    // if (existingUser) {
    //   throw AppError.BadRequest("User already exist with provided email.");
    // }

   
    // const otp = generateRandomOTP();
    // newUser.confirmEmailToken = otp.toString();

    // const user = await this.UserRepository.save(newUser);

    return {};
  }

  async getOne(id: string) {
    console.log("use get one service", id);

    // const user = await this.UserRepository.findOne({
    //   where: {
    //     id: id,
    //   },
    // });


    return {}
  }

  async getAll() {
    // return await this.UserRepository.findAndCount({
    //   where: {
    //     role: Role.USER,
    //   },
    // });
  }

  async getAllAdmins() {
    // return await this.UserRepository.findAndCount({
    //   where: {
    //     role: Role.SUPER_ADMIN || Role.ADMIN,
    //   },
    // });
  }

  async getByEmail(email: string) {
    console.log("use get one service", email);

    // const user = await this.UserRepository.findOne({
    //   where: {
    //     email: email,
    //   },
    //   relations: {
    //     profile_image: true,
    //   },
    // });

    // if (!user) {
    //   throw AppError.NotFound(
    //     "User does not exist.check your email and try again."
    //   );
    // }


    return {};
  }
}

export default new UserService();
