
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeRegistry from './ThemeRegistry';
import MainLayout from '@/components/layout/MainLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sheria Platform - Smart Governance for Kenya',
  description: 'AI-powered document management, verification, and predictive analytics for Kenya',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          <MainLayout>{children}</MainLayout>
        </ThemeRegistry>
      </body>
    </html>
  );
}