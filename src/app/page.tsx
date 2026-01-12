import { redirect } from 'next/navigation'
import LoginPage from './(auth)/login/page';

async function isAuthenticated() {

  return false
}
export default async function Home() {
  const authenticated = await isAuthenticated()

  if (authenticated) {
    redirect('/dashboard')
  }

  return <LoginPage />;
}