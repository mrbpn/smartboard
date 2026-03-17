import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "dev-secret-change-in-production"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthRoute   = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isPublicRoute = pathname.startsWith("/join") || pathname.startsWith("/api") || pathname === "/";

  // Don't touch API routes or public routes
  if (isPublicRoute) return NextResponse.next();

  const token = request.cookies.get("sb_token")?.value;

  // No token — redirect to login
  if (!token) {
    if (isAuthRoute) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Verify token
  try {
    await jwtVerify(token, SECRET);
    // Valid token on auth page — redirect to dashboard
    if (isAuthRoute) return NextResponse.redirect(new URL("/dashboard", request.url));
    return NextResponse.next();
  } catch {
    // Invalid/expired token — redirect to login
    if (isAuthRoute) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};