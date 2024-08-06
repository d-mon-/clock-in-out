import { Injectable } from '@nestjs/common';
import { config, Lambda } from 'aws-sdk';
config.update({
  region: 'us-east-1',
  accessKeyId: 'YOURKEY',
  secretAccessKey: 'YOURSECRET',
});

@Injectable()
export class AwsLambdaService {
  private lambda: Lambda;

  constructor() {
    this.lambda = new Lambda({
      apiVersion: '2015-03-31',
      endpoint: 'http://localhost:4000/dev',
    });
  }

  send(params: Lambda.Types.InvocationRequest) {
    return this.lambda.invoke(params).promise();
  }
}
