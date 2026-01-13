import { cookies } from 'next/headers'
import { env } from 'next-runtime-env'

export async function exchangeToken() {
  console.log('Exchange Token Hit')

  const cookieStore = cookies()
  const cfClearance = cookieStore.get('cf_clearance')?.value

  if (!cfClearance) {
    console.error('No cf_clearance cookie found')
    return null
  }

  const AUTH_BASE_URL = env('AUTH_BASE_URL')

  const res = await fetch(`${AUTH_BASE_URL}/auth/tokens/exchange`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `cf_clearance=${cfClearance}`,
    },
    cache: 'no-store',
  })

  console.log('Exchange Token Response status:', res.status)

  if (!res.ok) return null

  const data = await res.json()
 console.log('Exchange Token Response:', data);
  const accessToken = data?.details?.token

  if (!accessToken) return null

  cookies().set({
    name: 'access_token',
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })

  return accessToken
}
