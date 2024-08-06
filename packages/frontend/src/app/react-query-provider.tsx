'use client';

import axios, { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AxiosQuery } from '@/api';

const listeners = {
  response: (_v: AxiosResponse<unknown, unknown>) => {
    return;
  },
  error: (_error: unknown) => {
    return;
  },
};

AxiosQuery.setBaseUrl('http://localhost:3001');
AxiosQuery.setAxiosFactory(() => {
  const t = axios.create({ withCredentials: true });
  t.interceptors.response.use(
    function (response) {
      listeners.response(response);
      return response;
    },
    function (error) {
      listeners.error(error);
      return Promise.reject(error);
    }
  );
  return t;
});

const allowedPathnames = ['/login'];

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    listeners.error = (v: unknown) => {
      // Redirect user to login page if not authenticated anymore
      if (
        v instanceof AxiosError &&
        v.response?.statusText === 'Unauthorized' &&
        !Cookies.get('is_authenticated') &&
        !allowedPathnames.includes(pathname)
      ) {
        router.replace(
          '/login?prev=' + encodeURIComponent(pathname + '?' + searchParams)
        );
      }
    };
  }, [pathname, searchParams, router]);
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
