import { polygonNetworks } from "@klimadao/lib/constants";
import { t } from "@lingui/macro";
import { LogicTable } from "./utils/logic.utils";

/** The possible app environments */
type Environment = "production" | "preview" | "development";

/** True if actually deployed on the production domain (not a preview/staging domain, not local dev) */
export const IS_PRODUCTION =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
/** True if local development (not preview deployment) */
export const IS_LOCAL_DEVELOPMENT =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV == undefined;
/** For preview deployments on Vercel */
export const IS_PREVIEW = !IS_PRODUCTION && !IS_LOCAL_DEVELOPMENT;

export const NEXT_PUBLIC_MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

/** Exposed via env vars, this is an infura id to be used in the browser, in getStaticProvider, as a fallback for polygon-rpc */
export const CLIENT_INFURA_ID = process.env.NEXT_PUBLIC_CLIENT_INFURA_ID;
export const WALLETCONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

/** An abbreviated version of the commit hash used when deploying a preview build of the api in deploy_carbonmark_api.yml */
const SHORT_COMMIT_HASH = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(
  0,
  7
);

/** When incrementing this API version, be sure to update TypeScript types to reflect API changes */
export const API_PROD_URL = "https://v6.0.0.api.carbonmark.com";

/**
 * Optional preview URL can be provided via env var.
 * Testnet data can be accessed via `network=mumbai` query param
 */
const API_PREVIEW_URL = process.env.NEXT_PUBLIC_USE_PREVIEW_CARBONMARK_API
  ? `https://carbonmark-api-${SHORT_COMMIT_HASH}-klimadao.vercel.app`
  : API_PROD_URL;

/**
 * The API URL to target when developing the app,
 * useful for generating types that have not yet been deployed or are on  new version of the API
 * NEXT_PUBLIC_CARBONMARK_API_URL=http://localhost:3003 npm run dev-carbonmark & npm run dev-carbonmark-api
 * or for types
 * NEXT_PUBLIC_CARBONMARK_API_URL=http://localhost:3003 npm run generate:types*/
const API_DEVELOPMENT_URL =
  process.env.NEXT_PUBLIC_CARBONMARK_API_URL ?? API_PREVIEW_URL;

export const ENVIRONMENT: Environment =
  new LogicTable({
    production: IS_PRODUCTION,
    development: IS_LOCAL_DEVELOPMENT,
    preview: IS_PREVIEW,
  }).first() ?? "preview";

export const MINIMUM_TONNE_PRICE = 0.1;

export const MINIMUM_TONNE_QUANTITY = 0.001;

export const MINIMUM_TONNE_QUANTITY_BANK_TRANSFER = 100;

export const CARBONMARK_FEE = 0.0; // 0%

/** Validates the presence of an "@" & "." character in the string */
export const EMAIL_ADDRESS_REGEX =
  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]+)$/;
/** No special chars */
export const VALID_HANDLE_REGEX = /^[a-zA-Z0-9]+$/;
/** Any token symbol containing known substrings is valid. This filters out BCT, MCO2, and other assets */
export const LISTABLE_TOKEN_SYMBOL_REGEX = /(VCS-|PURO-|ICR-|GS-)/;
/** Default number of days until a listing expires */
export const DEFAULT_EXPIRATION_DAYS = 90;
/** Default minimum fill for a listing */
export const DEFAULT_MIN_FILL_AMOUNT = 1;
/** Minimum number of tonnes that can be listed for sale */
export const DEFAULT_MIN_LISTING_QUANTITY = 1;

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

export const config = {
  // todo, deprecate in favor of networks e.g. "mumbai", "polygon"
  networks: {
    production: "mainnet",
    preview: "mainnet",
    development: "mainnet",
  },
  featureFlags: {
    /** Ability to create listings from assets in portfolio */
    createListing: {
      production: true,
      preview: true,
      development: true,
    },
  },
  urls: {
    baseUrl: {
      production: "https://www.carbonmark.com",
      preview: "https://" + process.env.NEXT_PUBLIC_VERCEL_URL, // note: won't take custom subdomains like staging.carbonmark.com, takes the vercel generated url instead
      development: "http://localhost:3002",
    },
    blockExplorer: {
      production: polygonNetworks.mainnet.blockExplorerUrls[0],
      preview: polygonNetworks.testnet.blockExplorerUrls[0],
      development: polygonNetworks.testnet.blockExplorerUrls[0],
    },
    api: {
      production: API_PROD_URL,
      preview: API_PREVIEW_URL,
      development: API_DEVELOPMENT_URL,
    },
    fiat: {
      production: "https://checkout.offsetra.com/api",
      preview: "https://staging-checkout.offsetra.com/api",
      development: "https://staging-checkout.offsetra.com/api",
    },
  },
} as const;

export const urls = {
  api: {
    base: config.urls.api[ENVIRONMENT],
    users: `${config.urls.api[ENVIRONMENT]}/users`,
    login: `${config.urls.api[ENVIRONMENT]}/login`,
    purchases: `${config.urls.api[ENVIRONMENT]}/purchases`,
    categories: `${config.urls.api[ENVIRONMENT]}/categories`,
    countries: `${config.urls.api[ENVIRONMENT]}/countries`,
    vintages: `${config.urls.api[ENVIRONMENT]}/vintages`,
  },
  blockExplorer: `${config.urls.blockExplorer[ENVIRONMENT]}`,
  baseUrl: config.urls.baseUrl[ENVIRONMENT],
  docs: "https://docs.carbonmark.com",
  docsResourcesFees:
    "https://docs.carbonmark.com/get-started/understanding-fees-on-carbonmark",
  payViaBankForm:
    "https://api.hsforms.com/submissions/v3/integration/submit/26010207/2f87cd63-f8a7-43e9-9483-ac541a614762",
  payViaBankDocs:
    "/blog/carbonmark-now-accepts-bank-transfer-as-a-payment-method",
  projects: "/projects",
  users: "/users",
  help: "/blog/getting-started",
  about: "/blog/about-carbonmark",
  intro: "/blog/introducing-carbonmark",
  fiat: {
    checkout: `${config.urls.fiat[ENVIRONMENT]}/checkout`,
    info: `${config.urls.fiat[ENVIRONMENT]}/info`,
  },
};

export const DEFAULT_NETWORK = config.networks[ENVIRONMENT] as
  | "mainnet"
  | "testnet";

/** Message shared with backend, to be combined with user's nonce and signed by private key. */
export const SIGN_PROFILE_MESSAGE =
  process.env.SIGN_PROFILE_MESSAGE ||
  "Sign to authenticate ownership and edit your Carbonmark profile 💚\n\nSignature nonce:";
