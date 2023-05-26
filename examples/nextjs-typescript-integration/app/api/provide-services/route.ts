import { ProvideAuthResponse } from "@/types";
import { NextResponse } from "next/server";

const PROVIDE_SERVICES_EMAIL = process.env.PROVIDE_SERVICES_EMAIL;
const PROVIDE_SERVICES_PASSWORD = process.env.PROVIDE_SERVICES_PASSWORD;

let provideAuth: ProvideAuthResponse | null = null;

async function getProvideAuthentication(): Promise<ProvideAuthResponse> {
  if (provideAuth) {
    return provideAuth;
  }

  // 1. Login using your provide.services account to get your DID
  // https://ident.provide.services/api/v1/authenticate
  const res = await fetch(
    "https://ident.provide.services/api/v1/authenticate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: PROVIDE_SERVICES_EMAIL,
        password: PROVIDE_SERVICES_PASSWORD,
      }),
    }
  );
  provideAuth = (await res.json()) as ProvideAuthResponse;
  return provideAuth;
}

async function getProvideRefreshToken() {}

/**
 * The Provide Services Fiat-to-retirement API
 * In this example we use Provide Services' ECO platform to retire carbon credits.
 * This allows you to pay for your retirements using a familiar credit card billing and invoice system.
 * Provide Services system facilitates the retirement transactions on your behalf.
 * To start, you must first create an account at https://shuttle.provide.services
 */
export async function POST(req: Request) {
  try {
    // 1. Login using your provide.services account to get your DID
    // https://ident.provide.services/api/v1/authenticate
    const { user, token } = await getProvideAuthentication();

    return NextResponse.json({
      url: `https://carbonmark.com/retirements/`,
    });
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
