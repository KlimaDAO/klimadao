import { ADDRESSES } from "./addresses.constants";
import { NETWORKS } from "./networks.constants";
import { REGISTRIES } from "./registries.constants";
import { SUBGRAPHS } from "./subgraphs.constants";
import { URLS } from "./urls.constants";

// Export all
export { ADDRESSES, NETWORKS, REGISTRIES, SUBGRAPHS, URLS };

// Spender with their Allowances tokens
export const allowancesContracts = {
  retirementAggregatorV2: [
    "ubo",
    "nbo",
    "bct",
    "nct",
    "usdc",
    "klima",
    "mco2",
    "sklima",
    "wsklima",
  ],
  staking_helper: ["klima"],
  staking: ["sklima"],
  wsklima: ["sklima"],
  pklima_exercise: ["bct", "pklima"],
  bond_klimaMco2Lp: ["klimaMco2Lp"],
  bond_klimaBctLp: ["klimaBctLp"],
  bond_klimaUsdcLp: ["klimaUsdcLp"],
  bond_bct: ["bct"],
  bond_mco2: ["mco2"],
  bond_nbo: ["nbo"],
  bond_ubo: ["ubo"],
  klimaProV2: ["klima"],
  carbonmark: ["usdc"],
} as const;

export const EPOCH_INTERVAL = 11520; //??
export const FALLBACK_BLOCK_RATE = 2.3;

export const API_BASE_URL = "https://www.klimadao.finance/api";

/** CMS stuff  */
export const SANITY_STUDIO_API_PROJECT_ID = "dk34t4vc";
export const SANITY_STUDIO_API_DATASET = "production";

/** Carbon Projects CMS stuff  */
export const SANITY_STUDIO_API_CARBON_PROJECTS_PROJECT_ID = "l6of5nwi";
export const SANITY_STUDIO_API__CARBON_PROJECTS_DATASET = "production";

/** Tokens accepted as input for the offset aggregator /#/offset */
export type OffsetInputToken =
  (typeof allowancesContracts)["retirementAggregatorV2"][number];
export const offsetInputTokens = allowancesContracts[
  "retirementAggregatorV2"
] as unknown as OffsetInputToken[];

export type OffsetPaymentMethod = OffsetInputToken | "fiat";

/** Retireable tokens for the offset aggregator /#/offset */
export const retirementTokens = ["ubo", "nbo", "bct", "nct", "mco2"] as const;
/** Known carbon pools */
export const poolTokens = ["ubo", "nbo", "bct", "nct", "mco2"] as const;
/** Known carbon tokens */
export const projectTokens = ["tco2", "c3t"] as const;

// TODO rename to pool token
export type RetirementToken = (typeof retirementTokens)[number];
export type PoolToken = (typeof poolTokens)[number];
export type ProjectToken = (typeof projectTokens)[number];
export type CarbonToken = PoolToken | ProjectToken;

type CompatMap = { [token in OffsetPaymentMethod]: RetirementToken[] };
export const offsetCompatibility: CompatMap = {
  ubo: ["ubo"],
  nbo: ["nbo"],
  bct: ["bct"],
  nct: ["nct"],
  mco2: ["mco2"],
  usdc: ["bct", "nct", "mco2", "ubo", "nbo"],
  klima: ["bct", "nct", "mco2", "ubo", "nbo"],
  sklima: ["bct", "nct", "mco2", "ubo", "nbo"],
  wsklima: ["bct", "nct", "mco2", "ubo", "nbo"],
  fiat: ["bct", "nct", "mco2", "ubo", "nbo"],
};
