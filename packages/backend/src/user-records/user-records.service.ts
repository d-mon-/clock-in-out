import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { UserRecord } from '../_entities/user-record.entity';
import { CreateUserRecordDto } from './dto/create-user-record.dto';
import { UpdateUserRecordDto } from './dto/update-user-record.dto';
import { User } from '../_entities/user.entity';
import { DateTime, DurationLike } from 'luxon';

const intervalDuration: DurationLike = { minutes: 2 }; // TODO: let organisation configure the interval

@Injectable()
export class UserRecordsService {
  constructor(
    @InjectRepository(UserRecord)
    private userRecordsRepository: Repository<UserRecord>,
  ) {}

  async create(user: User, createUserRecordDto: CreateUserRecordDto) {
    if (createUserRecordDto.event === 'in') {
      return this.handleClockIn(user);
    } else {
      return this.handleClockOut(user);
    }
  }

  async handleClockIn(user: User): Promise<UserRecord> {
    const threshold = DateTime.now().plus(intervalDuration).toJSDate();
    const lastRecordOfToday = await this.findTodaysLast(user);
    if (
      lastRecordOfToday?.clockIn &&
      !lastRecordOfToday.clockOut &&
      lastRecordOfToday.clockIn < threshold
    ) {
      throw new BadRequestException('You already clocked in for today');
    }
    const userRecord = this.userRecordsRepository.create({
      clockIn: new Date(),
      user,
    });
    return await this.userRecordsRepository.save(userRecord);
  }

  async handleClockOut(user: User): Promise<UserRecord> {
    const threshold = DateTime.now().plus(intervalDuration).toJSDate();
    const lastRecordOfToday = await this.findTodaysLast(user);
    if (lastRecordOfToday?.clockOut && lastRecordOfToday.clockOut < threshold) {
      throw new BadRequestException('You already clocked out for today');
    }
    const userRecord = this.userRecordsRepository.create({
      ...(lastRecordOfToday?.clockOut ? null : lastRecordOfToday),
      clockOut: new Date(),
      user,
    });
    return await this.userRecordsRepository.save(userRecord);
  }

  async findTodaysLast(user: User): Promise<UserRecord | null> {
    const startOfToday = DateTime.now()
      // .setZone('America/New_York') // once Organisation Timezone are put in place
      .startOf('day')
      .toJSDate();

    return await this.userRecordsRepository.findOne({
      where: {
        user: { uuid: user.uuid },
        createdAt: Between(startOfToday, new Date()),
      },
      order: { createdAt: 'DESC' },
    });
  }

  findAll() {
    return `This action returns all userRecords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userRecord`;
  }

  update(id: number, updateUserRecordDto: UpdateUserRecordDto) {
    return `This action updates a #${id} ${updateUserRecordDto} userRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} userRecord`;
  }
}
