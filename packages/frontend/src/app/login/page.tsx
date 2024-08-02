'use client';

import { useState } from 'react';

import {
  AuthControllerQuery,
  AuthLoginDto,
  IAuthLoginDto,
} from '@/api/axios-client';

export default function Login() {
  const [credentials, setCredentials] = useState<IAuthLoginDto>({
    email: '',
    password: '',
  });
  const loginMutation = AuthControllerQuery.useLoginMutation();

  const handleLogin = async () => {
    await loginMutation.mutate(new AuthLoginDto(credentials));
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type='text'
        placeholder='Email'
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
      />
      <input
        type='password'
        placeholder='Password'
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
