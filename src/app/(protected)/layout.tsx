import MainLayout from "@/src/components/layout/MainLayout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface UserProfile {
 details: {id: string;
  username: string;
  email: string;
  avatar?: string;
  role?: string;}
}

async function fetchUserProfile(accessToken: string): Promise<UserProfile | null> {
  try {
    const response = await fetch(
      `${process.env.AUTH_BASE_URL}/auth/users/profile`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store", 
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        return null;
      }
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) {
    redirect("/login");
  }

  const userProfile = await fetchUserProfile(accessToken);
  console.log("Fetched user profile:", userProfile);

  if (!userProfile?.details) {
    redirect("/login");
  }

  return (
    <MainLayout initialUser={userProfile?.details}>
      {children}
    </MainLayout>
  );
}