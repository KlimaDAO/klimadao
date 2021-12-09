export const IS_PRODUCTION =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

const VERCEL_URL = process.env.VERCEL_URL;

export const BASE_URL = VERCEL_URL
  ? `https://${VERCEL_URL}`
  : "http://localhost:3001";
