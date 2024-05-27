import { UserEntity } from "../../entities/allEntities/user/user.entity";
import dataSource from "../../config/database.config";
import { RegisterInput } from "../../validators/user/user.validator";
import AppError from "../../utils/appError";
import BcryptService from "../../utils/bcrypt.service";
import { QuizTypeInput } from "../../validators/quiztype/quiztype.valodator";
import { QuizType } from "../../entities/allEntities/quizType/quiztype.entity";
import { notFoundMessage } from "../../constants/message.constant";
import { In } from "typeorm";

class QuizTypeService {
  constructor(
    private readonly quizTypeRepository = dataSource.getRepository(QuizType)
  ) {}

  async getAll() {
    const quiztypes = await this.quizTypeRepository.find({
      relations: {
        questions: {
          quiz_type: false, // Assuming you want to load back-reference to quizType if necessary
          subjects: false, // Load subjects related to questions
          chapter: false, // Load chapter related to questions if required
        },
        quiz_type_subjects: true,
        quiz_sub_types: true,
      },
      order: {
        createdAt: "DESC",
      },
    });


    return quiztypes;
  }

  async getById(id: string) {
    console.log("quiztype service", id);

    const quiztype = await this.quizTypeRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        questions: true,
        quiz_type_subjects: true,
        quiz_sub_types: true,
      },
    });

    if (!quiztype) {
      throw AppError.NotFound(notFoundMessage("exam Type"));
    }

    return quiztype;
  }
  async getByIds(id: string[]) {
    const quiztype = await this.quizTypeRepository.find({
      where: {
        id: In(id),
      },
      relations: {
        quiz_sub_types: true,
      },
    });

    if (!quiztype) {
      throw AppError.NotFound(notFoundMessage("exam Type"));
    }

    return quiztype;
  }

  async create(data: QuizTypeInput) {
    console.log("quiztype service", data);

    const quiz = await this.quizTypeRepository.findOne({
      where: {
        name: data.name,
      },
    });

    if (quiz) {
      throw AppError.BadRequest(
        `Exam type already exist with name ${data.name}`
      );
    }

    const quizType = new QuizType();
    quizType.name = data.name;
    quizType.description = data.description ?? null;
    // const otp = generateRandomOTP();
    // quizType.confirmEmailToken = otp.toString();

    const quiztype = await this.quizTypeRepository.save(quizType);

    return quiztype;
  }

  async update(data: QuizTypeInput, id) {
    console.log("quiztype service", data);

    const { name, description } = data;

    const quizType = await this.quizTypeRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        quiz_sub_types: true,
        quiz_type_subjects: true,
      },
    });

    if (!quizType) {
      throw AppError.NotFound(notFoundMessage("Exam Type"));
    }

    if (name !== quizType.name) {
      quizType.name = name;
    }
    if (description !== quizType.description) {
      quizType.description = description;
    }

    console.log("update  service", quizType);
    return await this.quizTypeRepository.save(quizType);
  }

  async delete(id: string) {
    const quizType = await this.quizTypeRepository.findOne({
      where: {
        id,
      },
      relations: {
        questions: true,
        quiz_type_subjects: true,
      },
    });

    if (!quizType) {
      throw AppError.NotFound(notFoundMessage("exam Type"));
    }

    const deleted = await this.quizTypeRepository.remove(quizType);
    console.log("Deleted", deleted);

    return deleted;
  }
}

export default new QuizTypeService();
