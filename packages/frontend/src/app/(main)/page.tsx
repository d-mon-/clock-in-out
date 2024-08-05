'use client';

import { Container } from '@mui/material';

import { ClockButtons } from './_page-components/clock-buttons';
import { RecordsDataGrid } from './_page-components/records-data-grid';

export default function HomePage() {
  return (
    <Container>
      <ClockButtons />
      <RecordsDataGrid />
    </Container>
  );
}
