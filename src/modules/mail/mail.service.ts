import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import {
  Subscriber,
  SubscriberDocument,
} from '../subscribers/schemas/subscriber.schema';
import { Job, JobDocument } from '../jobs/schemas/job.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,

    @InjectModel(Subscriber.name)
    private readonly subscriberModel: SoftDeleteModel<SubscriberDocument>,

    @InjectModel(Job.name)
    private readonly jobModel: SoftDeleteModel<JobDocument>,
  ) {}

  async sendMail() {
    const subscribers = await this.subscriberModel.find({});

    for (const subs of subscribers) {
      const subsSkills = subs.skills;
      const jobWithMatchingSkills = await this.jobModel.find({
        skills: { $in: subsSkills },
      });

      if (jobWithMatchingSkills?.length) {
        const jobs = jobWithMatchingSkills.map((it) => ({
          name: it.name,
          company: it.company.name,
          salary: `${it.salary}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ',
          skills: it.skills,
        }));

        await this.mailerService.sendMail({
          to: 'ngphuc.2808@gmail.com',
          from: 'ITViec Clone',
          subject: 'Danh sách công việc phù hợp',
          template: 'new-job',
          context: {
            receiver: 'Phúc',
            jobs,
          },
        });
      }
    }
  }
}
