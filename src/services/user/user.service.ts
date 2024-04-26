import { UserEntity } from "../../entities/allEntities/user/user.entity";
import dataSource from "../../config/database.config";
import { RegisterInput } from "../../validators/user/user.validator";
import AppError from "../../utils/appError";
import BcryptService from "../../utils/bcrypt.service";

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
    console.log("created service", user);

    return user;
  }
}

export default new UserService();