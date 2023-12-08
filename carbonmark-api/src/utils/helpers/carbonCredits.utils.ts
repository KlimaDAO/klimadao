import { utils } from "ethers";
import { pick } from "lodash";
import { GetKlimaRetirementQuery } from "../../.generated/types/digitalCarbon.types";
import { CarbonCredit } from "../../models/CarbonCredit.model";

export function formatCarbonCredit(
  credit: Exclude<
    GetKlimaRetirementQuery["klimaRetire"],
    null
  >["retire"]["credit"]
): CarbonCredit {
  return {
    ...pick(credit, ["id", "bridgeProtocol", "vintage"]),
    currentSupply: Number(utils.formatUnits(credit.currentSupply || 0, 18)),
    retired: Number(utils.formatUnits(credit.retired || 0, 18)),
    crossChainSupply: Number(
      utils.formatUnits(credit.crossChainSupply || 0, 18)
    ),
  };
}