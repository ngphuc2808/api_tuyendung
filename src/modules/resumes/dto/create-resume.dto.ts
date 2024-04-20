import { IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateResumeDto {
  @IsNotEmpty({
    message: 'Url is required!',
  })
  url: string;

  @IsNotEmpty({
    message: 'CompanyId is required!',
  })
  @IsMongoId({
    message: 'CompanyId is a mongo id!',
  })
  companyId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({
    message: 'JobId is required!',
  })
  @IsMongoId({
    message: 'JobId is a mongo id!',
  })
  jobId: mongoose.Schema.Types.ObjectId;
}
