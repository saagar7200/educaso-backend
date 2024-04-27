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
import QuiztypeService from "../services/quiztype/quiztype.service";
import AppError from "../utils/appError";
import { SimpleConsoleLogger } from "typeorm";

export class QuizTypeController {
  constructor(private readonly quizTypeService = QuiztypeService) {}

  getAllQuizType = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const quizTypes = await this.quizTypeService.getAll();
      return res.status(StatusCodes.OK).json({
        message: fetchedMessage("Exam type "),
        data: quizTypes,
      });
    }
  );

  getOneById = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const id = req.params.id;
      if (!id) {
        throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
      }
      console.log("Creating quiz type", id, req.body);
      const quizType = await this.quizTypeService.getById(id);
      return res.status(StatusCodes.OK).json({
        message: fetchedMessage("Exam type "),
        data: quizType,
      });
    }
  );

  createQuizType = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      console.log("Creating quiz type", req.body);
      const data: QuizTypeInput = req.body;
      const newQuizType = await this.quizTypeService.create(data);

      return res.status(StatusCodes.CREATED).json({
        message: createdMessage("Quiz Type"),
        data: newQuizType,
      });
    }
  );

  updateQuizType = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const id = req.params.id;

      if (!id) {
        throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
      }

      const data: QuizTypeInput = req.body;
      console.log("Creating quiz type", req.body);
      // const quizType = await this.quizTypeService.getById(id);
      const updatedType = await this.quizTypeService.update(data, id);
      return res.status(StatusCodes.CREATED).json({
        message: updatedMessage("Exam type"),
        data: updatedType,
      });
    }
  );

  deleteQuizType = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const id = req.params.id;
      if (!id) {
        throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
      }
      console.log("date controller");
      const quizType = await this.quizTypeService.delete(id);
      return res.status(StatusCodes.OK).json({
        message: deletedMessage("Exam type "),
        data: quizType,
      });
    }
  );
}

export default new QuizTypeController();
