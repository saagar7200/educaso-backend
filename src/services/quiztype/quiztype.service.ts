import { UserEntity } from "../../entities/allEntities/user/user.entity";
import dataSource from "../../config/database.config";
import { RegisterInput } from "../../validators/user/user.validator";
import AppError from "../../utils/appError";
import BcryptService from "../../utils/bcrypt.service";
import { QuizTypeInput } from "../../validators/quiztype/quiztype.valodator";
import { QuizType } from "../../entities/allEntities/quizType/quiztype.entity";

class QuizTypeService {
  constructor(
    private readonly quizTypeRepository = dataSource.getRepository(QuizType)
  ) {}
  async create(data: QuizTypeInput) {
    console.log("quiztype service", data);

    const quizType = new QuizType();
    quizType.name = data.name;
    quizType.description = data.description ?? null;
    // const otp = generateRandomOTP();
    // quizType.confirmEmailToken = otp.toString();

    const quiztype = await this.quizTypeRepository.save(quizType);
    console.log("created service", quiztype);

    return quiztype;
  }
}

export default new QuizTypeService();
