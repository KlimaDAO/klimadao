import {
  Bridge,
  Chain,
  DateFilteringOption,
  Pool,
  Status,
} from "lib/charts/types";

export interface TokenDetailPageProps {
  params: { bridge: Bridge };
  searchParams: { status: Status; since: DateFilteringOption; pool: Pool };
}
export interface ChainDetailPageProps {
  params: { chain: Chain };
}
