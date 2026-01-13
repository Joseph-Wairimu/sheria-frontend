import { cookies } from 'next/headers'
import { env } from 'next-runtime-env'

export async function exchangeToken() {
  console.log('Exchange Token Hit:')

  const AUTH_BASE_URL = env('AUTH_BASE_URL')

  const cookieHeader = cookies()
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join('; ')

  const res = await fetch(`${AUTH_BASE_URL}/auth/tokens/exchange`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookieHeader, 
    },
  })

  console.log('Exchange Token Response:');
  console.log('Exchange Token Response:', res);
  if (!res.ok) {
    const text = await res.text()
    console.error('Exchange failed:', text)
    return null
  }

  const data = await res.json()
  console.log('Exchange Token Response:', data);

  const accessToken = data?.details?.token
  if (!accessToken) return null

  cookies().set({
    name: 'access_token',
    value: accessToken,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  })

  return accessToken
}
