import AppError from "../../utils/appError";
import BcryptService from "../../utils/bcrypt.service";
import { notFoundMessage } from "../../constants/message.constant";
import jwt from "jsonwebtoken";
import { Role } from "../../constants/global";
import { AdminModel } from "../../models/user/admin.model";

class UserService {
  constructor(
    private readonly admin = AdminModel,
  ) {}
  async createAdmin(data: any) {
    console.log("data service", data);

  

    return {};
  }

  async getOne(id: string) {
    const admin =   await this.admin.findOne({
      _id: id,
    });

    

    if (!admin) {
      throw AppError.NotFound(notFoundMessage('Admin'));
    }
    return admin
  }



  async getAll() {
    return await this.admin.find();
  }

  async getByEmail(email: string) {
    console.log("use get one service", email);

   const admin  =   await this.admin.findOne({
      email: email,
    });

    return admin;
  }
}

export default new UserService();
