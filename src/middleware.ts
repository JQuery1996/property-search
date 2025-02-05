import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

export default createMiddleware(routing);

// Middleware for next-intl (locale handling)
const intlMiddleware = createMiddleware(routing);

export function middleware(req: NextRequest) {
  const authToken = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // If user is authenticated and trying to access login/register, redirect to dashboard
  if (authToken && /\/?(login|register)/.test(pathname)) {
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
