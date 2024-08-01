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
import Service from '../services/service/service.service';
import { serviceInput } from "../validators/service.validator";



export class serviceController {
  constructor(
    private readonly service = Service,
  ) {}

  getAll = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const services = await this.service.getAll();
    return res.status(StatusCodes.OK).json({
      message: fetchedMessage("service"),
      success: true,

      data: services,
    });
  });

  getOneById = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const id = req.params.id;
      if (!id) {
        throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
      }
    
      const service = await this.service.getById(id);
      return res.status(StatusCodes.OK).json({
        message: fetchedMessage("Service"),
        success: true,
        data: service,
      });
    }
  );

  create = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    console.log("Creating quiz type", req.body);
    const data: serviceInput = req.body;
    const service = await this.service.create(data);


    return res.status(StatusCodes.CREATED).json({
      message: createdMessage("Service"),
      success: true,
      data: service,
    });
  });

  update = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;

    if (!id) {
      throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
    }

    const data: serviceInput = req.body;
    console.log("Creating quiz type", req.body);
    // const quizType = await this.service.getById(id);
    const service = await this.service.update(data, id);


    return res.status(StatusCodes.CREATED).json({
      message: updatedMessage("service"),
      success: true,
      data: service,
    });
  });

  delete = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    if (!id) {
      throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
    }
    console.log("date controller");
    const service = await this.service.delete(id);
    if (service) {
      return res.status(StatusCodes.OK).json({
        message: deletedMessage("service"),
      });
    }

    return res.status(StatusCodes.FORBIDDEN).json({
      message: Message.INTERNAL_SERVER_ERROR,
      success: false,
    });
  });
}

export default new serviceController();
