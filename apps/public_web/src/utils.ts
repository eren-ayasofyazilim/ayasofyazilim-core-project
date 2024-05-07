export function isServerSide() {
  return typeof window === "undefined";
}

export function getBaseLink(location: string, locale?: string) {
  // if it's server side
  if (isServerSide()) {
    // if locale is missing get locale from cookies provided cookie exists
    if (!locale) {
      const cookieStore = require("next/headers").cookies();
      locale = cookieStore.get("locale")?.value ?? "en";
    }
    return getBaseLinkWithoutLocale(locale + "/" + location);
  }
  // it's client side
  if (!locale) {
    const pathname = window.location.pathname;
    const pathnameParts = pathname.split("/");
    locale = pathnameParts?.[1] ?? "en";
  }
  return getBaseLinkWithoutLocale(locale + "/" + location);
}
export function getBaseLinkWithoutLocale(location: string) {
  // if it's server side
  if (isServerSide()) {
    return process.env.PROJECT_BASE_URL + "/" + location;
  }
  // it's client side
  return window.location.origin + "/" + location;
}
