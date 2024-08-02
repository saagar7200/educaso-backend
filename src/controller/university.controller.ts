import { universityInput } from "../validators/university.validator";
import {
  createdMessage,
  deletedMessage,
  fetchedMessage,
  Message,
  updatedMessage,
} from "../constants/message.constant";
import MediaService from "../services/media/media.service";

import University from "../services/university/unversity.service";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import AppError from "../utils/appError";
export class universityController {
  constructor(
    private readonly university = University,
    private readonly mediaService = MediaService
  ) {}

  create = asyncHandler(async (req: any, res: any): Promise<any> => {
    const { universityPhoto, flagPhoto, ...data } = req.body;

    const university = await this.university.create(data);

    if (universityPhoto) {
      const cover = await this.mediaService.singleUpload(
        universityPhoto,
        "university"
      );

      university.universityPhoto = cover;
    }
    if (flagPhoto) {
      const cover = await this.mediaService.singleUpload(
        flagPhoto,
        "university"
      );

      university.flagPhoto = cover;
    }

    const newUniversity = await university.save();
    return res.status(StatusCodes.CREATED).json({
      message: createdMessage(" Study Abroad"),
      success: true,
      data: newUniversity,
    });
  });

  update = asyncHandler(async (req: any, res: any): Promise<any> => {
    const id = req.params.id;
    const data: universityInput = req.body;
    if (!id) {
      throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
    }

    console.log(req.body);

    const university = await this.university.update(data, id);
    if (data.universityPhoto) {
      await this.mediaService.delete(university.universityPhoto);
      const cover = await this.mediaService.singleUpload(
        data.universityPhoto,
        "university"
      );
      university.universityPhoto = cover;
    }
    if (data.flagPhoto) {
      await this.mediaService.delete(university.flagPhoto);
      const cover = await this.mediaService.singleUpload(
        data.flagPhoto,
        "university"
      );
      university.flagPhoto = cover;
    }

    const newUniversity = await university.save();

    return res.status(StatusCodes.CREATED).json({
      message: updatedMessage("university"),
      success: true,
      data: newUniversity,
    });
  });

  delete = asyncHandler(async (req: any, res: any): Promise<any> => {
    const id = req.params.id;
    if (!id) {
      throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
    }
    console.log("date controller");
    const university = await this.university.delete(id);

    if (university.flagPhoto) {
      await this.mediaService.delete(university.flagPhoto);
    }

    if (university.universityPhoto) {
      await this.mediaService.delete(university.universityPhoto);
    }

    if (university) {
      return res.status(StatusCodes.OK).json({
        message: deletedMessage("univeristy"),
      });
    }

    return res.status(StatusCodes.FORBIDDEN).json({
      message: Message.INTERNAL_SERVER_ERROR,
      success: false,
    });
  });

  getAll =  asyncHandler(async (req: any, res: any): Promise<any> =>{
    const university = await this.university.getAll();
    return res.status(StatusCodes.OK).json({
      message: fetchedMessage("university"),
      success: true,

      data: university,
    });
  })

  getOneById = asyncHandler(async (req: any, res: any): Promise<any> => {
    const id = req.params.id;
    if (!id) {
      throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
    }

    const university = await this.university.getById(id);
    return res.status(StatusCodes.OK).json({
      message: fetchedMessage("univeristy"),
      success: true,
      data: university,
    });
  });


  
}
