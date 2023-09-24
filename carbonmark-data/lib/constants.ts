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

export const urls = {
  baseUrl: config.urls.baseUrl[ENVIRONMENT],
  api: {
    dailyAggregatedCredits: `${api_url}/credits/agg/daily`,
    aggregatedCredits: `${api_url}/credits/agg`,
    prices: `${api_url}/prices`,
    tokens: `${api_url}/tokens`,
    klimaMonthlyRetirementsByPool: `${api_url}/retirements/klima/agg/tokens/monthly`,
    allMonthlyRetirementsByOrigin: `${api_url}/retirements/all/agg/origin/monthly`,
    klimaRawRetirements: `${api_url}/retirements/klima/raw`,
    allRawRetirements: `${api_url}/retirements/all/raw`,
    klimaRetirementsByBeneficiary: `${api_url}/retirements/klima/agg/beneficiaries`,
    aggregatedCreditsByProjects: `${api_url}/credits/agg/projects`,
    dailyCarbonMetrics: `${api_url}/carbon_metrics`,
  },
};
