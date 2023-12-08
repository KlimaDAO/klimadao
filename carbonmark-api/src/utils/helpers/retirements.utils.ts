import { utils } from "ethers";
import { pick } from "lodash";
import { Retirement } from "src/models/Retirement.model";
import { GetRetirementQuery } from "../../.generated/types/digitalCarbon.types";

export function formatRetirement(
  retirement: GetRetirementQuery["klimaRetire"]
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
  };
}
