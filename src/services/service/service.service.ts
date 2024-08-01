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


  async create(data: serviceInput) {

  

    const newService = new ServiceModel();
    newService.title = data.title;
    newService.description = data.description ?? null;
    newService.breadPhoto = data.breadPhoto;
    newService.photo1 = data.photo1;
    newService.photo2 = data.photo2 ;
    newService.info = data.info;
    newService.conclusion = data.conclusion;


    const service = await newService.save();

    return service;
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

    return deleted;
  }
}

export default new Service();
