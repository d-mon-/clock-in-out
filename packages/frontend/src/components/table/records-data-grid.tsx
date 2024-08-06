import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Interval } from 'luxon';
import * as React from 'react';

import { UserRecord } from '@/api/axios-client';

function getRowId(row: UserRecord) {
  return row.uuid;
}

/**
 * Stateless datagrid to display user records
 */
export function RecordsDataGrid({ data }: { data: UserRecord[] | undefined }) {
  const columns: GridColDef<UserRecord>[] = [
    {
      field: 'clockIn',
      headerName: 'Clock in',
      width: 180,
      type: 'dateTime',
    },
    {
      field: 'clockOut',
      headerName: 'Clock out',
      width: 180,
      type: 'dateTime',
    },
    {
      field: 'duration',
      headerName: 'Duration',
      width: 180,
      type: 'string',
      renderCell: (params) => {
        const { clockIn, clockOut } = params.row;
        if (clockIn && clockOut) {
          const duration = Interval.fromDateTimes(clockIn, clockOut).toDuration(
            ['hours', 'minutes']
          );
          return duration.toFormat('hh:mm');
        }
        return '-';
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={data}
        columns={columns}
        editMode='row'
        getRowId={getRowId}
      />
    </Box>
  );
}
