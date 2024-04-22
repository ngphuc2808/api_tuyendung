import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private mailerService: MailerService,
  ) {}

  // @Get()
  // @ResponseMessage('Test email')
  // handleTestEmail(@Body('email') email: string) {
  //   console.log(email);
  //   return this.mailService.sendCustomEmail(
  //     email,
  //     '"Support Team" <support@example.com>',
  //     'new-job',
  // {
  //   name: 'Phuc',
  // },
  //   );
  // }

  @Post('send')
  @Public()
  @ResponseMessage('Send email')
  async sendCustomEmail(@Body('to') to: string) {
    await this.mailService.sendCustomEmail(
      to,
      '"Support Team" <support@example.com>',
      'new-job',
    );
    return { message: 'Email sent successfully' };
  }
}
