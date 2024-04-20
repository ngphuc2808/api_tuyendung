import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty({
    message: 'Id is required!',
  })
  @IsMongoId({
    message: 'Id is a mongo id!',
  })
  _id: mongoose.Schema.Types.ObjectId;
}
