import {
  Bridge,
  Chain,
  DateFilteringOption,
  Pool,
  Status,
} from "lib/charts/types";

export interface BridgePageParams {
  bridge: Bridge;
}
export interface ChainPageParams {
  chain: Chain;
}
export interface TokenDetailPageProps {
  params: BridgePageParams;
  searchParams: { status: Status; since: DateFilteringOption; pool: Pool };
}
export interface ChainDetailPageProps {
  params: ChainPageParams;
}
