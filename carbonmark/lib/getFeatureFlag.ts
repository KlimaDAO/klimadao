import { config, ENVIRONMENT } from "lib/constants";

type Flag = keyof typeof config.featureFlags;

/**
 * Returns a boolean for a given feature flag, using current build environment
 * Feature flags are defined in the application config (currently in lib/constants.ts)
 */
export const getFeatureFlag = (flag: Flag): boolean => {
  return config.featureFlags[flag][ENVIRONMENT];
};
