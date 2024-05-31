// src/validators/QuizTypeValidator.ts

import { Type } from "class-transformer";
import {
  IsString,
  IsOptional,
  Length,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ValidateNested,
  ArrayNotEmpty,
  IsAlphanumeric,
} from "class-validator";

export class SubjectInput {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100) // Assuming names should be between 2 and 100 characters
  name: string;

  @IsOptional()
  @IsString()
  @Length(0, 500) // Assuming descriptions are optional and up to 500 characters
  description: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true }) // Ensures each item in the array is a string
  quiz_sub_type: string[];
}
