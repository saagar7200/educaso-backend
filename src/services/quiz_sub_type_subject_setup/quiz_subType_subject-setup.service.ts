import dataSource from "../../config/database.config";
import AppError from "../../utils/appError";
import { notFoundMessage } from "../../constants/message.constant";
import { In } from "typeorm";
import { SubjectEntity } from "../../entities/allEntities/subject/subject.entity";
import { SubjectInput } from "../../validators/subject/subject.validator";
import { QuestionEntity } from "../../entities/allEntities/question/question.entity";
import { QuestionInput } from "../../validators/question/question.validator";
import { QuizTypeSubjectEntity } from "../../entities/allEntities/quizTpeSubject/quiztypesubjects.entity";
import { QuizSubTypeSubjectInput } from "../../validators/exam-subject-setup/exam-subject-setup.validator";

class QuizAndSubjectSetup {
  constructor(
    private readonly setupRepository = dataSource.getRepository(
      QuizTypeSubjectEntity
    )
  ) {}

  async getAll() {
    const questions = await this.setupRepository.find({
      relations: {
        subject: true,
        quiz_sub_type: true,
        quiz_type: true,
      },
      order: {
        createdAt: "DESC",
      },
    });

    return questions;
  }

  async getById(id: string) {
    const question = await this.setupRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        subject: true,
        quiz_sub_type: true,
        quiz_type: true,
      },
    });

    if (!question) {
      throw AppError.NotFound(notFoundMessage("exam Type"));
    }
    console.log("created service", question);

    return question;
  }
  async getByIds(id: string[]) {
    const questions = await this.setupRepository.find({
      where: {
        id: In(id),
      },
      relations: {
        subject: true,
        quiz_sub_type: true,
        quiz_type: true,
      },
    });

    if (!questions) {
      throw AppError.NotFound(notFoundMessage("exam Type"));
    }

    return questions;
  }

  async create(data: QuizSubTypeSubjectInput) {
    console.log("subject service", data);

    const isquestionExists = await this.setupRepository.findOne({
      where: {
        name: data.name,
      },
    });

    if (isquestionExists) {
      throw AppError.BadRequest(`Setup already exist with name ${data.name}`);
    }

    const newSetup = new QuizTypeSubjectEntity();
    newSetup.name = data.name;
    newSetup.description = data.description ?? null;
    newSetup.number_of_questions = data.number_of_questions;
    newSetup.number_of_long_questions = data.number_of_long_questions;
    newSetup.number_of_short_questions = data.number_of_short_questions;
    newSetup.total_marks = data.total_marks;
    newSetup.short_questions_mark = data.short_questions_mark;
    newSetup.long_questions_mark = data.long_questions_mark;

    const setup = await this.setupRepository.save(newSetup);
    console.log("setup service", setup);

    return setup;
  }

  async update(data: QuizSubTypeSubjectInput, id) {
    console.log("subject service", data);

    const { name, description } = data;

    const newSetup = await this.setupRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!newSetup) {
      throw AppError.NotFound(notFoundMessage("Exam Type"));
    }

    if (name !== newSetup.name) {
      newSetup.name = name;
    }
    if (description !== newSetup.description) {
      newSetup.description = description;
    }
    newSetup.name = data.name;
    newSetup.description = data.description ?? null;
    newSetup.number_of_questions = data.number_of_questions;
    newSetup.number_of_long_questions = data.number_of_long_questions;
    newSetup.number_of_short_questions = data.number_of_short_questions;
    newSetup.total_marks = data.total_marks;
    newSetup.short_questions_mark = data.short_questions_mark;
    newSetup.long_questions_mark = data.long_questions_mark;

    console.log("created service", newSetup);
    return await this.setupRepository.save(newSetup);
  }

  async delete(id: string) {
    const setup = await this.setupRepository.findOne({
      where: {
        id,
      },
      relations: {},
    });

    if (!setup) {
      throw AppError.NotFound(notFoundMessage(""));
    }

    const deleted = await this.setupRepository.remove(setup);
    console.log("Deleted question", deleted);

    return deleted;
  }
}

export default new QuizAndSubjectSetup();
