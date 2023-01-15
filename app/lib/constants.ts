import { urls } from "@klimadao/lib/constants";

/** True if actually deployed on the production domain (not a preview/staging domain, not local dev) */
export const IS_PRODUCTION =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

/** True if deployment is a NextJS preview build */
export const IS_PREVIEW_BUILD =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";

/** True if local development (not preview deployment) */
export const IS_LOCAL_DEVELOPMENT = process.env.NODE_ENV === "development";

export const BASE_URL = IS_PRODUCTION
  ? urls.app
  : process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3001";

/** Set first in package.json then passed to javascript bundle in next.config.js */
export const IS_STATIC_EXPORT = process.env.IS_STATIC_EXPORT;

export const FIAT_RETIREMENT_API_URL = IS_PRODUCTION
  ? "https://checkout.offsetra.com/api/checkout"
  : "https://staging-checkout.offsetra.com/api/checkout";

// TEMP client-only id due to polygon-rpc.com flakyness
export const CLIENT_INFURA_ID = process.env.NEXT_PUBLIC_CLIENT_INFURA_ID;
