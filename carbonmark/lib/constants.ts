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

export const SUSHI_SWAP_FEE = 0.003; // 0.3% per swap
export const AGGREGATOR_FEE = 0.01; // 1% per tonnage

export const getConnectErrorStrings = () => ({
  default: t({
    message: "We had some trouble connecting. Please try again.",
    id: "connect_modal.error_message_default",
  }),
  rejected: t({
    message: "User refused connection.",
    id: "connect_modal.error_message_refused",
  }),
  alreadyProcessing: t({
    message:
      "Request already processing. Please open your wallet and complete the request.",
    id: "connect_modal.error_processing",
  }),
});

/**
 * For PR previews, we want to reference the preview build of the API so we can test changes together
 */
const getAPIPreviewURL = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    // follows predictable format e.g. carbonmark-git-staging-klimadao.vercel.app or carbonmark-git-atmos-working-branch-klimadao.vercel.app
    const [_projectName, branchName] =
      process.env.NEXT_PUBLIC_VERCEL_URL.split("-git-");
    return `https://carbonmark-api-git-${branchName}.vercel.app/api`;
  }
  return "https://staging-api.carbonmark.com/api";
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
      production: "https://api.carbonmark.com/api",
      preview: getAPIPreviewURL(),
      development: "https://api.carbonmark.com/api", // i prefer to dev with mainnet data ;)
    },
  },
} as const;

export const DEFAULT_NETWORK = config.networks[ENVIRONMENT];

export const urls = {
  api: {
    projects: `${config.urls.api[ENVIRONMENT]}/projects`,
    users: `${config.urls.api[ENVIRONMENT]}/users`,
    purchases: `${config.urls.api[ENVIRONMENT]}/purchases`,
    categories: `${config.urls.api[ENVIRONMENT]}/categories`,
    countries: `${config.urls.api[ENVIRONMENT]}/countries`,
    vintages: `${config.urls.api[ENVIRONMENT]}/vintages`,
  },
  blockExplorer: `${config.urls.blockExplorer[DEFAULT_NETWORK]}`,
  baseUrl: config.urls.baseUrl[ENVIRONMENT],
  docs: "https://docs.carbonmark.com",
  projects: "/projects",
  users: "/users",
  help: "/blog/getting-started",
  about: "/blog/about-carbonmark",
  intro: "/blog/introducing-carbonmark",
};

/** Exposed via env vars, this is an infura id to be used in the browser, in getStaticProvider, as a fallback for polygon-rpc */
export const CLIENT_INFURA_ID = process.env.NEXT_PUBLIC_CLIENT_INFURA_ID;
