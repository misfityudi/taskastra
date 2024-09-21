import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

async function handleProtectedRoute(req: NextRequest): Promise<NextResponse> {
  const token = await getToken({ req, secret });

  if (!token) {
    const signInUrl = new URL("/signin", req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export async function middleware(req: NextRequest): Promise<NextResponse> {
  return handleProtectedRoute(req);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - signin (authentication page)
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!signin|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
