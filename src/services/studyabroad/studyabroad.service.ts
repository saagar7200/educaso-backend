import { studyAbroadInput } from "../../validators/studyabroad.validator";
import StudyAbroadModel from "../../models/studyAbroad/studyAbroad.model";

import { serviceInput } from "../../validators/service.validator";
import { notFoundMessage } from "../../constants/message.constant";
import AppError from "../../utils/appError";

class StudyAbroad {
  async create(
    data: Omit<
      studyAbroadInput,
      "breadPhoto" | "educasoImage" | "educationImage"
    >
  ) {
    console.log("Creating studyabroad... ");

    const newStudyAbroad = new StudyAbroadModel();
    newStudyAbroad.title = data.title;
    newStudyAbroad.description1 = data.description1 ?? null;
    newStudyAbroad.description2 = data.description2 ?? null;
    newStudyAbroad.educationList = [data.educationList];
    newStudyAbroad.educationDialog = data.educationDialog;
    newStudyAbroad.isInEurope = data.isInEurope;

    // const service = await newService.save();

    return newStudyAbroad;
  }

  async update(data: studyAbroadInput, id: string) {
    // console.log(" service", data);

    const {
      title,
      description1,
      description2,
      educationDialog,
      educationList,
      isInEurope,
    } = data;

    const studyAbroad = await StudyAbroadModel.findOne({
      _id: id,
    });

    if (!studyAbroad) {
      throw AppError.NotFound(notFoundMessage("study abroad"));
    }

    if (title !== studyAbroad.title) {
      studyAbroad.title = title;
    }
    if (description1 !== studyAbroad.description1) {
      studyAbroad.description1 = description1;
    }
    if (description2 !== studyAbroad.description2) {
      studyAbroad.description2 = description2;
    }
    if (educationDialog !== studyAbroad.educationDialog) {
      studyAbroad.educationDialog = educationDialog;
    }
    /*     if (educationList !== studyAbroad.educationList) {
      studyAbroad.educationList = educationList;
    } */
    if (isInEurope !== studyAbroad.isInEurope) {
      studyAbroad.isInEurope = isInEurope;
    }

    return await studyAbroad.save();
  }

  async delete(id: string) {
    const studyAbroad = await StudyAbroadModel.findById(id);
    if (!studyAbroad) {
      throw AppError.NotFound(notFoundMessage("studyAbroad"));
    }

    const deleted = await studyAbroad.deleteOne();

    return studyAbroad;
  }

  async getAll() {
    const studyAbroad = await StudyAbroadModel.find();

    if (!studyAbroad) {
      throw AppError.NotFound(notFoundMessage("study abroad"));
    }
    return studyAbroad
  }

  async getById(id: string) {
    const studyAbroad = await StudyAbroadModel.findOne({_id:id});

    if (!studyAbroad) {
      throw AppError.NotFound(notFoundMessage("study abroad"));
    }

    return studyAbroad;
  }
}

export default new StudyAbroad();
