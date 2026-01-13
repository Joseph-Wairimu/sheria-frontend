import MainLayout from '@/src/components/layout/MainLayout';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return <MainLayout>{children}</MainLayout>;
}