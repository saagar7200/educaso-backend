import AppError from "../../utils/appError";
import { notFoundMessage } from "../../constants/message.constant";
import TestInput from "../../validators/testPreparation.validator";
import { TestPreparationModel } from "../../models/test-preparation/testPreparation.model";

class testPrep {
  async getAll() {
    const testPreps = await TestPreparationModel.find();

    return testPreps;
  }

  async getById(id: string) {
    const testPreparations = TestPreparationModel.findOne({ _id: id });

    if (!testPreparations) {
      throw AppError.NotFound(notFoundMessage("Test preparation"));
    }

    return testPreparations;
  }

  async create(
    data: Omit<
      TestInput,
      | "breadPhoto"
      | "overviewPhoto1"
      | "overviewPhoto2"
      | "registerPhoto1"
      | "registerPhoto2"
    >
  ) {
    console.log("Creating testPrep... testPrep");

    const newTest = new TestPreparationModel(data);

    // newTest.register=data.register
    console.log("new test", newTest);
    console.log(typeof data.register);

    return newTest;
  }

  async update(
    data: Omit<
      TestInput,
      | "breadPhoto"
      | "overviewPhoto1"
      | "overviewPhoto2"
      | "registerPhoto1"
      | "registerPhoto2"
    >,
    id
  ) {
    console.log("testPrep", data);

    const testPrep = await TestPreparationModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        ...data,
      },
      {
        new: true,
      }
    );

    if (!testPrep) {
      throw AppError.NotFound(notFoundMessage("Test preparation"));
    }

    return await testPrep;
    /* 
    testPrep.overview = data.overview;
    testPrep.register = data.register;
    testPrep.testFormat = data.testFormat;
    testPrep.faq = data.faq; */
    
    // return await testPrep.save();
  }

  async delete(id: string) {
    const testPrep = await TestPreparationModel.findOne({
      _id: id,
    });

    if (!testPrep) {
      throw AppError.NotFound(notFoundMessage("Test preparation"));
    }

    const deleted = await testPrep.deleteOne();

    return deleted;
  }
}

export default new testPrep();
