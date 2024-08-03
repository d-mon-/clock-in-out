'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { MdLockOutline } from 'react-icons/md';
import * as yup from 'yup';

import { toaster } from '@/lib/toaster';

import { AuthControllerQuery, AuthLoginDto } from '@/api/axios-client';
import { MuiTextField } from '@/app/components/form/text-field';

import { SubmitDataType } from '@/types/schema';

const authLoginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required().required(),
  })
  .required();

export default function Login() {
  const loginMutation = AuthControllerQuery.useLoginMutation();

  const router = useRouter();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(authLoginSchema),
  });

  const handleLogin = async (data: SubmitDataType<typeof handleSubmit>) => {
    try {
      await loginMutation.mutateAsync(new AuthLoginDto(data));
      toaster.success('Login successful', { toastId: 'login' });
      router.push('/');
    } catch (err: unknown) {
      toaster.error(err);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <MdLockOutline />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(handleLogin)}
          noValidate
          sx={{ mt: 1 }}
        >
          <MuiTextField
            control={control}
            name='email'
            margin='normal'
            required
            fullWidth
            label='Email Address'
            autoComplete='email'
            autoFocus
          />
          <MuiTextField
            control={control}
            name='password'
            margin='normal'
            required
            fullWidth
            label='Password'
            type='password'
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
