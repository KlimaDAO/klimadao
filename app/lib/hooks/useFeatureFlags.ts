import { IS_PREVIEW_BUILD, IS_PRODUCTION } from "lib/constants";
import { useMemo } from "react";

const DEVELOPMENT = { testFeatureFlag: true };
const PREVIEW = { testFeatureFlag: false };
// const STAGING = { testFeatureFlag: false };
const PRODUCTION = { testFeatureFlag: false };

const getFeatures: any = () => {
  console.log(process.env.NEXT_PUBLIC_VERCEL_ENV);
  if (IS_PREVIEW_BUILD) return PREVIEW;
  if (IS_PRODUCTION) return PRODUCTION;

  return DEVELOPMENT;
};

export const useFeatureFlags: any = () => {
  const features = useMemo(() => getFeatures(), []);

  return [features];
};
