import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

export const i18n = {
  defaultLocale: "en",
  locales: [
    "de-de",
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
    "zh-hans",
    "zh-hant",
  ],
};

function getLocaleFromBrowser(request: NextRequest) {
  const negotiatorHeaders: { [key: string]: string } = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const locales = i18n.locales;
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );
  return matchLocale(languages, locales, i18n.defaultLocale);
}
function getLocaleFromCookies(request: NextRequest) {
  const cookieLocale = request.cookies.get("locale")?.value;
  if (cookieLocale && i18n.locales.includes(cookieLocale)) {
    return cookieLocale;
  }
}

function isAutherized(request: NextRequest) {
  const isLogged = request.cookies.get(".AspNetCore.Identity.Application")
    ? true
    : false;
  const publicURLs = [
    "/",
    "login",
    "register",
    "forgot-password",
    "reset-password",
    "404",
    "500",
    "api",
  ];
  const pathName = request.nextUrl.pathname.split("/")[2] || "/";
  if (publicURLs.includes(pathName)) {
    return true;
  }
  if (!isLogged && !publicURLs.includes(pathName)) {
    return false;
  }
  return isLogged;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname + "/";

  const localeFromCookies = getLocaleFromCookies(request);
  const localeFromPathname = i18n.locales.find((locale) =>
    pathname.startsWith(`/${locale}/`)
  );

  // if locale from cookies and local from pathname doesn't exists, redirect to default locale.
  if (!localeFromCookies && !localeFromPathname) {
    const defaultLocale = getLocaleFromBrowser(request);
    return NextResponse.redirect(
      new URL(
        `/${defaultLocale}${pathname.startsWith("/") ? "" : "/"}${pathname}${request.nextUrl.search}`,
        request.url
      )
    );
  }

  // if locale from cookies exist and locale from pathname doesn't, redirect to cookie's locale.
  if (localeFromCookies && !localeFromPathname) {
    return NextResponse.redirect(
      new URL(
        `/${localeFromCookies}${pathname.startsWith("/") ? "" : "/"}${pathname}${request.nextUrl.search}`,
        request.url
      )
    );
  }

  // if locale from cookies and locale from pathname exist but they are not same, redirect to cookie's locale.
  if (
    localeFromCookies &&
    localeFromPathname &&
    localeFromPathname !== localeFromCookies
  ) {
    return NextResponse.redirect(
      new URL(
        `${pathname.replace(`/${localeFromPathname}/`, `/${localeFromCookies}/`)}`,
        request.url
      )
    );
  }
  // check .AspNetCore.Identity.Application cookie from the request
  if (!isAutherized(request)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // if locale from pathname exist and cookie doesn't, do nothing
  // if locale from cookies and locale from pathname exist and they are same, do nothing
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
