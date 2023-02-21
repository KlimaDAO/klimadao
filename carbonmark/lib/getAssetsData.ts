import { Asset } from "lib/types/carbonmark";

const C3T_PREFIX = "C3T-";
const TCO2_PREFIX = "TCO2-";

export const isC3TToken = (symbol: string) => symbol.startsWith(C3T_PREFIX);
export const isTCO2Token = (symbol: string) => symbol.startsWith(TCO2_PREFIX);

export const isProjectTokenAsset = (asset: Asset) =>
  !!asset?.token?.symbol &&
  (isC3TToken(asset.token.symbol) || isTCO2Token(asset.token.symbol));

export const getAssetsWithProjectTokens = (assets: Asset[]) =>
  assets.filter((a) => isProjectTokenAsset(a));

export const createProjectIdFromAsset = (asset: Asset): string | undefined => {
  if (!isProjectTokenAsset) return;

  const removed = asset.token.symbol
    .replace(C3T_PREFIX, "")
    .replace(TCO2_PREFIX, "");

  return removed;
};

export const getAllC3TTokensFromAssets = (assets: Asset[]) =>
  assets.filter((a) => isProjectTokenAsset(a) && isC3TToken(a.token.symbol));

export const getAllTCO2TokensFromAssets = (assets: Asset[]) =>
  assets.filter((a) => isProjectTokenAsset(a) && isTCO2Token(a.token.symbol));
