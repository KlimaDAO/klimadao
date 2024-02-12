import { formatUnits } from "ethers-v6";
import { pick } from "lodash";
import { GetRetirementByHashQuery } from "../../.generated/types/digitalCarbon.types";
import { Retirement } from "../../models/Retirement.model";
import { formatCarbonCredit } from "./carbonCredits.utils";
import { MOSS_POOL } from "./utils.constants";

/**
 * Formats a KlimaRetirement from the GQL query into a standardized API response fragment
 * @param credit
 * @returns
 */

export function formatRetirement(
  retirement: GetRetirementByHashQuery["retires"][0]
): Retirement {
  return {
    ...pick(retirement, [
      "id",
      "bridgeID",
      "beneficiaryName",
      "retirementMessage",
      "retiringName",
      "hash",
    ]),
    beneficiaryAddress: retirement.beneficiaryAddress.id,
    retiringAddress: retirement.retiringAddress.id,
    timestamp: Number(retirement.timestamp),
    amount: Number(formatUnits(retirement.amount || 0, 18)),
    hasProvenanceDetails: retirement.pool?.id == MOSS_POOL,
    credit: retirement.credit
      ? formatCarbonCredit(retirement.credit)
      : undefined,
  };
}
