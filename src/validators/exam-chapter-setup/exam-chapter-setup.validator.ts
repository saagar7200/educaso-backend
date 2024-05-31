// src/validators/QuizTypeValidator.ts
import {
  IsString,
  IsOptional,
  Length,
  IsNotEmpty,
  IsNumber,
} from "class-validator";

export class QuizSubTypeSubjectChapterInput {
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
  @IsString({ each: true })
  quiz_type_subject: string;

  @IsNotEmpty()
  @IsString({ each: true })
  chapter: string;

  @IsOptional()
  @IsString()
  @Length(0, 500) // Assuming descriptions are optional and up to 500 characters
  description: string;
}
