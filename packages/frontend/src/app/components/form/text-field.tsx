'use client';

import TextField from '@mui/material/TextField';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

export const MuiTextField = ({
  name,
  control,
  label,
  ...props
}: {
  control: Control<any, any>;
  name: string;
  label: string;
} & React.ComponentProps<typeof TextField>) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...props}
          {...field}
          label={label}
          helperText={error ? error.message : null}
          size='small'
          error={!!error}
          fullWidth
          variant='outlined'
        />
      )}
    />
  );
};
