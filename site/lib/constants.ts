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

export const LINK_INFINITY_GET_STARTED = "/blog/klima-infinity-user-guide";
export const LINK_POLYGON_BLOG =
  "/blog/polygon-goes-carbon-neutral-via-klimadao";
export const LINK_BLOG = "/blog";
export const LINK_INFINITY_FAQ = "/blog/klima-infinity-faqs";
export const LINK_INFINITY_CONTACT_SLAES =
  "https://notionforms.io/forms/klimadao-request-for-collaboration";
