// src/validators/QuizTypeValidator.ts

import { IsString, IsOptional, Length } from "class-validator";

export class QuizTypeInput {
  @IsString()
  @Length(2, 100) // Assuming names should be between 2 and 100 characters
  name: string;

  @IsOptional()
  @IsString()
  @Length(0, 500) // Assuming descriptions are optional and up to 500 characters
  description: string;
}
