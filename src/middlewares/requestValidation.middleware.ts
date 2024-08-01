// @ts-nocheck
import { ClassConstructor, plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { NextFunction, Response, RequestHandler } from "express";
import { STATUS } from "../constants/message.constant";



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
          message.unshift(value);
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
      console.log("validation body", req.body);
      const dtoInstance = plainToClass(dtoClass, req.body);
      let validationMessages: string[] = [];

      // Validate DTO instance
      const errors = await validate(dtoInstance);
      const messages = await getValidationMessage(errors, validationMessages);
      if (messages.length > 0) {
        console.log("validation errors", errors, messages);
        return res.status(400).json({
          statusCode: 400,
          error: messages[0],
          message: validationMessages[0],
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
