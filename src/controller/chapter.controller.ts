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
import SubjectService from "../services/subject/subject.service";
import { ChapterInput } from "../validators/chapter/chapter.validator";

export class ChapterController {
  constructor(
    private readonly chapterService = ChapterService,
    private readonly subjectService = SubjectService
  ) {}

  getAll = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const Chapters = await this.chapterService.getAll();
    return res.status(StatusCodes.OK).json({
      message: fetchedMessage("Chapter"),
      success: true,

      data: Chapters,
    });
  });

  getOneById = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const id = req.params.id;
      if (!id) {
        throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
      }
      console.log("Creating quiz type", id, req.body);
      const Chapter = await this.chapterService.getById(id);
      return res.status(StatusCodes.OK).json({
        message: fetchedMessage("Chapter"),
        success: true,
        data: Chapter,
      });
    }
  );

  create = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    console.log("Creating quiz type", req.body);
    const data: ChapterInput = req.body;
    const newChapter = await this.chapterService.create(data);

    const subject = await this.subjectService.getById(data.subject);
    newChapter.subject = subject;

    const chapter = await newChapter.save();

    return res.status(StatusCodes.CREATED).json({
      message: createdMessage("Chapter"),
      success: true,
      data: chapter,
    });
  });

  update = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;

    if (!id) {
      throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
    }

    const data: ChapterInput = req.body;
    console.log("Creating quiz type", req.body);
    // const quizType = await this.chapterService.getById(id);
    const updatedChapter = await this.chapterService.update(data, id);

    const subject = await this.subjectService.getById(data.subject);
    updatedChapter.subject = subject;

    const chapter = await updatedChapter.save();

    return res.status(StatusCodes.CREATED).json({
      message: updatedMessage("Chapter"),
      success: true,
      data: chapter,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    if (!id) {
      throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
    }
    console.log("date controller");
    const Chapter = await this.chapterService.delete(id);
    if (Chapter) {
      return res.status(StatusCodes.OK).json({
        message: deletedMessage("Chapter"),
      });
    }

    return res.status(StatusCodes.FORBIDDEN).json({
      message: Message.INTERNAL_SERVER_ERROR,
      success: false,
    });
  });
}

export default new ChapterController();
