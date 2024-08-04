'use client'; // Error components must be Client Components

import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <main>
      <section>
        <div>
          <RiAlarmWarningFill size={60} />
          Oops, something went wrong!
        </div>
      </section>
    </main>
  );
}
