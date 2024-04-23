import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  @Public()
  @ResponseMessage('Send email')
  handleTestEmail() {
    return this.mailService.sendMail();
  }
}
