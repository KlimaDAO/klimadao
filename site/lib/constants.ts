import { urls } from "@klimadao/lib/constants";

/** True if actually deployed on the production domain (not a preview/staging domain, not local dev) */
export const IS_PRODUCTION =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

/** True if local development (not preview deployment) */
export const IS_LOCAL_DEVELOPMENT = process.env.NODE_ENV === "development";

export const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;

export const MONTH_IN_SECONDS = 2592000;

export const API_BASE_URL = IS_LOCAL_DEVELOPMENT
  ? "http://localhost:3000"
  : urls.home;
