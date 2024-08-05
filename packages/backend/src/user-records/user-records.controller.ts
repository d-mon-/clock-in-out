import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CurrentUser } from '../_decorators/user';
import { User } from '../_entities/user.entity';
import { CreateUserRecordDto } from './dto/create-user-record.dto';
import { UpdateUserRecordDto } from './dto/update-user-record.dto';
import { UserRecordsService } from './user-records.service';

@Controller('user-records')
export class UserRecordsController {
  constructor(private readonly userRecordsService: UserRecordsService) {}

  @Post()
  create(
    @Body() createUserRecordDto: CreateUserRecordDto,
    @CurrentUser() user: User,
  ) {
    return this.userRecordsService.create(user, createUserRecordDto);
  }

  @Get()
  findAll() {
    return this.userRecordsService.findAll();
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
