import dotenv from 'dotenv';
dotenv.config();

export default class DotenvConfiguration {
  static NODE_ENV = process.env.NODE_ENV;
  static PORT = +process.env.PORT!;
  static DATABASE_URI  =  process.env.DB_URI
  // *Database Configurations
  static APP_NAME = process.env.APP_NAME;
  static MAIL_USERNAME = process.env.MAIL_USERNAME;
  static MAIL_PASSWORD = process.env.MAIL_PASSWORD;
  static MAIL_HOST = process.env.MAIL_HOST;
  // *Other Configurations
  static DEBUG_MODE = process.env.DEBUG_MODE;
  static BASE_URL = process.env.BASE_URL;

  // JWT configuration
  static ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
  static ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN!;
  static RESET_PASSWORD_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN!;

  // File configuration

  //pagination
  static DEFAULT_PER_PAGE = +process.env.DEFAULT_PER_PAGE!;
}
