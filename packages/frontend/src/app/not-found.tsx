import { Metadata } from 'next';
import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <main>
      <section>
        <div>
          <RiAlarmWarningFill size={60} />
          Page Not Found
          <a href='/'>Back to home</a>
        </div>
      </section>
    </main>
  );
}
