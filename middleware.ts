import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token");

  const isAuthRoute = req.nextUrl.pathname.startsWith("/user-login");
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard");

  if (!accessToken && isProtectedRoute) {
    const loginUrl = new URL("/user-login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (accessToken && isAuthRoute) {
    const dashboardUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
