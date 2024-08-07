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
import MediaService from "../services/media/media.service";
import TestPreparationService from "../services/test/testPreparation.service";
import { TestPreparationModel } from "../models/test-preparation/testPreparation.model";
import TestInput from "../validators/testPreparation.validator";
import { LogContextImpl } from "twilio/lib/rest/serverless/v1/service/environment/log";

export class testController {
  constructor(
    private readonly testPreparationService = TestPreparationService,
    private readonly mediaService = MediaService,
    private readonly imageUploadFolder = "tests"
  ) {}

  getAll = asyncHandler(async (req: any, res: any): Promise<any> => {
    const TestPreparations = await this.testPreparationService.getAll();
    return res.status(StatusCodes.OK).json({
      message: fetchedMessage("Test Preparations"),
      success: true,

      data: TestPreparations,
    });
  });

  getOneById = asyncHandler(async (req: any, res: any): Promise<any> => {
    const id = req.params.id;
    if (!id) {
      throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
    }

    const testPreparation = await this.testPreparationService.getById(id);
    return res.status(StatusCodes.OK).json({
      message: fetchedMessage("Service"),
      success: true,
      data: testPreparation,
    });
  });

  create = asyncHandler(async (req: any, res: any): Promise<any> => {
    console.log("Creating service", req.body);
    const {
      breadPhoto,
      overviewPhoto1,
      overviewPhoto2,
      registerPhoto1,
      registerPhoto2,

      ...data
    }: TestInput = req.body;

    data.testFormat = JSON.parse(data.testFormat);
    data.faq = JSON.parse(data.faq);
    data.register = JSON.parse(data.register);

    console.log(data.testFormat);

    const testPreparation = await this.testPreparationService.create(data);

    console.log(req.body);
    console.log("type of reg", typeof data.register);

    if (breadPhoto) {
      const cover = await this.mediaService.singleUpload(
        breadPhoto,
        this.imageUploadFolder
      );
      testPreparation.breadPhoto = cover;
    }
    if (overviewPhoto1) {
      const photo = await this.mediaService.singleUpload(
        overviewPhoto1,
        this.imageUploadFolder
      );
      testPreparation.overviewPhoto1 = photo;
    }

    if (overviewPhoto2) {
      const photo = await this.mediaService.singleUpload(
        overviewPhoto2,
        this.imageUploadFolder
      );
      testPreparation.overviewPhoto2 = photo;
    }

    if (registerPhoto1) {
      const photo = await this.mediaService.singleUpload(
        registerPhoto1,
        this.imageUploadFolder
      );
      testPreparation.registerPhoto1 = photo;
    }

    if (registerPhoto2) {
      const photo = await this.mediaService.singleUpload(
        registerPhoto2,
        this.imageUploadFolder
      );
      testPreparation.registerPhoto2 = photo;
    }

    console.log({ testPreparation });

    const newTest = await testPreparation.save();

    return res.status(StatusCodes.CREATED).json({
      message: createdMessage("Test Preparation"),
      success: true,
      data: newTest,
    });
  });

  update = asyncHandler(async (req: any, res: any): Promise<any> => {
    const id = req.params.id;

    console.log({ id });
    const {
      breadPhoto,
      overviewPhoto1,
      overviewPhoto2,
      registerPhoto1,
      registerPhoto2,
      ...data
    }: TestInput = req.body;

    data.testFormat = JSON.parse(data.testFormat);
    data.faq = JSON.parse(data.faq);
    data.register = JSON.parse(data.register);

    const testPreparation = await this.testPreparationService.update(data, id);

    if (registerPhoto1) {
      await this.mediaService.delete(testPreparation.registerPhoto1);
      const cover = await this.mediaService.singleUpload(
        registerPhoto1,
        "tests"
      );
      testPreparation.registerPhoto1 = cover;
    }

    if (registerPhoto2) {
      await this.mediaService.delete(testPreparation.registerPhoto2);
      const cover = await this.mediaService.singleUpload(
        registerPhoto2,
        "tests"
      );
      testPreparation.registerPhoto2 = cover;
    }
    if (overviewPhoto1) {
      await this.mediaService.delete(testPreparation.overviewPhoto1);
      const cover = await this.mediaService.singleUpload(
        overviewPhoto1,
        "tests"
      );
      testPreparation.overviewPhoto1 = cover;
    }
    if (overviewPhoto2) {
      await this.mediaService.delete(testPreparation.overviewPhoto2);
      const cover = await this.mediaService.singleUpload(
        overviewPhoto2,
        "tests"
      );
      testPreparation.overviewPhoto2 = cover;
    }
    if (breadPhoto) {
      await this.mediaService.delete(testPreparation.breadPhoto);
      const cover = await this.mediaService.singleUpload(
        breadPhoto,
        "tests"
      );

      console.log({ cover });

      testPreparation.breadPhoto = cover;
    }

    if (!id) {
      throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
    }

    // console.log("test prep type", req.body);
    // const quizType = await this.testPreparationService.getById(id);
    // const testPreparation = await this.testPreparationService.update(data, id);

    console.log({ testPreparation });

    const newTest = await testPreparation.save();

    console.log({ newTest });

    return res.status(StatusCodes.CREATED).json({
      message: updatedMessage("Service"),
      success: true,
      data: newTest,
    });
  });

  delete = asyncHandler(async (req: any, res: any): Promise<any> => {
    const id = req.params.id;
    if (!id) {
      throw AppError.BadRequest(Message.ID_NOT_PROVIDED);
    }
    console.log("date controller");
    const testPreparation = await this.testPreparationService.delete(id);

    if (testPreparation.breadPhoto) {
      await this.mediaService.delete(testPreparation.breadPhoto);
    }

    if (testPreparation.overviewPhoto1) {
      await this.mediaService.delete(testPreparation.overviewPhoto1);
    }

    if (testPreparation.overviewPhoto2) {
      await this.mediaService.delete(testPreparation.overviewPhoto2);
    }

    if (testPreparation.registerPhoto1) {
      await this.mediaService.delete(testPreparation.registerPhoto1);
    }

    if (testPreparation.registerPhoto2) {
      await this.mediaService.delete(testPreparation.registerPhoto2);
    }

    if (testPreparation) {
      return res.status(StatusCodes.OK).json({
        message: deletedMessage("Test preparation"),
      });
    }

    return res.status(StatusCodes.FORBIDDEN).json({
      message: Message.INTERNAL_SERVER_ERROR,
      success: false,
    });
  });
}

export default new testController();
