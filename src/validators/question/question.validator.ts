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
  IsEnum,
} from "class-validator";
import {
  QUESTION_DIFFICULTY_LEVEL,
  QUESTION_TYPE,
} from "../../constants/global";

export class QuestionInput {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100) // Assuming names should be between 2 and 100 characters
  name: string;

  @IsOptional()
  @IsString()
  @Length(0, 500) // Assuming descriptions are optional and up to 500 characters
  description: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true }) // Ensures each item in the array is a string
  choices: string[];

  @IsNotEmpty()
  @IsNumber()
  points: number;

  @IsNotEmpty()
  @IsString()
  correct_answer: string;

  @IsNotEmpty()
  @IsString()
  explanation: string;

  @IsOptional()
  @IsEnum(QUESTION_TYPE, {
    message: `Question type must be one of the following values: ${Object.values(
      QUESTION_TYPE
    ).join(", ")}`,
  })
  type: QUESTION_TYPE;

  @IsOptional()
  @IsEnum(QUESTION_DIFFICULTY_LEVEL, {
    message: `Question type must be one of the following values: ${Object.values(
      QUESTION_DIFFICULTY_LEVEL
    ).join(", ")}`,
  })
  difficulty_level: QUESTION_DIFFICULTY_LEVEL;

  @IsOptional()
  @IsArray()
  @IsString()
  quiz_type: string[];

  @IsOptional()
  @IsArray()
  @IsString()
  subjects: string[];

  @IsNotEmpty()
  @IsString()
  chapter: string;
}
