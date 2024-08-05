import { RecordsDataGrid as RecordsDataGridStateless } from '@/components/table/records-data-grid';

import { UserRecordsControllerQuery } from '@/api/axios-client';

export function RecordsDataGrid() {
  const userRecords = UserRecordsControllerQuery.useFindAllQuery();
  return <RecordsDataGridStateless data={userRecords.data} />;
}
