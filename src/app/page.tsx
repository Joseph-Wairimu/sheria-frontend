import { redirect } from "next/navigation";
import LoginPage from "./(auth)/login/page";

async function getCurrentUser() {
  const isAuthenticated = false;

  return isAuthenticated;
}

export default async function Home() {
  const isAuthenticated = await getCurrentUser();

  if (isAuthenticated) {
    redirect("/dashboard");
  }

  return <LoginPage />;
}
