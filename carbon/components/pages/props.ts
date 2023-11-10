import { Locale } from "@lingui/core";
import {
  Bridge,
  Chain,
  DateFilteringOption,
  Pool,
  Status,
} from "lib/charts/types";

export interface BridgePageParams {
  bridge: Bridge;
  locale: Locale;
}
export interface ChainPageParams {
  chain: Chain;
}
export interface TokenQueryParams {
  status: Status;
  since: DateFilteringOption;
  pool: Pool;
}
export interface TokenDetailPageProps {
  params: BridgePageParams;
  searchParams: TokenQueryParams;
}
export interface ChainDetailPageProps {
  params: ChainPageParams;
}
