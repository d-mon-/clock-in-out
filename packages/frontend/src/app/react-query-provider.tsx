'use client';

import axios from 'axios';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AxiosQuery } from '@/api';

AxiosQuery.setBaseUrl('http://localhost:3001');
AxiosQuery.setAxiosFactory(() => {
  return axios.create({ withCredentials: true });
});

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
