import { redirect } from 'next/navigation';
import MainLayout from '@/src/components/layout/MainLayout';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = false;

  if (!isAuthenticated) {
    redirect('/login');
  }

  return <MainLayout>{children}</MainLayout>;
}