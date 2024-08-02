import asyncHandler from "express-async-handler";
import StudyAbroadModel from "../models/studyAbroad/studyAbroad.model";
import { StatusCodes } from "http-status-codes";
import {
  createdMessage,
  deletedMessage,
  fetchedMessage,
  Message,
  updatedMessage,
} from "../constants/message.constant";

import StudyAbroad from "../services/studyabroad/studyabroad.service";
import MediaService from "../services/media/media.service";
import { studyAbroadInput } from "../validators/studyabroad.validator";
import AppError from "../utils/appError";

export class studyAbroadController {
  constructor(
    private readonly studyAbroad = StudyAbroad,
    private readonly mediaService = MediaService
  ) {}

  create = asyncHandler(async (req: any, res: any): Promise<any> => {
    const { breadPhoto, educasoImage, educationImage, ...data } = req.body;

    const studyAbroad = await this.studyAbroad.create(data);

    if (breadPhoto) {
      const cover = await this.mediaService.singleUpload(
        breadPhoto,
        "studyabroad"
      );

      studyAbroad.breadPhoto = cover;
    }
    if (educasoImage) {
      const photo = await this.mediaService.singleUpload(
        educasoImage,
        "studyabroad"
      );
      studyAbroad.educasoImage = photo;
    }

    if (educationImage) {
      const photo = await this.mediaService.singleUpload(
        educationImage,
        "studyabroad"
      );
      studyAbroad.educationImage = photo;
    }

    const newStudyAbroad = await studyAbroad.save();

    if (!newStudyAbroad) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: createdMessage("no Study Abroad"),
        success: false,
      });
    }

    return res.status(StatusCodes.CREATED).json({
      message: createdMessage(" Study Abroad"),
      success: true,
      data: newStudyAbroad,
    });
  });

  update = asyncHandler(async (req: any, res: any): Promise<any> => {
    const id = req.params.id;
    const data: studyAbroadInput = req.body;

    if (!id) {
      throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
    }

    console.log("Creating quiz type", req.body);
    // const quizType = await this.service.getById(id);
    const studyAbroad = await this.studyAbroad.update(data, id);
    if (data.breadPhoto) {
      await this.mediaService.delete(studyAbroad.breadPhoto);
      const cover = await this.mediaService.singleUpload(
        data.breadPhoto,
        "studyabroad"
      );
      studyAbroad.breadPhoto = cover;
    }
    if (data.educationImage) {
      await this.mediaService.delete(studyAbroad.educationImage);

      const photo = await this.mediaService.singleUpload(
        data.educationImage,
        "studyabroad"
      );
      studyAbroad.educationImage = photo;
    }

    if (data.educasoImage) {
      if (studyAbroad.educasoImage) {
        await this.mediaService.delete(studyAbroad.educasoImage);
      }
      const photo = await this.mediaService.singleUpload(
        data.educasoImage,
        "studyabroad"
      );
      studyAbroad.educasoImage = photo;
    }

    const newService = await studyAbroad.save();

    return res.status(StatusCodes.CREATED).json({
      message: updatedMessage("study abroad"),
      success: true,
      data: newService,
    });
  });

  delete = asyncHandler(async (req: any, res: any): Promise<any> => {
    const id = req.params.id;
    if (!id) {
      throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
    }
    console.log("date controller");
    const study = await this.studyAbroad.delete(id);

    if (study.breadPhoto) {
      await this.mediaService.delete(study.breadPhoto);
    }

    if (study.educasoImage) {
      await this.mediaService.delete(study.educasoImage);
    }

    if (study.educationImage) {
      await this.mediaService.delete(study.educationImage);
    }

    if (study) {
      return res.status(StatusCodes.OK).json({
        message: deletedMessage("study aborad"),
      });
    }

    return res.status(StatusCodes.FORBIDDEN).json({
      message: Message.INTERNAL_SERVER_ERROR,
      success: false,
    });
  });

  getAll = asyncHandler(async (req: any, res: any): Promise<any> => {
    const studyAbroad = await this.studyAbroad.getAll();
    return res.status(StatusCodes.OK).json({
      message: fetchedMessage("study Abroad"),
      success: true,

      data: studyAbroad,
    });
  });

  getOneById = asyncHandler(async (req: any, res: any): Promise<any> => {
    const id = req.params.id;
    if (!id) {
      throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
    }

    const studyAbroad = await this.studyAbroad.getById(id);
    return res.status(StatusCodes.OK).json({
      message: fetchedMessage("study Abroad"),
      success: true,
      data: studyAbroad,
    });
  });
}
