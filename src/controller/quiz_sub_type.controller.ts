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
import QuizSubTypeService from "../services/exam_sub_type/examsubtype.service";
import AppError from "../utils/appError";
import { QuizSubTypeInput } from "../validators/quizsubtype/quizsubtype.validator";
import QuizTypeService from "../services/quiztype/quiztype.service";
import { QuizType } from "../entities/allEntities/quizType/quiztype.entity";

export class QuizSubTypeController {
  constructor(
    private readonly quizSubTypeService = QuizSubTypeService,
    private readonly quizTypeService = QuizTypeService
  ) {}

  getAllSubQuizType = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const quiz_sub_types = await this.quizSubTypeService.getAll();
      return res.status(StatusCodes.OK).json({
        message: fetchedMessage("Exam sub-category"),
        success: true,
        data: quiz_sub_types,
      });
    }
  );

  getOneById = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const id = req.params.id;
      if (!id) {
        throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
      }
      console.log("Creating quiz sub type", id, req.body);
      const quiz_sub_type = await this.quizSubTypeService.getById(id);
      return res.status(StatusCodes.OK).json({
        message: fetchedMessage("Exam sub-category "),
        success: true,
        data: quiz_sub_type,
      });
    }
  );

  createQuizSubType = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const data: QuizSubTypeInput = req.body;
      let newQuizSubType = await this.quizSubTypeService.create(data);
      const quiz_types = await this.quizTypeService.getByIds(data.quiz_type);

      newQuizSubType.quiz_type = quiz_types;

      await newQuizSubType.save();

      return res.status(StatusCodes.CREATED).json({
        message: createdMessage("Quiz sub-category"),
        success: true,
        data: newQuizSubType,
      });
    }
  );

  updateQuizSubType = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const id = req.params.id;

      if (!id) {
        throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
      }

      const data: QuizSubTypeInput = req.body;
      console.log("Creating quiz type", req.body);
      // const quizType = await this.quizSubTypeService.getById(id);
      const updatedType = await this.quizSubTypeService.update(data, id);

      const quiz_types = await this.quizTypeService.getByIds(data.quiz_type);
      updatedType.quiz_type = quiz_types;

      await updatedType.save();

      return res.status(StatusCodes.CREATED).json({
        message: updatedMessage("Exam sub-category"),
        success: true,
        data: updatedType,
      });
    }
  );

  deleteQuizSubType = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const id = req.params.id;
      if (!id) {
        throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
      }
      console.log("date controller");
      const quiz_sub_type = await this.quizSubTypeService.delete(id);
      return res.status(StatusCodes.OK).json({
        message: deletedMessage("Exam type "),
        success: true,
        data: quiz_sub_type,
      });
    }
  );
}

export default new QuizSubTypeController();
