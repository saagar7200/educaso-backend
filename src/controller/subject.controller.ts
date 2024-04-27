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
import { QuizTypeInput } from "../validators/quiztype/quiztype.valodator";
import AppError from "../utils/appError";
import { SimpleConsoleLogger } from "typeorm";
import SubjectService from "../services/subject/subject.service";
import { SubjectInput } from "../validators/subject/subject.validator";
import QuizSubTypeService from "../services/exam_sub_type/examsubtype.service";
export class SubjectController {
  constructor(
    private readonly subjectService = SubjectService,
    private readonly quizSubTypeService = QuizSubTypeService
  ) {}

  getAll = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const subjects = await this.subjectService.getAll();
    return res.status(StatusCodes.OK).json({
      message: fetchedMessage("Subject"),
      data: subjects,
    });
  });

  getOneById = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const id = req.params.id;
      if (!id) {
        throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
      }
      console.log("Creating quiz type", id, req.body);
      const subject = await this.subjectService.getById(id);
      return res.status(StatusCodes.OK).json({
        message: fetchedMessage("Subject"),
        data: subject,
      });
    }
  );

  create = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    console.log("Creating quiz type", req.body);
    const data: SubjectInput = req.body;
    const newSubject = await this.subjectService.create(data);

    const quiz_sub_type = await this.quizSubTypeService.getByIds(
      data.quiz_sub_type
    );

    newSubject.quiz_sub_type = quiz_sub_type;

    const subject = await newSubject.save();

    return res.status(StatusCodes.CREATED).json({
      message: createdMessage("Subject"),
      data: subject,
    });
  });

  update = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;

    if (!id) {
      throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
    }

    const data: SubjectInput = req.body;
    console.log("Creating quiz type", req.body);
    // const quizType = await this.subjectService.getById(id);
    const updatedSubject = await this.subjectService.update(data, id);

    const quiz_sub_type = await this.quizSubTypeService.getByIds(
      data.quiz_sub_type
    );

    updatedSubject.quiz_sub_type = quiz_sub_type;

    const subject = await updatedSubject.save();

    return res.status(StatusCodes.CREATED).json({
      message: updatedMessage("Subject"),
      data: subject,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    if (!id) {
      throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
    }
    console.log("date controller");
    const subject = await this.subjectService.delete(id);
    if (subject) {
      return res.status(StatusCodes.OK).json({
        message: deletedMessage("Subject"),
      });
    }

    return res.status(StatusCodes.FORBIDDEN).json({
      message: Message.INTERNAL_SERVER_ERROR,
    });
  });
}

export default new SubjectController();
