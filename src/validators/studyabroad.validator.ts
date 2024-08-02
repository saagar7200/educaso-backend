import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from "class-validator";

export class studyAbroadInput {
  @IsOptional()
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  // @IsUrl()
  @IsNotEmpty()
  breadPhoto: string;

  @IsNotEmpty()
  educasoImage: string;

  @IsNotEmpty()
  educationImage: string;

  @IsString()
  @IsNotEmpty()
  description1: string;

  @IsString()
  @IsNotEmpty()
  description2: string;

  // @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  educationDialog: string;

  @IsArray()
  @IsString()
  educationList: string;

  @IsBoolean()
  isInEurope: boolean;
}
