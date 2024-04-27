// src/validators/QuizTypeValidator.ts

import { Type } from "class-transformer";
import {
  IsString,
  IsOptional,
  Length,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
} from "class-validator";

export class ChapterInput {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100) // Assuming names should be between 2 and 100 characters
  name: string;

  @IsNotEmpty()
  @IsString() // Ensures each item in the array is a string
  subject: string;

  @IsOptional()
  @IsString()
  @Length(0, 500) // Assuming descriptions are optional and up to 500 characters
  description: string;
}
