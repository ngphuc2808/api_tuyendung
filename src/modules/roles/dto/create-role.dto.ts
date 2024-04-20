import { IsArray, IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateRoleDto {
  @IsNotEmpty({
    message: 'Name is required!',
  })
  name: string;

  @IsNotEmpty({
    message: 'Description is required!',
  })
  description: string;

  @IsNotEmpty({
    message: 'IsActive is required!',
  })
  @IsBoolean({
    message: 'IsActive is a boolean!',
  })
  isActive: boolean;

  @IsNotEmpty({
    message: 'Permissions is required!',
  })
  @IsArray({
    message: 'Permissions is a array!',
  })
  @IsMongoId({
    each: true,
    message: 'Permission is a mongo id!',
  })
  permissions: mongoose.Schema.Types.ObjectId[];
}
