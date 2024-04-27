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

export class QuizSubTypeInput {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100) // Assuming names should be between 2 and 100 characters
  name: string;

  @IsNotEmpty()
  @IsNumber()
  full_marks: number;

  @IsNotEmpty()
  @IsNumber()
  exam_duration_minutes: number;

  @IsNotEmpty()
  @IsNumber()
  total_questions: number;

  @IsNotEmpty()
  @IsNumber()
  total_long_questions: number;

  @IsNotEmpty()
  @IsNumber()
  total_short_questions: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  quiz_type: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true }) // Ensures each item in the array is a string
  subjects: string[];

  @IsOptional()
  @IsString()
  @Length(0, 500) // Assuming descriptions are optional and up to 500 characters
  description: string;
}
