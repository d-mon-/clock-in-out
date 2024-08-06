import { Module } from '@nestjs/common';
import { LambdaService } from './lambda.service';
import { AwsLambdaService } from './aws-lambda.service';

@Module({
  providers: [LambdaService, AwsLambdaService],
  exports: [LambdaService],
})
export class LambdaModule {}
