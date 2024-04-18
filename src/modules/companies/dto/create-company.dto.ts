import { IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty({
    message: "Company's name is required!",
  })
  name: string;

  @IsNotEmpty({
    message: 'Address is required!',
  })
  address: string;

  @IsNotEmpty({
    message: 'Description is required!',
  })
  description: string;
}
