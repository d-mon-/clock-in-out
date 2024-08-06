import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

const recordEvent = ['in', 'out'] as const; // I am expecting more "custom" types later, for now I stick with in/out
type RecordEvent = (typeof recordEvent)[number];

export class CreateUserRecordDto {
  @IsEnum(recordEvent)
  @ApiProperty({
    description: 'IN/OUT event to record',
    enum: recordEvent,
  })
  event: RecordEvent;
}
