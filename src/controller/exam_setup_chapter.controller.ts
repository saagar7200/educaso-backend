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
import ExamAndChapterSetup from "../services/exam_setup_chapter/exam_setup_chapter.service";
import SubjectService from "../services/subject/subject.service";
import ExamAndSubjectSetup from "../services/quiz_sub_type_subject_setup/quiz_subType_subject-setup.service";
import { ChapterInput } from "../validators/chapter/chapter.validator";
import { QuestionInput } from "../validators/question/question.validator";
import QuizTypeService from "../services/quiztype/quiztype.service";
import QuizSubTypeService from "../services/exam_sub_type/examsubtype.service";
import { QuizSubTypeSubjectInput } from "../validators/exam-subject-setup/exam-subject-setup.validator";
import { QuizSubTypeSubjectChapterInput } from "../validators/exam-chapter-setup/exam-chapter-setup.validator";

export class ExamChapterSetupController {
  constructor(
    private readonly setupService = ExamAndChapterSetup,
    private readonly examsetupService = ExamAndSubjectSetup,
    private readonly subjectService = SubjectService,
    private readonly quizTypeService = QuizTypeService,
    private readonly chapterService = ChapterService,
    private readonly quizSubTypeService = QuizSubTypeService
  ) {}

  getAll = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const setups = await this.setupService.getAll();
    return res.status(StatusCodes.OK).json({
      message: fetchedMessage("Chapter setups"),
      success: true,
      data: setups,
    });
  });

  getOneById = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const id = req.params.id;
      if (!id) {
        throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
      }
      console.log("Creating question", id, req.body);
      const setup = await this.setupService.getById(id);
      return res.status(StatusCodes.OK).json({
        message: fetchedMessage("Chapter setups"),
        success: true,
        data: setup,
      });
    }
  );

  create = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    console.log("Creating question", req.body);
    const data: QuizSubTypeSubjectChapterInput = req.body;
    const setup = await this.setupService.create(data);

    if (data?.chapter) {
      const chapter = await this.chapterService.getById(data.chapter);
      setup.chapter = chapter;
    }

    if (data?.quiz_type_subject) {
      const quiz_type_subject = await this.examsetupService.getById(
        data.quiz_type_subject
      );
      setup.exam_subject = quiz_type_subject;
    }

    // if (data.quiz_type) {
    //   const quiz_type = await this.quizTypeService.getById(data.quiz_type);
    //   setup.quiz_type = quiz_type;
    // }
    // if (data.quiz_sub_type) {
    //   const quiz_sub_type = await this.quizSubTypeService.getById(
    //     data.quiz_sub_type
    //   );
    //   setup.quiz_sub_type = quiz_sub_type;
    // }

    const newChapterSetup = await setup.save();

    return res.status(StatusCodes.CREATED).json({
      message: createdMessage("Chapter setup"),
      success: true,
      data: newChapterSetup,
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

    // const subject = await this.subjectService.getById(data.subject);
    // setup.subject = subject;
    // const chapter = await this.chapterService.getById(data.chapter);
    // setup.chapter = chapter;

    // if (data.quiz_type) {
    //   const quiz_type = await this.quizTypeService.getById(data.quiz_type);
    //   setup.quiz_type = quiz_type;
    // }
    // if (data.quiz_sub_type) {
    //   const quiz_sub_type = await this.quizSubTypeService.getById(
    //     data.quiz_sub_type
    //   );
    //   setup.quiz_sub_type = quiz_sub_type;
    // }

    const updatedSetup = await setup.save();

    return res.status(StatusCodes.CREATED).json({
      message: updatedMessage("Setup"),
      success: true,
      data: updatedSetup,
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

export default new ExamChapterSetupController();
