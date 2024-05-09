import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createdMessage,
  deletedMessage,
  fetchedMessage,
  Message,
  updatedMessage,
} from "../constants/message.constant";
import asyncHandler from "express-async-handler";
import AppError from "../utils/appError";

import ChapterService from "../services/chapter/chapter.service";
import QuestionService from "../services/question/question.service";
import SubjectService from "../services/subject/subject.service";
import { ChapterInput } from "../validators/chapter/chapter.validator";
import { QuestionInput } from "../validators/question/question.validator";
import QuizTypeService from "../services/quiztype/quiztype.service";

export class QuestionController {
  constructor(
    private readonly questionService = QuestionService,
    private readonly chapterService = ChapterService,
    private readonly subjectService = SubjectService,
    private readonly quizTypeService = QuizTypeService
  ) {}

  getAll = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const questions = await this.questionService.getAll();
    return res.status(StatusCodes.OK).json({
      message: fetchedMessage("Questions"),
      success: true,
      data: questions,
    });
  });

  getOneById = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const id = req.params.id;
      if (!id) {
        throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
      }
      console.log("Creating question", id, req.body);
      const Question = await this.questionService.getById(id);
      return res.status(StatusCodes.OK).json({
        message: fetchedMessage("Question"),
        success: true,
        data: Question,
      });
    }
  );

  create = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    console.log("Creating question", req.body);
    const data: QuestionInput = req.body;
    const question = await this.questionService.create(data);

    const subjects = await this.subjectService.getByIds(data.subjects);
    question.subjects = subjects;
    const chapter = await this.chapterService.getById(data.chapter);
    question.chapter = chapter;

    if (data.quiz_type) {
      const quiz_type = await this.quizTypeService.getByIds(data.quiz_type);
      question.quiz_type = quiz_type;
    }

    const newQuestion = await question.save();

    return res.status(StatusCodes.CREATED).json({
      message: createdMessage("Question"),
      success: true,
      data: newQuestion,
    });
  });

  update = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;

    if (!id) {
      throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
    }

    const data: QuestionInput = req.body;
    console.log("Creating quiz type", req.body);
    // const quizType = await this.questionService.getById(id);
    const question = await this.questionService.update(data, id);

    const subjects = await this.subjectService.getByIds(data.subjects);
    question.subjects = subjects;
    const chapter = await this.chapterService.getById(data.chapter);
    question.chapter = chapter;

    if (data.quiz_type) {
      const quiz_type = await this.quizTypeService.getByIds(data.quiz_type);
      question.quiz_type = quiz_type;
    }

    const newQuestion = await question.save();

    return res.status(StatusCodes.CREATED).json({
      message: updatedMessage("Chapter"),
      success: true,
      data: newQuestion,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    if (!id) {
      throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
    }
    console.log("date controller");
    const Question = await this.questionService.delete(id);
    if (Question) {
      return res.status(StatusCodes.OK).json({
        message: deletedMessage("Question"),
      });
    }

    return res.status(StatusCodes.FORBIDDEN).json({
      message: Message.INTERNAL_SERVER_ERROR,
      success: false,
    });
  });
}

export default new QuestionController();
