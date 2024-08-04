'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  Grid,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { MdLockOutline } from 'react-icons/md';
import * as yup from 'yup';

import { toaster } from '@/lib/toaster';

import { CreateUserDto, UsersControllerQuery } from '@/api/axios-client';
import { MuiTextField } from '@/app/components/form/text-field';

import { SubmitDataType } from '@/types/schema';

const authLoginSchema = yup
  .object()
  .shape({
    email: yup.string().trim().email().required().default(''),
    password: yup.string().trim().required().default(''),
    firstName: yup.string().trim().required().default(''),
    lastName: yup.string().trim().required().default(''),
  })
  .required();

const defaultTheme = createTheme();

export default function Register() {
  const createMutation = UsersControllerQuery.useCreateMutation();

  const router = useRouter();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(authLoginSchema),
    defaultValues: authLoginSchema.getDefault(),
  });

  const handleSignup = async (data: SubmitDataType<typeof handleSubmit>) => {
    try {
      await createMutation.mutateAsync(new CreateUserDto(data));
      toaster.success('You account has been created', { toastId: 'signup' });
      router.push('/login');
    } catch (err: unknown) {
      toaster.error(err);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
            Sign up
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit(handleSignup)}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <MuiTextField
                  control={control}
                  name='firstName'
                  required
                  fullWidth
                  label='First Name'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MuiTextField
                  control={control}
                  name='lastName'
                  required
                  fullWidth
                  label='Last Name'
                />
              </Grid>
              <Grid item xs={12}>
                <MuiTextField
                  control={control}
                  name='email'
                  required
                  fullWidth
                  label='Email Address'
                />
              </Grid>
              <Grid item xs={12}>
                <MuiTextField
                  control={control}
                  name='password'
                  required
                  fullWidth
                  label='Password'
                  type='password'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
