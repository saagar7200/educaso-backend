import dataSource from "../../config/database.config";
import AppError from "../../utils/appError";
import { QuizTypeInput } from "../../validators/quiztype/quiztype.valodator";
import { notFoundMessage } from "../../constants/message.constant";
import { QuizSubTypeEntity } from "../../entities/allEntities/quizSubType/quizsubtype.entity";
import { QuizSubTypeInput } from "../../validators/quizsubtype/quizsubtype.validator";
import asyncHandler from "express-async-handler";
import { In } from "typeorm";

class QuizSubTypeService {
  constructor(
    private readonly quizSubTypeRepository = dataSource.getRepository(
      QuizSubTypeEntity
    )
  ) {}

  async getAll() {
    const quizsubtypes = await this.quizSubTypeRepository.find({
      relations: {
        quiz_type: true,
        subjects: true,
      },
      order: {
        createdAt: "DESC",
      },
    });


    return quizsubtypes;
  }

  async getById(id: string) {
    console.log("quiz sub type service", id);

    const quizsubtype = await this.quizSubTypeRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        subjects: true,
        quiz_type: true,
      },
    });

    if (!quizsubtype) {
      throw AppError.NotFound(notFoundMessage("exam Type"));
    }
    console.log("get one quizsubtype service", quizsubtype);

    return quizsubtype;
  }

  async getByIds(id: string[]) {
    console.log("quiz sub type service", id);

    const quizsubtype = await this.quizSubTypeRepository.find({
      where: {
        id: In(id),
      },
      relations: {
        subjects: true,
        quiz_type: true,
      },
    });

    if (!quizsubtype) {
      throw AppError.NotFound(notFoundMessage("exam Type"));
    }
    console.log("get one quizsubtype service", quizsubtype);

    return quizsubtype;
  }

  async create(data: QuizSubTypeInput) {
    console.log("create quiztype service", data);

    try {
      // const existing_quiz_sub_type = await this.quizSubTypeRepository.findOne({
      //   where: {
      //     name: data.name,
      //   },
      // });

      // if (existing_quiz_sub_type) {
      //   throw AppError.BadRequest(
      //     `Exam type already exist with name ${data.name}`
      //   );
      // }

      const quiz_sub_type = new QuizSubTypeEntity();
      quiz_sub_type.name = data.name;
      quiz_sub_type.description = data.description ?? null;
      quiz_sub_type.exam_duration_minutes = data.exam_duration_minutes;
      quiz_sub_type.full_marks = data.full_marks;
      quiz_sub_type.total_long_questions = data.total_long_questions;
      quiz_sub_type.total_questions = data.total_questions;
      quiz_sub_type.total_short_questions = data.total_short_questions;

      // const otp = generateRandomOTP();
      // quizType.confirmEmailToken = otp.toString();

      const quiztype = await this.quizSubTypeRepository.save(quiz_sub_type);

      return quiztype;
    } catch (e: any) {
      throw AppError.InternalServer(e.message);
    }
  }

  async update(data: QuizSubTypeInput, id) {
    console.log("quiztype service", data);

    const { name, description } = data;

    const quiz_sub_type = await this.quizSubTypeRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!quiz_sub_type) {
      throw AppError.NotFound(notFoundMessage("Exam Type"));
    }

    if (name !== quiz_sub_type.name) {
      quiz_sub_type.name = name;
    }
    if (description !== quiz_sub_type.description) {
      quiz_sub_type.description = description;
    }

    if (quiz_sub_type.exam_duration_minutes !== data.exam_duration_minutes) {
      quiz_sub_type.exam_duration_minutes = data.exam_duration_minutes;
    }

    if (quiz_sub_type.full_marks !== data.full_marks) {
      quiz_sub_type.full_marks = data.full_marks;
    }

    if (quiz_sub_type.total_questions !== data.total_questions) {
      quiz_sub_type.total_questions = data.total_questions;
    }
    if (quiz_sub_type.total_short_questions !== data.total_short_questions) {
      quiz_sub_type.total_short_questions = data.total_short_questions;
    }
    if (quiz_sub_type.total_long_questions !== data.total_long_questions) {
      quiz_sub_type.total_long_questions = data.total_long_questions;
    }

    console.log("UPDATE SUB TYPE  service", quiz_sub_type);
    return await this.quizSubTypeRepository.save(quiz_sub_type);
  }

  async delete(id: string) {
    const quiz_sub_type = await this.quizSubTypeRepository.findOne({
      where: {
        id,
      },
      relations: {
        subjects: true,
        quiz_type: true,
        quiz_type_subjects: true,
      },
    });

    if (!quiz_sub_type) {
      throw AppError.NotFound(notFoundMessage("exam Type"));
    }

    return await this.quizSubTypeRepository.remove(quiz_sub_type);
  }
}

export default new QuizSubTypeService();
