"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginPage from "./(auth)/login/page";
import { env } from "next-runtime-env";

function getCookie(name: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return undefined;
}

export default function Home() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const tryExchangeAndRedirect = async () => {
      const existingToken = getCookie("access_token");

      if (existingToken) {
        router.replace("/dashboard");
        return;
      }

      try {
        const AUTH_BASE_URL = env("AUTH_BASE_URL");
        if (!AUTH_BASE_URL) throw new Error("Missing AUTH_BASE_URL");

        const res = await fetch(`${AUTH_BASE_URL}/auth/tokens/exchange`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          console.log("Exchange success:", data);

          const newToken = getCookie("access_token");
          if (newToken) {
            router.replace("/dashboard");
          } else {
            console.warn("Exchange OK but no access_token cookie set");
          }
        } else {
          console.error("Exchange failed:", res.status, await res.text());
        }
      } catch (err) {
        console.error("Exchange error:", err);
      } finally {
        setIsChecking(false);
      }
    };

    tryExchangeAndRedirect();
  }, [router]);

  if (isChecking) {
    return <div>Authenticating...</div>;
  }

  return <LoginPage />;
}
