'use server';

import { apiClient } from '@/src/lib/api/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type LoginFormState = {
  error?: string;
  success?: boolean;
};

export async function loginAction(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const username_or_email = formData.get('username_or_email') as string;
  const password = formData.get('password') as string;

  if (!username_or_email || !password) {
    return { error: 'Please fill in all fields' };
  }

  try {
    const response = await apiClient.post('/auth/users/login', {
      username_or_email,
      password,
    });

    console.log('Login response:', response.data);

    const access_token = response?.data?.details?.token;

    if (!access_token) {
      throw new Error(response.data.detail || 'Invalid login credentials');
    }

    console.log('Access token:', access_token);

    cookies().set('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, 
    });

  } catch (err: any) {
    const message =
      err.response?.data?.detail ||   
      err.response?.data?.message ||
      err.message ||
      'Invalid credentials or server error';
    return { error: message };
  }

  redirect('/dashboard');
}