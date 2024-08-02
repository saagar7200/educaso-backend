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
import MediaService from "../services/media/media.service";



export class serviceController {
  constructor(
    private readonly service = Service,
    private readonly mediaService = MediaService
  ) {}

  getAll = asyncHandler(async (req: any, res: any): Promise<any> => {
    const services = await this.service.getAll();
    return res.status(StatusCodes.OK).json({
      message: fetchedMessage("service"),
      success: true,

      data: services,
    });
  });

  getOneById = asyncHandler(
    async (req: any, res: any): Promise<any> => {
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

  create = asyncHandler(async (req: any, res: any): Promise<any> => {
    console.log("Creating service", req.body);
    const {breadPhoto,photo1,photo2,...data} = req.body;
    const service = await this.service.create(data);

    if(breadPhoto){
      const cover = await this.mediaService.singleUpload(breadPhoto,'service');
      service.breadPhoto = cover
    }
    if(photo1){
     const photo= await this.mediaService.singleUpload(photo1,'service');
     service.photo1 = photo

    }

    if(photo2){
      const photo= await this.mediaService.singleUpload(photo2,'service');
      service.photo2 = photo
 
     }

    const newService = await service.save()
    


    return res.status(StatusCodes.CREATED).json({
      message: createdMessage("Service"),
      success: true,
      data: newService,
    });
  });

  update = asyncHandler(async (req: any, res: any): Promise<any> => {
    const id = req.params.id;
    const data: serviceInput = req.body;

    if (!id) {
      throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
    }



    console.log("Creating quiz type", req.body);
    // const quizType = await this.service.getById(id);
    const service = await this.service.update(data, id);
    if(data.breadPhoto){
      await this.mediaService.delete(service.breadPhoto)
      const cover = await this.mediaService.singleUpload(data.breadPhoto,'service');
      service.breadPhoto = cover
    }
    if(data.photo1){
      await this.mediaService.delete(service.photo1)

     const photo= await this.mediaService.singleUpload(data.photo1,'service');
     service.photo1 = photo

    }

    if(data.photo2){
      if(service.photo2){

        await this.mediaService.delete(service.photo2)
      }
      const photo= await this.mediaService.singleUpload(data.photo2,'service');
      service.photo2 = photo
 
     }

     const newService = await service.save();

    return res.status(StatusCodes.CREATED).json({
      message: updatedMessage("Service"),
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
    const service = await this.service.delete(id);

    if (service.breadPhoto) {
      await this.mediaService.delete(service.breadPhoto)

    }

    if(service.photo1) {
      await this.mediaService.delete(service.photo1)
    }

    if(service.photo2) {
      await this.mediaService.delete(service.photo2)
    }
    
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
