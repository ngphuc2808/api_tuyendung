import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  sendCustomEmail(to: string, from: string, template: string) {
    return this.mailerService.sendMail({
      to,
      from,
      template,
    });
  }
}
