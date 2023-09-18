import { Bridge, DateFilteringOption, Pool, Status } from "lib/charts/types";

export interface TokenDetailsProps {
  bridge: Bridge;
  pool: Pool;
  status: Status;
  since: DateFilteringOption;
}
export function tokenDetailChartProps(props: TokenDetailsProps) {
  return {
    bridge: props.bridge,
    pool: props.pool,
    status: props.status,
    since: props.since,
  };
}
