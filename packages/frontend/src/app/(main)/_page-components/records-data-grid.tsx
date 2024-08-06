import { Button } from '@mui/material';

import { RecordsDataGrid as RecordsDataGridStateless } from '@/components/table/records-data-grid';

import { UserRecordsControllerQuery } from '@/api/axios-client';

export function RecordsDataGrid() {
  const userRecords = UserRecordsControllerQuery.useFindAllQuery();
  const downloadFile = UserRecordsControllerQuery.useDownloadMutation();

  async function handleDownloadFile() {
    await downloadFile.mutateAsync();
  }

  return (
    <>
      <Button onClick={handleDownloadFile} variant='text'>
        Download
      </Button>
      <RecordsDataGridStateless data={userRecords.data} />
    </>
  );
}
