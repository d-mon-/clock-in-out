import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CurrentUser } from '../_decorators/user';
import { User } from '../_entities/user.entity';
import { CreateUserRecordDto } from './dto/create-user-record.dto';
import { UpdateUserRecordDto } from './dto/update-user-record.dto';
import { UserRecordsService } from './user-records.service';
import { LambdaService } from '../lambda/lambda.service';
import { plainToInstance } from 'class-transformer';
import { DownloadFileDto } from '../_lambda/download-file/events/dto/DownloadFileDto';

@Controller('user-records')
export class UserRecordsController {
  constructor(
    private readonly userRecordsService: UserRecordsService,
    private readonly lambdaService: LambdaService,
  ) {}

  @Post()
  create(
    @Body() createUserRecordDto: CreateUserRecordDto,
    @CurrentUser() user: User,
  ) {
    return this.userRecordsService.create(user, createUserRecordDto);
  }

  @Get()
  async findAll(
    // TODO: add date filtering
    @CurrentUser() user: User,
  ) {
    return await this.userRecordsService.findAll(user);
  }

  @Post('download')
  @HttpCode(HttpStatus.OK)
  download(@CurrentUser() user: User) {
    console.log(user);
    return this.lambdaService.downloadRecordFile(
      plainToInstance(DownloadFileDto, { uuid: user.uuid }),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRecordsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserRecordDto: UpdateUserRecordDto,
  ) {
    return this.userRecordsService.update(+id, updateUserRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRecordsService.remove(+id);
  }
}
