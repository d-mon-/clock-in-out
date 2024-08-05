'use client';

import { Button } from '@mui/material';

import {
  CreateUserRecordDto,
  CreateUserRecordDtoEvent,
  UserRecordsControllerQuery,
} from '@/api/axios-client';

export default function HomePage() {
  const createMutation = UserRecordsControllerQuery.useCreateMutation();

  async function sendCreate(event: CreateUserRecordDtoEvent) {
    return await createMutation.mutateAsync(new CreateUserRecordDto({ event }));
  }

  async function clockIn() {
    await sendCreate(CreateUserRecordDtoEvent.In);
  }

  async function clockOut() {
    await sendCreate(CreateUserRecordDtoEvent.Out);
  }

  return (
    <>
      <Button color='success' variant='contained' onClick={clockIn}>
        Clock in
      </Button>
      <Button color='error' variant='outlined' onClick={clockOut}>
        Clock out
      </Button>
    </>
  );
}
