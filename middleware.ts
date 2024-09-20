import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

const PUBLIC_PATHS = [
  "/signin",
  "/api",
  "/_next",
  "/images",
  "/favicon.ico",
  "/public",
];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((path) => pathname.startsWith(path));
}

async function handleProtectedRoute(req: NextRequest): Promise<NextResponse> {
  const token = await getToken({ req, secret });

  if (!token) {
    const signInUrl = new URL("/signin", req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  return handleProtectedRoute(req);
}

export const config = {
  matcher: ["/:path*"],
};
