import AppError from "../../utils/appError";
import UniversityModel from "../../models/University/universitymodel";
import { universityInput } from "../../validators/university.validator";
import { notFoundMessage } from "../../constants/message.constant";

class University {
  async create(data: Omit<universityInput, "universityPhoto" | "flagPhoto">) {
    const newUniversity = new UniversityModel();

    newUniversity.name = data.name;
    newUniversity.description = data.description;

    return newUniversity;
  }

  async update(data: universityInput, id: string) {
    const { name, description } = data;

    const university = await UniversityModel.findById(id);
    if (!university) {
      throw AppError.NotFound(notFoundMessage("University"));
    }

    if (name !== university.name) {
      university.name = name;
    }
    if (description !== university.description) {
      university.description = description;
    }

    return await university.save();
  }

  async delete(id: string) {
    const university = await UniversityModel.findById(id);
    if (!university) {
      throw AppError.NotFound(notFoundMessage("university"));
    }
    const deleted = await university.deleteOne();
    return university;
  }

  async getAll() {
    const university = await UniversityModel.find();

    if (!university) {
      throw AppError.NotFound(notFoundMessage("university"));
    }
    return university;
  }

  async getById(id: string) {
    const univeristy = await UniversityModel.findOne({ _id: id });

    if (!univeristy) {
      throw AppError.NotFound(notFoundMessage("univeristy"));
    }

    return univeristy;
  }
}

export default new University();
