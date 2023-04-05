import { polygonNetworks } from "@klimadao/lib/constants";
import { t } from "@lingui/macro";

/** True if actually deployed on the production domain (not a preview/staging domain, not local dev) */
export const IS_PRODUCTION =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

/** True if local development (not preview deployment) */
export const IS_LOCAL_DEVELOPMENT = process.env.NODE_ENV === "development";

const ENVIRONMENT = IS_PRODUCTION
  ? "production"
  : IS_LOCAL_DEVELOPMENT
  ? "development"
  : "preview";

export const MINIMUM_TONNE_PRICE = 0.1;
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

export const config = {
  networks: {
    production: "mainnet",
    preview: "mainnet",
    development: "testnet",
  },
  urls: {
    baseUrl: {
      production: "https://www.carbonmark.com",
      preview: process.env.NEXT_PUBLIC_VERCEL_URL, // note: won't take custom subdomains like staging.carbonmark.com, takes the vercel generated url instead
      development: "http://localhost:3002",
    },
    blockExplorer: {
      mainnet: polygonNetworks.mainnet.blockExplorerUrls[0],
      testnet: polygonNetworks.testnet.blockExplorerUrls[0],
    },
    api: {
      mainnet: "https://api.carbonmark.com/api",
      testnet: "https://staging-api.carbonmark.com/api",
    },
  },
} as const;

export const DEFAULT_NETWORK = config.networks[ENVIRONMENT];

export const urls = {
  api: {
    projects: `${config.urls.api[DEFAULT_NETWORK]}/projects`,
    users: `${config.urls.api[DEFAULT_NETWORK]}/users`,
    purchases: `${config.urls.api[DEFAULT_NETWORK]}/purchases`,
    categories: `${config.urls.api[DEFAULT_NETWORK]}/categories`,
    countries: `${config.urls.api[DEFAULT_NETWORK]}/countries`,
    vintages: `${config.urls.api[DEFAULT_NETWORK]}/vintages`,
  },
  blockExplorer: `${config.urls.blockExplorer[DEFAULT_NETWORK]}`,
  baseUrl: config.urls.baseUrl[ENVIRONMENT],
  help: "/blog/getting-started",
  about: "/blog/about-carbonmark",
  intro: "/blog/introducing-carbonmark",
};
