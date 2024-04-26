import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  ValidateNested,
} from "class-validator";
import { Gender } from "../../constants/enum";
import { Role } from "../../constants/global";
import { MediaInput } from "../../validators/media/media.validator";
// import { MediaInput } from "../../validators/media/media.validator";

export class RegisterInput {
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  role: Role;

  @IsOptional()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  profession: string;

  @IsOptional()
  // @ValidateNested({ each: true })
  profileImage: MediaInput;
}

export class UserLoginInput {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  fcmToken: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class IDInput {
  @IsNotEmpty()
  id: string;
}

export class UserUpdateInput {
  @IsOptional()
  @IsString()
  id: string;

  @IsOptional()
  @IsNumberString()
  phoneNumber: string;

  @IsOptional()
  @IsNumberString()
  houseNumber: string;

  @IsOptional()
  @IsNumberString()
  yearPassedOut: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  profession: string;

  @IsOptional()
  @IsString()
  currentCity: string;

  // @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => MediaInput)
  // profileImage: MediaInput;
}

export class UpdatePasswordInput {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}

export class forgetPasswordInput {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: String;
}

export class resetPasswordInput {
  @IsNotEmpty()
  @IsString()
  password: String;
}
