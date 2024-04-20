import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

class Company {
  @IsNotEmpty({
    message: 'CompanyId is required!',
  })
  @IsMongoId({
    message: 'CompanyId is a mongo id!',
  })
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({
    message: 'CompanyName is required!',
  })
  name: string;

  @IsNotEmpty({
    message: 'CompanyLogo is required!',
  })
  logo: string;
}

export class CreateJobDto {
  @IsNotEmpty({
    message: 'CompanyName is required!',
  })
  name: string;

  @IsNotEmpty({
    message: 'Skills is required!',
  })
  @IsArray({ message: 'Skills are formatted as array!' })
  @IsString({ each: true, message: 'Skills are formatted as string!' })
  skills: string[];

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;

  @IsNotEmpty({
    message: 'Location is required!',
  })
  location: string;

  @IsNotEmpty({
    message: 'Salary is required!',
  })
  salary: number;

  @IsNotEmpty({
    message: 'Quantity is required!',
  })
  quantity: number;

  @IsNotEmpty({
    message: 'Level is required!',
  })
  level: string;

  @IsNotEmpty({
    message: 'Description is required!',
  })
  description: string;

  @IsNotEmpty({
    message: 'StartDate is required!',
  })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'StartDate are formatted as date!' })
  startDate: Date;

  @IsNotEmpty({
    message: 'EndDate is required!',
  })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'EndDate are formatted as date!' })
  endDate: Date;

  @IsNotEmpty({
    message: 'IsActive is required!',
  })
  @IsBoolean({ message: 'IsActive are formatted as boolean!' })
  isActive: boolean;
}
