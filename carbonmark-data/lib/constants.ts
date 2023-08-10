
/** True if actually deployed on the production domain (not a preview/staging domain, not local dev) */
export const IS_PRODUCTION =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
/** True if local development (not preview deployment) */
export const IS_LOCAL_DEVELOPMENT = process.env.NODE_ENV === "development";
export const API_URL = process.env.IS_PRODUCTION
  ? `https://staging-carbon-dashboard-9yimq.ondigitalocean.app/api/v1`
  : "https://carbon.klimadao.finance/api/v1";

const ENVIRONMENT: "production" | "staging" | "development" = IS_PRODUCTION ? "production" :
  IS_LOCAL_DEVELOPMENT ? "development" :
    "staging"


const config = {
  urls: {
    baseUrl: {
      production: "https://data.klimadao.finance",
      preview: "https://" + process.env.NEXT_PUBLIC_VERCEL_URL, // note: won't take custom subdomains like staging.carbonmark.com, takes the vercel generated url instead
      development: "http://localhost:3003",
    }
  }
}

export const urls = {
  baseUrl: config.urls.baseUrl[ENVIRONMENT]
}