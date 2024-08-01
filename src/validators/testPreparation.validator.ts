const { IsString, IsArray, IsNotEmpty, IsOptional, ValidateNested } = require('class-validator');
const { Type } = require('class-transformer');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class TestFormatItem {
  @IsString()
  @IsNotEmpty()
  testSection;

  @IsString()
  @IsNotEmpty()
  timeAllocation;

  @IsNotEmpty()
  totalNoOfQuestions;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  itemTypes;
}

class FaqItem {
  @IsString()
  @IsOptional()
  ques;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  ans;
}

class TestInput {
  @IsNotEmpty()
  @IsString()
  overview;

  @IsNotEmpty()
  breadPhoto;

  @IsNotEmpty()
  overviewPhoto1;

  @IsNotEmpty()
  overviewPhoto2;

  @IsNotEmpty()
  registerPhoto1;

  @IsNotEmpty()
  registerPhoto2;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestFormatItem)
  testFormat;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FaqItem)
  faq;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  register;
}

export default TestInput;
