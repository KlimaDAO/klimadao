import {
  Bridge,
  Chain,
  DateFilteringOption,
  Pool,
  Status,
} from "lib/charts/types";

export interface LocalizedPageParams {
  locale: string;
}
export interface BridgePageParams extends LocalizedPageParams {
  bridge: Bridge;
}
export interface ChainPageParams extends LocalizedPageParams {
  chain: Chain;
}
export interface TokenQuerySearchParams {
  status: Status;
  since: DateFilteringOption;
  pool: Pool;
}

export interface LocalizedPageProps {
  params: LocalizedPageParams;
}
export interface TokenDetailPageProps {
  params: BridgePageParams;
  searchParams: TokenQuerySearchParams;
}
export interface ChainDetailPageProps {
  params: ChainPageParams;
}
