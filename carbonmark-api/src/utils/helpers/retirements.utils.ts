import { utils } from "ethers";
import { pick } from "lodash";
import { GetKlimaRetirementQuery } from "../../.generated/types/digitalCarbon.types";
import { GRAPH_URLS } from "../../app.constants";
import { Retirement } from "../../models/Retirement.model";
import { gql_sdk } from "../../utils/gqlSdk";
import { formatCarbonCredit } from "./carbonCredits.utils";

export async function getKlimaRetirement(props: {
  account_id: string;
  retirement_index: number | string;
  network?: keyof typeof GRAPH_URLS;
}) {
  // FIXME: temporary: this is not the correct way to compute this.
  const id = `${props.account_id}0${props.retirement_index}000000`;

  const sdk = gql_sdk(props.network);
  const retirement = await sdk.digital_carbon.getKlimaRetirement({ id: id });
  return retirement.klimaRetire
    ? formatKlimaRetirement(retirement.klimaRetire)
    : null;
}

export function formatKlimaRetirement(
  retirement: GetKlimaRetirementQuery["klimaRetire"]
): Retirement {
  return {
    ...pick(retirement?.retire, [
      "id",
      "bridgeID",
      "beneficiaryName",
      "retirementMessage",
      "retiringName",
    ]),
    beneficiaryAddress: retirement?.retire.beneficiaryAddress.id,
    retiringAddress: retirement?.retire.retiringAddress.id,
    timestamp: Number(retirement?.retire.timestamp),
    amount: Number(utils.formatUnits(retirement?.retire.amount || 0, 18)),
    credit: retirement?.retire.credit
      ? formatCarbonCredit(retirement?.retire.credit)
      : undefined,
  };
}
