/* 
  Strict types for current feature flag set
  Note: Be proactive in cleaning up feature flags once feature is live and stable
*/

type FeatureFlags = {
  testFeatureFlag: boolean;
  redemptionUI: boolean;
  retireCarbonToken: boolean;
};

export const getFeatureFlags = (params: {
  isProduction: boolean;
}): FeatureFlags => {
  /** toggled on for all environments */
  const LIVE_FEATURE = true;
  /** toggled on for preview and local dev */
  const IN_DEVELOPMENT = !params.isProduction;

  return {
    testFeatureFlag: LIVE_FEATURE,
    redemptionUI: IN_DEVELOPMENT,
    retireCarbonToken: IN_DEVELOPMENT,
  };
};
