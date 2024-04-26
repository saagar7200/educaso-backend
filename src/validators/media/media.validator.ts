import { IsEnum, IsMimeType, IsNotEmpty, IsString } from "class-validator";
import { MediaType } from "../../constants/global";
import { Type } from "class-transformer";

export class MediaInput {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  mimeType: string;

  // @IsNotEmpty()
  // @IsEnum(MediaType)
  // type: MediaType;
}
