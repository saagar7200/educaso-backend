import { IJwtOptions, IJwtPayload } from "../types/Jwt.interfaces";
import DotenvConfiguration from "../config/env.config";
import { Role } from "../constants/global";
import jwt from "jsonwebtoken";

class WebTokenService {
  sign(user: IJwtPayload, options: IJwtOptions, role: Role) {
    return jwt.sign(
      {
        id: user.id,
        role: role,
      },
      options.secret,
      {
        expiresIn: options.expiresIn,
      }
    );
  }

  verify(token: string, secret: string): any {
    return jwt.verify(token, secret);
  }

  generateAccessToken(user: IJwtPayload, role: Role) {
    return this.sign(
      user,
      {
        expiresIn: DotenvConfiguration.ACCESS_TOKEN_EXPIRES_IN,
        secret: DotenvConfiguration.ACCESS_TOKEN_SECRET,
      },
      role
    );
  }
}

export default new WebTokenService();
