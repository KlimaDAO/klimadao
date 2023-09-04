import { getLocales } from "@klimadao/lib/utils/lightIndex";
import { IS_PRODUCTION } from "lib/constants";
import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

const locales = Object.keys(getLocales(IS_PRODUCTION));
export default async function middleware(request: NextRequest) {
  // Initialize next-intl
  const response = createMiddleware({
    locales: locales,
    defaultLocale: "en",
  })(request);
  return response;
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
