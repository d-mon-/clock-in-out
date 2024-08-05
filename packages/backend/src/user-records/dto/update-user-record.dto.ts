import { PartialType } from '@nestjs/swagger';
import { CreateUserRecordDto } from './create-user-record.dto';

export class UpdateUserRecordDto extends PartialType(CreateUserRecordDto) {}
