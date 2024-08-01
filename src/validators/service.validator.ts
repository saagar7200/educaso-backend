import { IsArray, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class serviceInput {
  @IsOptional()
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  // @IsUrl()
  @IsNotEmpty()
  breadPhoto: string;

  // @IsUrl()
  @IsNotEmpty()
  photo1: string;

  // @IsUrl()
  @IsOptional()
  photo2?: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  // @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  info: string;

  @IsString()
  @IsNotEmpty()
  conclusion: string;
}