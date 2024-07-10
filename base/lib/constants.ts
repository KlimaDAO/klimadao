import { base, baseSepolia } from "wagmi/chains";

/** True if actually deployed on the production domain (not a preview/staging domain, not local dev) */
export const IS_PRODUCTION =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

/** True if deployment is a NextJS preview build */
export const IS_PREVIEW_BUILD =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";

/** True if local development (not preview deployment) */
export const IS_LOCAL_DEVELOPMENT = process.env.NODE_ENV === "development";

export const supportedChains =
  IS_LOCAL_DEVELOPMENT || IS_LOCAL_DEVELOPMENT ? [base] : [baseSepolia];

export const addresses = {
  polygon: {
    bct: "0x2f800db0fdb5223b3c3f354886d907a671414a7f",
    klima: "0x4e78011ce80ee02d2c3e649fb657e45898257815",
    retirementAggregatorV2: "0x8cE54d9625371fb2a068986d32C85De8E6e995f8",
    destinationHelperContract: "0x31Ba478443aB4c15f758B48f42509b2747D9b3Ec",
  },
  base: {
    klima: "0xDCEFd8C8fCc492630B943ABcaB3429F12Ea9Fea2",
    interchainTokenService: "0xB5FB4BE02232B1bBA4dC8f81dc24C26980dE9e3C",
  },
};
