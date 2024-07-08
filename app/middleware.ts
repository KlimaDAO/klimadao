import { geolocation } from "@vercel/edge";
import type { NextRequest } from "next/server";

/**
 * List of ISO 3166-1 Alpha 2 country codes.
 * To compare against X-Vercel-IP-Country header.
 * I advise against sharing these across packages, as each domain may have different legal requirements
 * */
const BLOCKED_COUNTRY_MAP: { [key: string]: string } = {
  IR: "Iran",
  SY: "Syria",
  KP: "North Korea",
  AF: "Afghanistan",
  CU: "Cuba",
  VE: "Venezuela",
};

export function middleware(request: NextRequest) {
  const country = geolocation(request)?.country?.toUpperCase();
  const label = country ? BLOCKED_COUNTRY_MAP[country] : null;
  const labels = Object.values(BLOCKED_COUNTRY_MAP);
  if (!!label) {
    return new Response(
      `
      <h1>Access Denied.</h1>
      <p>Pending further regulatory guidance, users located in the following regions are not permitted to access this page:
        <ul>
          ${labels.map((l) => `<li>${l}</li>`).join("")}
        </ul>
      </p>
      `,
      {
        headers: { "content-type": "text/html" },
      }
    );
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
