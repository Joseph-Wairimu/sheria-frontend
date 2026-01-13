import MainLayout from "@/src/components/layout/MainLayout";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  function getCookie(name: string): string | undefined {
    if (typeof window === "undefined") return undefined;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return undefined;
  }
  const accessToken = getCookie("access_token");
  if (!accessToken) {
    redirect("/login");
  }
  return <MainLayout>{children}</MainLayout>;
}
