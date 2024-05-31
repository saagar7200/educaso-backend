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
import QuizAndSubjectSetup from "../services/quiz_sub_type_subject_setup/quiz_subType_subject-setup.service";
import SubjectService from "../services/subject/subject.service";
import { ChapterInput } from "../validators/chapter/chapter.validator";
import { QuestionInput } from "../validators/question/question.validator";
import QuizTypeService from "../services/quiztype/quiztype.service";
import QuizSubTypeService from "../services/exam_sub_type/examsubtype.service";
import { QuizSubTypeSubjectInput } from "../validators/exam-subject-setup/exam-subject-setup.validator";

export class QuizSubTypeSubjectSetupController {
  constructor(
    private readonly setupService = QuizAndSubjectSetup,
    private readonly subjectService = SubjectService,
    private readonly quizTypeService = QuizTypeService,
    private readonly quizSubTypeService = QuizSubTypeService
  ) {}

  getAll = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const questions = await this.setupService.getAll();
    return res.status(StatusCodes.OK).json({
      message: fetchedMessage("Setups"),
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
      const Question = await this.setupService.getById(id);
      return res.status(StatusCodes.OK).json({
        message: fetchedMessage("Setup"),
        success: true,
        data: Question,
      });
    }
  );

  create = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    console.log("Creating question", req.body);
    const data: QuizSubTypeSubjectInput = req.body;
    const setup = await this.setupService.create(data);

    const subject = await this.subjectService.getById(data.subject);
    setup.subject = subject;
    // const chapter = await this.chapterService.getById(data.chapter);
    // setup.chapter = chapter;

    if (data.quiz_type) {
      const quiz_type = await this.quizTypeService.getById(data.quiz_type);
      setup.quiz_type = quiz_type;
    }
    if (data.quiz_sub_type) {
      const quiz_sub_type = await this.quizSubTypeService.getById(
        data.quiz_sub_type
      );
      setup.quiz_sub_type = quiz_sub_type;
    }

    const newQuestion = await setup.save();

    return res.status(StatusCodes.CREATED).json({
      message: createdMessage("Setup"),
      success: true,
      data: newQuestion,
    });
  });

  update = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;

    if (!id) {
      throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
    }

    const data: QuizSubTypeSubjectInput = req.body;
    console.log("Creating quiz type", req.body);
    // const quizType = await this.setupService.getById(id);
    const setup = await this.setupService.update(data, id);

    const subject = await this.subjectService.getById(data.subject);
    setup.subject = subject;
    // const chapter = await this.chapterService.getById(data.chapter);
    // setup.chapter = chapter;

    if (data.quiz_type) {
      const quiz_type = await this.quizTypeService.getById(data.quiz_type);
      setup.quiz_type = quiz_type;
    }
    if (data.quiz_sub_type) {
      const quiz_sub_type = await this.quizSubTypeService.getById(
        data.quiz_sub_type
      );
      setup.quiz_sub_type = quiz_sub_type;
    }

    const newQuestion = await setup.save();

    return res.status(StatusCodes.CREATED).json({
      message: updatedMessage("Setup"),
      success: true,
      data: newQuestion,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    if (!id) {
      throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
    }
    console.log("setup delete controller");
    const Question = await this.setupService.delete(id);
    if (Question) {
      return res.status(StatusCodes.OK).json({
        message: deletedMessage("Setup"),
      });
    }

    return res.status(StatusCodes.FORBIDDEN).json({
      message: Message.INTERNAL_SERVER_ERROR,
      success: false,
    });
  });
}

export default new QuizSubTypeSubjectSetupController();