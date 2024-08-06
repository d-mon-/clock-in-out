import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import * as path from 'path';
import { CsvFile } from '../../../_utils/csv-file';
import { UsersService } from '../../../users/users.service';
import { DownloadFileDto } from './dto/DownloadFileDto';
import { UserRecordsService } from '../../../user-records/user-records.service';
import { Interval } from 'luxon';
import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.resend.com',
  secure: true,
  port: 465,
  auth: {
    user: 'resend',
    pass: 're_Kw8WQtUZ_2mgnhEQDLYfjvCqofVxoD5nq',
  },
});

@Injectable()
export class EventsService {
  constructor(
    private usersService: UsersService,
    private userRecordsService: UserRecordsService,
  ) {}

  async downloadAndEmailCSV(event: any) {
    const result = plainToInstance(DownloadFileDto, JSON.parse(event.body));

    const user = await this.usersService.findOne(result.uuid);
    if (!user) {
      return; // no need to send anything back to the user
    }

    const records = await this.userRecordsService.findAll(user);
    const filePath = path.resolve(__dirname, 'records.tmp.csv');
    const csvFile = new CsvFile({
      path: filePath,
      headers: ['clockIn', 'clockOut', 'total'],
    });

    await csvFile.create(
      records.map((v) => ({
        ...v,
        total:
          v.clockIn && v.clockOut
            ? Interval.fromDateTimes(v.clockIn, v.clockOut)
                .toDuration(['hours', 'minutes'])
                .toFormat('hh:mm')
            : '',
      })),
    );

    await transporter.sendMail({
      from: 'onboarding@resend.dev',
      to: user.email,
      subject: 'Hello World',
      html: '<strong>It works!</strong>',
      attachments: [
        {
          // use URL as an attachment
          filename: 'record.csv',
          path: filePath,
        },
      ],
    });
  }
}
