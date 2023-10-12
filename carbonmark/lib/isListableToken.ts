import {
  DEFAULT_MIN_LISTING_QUANTITY,
  LISTABLE_TOKEN_SYMBOL_REGEX,
} from "lib/constants";
import { Asset } from "lib/types/carbonmark.types";

export const isListableToken = (asset: Asset) =>
  !!asset?.token?.symbol &&
  LISTABLE_TOKEN_SYMBOL_REGEX.test(asset.token.symbol);

export const hasListableBalance = (asset: Asset) => {
  return (
    isListableToken(asset) &&
    Number(asset.amount) >= DEFAULT_MIN_LISTING_QUANTITY
  );
};
