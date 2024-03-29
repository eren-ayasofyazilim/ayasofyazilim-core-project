import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

const locales = [
  "de-DE",
  "en",
  "es",
  "fi",
  "fr",
  "hi",
  "it",
  "sk",
  "sl",
  "tr",
  "ru",
  "ar",
  "zh-Hans",
  "zh-Hant",
];

// Get the preferred locale, similar to the above or using a library
function getLocale(request: any) {
  let headers = { "accept-language": "en-US,en;q=0.5" };
  let languages = new Negotiator({ headers }).languages();
  let defaultLocale = "tr";

  const locale = match(languages, locales, defaultLocale);
  return locale;
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  let isApi = pathname.includes("/api");
  if (isApi || pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // Optional: only run on root (/) URL
    // '/'
    // skip api
  ],
};
