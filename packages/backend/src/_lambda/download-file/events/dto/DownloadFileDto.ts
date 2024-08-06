import { PickType } from '@nestjs/swagger';
import { User } from '../../../../_entities/user.entity';

export class DownloadFileDto extends PickType(User, ['uuid']) {}
