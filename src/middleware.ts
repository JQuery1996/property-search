import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { TUser } from "@/types";
import { ROLES } from "@/constants";

export default createMiddleware(routing);

// Middleware for next-intl (locale handling)
const intlMiddleware = createMiddleware(routing);

export function middleware(req: NextRequest) {
  const authToken = req.cookies.get("token")?.value;
  const userCookie = req.cookies.get("user")?.value; // Safely get the user cookie value
  const user: TUser | null = userCookie ? JSON.parse(userCookie) : null; // Parse or fallback to null

  const pathname = req.nextUrl.pathname;

  // If user is authenticated and trying to access login/register, redirect to dashboard
  if (authToken && /\/?(login|register)/.test(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // check for authenticated pages
  if (
    !authToken &&
    /\/?(profile|favorite|notifications|add-new-property|my-properties|properties\/\d+\/edit)/.test(
      pathname,
    )
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    (!user || user?.account_role == ROLES.user) &&
    /\/?(add-new-property|my-properties|properties\/\d+\/edit)/.test(pathname)
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(en|ar)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
