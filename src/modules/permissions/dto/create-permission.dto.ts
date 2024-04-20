import { IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreatePermissionDto {
  @IsNotEmpty({
    message: 'Name is required!',
  })
  name: string;

  @IsNotEmpty({
    message: 'Api path is required!',
  })
  apiPath: string;

  @IsNotEmpty({
    message: 'Method is required!',
  })
  method: string;

  @IsNotEmpty({
    message: 'Module is required!',
  })
  module: string;
}
