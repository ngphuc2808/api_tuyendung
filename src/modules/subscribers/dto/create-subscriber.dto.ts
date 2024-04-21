import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubscriberDto {
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
    message: 'CompanyName is required!',
  })
  name: string;

  @IsNotEmpty({
    message: 'Skills is required!',
  })
  @IsArray({ message: 'Skills are formatted as array!' })
  @IsString({ each: true, message: 'Skills are formatted as string!' })
  skills: string[];
}
