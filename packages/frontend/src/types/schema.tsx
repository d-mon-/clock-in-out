import { UseFormHandleSubmit } from 'react-hook-form';

export type SubmitDataType<T> = T extends UseFormHandleSubmit<infer T, any>
  ? T
  : never;
