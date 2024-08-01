import AppError from "../../utils/appError";
import ServiceModel from "../../models/service/service.model";
import { notFoundMessage } from "../../constants/message.constant";
import { serviceInput } from "../../validators/service.validator";



class Service {

  async getAll() {
    const services = await ServiceModel.find();

    return services;
  }

  async getById(id: string) {
    const service = await ServiceModel.findOne({_id:id});

    if (!service) {
      throw AppError.NotFound(notFoundMessage("Service"));
    }

    return service;
  }


  async create(data: Omit<serviceInput ,'breadPhoto' | 'photo1' | 'photo2' >) {

  console.log("Creating service... service");

    const newService = new ServiceModel();
    newService.title = data.title;
    newService.description = data.description ?? null;
    newService.info = [data.info];
    newService.conclusion = data.conclusion;


    // const service = await newService.save();

    return newService;
  }

  async update(data: serviceInput, id) {
    console.log("chapter service", data);

    const { title, description } = data;

    const service = await ServiceModel.findOne(
        {
            _id: id,
        }
    );

    if (!service) {
      throw AppError.NotFound(notFoundMessage("service"));
    }

    if (title !== service.title) {
      service.title = title;
    }
    if (description !== service.description) {
      service.description = description;
    }

    return await service.save();
  }

  async delete(id: string) {
    const service = await ServiceModel.findOne({
        _id: id,
    });

    if (!service) {
      throw AppError.NotFound(notFoundMessage("Service"));
    }

    const deleted = await service.deleteOne();

    return service;
  }
}

export default new Service();
