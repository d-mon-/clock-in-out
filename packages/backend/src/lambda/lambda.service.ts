import { Injectable } from '@nestjs/common';
import { DownloadFileDto } from '../_lambda/download-file/events/dto/DownloadFileDto';
import { AwsLambdaService } from './aws-lambda.service';

@Injectable()
export class LambdaService {
  constructor(private awsLambdaService: AwsLambdaService) {}

  async downloadRecordFile(payload: DownloadFileDto) {
    await this.awsLambdaService.send({
      InvocationType: 'Event',
      FunctionName: 'serverless-example-dev-main',
      Payload: JSON.stringify(payload),
    });
  }
}
