import { dash_api_url } from "lib/constants";
import { NextRequest, NextResponse } from "next/server";

/** Proxies queries to the actual dash-api server */
export async function GET(request: NextRequest) {
  const url = new URL(request.nextUrl);
  // Remove the /api part of the pathname
  const pathname = url.pathname.split("/").slice(2).join("/");
  // Computes dash-api server URL
  const destination = `${dash_api_url}/${pathname}?${url.searchParams}`;
  console.log(`Proxying to: ${destination}`);
  const res = await fetch(destination);
  return NextResponse.json(await res.json());
}

export const dynamic = "force-dynamic";
