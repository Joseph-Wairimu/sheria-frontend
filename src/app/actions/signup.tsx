'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { apiClient } from '@/src/lib/api/client'; 

type RegisterFormState = {
  error?: string;
  success?: boolean;
  fieldErrors?: Record<string, string>; 
};

export async function registerAction(
  prevState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  const email = formData.get('email') as string;
  const username = formData.get('username') as string;
  const first_name = formData.get('first_name') as string;
  const last_name = formData.get('last_name') as string;
  const password = formData.get('password') as string;
  const confirm_password = formData.get('confirm_password') as string;

  if (!email || !username || !first_name || !last_name || !password) {
    return { error: 'All fields are required' };
  }

  if (password !== confirm_password) {
    return { error: 'Passwords do not match' };
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters' };
  }

  try {

    const response = await apiClient.post('/auth/users/create', { 
      email,
      username,
      first_name,
      last_name,
      password,
    });

    console.log('Register response:', response.data);

    const username_exists = response?.data?.details?.username; 

    if (!username_exists) {
      throw new Error('Registration unsuccessful, please try again');
    }

  } catch (err: any) {
    const backendDetail = err.response?.data?.detail || err.response?.data?.message;
    let message = 'Registration failed. Please try again.';

    if (backendDetail) {
      if (backendDetail.includes('already exists') || backendDetail.includes('taken')) {
        message = 'Email or username already in use';
      } else if (backendDetail.includes('password')) {
        message = 'Password requirements not met';
      } else {
        message = backendDetail;
      }
    }

    return { error: message };
  }
      redirect('/user-login');

}