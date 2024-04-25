import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
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
}

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Name is required!',
  })
  name: string;

  @IsEmail(
    {},
    {
      message: 'Wrong email format!',
    },
  )
  @IsNotEmpty({
    message: 'Email is required!',
  })
  email: string;

  @IsNotEmpty({
    message: 'Password is required!',
  })
  password: string;

  @IsNotEmpty({
    message: 'Age is required!',
  })
  age: string;

  @IsNotEmpty({
    message: 'Gender is required!',
  })
  gender: string;

  @IsNotEmpty({
    message: 'Address is required!',
  })
  address: string;

  @IsNotEmpty({
    message: 'Role is required!',
  })
  role: string;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;
}

export class RegisterUserDto {
  @IsNotEmpty({
    message: 'Name is required!',
  })
  name: string;

  @IsEmail(
    {},
    {
      message: 'Wrong email format!',
    },
  )
  @IsNotEmpty({
    message: 'Email is required!',
  })
  email: string;

  @IsNotEmpty({
    message: 'Password is required!',
  })
  password: string;

  @IsNotEmpty({
    message: 'Age is required!',
  })
  age: string;

  @IsNotEmpty({
    message: 'Gender is required!',
  })
  gender: string;

  @IsNotEmpty({
    message: 'Address is required!',
  })
  address: string;
}

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'username@gmail.com', description: 'username' })
  readonly username: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '123456',
    description: 'password',
  })
  readonly password: string;
}
