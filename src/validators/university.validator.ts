import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class universityInput {
  @IsOptional()
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;

  // @IsUrl()

  @IsOptional()
  universityPhoto: string;
  @IsOptional()
  flagPhoto: string;
  // @IsUrl()
}
