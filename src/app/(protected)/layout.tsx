import MainLayout from "@/src/components/layout/MainLayout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token");
  console.log("ProtectedLayout accessToken:", accessToken);
  if (!accessToken) {
    redirect("/login");
  }

  return <MainLayout>{children}</MainLayout>;
}
