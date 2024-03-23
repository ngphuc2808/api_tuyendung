import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail(
    {},
    {
      message: 'Sai định dạng email!',
    },
  )
  @IsNotEmpty({
    message: 'Vui lòng nhập email!',
  })
  email: string;

  @IsNotEmpty({
    message: 'Vui lòng nhập mật khẩu!',
  })
  password: string;
  name: string;
}
