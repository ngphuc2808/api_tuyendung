import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

class Company {
  @IsNotEmpty({
    message: "Company's id is required!",
  })
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({
    message: "Company's name is required!",
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