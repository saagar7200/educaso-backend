import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createdMessage } from "../constants/message.constant";
import asyncHandler from "express-async-handler";
import { QuizTypeInput } from "../validators/quiztype/quiztype.valodator";
import QuiztypeService from "../services/quiztype/quiztype.service";

export class QuizTypeController {
  constructor(private readonly quizTypeService = QuiztypeService) {}

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
}

export default new QuizTypeController();
