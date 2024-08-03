import { toast } from 'react-toastify';

import { ApiException } from '@/api/axios-client';

export const toaster = {
  success: (...args: Parameters<typeof toast>) => {
    toast(...args);
  },
  error: (err: unknown, option?: Parameters<typeof toast>[1]) => {
    if (typeof err === 'string') {
      return toast(err, {
        ...option,
        toastId: err,
        type: 'error',
      });
    }
    if (err instanceof ApiException) {
      if (err.status === 429) {
        return toast('Too many attempt, retry later', {
          ...option,
          toastId: 'attempt-error',
          type: 'error',
        });
      }
      return toast('Something bad happened, retry later', {
        ...option,
        toastId: 'something-wrong',
        type: 'error',
      });
    }

    if (err instanceof Error) {
      return toast(err.message, {
        ...option,
        toastId: err.message,
        type: 'error',
      });
    }
  },
} as const;
