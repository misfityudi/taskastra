import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const token = await getToken({ req, secret });
  const { pathname } = req.nextUrl;

  // Allow access to the signin page even without a token
  if (pathname === "/signin") {
    return NextResponse.next();
  }

  // Protect other routes
  if (!token) {
    const signInUrl = new URL("/signin", req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protect all routes except static files and specific Next.js paths
    "/((?!_next/static|_next/image|favicon.ico).*)",
    // Protect API routes
    "/api/:path*",
  ],
};
