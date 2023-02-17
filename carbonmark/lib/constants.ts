import { polygonNetworks } from "@klimadao/lib/constants";
import { t } from "@lingui/macro";

/** True if actually deployed on the production domain (not a preview/staging domain, not local dev) */
export const IS_PRODUCTION =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

/** True if local development (not preview deployment) */
export const IS_LOCAL_DEVELOPMENT = process.env.NODE_ENV === "development";

export const MINIMUM_TONNE_PRICE = 0.1; // minimum amount of tonnes per listing
export const CARBONMARK_FEE = 0.0; // 0%

export const connectErrorStrings = {
  default: t({
    message: "We had some trouble connecting. Please try again.",
    id: "connect_modal.error_message_default",
  }),
  rejected: t({
    message: "User refused connection.",
    id: "connect_modal.error_message_refused",
  }),
};

export const NEXT_PUBLIC_MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface NetworkURLs {
  mainnet: string;
  testnet: string;
}

interface AppConfig {
  defaultNetwork: "testnet" | "mainnet";
  urls: {
    baseUrl: {
      production: string;
      staging: string;
      development: string;
    };
    blockExplorer: NetworkURLs;
    api: NetworkURLs;
  };
}

/** See readme to understand how testnet/mainnet and environments work */
export const config: AppConfig = {
  /** For static RPC and addresses. For transactions, always rely on the user's wallet network */
  defaultNetwork: "testnet",
  urls: {
    baseUrl: {
      production: "https://carbonmark.vercel.app", // TODO https://www.carbonmark.com
      staging: "https://carbonmark.vercel.app", // TODO https://staging.carbonmark.com
      development: "http://localhost:3002",
    },
    blockExplorer: {
      mainnet: polygonNetworks.mainnet.blockExplorerUrls[0],
      testnet: polygonNetworks.testnet.blockExplorerUrls[0],
    },
    api: {
      mainnet: "https://marketplace-api-najada.vercel.app/api", // TODO https://api.carbonmark.com
      testnet: "https://marketplace-api-najada.vercel.app/api", // TODO https://staging-api.carbonmark.com
    },
  },
};

const BASE_URL = IS_PRODUCTION
  ? config.urls.baseUrl.production
  : IS_LOCAL_DEVELOPMENT
  ? config.urls.baseUrl.development
  : process.env.NEXT_PUBLIC_VERCEL_URL; // if on a preview link, use the unique vercel deployment URL

export const urls = {
  api: {
    projects: `${config.urls.api[config.defaultNetwork]}/projects`,
    users: `${config.urls.api[config.defaultNetwork]}/users`,
    purchases: `${config.urls.api[config.defaultNetwork]}/purchases`,
    categories: `${config.urls.api[config.defaultNetwork]}/categories`,
    countries: `${config.urls.api[config.defaultNetwork]}/countries`,
    vintages: `${config.urls.api[config.defaultNetwork]}/vintages`,
  },
  blockExplorer: `${config.urls.blockExplorer[config.defaultNetwork]}`,
  baseUrl: BASE_URL,
};
