import { formatUnits } from "ethers-v6";
import { pick } from "lodash";
import { GetRetirementByHashQuery } from "../../.generated/types/digitalCarbon.types";
import { CarbonCredit } from "../../models/CarbonCredit.model";

/**
 * Format a Carbon Credit coming from the GQL query into a standardized API response fragment
 * @param credit
 * @returns
 */
export function formatCarbonCredit(
  credit: Exclude<GetRetirementByHashQuery["retires"][0], null>["credit"]
): CarbonCredit {
  return {
    ...pick(credit, ["id", "bridgeProtocol", "vintage"]),
    currentSupply: Number(formatUnits(credit.currentSupply || 0, 18)),
    retired: Number(formatUnits(credit.retired || 0, 18)),
    crossChainSupply: Number(formatUnits(credit.crossChainSupply || 0, 18)),
    projectId: credit.project.id,
  };
}
