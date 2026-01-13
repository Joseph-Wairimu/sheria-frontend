import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import LoginPage from './(auth)/login/page'
import { exchangeToken } from '@/src/lib/auth'

async function isAuthenticated() {
  const cookieStore = cookies()
  return Boolean(cookieStore.get('access_token')?.value)
}

export default async function Home() {
  const cookieStore = cookies()

  const accessToken = cookieStore.get('access_token')

  if (!accessToken) {
    await exchangeToken()
  }

  const authenticated = await isAuthenticated()

  if (authenticated) {
    redirect('/dashboard')
  }

  return <LoginPage />
}
