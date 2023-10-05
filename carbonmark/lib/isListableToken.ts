import { Asset } from "lib/types/carbonmark.types";
import { LISTABLE_TOKEN_SYMBOL_REGEX } from "./constants";

export const isListableToken = (asset: Asset) =>
  !!asset?.token?.symbol &&
  LISTABLE_TOKEN_SYMBOL_REGEX.test(asset.token.symbol);
