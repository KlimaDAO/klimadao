import { IS_PREVIEW_BUILD, IS_PRODUCTION } from "lib/constants";
import { useMemo } from "react";

type FeatureFlags = {
  testFeatureFlag: boolean;
  redemptions: boolean;
};

const DEVELOPMENT: FeatureFlags = { testFeatureFlag: true, redemptions: true };
const PREVIEW: FeatureFlags = { testFeatureFlag: false, redemptions: true };
// const STAGING: FeatureFlags = { testFeatureFlag: false, redemptions: false };
const PRODUCTION: FeatureFlags = { testFeatureFlag: false, redemptions: true };

const getFeatures = (): FeatureFlags => {
  if (IS_PREVIEW_BUILD) return PREVIEW;
  if (IS_PRODUCTION) return PRODUCTION;

  return DEVELOPMENT;
};

export const useFeatureFlags = () => {
  const environment =
    process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV;
  // Technically no dependancies required as the env does not change but
  // a dependancy is required otherwise it'll invoke on every re-render
  const features = useMemo(() => getFeatures(), [environment]);

  return features;
};
