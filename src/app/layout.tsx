import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeRegistry from "./ThemeRegistry";
import { PublicEnvScript } from 'next-runtime-env';
import './globals.css'; 
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sheria Platform - Smart Governance for Kenya",
  description:
    "AI-powered document management, verification, and predictive analytics for Kenya",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <PublicEnvScript />
      </head>
      <body className={inter.className}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
