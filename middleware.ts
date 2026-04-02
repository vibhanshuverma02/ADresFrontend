// middleware.ts (root of main frontend / auth app)
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/register", "/api"];
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3010";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip public paths
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("rt")?.value;

  // If access token is present, allow through
  if (accessToken) {
    return NextResponse.next();
  }

  // No access token — try silent refresh using rt cookie
  if (refreshToken) {
    try {
      const res = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          Cookie: `rt=${refreshToken}`,
        },
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        const setCookieHeader = res.headers.get("set-cookie");
        const response = NextResponse.next();

        // Forward the new cookies from backend to browser
        if (setCookieHeader) {
          response.headers.set("set-cookie", setCookieHeader);
        }
        // Also set access token manually so it's available immediately
        if (data.accessToken) {
          response.cookies.set("accessToken", data.accessToken, {
            httpOnly: false,
            secure: true,
            sameSite: "lax",
            maxAge: 15 * 60,
            path: "/",
          });
        }
        return response;
      }
    } catch (e) {
      // refresh failed — fall through to redirect
    }
  }

  // No valid token at all → login
  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/login";
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/choose-role/:path*", "/dashboard/:path*"],
};