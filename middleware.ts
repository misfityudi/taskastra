import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Exclude the following routes from the authentication check:
  // - Sign-in page
  // - API routes
  // - Static files (/_next/static)
  if (
    pathname.startsWith("/signin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next")
  ) {
    return NextResponse.next();
  }

  // Fetch the token to check if the user is authenticated
  const token = await getToken({ req, secret });

  // If no token is found, redirect to the sign-in page
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/signin"; // Redirect to sign-in page
    return NextResponse.redirect(url);
  }

  // Allow the request to proceed if the user is authenticated
  return NextResponse.next();
}

// Apply middleware to all routes except for the ones excluded in the middleware
export const config = {
  matcher: ["/:path*"],
};
