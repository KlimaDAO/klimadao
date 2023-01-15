import { getFeatureFlags } from "@klimadao/lib/featureFlags";
import { IS_PRODUCTION } from "./constants";

export const featureFlags = getFeatureFlags({ isProduction: IS_PRODUCTION });
