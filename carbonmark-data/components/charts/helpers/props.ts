import { Bridge, DateFilteringOption, Pool, Status } from "lib/charts/types";

export interface CreditsFilteringProps {
  bridge: Bridge;
  pool: Pool;
  status: Status;
  since: DateFilteringOption;
}
