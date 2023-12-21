import { NetworkParam } from "./models/NetworkParam.model";

/** Adhere to JSONSchema spec by using a URI */
export const COMMON_SCHEMA_URI = "http://api.carbonmark.com/schemas";

const GRAPH_API_ROOT = "https://api.thegraph.com/subgraphs/name";
const GRAPH_API_ROOT_ID = "https://api.thegraph.com/subgraphs/id";

/**
 * IMPORTANT: the keys of these objects map directly to the file names of the graphql definitions.
 * (e.g marketplace -> marketplace.gql)
 * This is also the case for SANITY_URLS
 */
const POLYGON_URLS = {
  marketplace: `${GRAPH_API_ROOT_ID}/QmXrzcwG5b31hE1nDzT5NCAiHfM9stwMLqs8uk9enJiyPf`,
  assets: `${GRAPH_API_ROOT}/cujowolf/klima-refi-current-holdings`,
  tokens: `${GRAPH_API_ROOT}/klimadao/klimadao-pairs`,
  digitalCarbon: `${GRAPH_API_ROOT}/klimadao/polygon-digital-carbon`,
  icr: `${GRAPH_API_ROOT}/skjaldbaka17/carbon-registry-polygon`,
};

const MUMBAI_URLS = {
  ...POLYGON_URLS,
  digitalCarbon: `${GRAPH_API_ROOT}/psparacino/digital-carbon`,
  marketplace: `${GRAPH_API_ROOT_ID}/QmUUnZTeRnfsJsQaTwLeiHmAQ5xvtk2jBW7VeP3AEW5bnv`,
  icr: `${GRAPH_API_ROOT}/skjaldbaka17/carbon-registry-test`,
};

/** Sanity URLS */
export const SANITY_URLS = {
  cms: "https://l6of5nwi.apicdn.sanity.io/v1/graphql/production/default",
};

/** Graph URLS */
/** Note: the keys of the below objects are used when selecting gql files for type generation */
export const GRAPH_URLS = {
  polygon: POLYGON_URLS,
  mumbai: MUMBAI_URLS,
};

export const TOKEN_ADDRESSES = {
  development: {
    LP_UBO_POOL: "0x5400a05b8b45eaf9105315b4f2e31f806ab706de",
    LP_NBO_POOL: "0xd838290e877e0188a4a44700463419ed96c16107",
    LP_NTC_POOL: "0xdb995f975f1bfc3b2157495c47e4efb31196b2ca",
    LP_BTC_POOL: "0x9803c7ae526049210a1725f7487af26fe2c24614",
    UBO_POOL: "0x2B3eCb0991AF0498ECE9135bcD04013d7993110c",
    NBO_POOL: "0x6BCa3B77C1909Ce1a4Ba1A20d1103bDe8d222E48",
    NTC_POOL: "0xd838290e877e0188a4a44700463419ed96c16107",
    BTC_POOL: "0x2f800db0fdb5223b3c3f354886d907a671414a7f",
    MOSS_POOL: "0xaa7dbd1598251f856c12f63557a4c4397c253cea",
  },
  production: {
    LP_UBO_POOL: "0x5400a05b8b45eaf9105315b4f2e31f806ab706de",
    LP_NBO_POOL: "0x251ca6a70cbd93ccd7039b6b708d4cb9683c266c",
    LP_NTC_POOL: "0xdb995f975f1bfc3b2157495c47e4efb31196b2ca",
    LP_BTC_POOL: "0x9803c7ae526049210a1725f7487af26fe2c24614",
    UBO_POOL: "0x2B3eCb0991AF0498ECE9135bcD04013d7993110c",
    NBO_POOL: "0x6BCa3B77C1909Ce1a4Ba1A20d1103bDe8d222E48",
    NTC_POOL: "0xd838290e877e0188a4a44700463419ed96c16107",
    BTC_POOL: "0x2f800db0fdb5223b3c3f354886d907a671414a7f",
    MOSS_POOL: "0xaa7dbd1598251f856c12f63557a4c4397c253cea",
  },
};

export const RPC_URLS = {
  polygonTestnetRpc: "https://rpc-mumbai.maticvigil.com",
};

/** Definitions of available registries */
export const REGISTRIES = {
  Verra: {
    id: "VCS",
    title: "Verra",
    url: "https://registry.verra.org",
    api: "https://registry.verra.org/uiapi",
  },
  GoldStandard: {
    id: "GS",
    title: "Gold Standard",
    url: "https://registry.goldstandard.org",
  },
  ICR: {
    id: "ICR",
    title: "International Carbon Registry",
    url: "https://www.carbonregistry.com",
  },
};

export const ICR_API = (
  network?: NetworkParam
): { ICR_API_URL: string; ICR_API_KEY: string } => {
  const ICR_CONFIG = {
    polygon: {
      url: "https://api.carbonregistry.com/v0",
      apiKey: process.env.ICR_MAINNET_API_KEY,
    },
    mumbai: {
      url: "https://gaia-api-dev.mojoflower.io/v0",
      apiKey: process.env.ICR_MUMBAI_API_KEY,
    },
  };

  const VALIDATED_NETWORK: NetworkParam =
    network === "polygon" || network === "mumbai" ? network : "polygon";

  const API_CONFIG = ICR_CONFIG["polygon"];

  if (!API_CONFIG.apiKey) {
    throw new Error(
      `ICR api key is undefined for network: ${VALIDATED_NETWORK}`
    );
  }

  return { ICR_API_URL: API_CONFIG.url, ICR_API_KEY: API_CONFIG.apiKey };
};
/** Message shared with frontend, to be combined with user's nonce and signed by private key. */
export const SIGN_PROFILE_MESSAGE =
  process.env.SIGN_PROFILE_MESSAGE || "[fallback message for local tests]";

/** Ethereum 0x address */
export const VALID_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
