import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  // Public paths that don't require authentication
  const publicPaths = ["/", "/auth/login", "/auth/register", "/jobs", "/companies"];
  const isPublicPath = publicPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  // If no token and trying to access protected route
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If token exists and trying to access auth routes
  if (token && (request.nextUrl.pathname === "/auth/login" || request.nextUrl.pathname === "/auth/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Validate token with the NestJS backend on protected routes
  if (token && !isPublicPath) {
    try {
      const response = await fetch(`${process.env.API_URL}/auth/validate`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      if (!response.ok) {
        // Token is invalid, redirect to login
        const response = NextResponse.redirect(new URL("/auth/login", request.url));
        response.cookies.set({
          name: "token",
          value: "",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 0,
        });
        return response;
      }
    } catch (error) {
      // API error, allow request to continue but token will be validated by the API
      console.error('Token validation error:', error);
    }
  }

  const response = NextResponse.next();
  response.headers.set('x-pathname', request.nextUrl.pathname);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};