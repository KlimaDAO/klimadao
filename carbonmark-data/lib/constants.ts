import { Bridge } from "./charts/types";

/** True if actually deployed on the production domain (not a preview/staging domain, not local dev) */
export const IS_PRODUCTION =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
/** True if local development (not preview deployment) */
export const IS_LOCAL_DEVELOPMENT = process.env.NODE_ENV === "development";
const ENVIRONMENT: "production" | "preview" | "development" = IS_PRODUCTION
  ? "production"
  : IS_LOCAL_DEVELOPMENT
  ? "development"
  : "preview";

const config = {
  urls: {
    baseUrl: {
      production: "https://carbon.klimadao.finance",
      preview: "https://" + process.env.NEXT_PUBLIC_VERCEL_URL, // note: won't take custom subdomains like staging.carbonmark.com, takes the vercel generated url instead
      development: "http://localhost:3003",
    },
    api: {
      production: "https://carbon.klimadao.finance/api/v1",
      preview:
        "https://staging-carbon-dashboard-9yimq.ondigitalocean.app/api/v1",
      //Allow the developer to set the carbonmark api url to point to their local instance if necessary
      development:
        process.env.NEXT_PUBLIC_DATA_API_URL ??
        "https://staging-carbon-dashboard-9yimq.ondigitalocean.app/api/v1",
    },
  },
};
const api_url = config.urls.api[ENVIRONMENT];

export const urls = {
  baseUrl: config.urls.baseUrl[ENVIRONMENT],
  api: {
    dailyAggregatedCredits: `${api_url}/credits/agg/daily`,
    aggregatedCredits: `${api_url}/credits/agg`,
  },
};

export const BRIDGES: Array<Bridge> = ["toucan", "c3", "moss"];
