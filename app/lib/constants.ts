import { urls } from "@klimadao/lib/constants";
import { t } from "@lingui/macro";

/** True if actually deployed on the production domain (not a preview/staging domain, not local dev) */
export const IS_PRODUCTION =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

/** True if deployment is a NextJS preview build */
export const IS_PREVIEW_BUILD =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";

/** True if local development (not preview deployment) */
export const IS_LOCAL_DEVELOPMENT = process.env.NODE_ENV === "development";

export const WALLETCONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

export const BASE_URL = IS_PRODUCTION
  ? urls.app
  : process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3001";

/** Set first in package.json then passed to javascript bundle in next.config.js */
export const IS_STATIC_EXPORT = process.env.IS_STATIC_EXPORT;

export const FIAT_RETIREMENT_API_URL = IS_PRODUCTION
  ? "https://checkout.offsetra.com/api/checkout"
  : "https://staging-checkout.offsetra.com/api/checkout";

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

const ENVIRONMENT = IS_PRODUCTION
  ? "production"
  : IS_LOCAL_DEVELOPMENT
  ? "development"
  : "preview";

export const config = {
  networks: {
    production: "mainnet",
    preview: "mainnet",
    development: "mainnet",
  },
} as const;

export const DEFAULT_NETWORK = config.networks[ENVIRONMENT] as
  | "testnet"
  | "mainnet";

export const SQUID_ROUTER_URL =
  "https://app.squidrouter.com/?chains=137%2C8453&tokens=0x4e78011ce80ee02d2c3e649fb657e45898257815%2C0xdcefd8c8fcc492630b943abcab3429f12ea9fea2";

/** Exposed via env vars, this is an infura id to be used in the browser, in getStaticProvider, as a fallback for polygon-rpc */
export const CLIENT_INFURA_ID = process.env.NEXT_PUBLIC_CLIENT_INFURA_ID;

/** Subgraph Ids */
const GRAPH_API_KEY =
  process.env.GRAPH_API_KEY ?? process.env.NEXT_PUBLIC_GRAPH_API_KEY;

const BRIDGED_CARBON_ID = "9skh5pMQGRdyJcBe8PjWdDjLoYqoYTMLRDpFh6acSHUu";
const SUBGRAPH_BASE_URL =
  "https://gateway-arbitrum.network.thegraph.com/api/" +
  GRAPH_API_KEY +
  "/subgraphs/id/";

const SUBGRAPH_DEV_URL = "https://api.studio.thegraph.com/query/78559";
const SUBGRAPH_VERSION_SUFFIX = "version/latest";

export const subgraphs = {
  polygonBridgedCarbon: IS_PRODUCTION
    ? `${SUBGRAPH_BASE_URL}${BRIDGED_CARBON_ID}`
    : `${SUBGRAPH_DEV_URL}/polygon-bridged-carbon/${SUBGRAPH_VERSION_SUFFIX}`,
  polygonDigitalCarbon: IS_PRODUCTION
    ? `${SUBGRAPH_BASE_URL}${BRIDGED_CARBON_ID}`
    : `${SUBGRAPH_DEV_URL}/polygon-digital-carbon/${SUBGRAPH_VERSION_SUFFIX}`,
};
