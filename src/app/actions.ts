'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(prevState: { error: string } | undefined, formData: FormData) {
  const password = formData.get('password');

  if (password === process.env.APP_PASSWORD) {
    cookies().set('session', 'true', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    redirect('/form');
  } else {
    return { error: 'Invalid password' };
  }
}

export async function logout() {
    cookies().delete('session');
    redirect('/');
}
