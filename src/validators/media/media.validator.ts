import { IsMimeType, IsNotEmpty, IsString } from "class-validator";
import { MediaType } from "../../constants/global";
import { Type } from "class-transformer";

export class ImageUpload {
  @IsNotEmpty({ message: "The file must not be empty" })
  file; // This will be handled manually as express-fileupload does not attach file data to a specific object type.

  @IsNotEmpty()
  type: MediaType;
}
