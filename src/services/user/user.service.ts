import { UserEntity } from "../../entities/allEntities/user/user.entity";
import dataSource from "../../config/database.config";
import { RegisterInput } from "../../validators/user/user.validator";
import AppError from "../../utils/appError";
import BcryptService from "../../utils/bcrypt.service";
import { notFoundMessage } from "../../constants/message.constant";
import jwt from "jsonwebtoken";
import { Role } from "../../constants/global";

class UserService {
  constructor(
    private readonly becryptService = BcryptService,
    private readonly UserRepository = dataSource.getRepository(UserEntity)
  ) {}
  async createUser(data: RegisterInput) {
    console.log("data service", data);

    const existingUser = await this.UserRepository.findOne({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw AppError.BadRequest("User already exist with provided email.");
    }

    const newUser = new UserEntity();
    newUser.fullName = data.fullName;

    newUser.password = await this.becryptService.hash(data.password);
    newUser.email = data.email;

    newUser.phoneNumber = data.phoneNumber;
    newUser.profession = data.profession;
    // const otp = generateRandomOTP();
    // newUser.confirmEmailToken = otp.toString();

    const user = await this.UserRepository.save(newUser);

    return user;
  }

  async getOne(id: string) {
    console.log("use get one service", id);

    const user = await this.UserRepository.findOne({
      where: {
        id: id,
      },
    });


    return user;
  }

  async getAll() {
    return await this.UserRepository.findAndCount({
      where: {
        role: Role.USER,
      },
    });
  }

  async getAllAdmins() {
    return await this.UserRepository.findAndCount({
      where: {
        role: Role.SUPER_ADMIN || Role.ADMIN,
      },
    });
  }

  async getByEmail(email: string) {
    console.log("use get one service", email);

    const user = await this.UserRepository.findOne({
      where: {
        email: email,
      },
      relations: {
        profile_image: true,
      },
    });

    // if (!user) {
    //   throw AppError.NotFound(
    //     "User does not exist.check your email and try again."
    //   );
    // }


    return user;
  }
}

export default new UserService();
