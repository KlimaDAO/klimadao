import { utils } from "ethers";
import { pick } from "lodash";
import { GetKlimaRetirementQuery } from "../../.generated/types/digitalCarbon.types";
import { GRAPH_URLS } from "../../app.constants";
import { Retirement } from "../../models/Retirement.model";
import { gql_sdk } from "../../utils/gqlSdk";
import { formatCarbonCredit } from "./carbonCredits.utils";

/**
 * Gets a Klima retirement from the polygon-bridged-carbon subgraph given an account id and a retirement index
 * This should not be necessary when polygon-digital-carbon will be updated with the transaction hash in the Retire model
 * @param props
 * @returns
 */
export async function getKlimaRetirement(props: {
  account_id: string;
  retirement_index: number | string;
  network?: keyof typeof GRAPH_URLS;
}) {
  // Formats the retirement index the way it is expected by the subgraph
  const formattedRetirementIndex = utils
    .hexlify(props.retirement_index)
    .substring(2)
    .padEnd(8, "0");
  const id = `${props.account_id}${formattedRetirementIndex}`;

  const sdk = gql_sdk(props.network);
  const retirement = await sdk.digital_carbon.getKlimaRetirement({ id: id });
  return retirement.klimaRetire
    ? formatKlimaRetirement(retirement.klimaRetire)
    : null;
}

/**
 * Formats a KlimaRetirement from the GQL query into a standardized API response fragment
 * @param credit
 * @returns
 */

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