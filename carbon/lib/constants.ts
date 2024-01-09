export { BRIDGES, TOKENS } from "./charts/types";

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
      production: "https://data-api.klimadao.finance",
      preview: "https://" + process.env.NEXT_PUBLIC_VERCEL_URL, // note: won't take custom subdomains like staging.carbonmark.com, takes the vercel generated url instead
      development: "http://localhost:3003",
    },
    api: {
      production: "https://data-api.klimadao.finance/api/v1",
      preview:
        "https://staging-carbon-dashboard-9yimq.ondigitalocean.app/api/v1",
      //Allow the developer to set the carbonmark api url to point to their local instance if necessary
      development:
        "https://staging-carbon-dashboard-9yimq.ondigitalocean.app/api/v1",
    },
  },
};
/** URL of the 'REAL' Dash API
 * used by the proxy
 */
export const dash_api_url =
  process.env.NEXT_PUBLIC_DATA_API_URL || config.urls.api[ENVIRONMENT];

/** URL used by the query functions  */
const api_url =
  typeof window === "undefined"
    ? // Server side we contact the actual Dash API endpoint
      dash_api_url
    : // Client side we use the proxy
      "/api";

export const CACHE_DURATION_SECONDS = 3600;
export const TOKENS_CACHE_DURATION_SECONDS = 60;

export const urls = {
  baseUrl: config.urls.baseUrl[ENVIRONMENT],
  api: {
    prices: `${api_url}/prices`,
    tokens: `${api_url}/tokens`,
    klimaMonthlyRetirementsByPool: `${api_url}/retirements/klima/agg/tokens/monthly`,
    allMonthlyRetirementsByOrigin: `${api_url}/retirements/all/agg/origin/monthly`,
    klimaRawRetirements: `${api_url}/retirements/klima/raw`,
    allRawRetirements: `${api_url}/retirements/all/raw`,
    klimaRetirementsByBeneficiary: `${api_url}/retirements/klima/agg/beneficiary`,
    aggregatedCreditsByProject: `${api_url}/credits/agg/project`,
    dailyCarbonMetrics: `${api_url}/carbon_metrics`,
    aggregatedCredits: `${api_url}/credits/agg`,
    aggregatedCreditsByDate: `${api_url}/credits/agg`,
    aggregatedCreditsByCountry: `${api_url}/credits/agg/country`,
    aggregatedCreditsByVintage: `${api_url}/credits/agg/vintage`,
    aggregatedCreditsByMethodology: `${api_url}/credits/agg/methodology`,
    aggregatedCreditsByPool: `${api_url}/credits/agg/pool`,
    aggregatedCreditsByPoolAndDate: `${api_url}/credits/agg/pool`,
    aggregatedCreditsByPoolAndVintage: `${api_url}/credits/agg/pool/vintage`,
    aggregatedCreditsByPoolAndMethodology: `${api_url}/credits/agg/pool/methodology`,
    aggregatedCreditsByPoolAndProject: `${api_url}/credits/agg/pool/project`,
    aggregatedCreditsByBridgeAndVintage: `${api_url}/credits/agg/bridge/vintage`,
    aggregatedCreditsByBridgeAndCountry: `${api_url}/credits/agg/bridge/country`,
    aggregatedCreditsByBridgeAndProject: `${api_url}/credits/agg/bridge/project`,
    aggregatedCreditsByBridgeAndDate: `${api_url}/credits/agg/bridge/monthly`,
    aggregatedCreditsByBridge: `${api_url}/credits/agg/bridge`,
    aggregatedPoolVolumeByDate: `${api_url}/pools/agg`,
  },
};
