// src/validators/QuizTypeValidator.ts

import { Type } from "class-transformer";
import {
  IsString,
  IsOptional,
  Length,
  IsNotEmpty,
  IsNumber,
} from "class-validator";

export class QuizSubTypeSubjectInput {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100) // Assuming names should be between 2 and 100 characters
  name: string;

  @IsNotEmpty()
  @IsNumber()
  total_marks: number;

  @IsNotEmpty()
  @IsNumber()
  number_of_questions: number;

  @IsNotEmpty()
  @IsNumber()
  number_of_long_questions: number;

  @IsNotEmpty()
  @IsNumber()
  number_of_short_questions: number;

  @IsNotEmpty()
  @IsNumber()
  short_questions_mark: number;

  @IsNotEmpty()
  @IsNumber()
  long_questions_mark: number;

  @IsNotEmpty()
  @IsString({ each: true })
  quiz_type: string;

  @IsNotEmpty()
  @IsString({ each: true })
  quiz_sub_type: string;

  @IsNotEmpty()
  @IsString({ each: true })
  subject: string;

  @IsOptional()
  @IsString()
  @Length(0, 500) // Assuming descriptions are optional and up to 500 characters
  description: string;
}
