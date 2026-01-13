import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import LoginPage from './(auth)/login/page'

async function isAuthenticated() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('access_token')

  return Boolean(accessToken?.value)
}

export default async function Home() {
  const authenticated = await isAuthenticated()

  if (authenticated) {
    redirect('/dashboard')
  }

  return <LoginPage />
}
