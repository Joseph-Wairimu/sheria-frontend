"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginPage from "./(auth)/login/page";
import { env } from "next-runtime-env";
import {jwtDecode} from "jwt-decode"; 

interface JwtPayload {
  exp?: number; 
}

function getCookie(name: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return undefined;
}

function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return true; 

    return Date.now() >= decoded.exp * 1000;
  } catch (err) {
    console.error("Invalid JWT format:", err);
    return true; 
  }
}

export default function Home() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const tryExchangeAndRedirect = async () => {
      const existingToken = getCookie("access_token");

      if (existingToken) {
        if (!isTokenExpired(existingToken)) {
          router.replace("/dashboard");
          return;
        } else {
          document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
          console.log("Expired token removed from cookies");
        }
      }

      try {
        const NEXT_PUBLIC_AUTH_BASE_URL = env("NEXT_PUBLIC_AUTH_BASE_URL");
        if (!NEXT_PUBLIC_AUTH_BASE_URL)
          throw new Error("Missing NEXT_PUBLIC_AUTH_BASE_URL");

        const res = await fetch(
          `${NEXT_PUBLIC_AUTH_BASE_URL}/auth/tokens/exchange`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          const data = await res.json();

          const token = data?.details?.token;
          if (!token) {
            console.error("No token in exchange response");
            return;
          }

          document.cookie = `access_token=${token}; expires=${new Date(
            Date.now() + 1000 * 60 * 60 * 24 * 30
          ).toUTCString()}; path=/`;

          const newToken = getCookie("access_token");
          if (newToken && !isTokenExpired(newToken)) {
            router.replace("/dashboard");
          } else {
            console.warn("Exchange OK but token invalid or expired");
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