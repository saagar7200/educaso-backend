// @ts-nocheck
import { ClassConstructor, plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { NextFunction, Response, RequestHandler } from "express";
import { STATUS } from "../constants/message.constant";

// export default class RequestValidator {
//   static async getValidationMessage(
//     errors: ValidationError[],
//     message: string[]
//   ) {
//     errors.forEach(async (err) => {
//       if (err.children && err.children?.length > 0) {
//         await this.getValidationMessage(err.children, message);
//       } else {
//         if (err.constraints) {
//           Object.values(err.constraints).forEach((value) => {
//             message.push(value);
//           });
//         }
//         return;
//       }
//     });
//   }

//   static validate = <T extends object>(classInstance: ClassConstructor<T>) => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//       // *Convert body to class instance
//       const convertedObject = plainToClass(classInstance, req.body); // *Validate the class instance

//       let validationMessages: string[] = [];
//       const errors = await validate(convertedObject, {
//         whitelist: true,
//         forbidNonWhitelisted: true,
//       });

//       if (errors.length !== 0) {
//         await this.getValidationMessage(errors, validationMessages);
//         throw AppError.BadRequest(validationMessages[0]);
//       }
//       return await next();
//     };
//   };
// }

const getValidationMessage = async (
  errors: ValidationError[],
  message: string[]
) => {
  errors.forEach(async (err) => {
    if (err.children && err.children?.length > 0) {
      await getValidationMessage(err.children, message);
    } else {
      if (err.constraints) {
        Object.values(err.constraints).forEach((value) => {
          message.push(value);
        });
      }
      return;
    }
  });
  return message;
};
export const requestValidator = <T extends object>(
  dtoClass: ClassConstructor<T>
): RequestHandlerParams<
  ParamsDictionary,
  any,
  any,
  ParsedQs,
  Record<string, any>
> => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Convert request body to DTO instance

      const dtoInstance = plainToClass(dtoClass, req.body);
      let validationMessages: string[] = [];

      // Validate DTO instance
      const errors = await validate(dtoInstance);
      console.log("validation errors", validationMessages, errors);
      if (errors.length > 0) {
        const messages = await getValidationMessage(errors, validationMessages);

        return res.status(400).json({
          statusCode: 400,
          error: messages[1],
          message: messages[1],
          status: STATUS.ERROR,
          success: STATUS.FAIL,
        });
      }

      // If validation passes, continue to the next middleware
      next();
    } catch (error) {
      console.log("validation catch");
      res.status(500).json({
        error: "Internal Server Error",
        message: "Internal Server Error",
        status: STATUS.ERROR,
        success: STATUS.FAIL,
        statusCode: 500,
      });
    }
  };
};
