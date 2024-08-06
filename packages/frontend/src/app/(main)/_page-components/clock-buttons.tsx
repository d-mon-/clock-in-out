import LoadingButton from '@mui/lab/LoadingButton';
import { Grid, styled } from '@mui/material';
import { useQueryClient } from 'react-query';

import { toaster } from '@/lib/toaster';

import {
  CreateUserRecordDto,
  CreateUserRecordDtoEvent,
  UserRecordsControllerQuery,
} from '@/api/axios-client';

const ClockButton = styled(LoadingButton)({
  height: '3em',
});

export function ClockButtons() {
  const queryClient = useQueryClient();
  const createMutation = UserRecordsControllerQuery.useCreateMutation();

  async function sendCreate(event: CreateUserRecordDtoEvent) {
    try {
      await createMutation.mutateAsync(new CreateUserRecordDto({ event }));
      toaster.success(
        event === 'in' ? 'You are clocked in!' : 'You are clocked out!',
        { toastId: `clocked-${event}` }
      );
      queryClient.invalidateQueries({
        queryKey: UserRecordsControllerQuery.findAllQueryKey(),
      });
    } catch (err: unknown) {
      toaster.error(err);
    }
  }

  async function clockIn() {
    await sendCreate(CreateUserRecordDtoEvent.In);
  }

  async function clockOut() {
    await sendCreate(CreateUserRecordDtoEvent.Out);
  }

  return (
    <Grid container spacing={2} marginBottom={2}>
      <Grid item xs={12} sm={6}>
        <ClockButton
          fullWidth
          loading={createMutation.isLoading}
          color='success'
          variant='contained'
          onClick={clockIn}
        >
          Clock in
        </ClockButton>
      </Grid>
      <Grid item xs={12} sm={6}>
        <ClockButton
          fullWidth
          loading={createMutation.isLoading}
          color='error'
          variant='outlined'
          onClick={clockOut}
        >
          Clock out
        </ClockButton>
      </Grid>
    </Grid>
  );
}
