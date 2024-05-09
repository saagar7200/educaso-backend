import dataSource from "../../config/database.config";
import AppError from "../../utils/appError";
import { notFoundMessage } from "../../constants/message.constant";
import { In } from "typeorm";
import { SubjectEntity } from "../../entities/allEntities/subject/subject.entity";
import { SubjectInput } from "../../validators/subject/subject.validator";
import { QuestionEntity } from "../../entities/allEntities/question/question.entity";
import { QuestionInput } from "../../validators/question/question.validator";

class QuestionService {
  constructor(
    private readonly questionRepository = dataSource.getRepository(
      QuestionEntity
    )
  ) {}

  async getAll() {
    const questions = await this.questionRepository.find({
      relations: {
        chapter: true,
        subjects: true,
        quiz_type: true,
      },
      order: {
        createdAt: "DESC",
      },
    });

    return questions;
  }

  async getById(id: string) {
    const question = await this.questionRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        chapter: true,
        subjects: true,
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
    const questions = await this.questionRepository.find({
      where: {
        id: In(id),
      },
      relations: {
        chapter: true,
        subjects: true,
        quiz_type: true,
      },
    });

    if (!questions) {
      throw AppError.NotFound(notFoundMessage("exam Type"));
    }

    return questions;
  }

  async create(data: QuestionInput) {
    console.log("subject service", data);

    const isquestionExists = await this.questionRepository.findOne({
      where: {
        text: data.text,
      },
    });

    if (isquestionExists) {
      throw AppError.BadRequest(`Subject already exist with name ${data.text}`);
    }

    const newQuestion = new QuestionEntity();
    newQuestion.text = data.text;
    newQuestion.description = data.description ?? null;
    newQuestion.type = data.type;
    newQuestion.choices = data.choices;
    newQuestion.correct_answer = data.correct_answer;
    newQuestion.explanation = data.explanation;
    newQuestion.points = data.points;
    newQuestion.difficulty_level = data.difficulty_level;
    newQuestion.question_type = data.question_type;

    const question = await this.questionRepository.save(newQuestion);
    console.log("question service", question);

    return question;
  }

  async update(data: QuestionInput, id) {
    console.log("subject service", data);

    const { text, description } = data;

    const question = await this.questionRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!question) {
      throw AppError.NotFound(notFoundMessage("Exam Type"));
    }

    if (text !== question.text) {
      question.text = text;
    }
    if (description !== question.description) {
      question.description = description;
    }
    question.type = data.type;
    question.choices = data.choices;
    question.correct_answer = data.correct_answer;
    question.explanation = data.explanation;
    question.points = data.points;
    question.difficulty_level = data.difficulty_level;
    question.question_type = data.question_type;

    console.log("created service", question);
    return await this.questionRepository.save(question);
  }

  async delete(id: string) {
    const question = await this.questionRepository.findOne({
      where: {
        id,
      },
      relations: {},
    });

    if (!question) {
      throw AppError.NotFound(notFoundMessage("question"));
    }

    const deleted = await this.questionRepository.remove(question);
    console.log("Deleted question", deleted);

    return deleted;
  }
}

export default new QuestionService();
