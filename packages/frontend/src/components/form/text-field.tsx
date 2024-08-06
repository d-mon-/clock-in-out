'use client';

import TextField from '@mui/material/TextField';
import React from 'react';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

export const MuiTextField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, 'render'> &
  React.ComponentProps<typeof TextField>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...props}
          {...field}
          helperText={error ? error.message : undefined}
          error={!!error}
          fullWidth
          variant='outlined'
          inputRef={field.ref}
        />
      )}
    />
  );
};
