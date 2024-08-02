import AppError from "../../utils/appError";
import ServiceModel from "../../models/service/servicemodel";
import { notFoundMessage } from "../../constants/message.constant";
import { serviceInput } from "../../validators/service.validator";



class Service {

  async getAll() {
    const services = await ServiceModel.find();

    return services;
  }

  async getById(id: string) {
    const service = await ServiceModel.findOne({ _id: id });

    if (!service) {
      throw AppError.NotFound(notFoundMessage("Service"));
    }

    return service;
  }
  //   async getByIds(id: string[]) {
  //     const chapters = await this.serviceRepo.find({
  //       where: {
  //         id: In(id),
  //       },
  //       relations: {
  //         questions: true,
  //         subject: true,
  //       },
  //     });

  //     if (!chapters) {
  //       throw AppError.NotFound(notFoundMessage("Chapter"));
  //     }

  //     return chapters;
  //   }

  async create(data: serviceInput) {



    const newService = new ServiceModel(data);
    newService.title = data.title;
    newService.description = data.description ?? null;
    // const otp = generateRandomOTP();
    // subject.confirmEmailToken = otp.toString();

    const chapter = await newService.save();

    return chapter;
  }

  //   async update(data: any, id) {
  //     console.log("chapter service", data);

  //     const { name, description } = data;

  //     const chapter = await this.serviceRepo.findOne({
  //       where: {
  //         id: id,
  //       },
  //     });

  //     if (!chapter) {
  //       throw AppError.NotFound(notFoundMessage("Chapter"));
  //     }

  //     if (name !== chapter.name) {
  //       chapter.name = name;
  //     }
  //     if (description !== chapter.description) {
  //       chapter.description = description;
  //     }

  //     return await this.serviceRepo.save(chapter);
  //   }

  //   async delete(id: string) {
  //     const chapter = await this.serviceRepo.findOne({
  //       where: {
  //         id,
  //       },
  //       relations: {
  //         questions: true,
  //         subject: true,
  //       },
  //     });

  //     if (!chapter) {
  //       throw AppError.NotFound(notFoundMessage("Chapter"));
  //     }

  //     const deleted = await this.serviceRepo.remove(chapter);
  //     console.log("Deleted", deleted);

  //     return deleted;
  //   }
}

export default new Service();
