import { pick } from "lodash";
import { GetRetirementByHashQuery } from "../../.generated/types/digitalCarbon.types";
import { Retirement } from "../../models/Retirement.model";
import { CreditId } from "../CreditId";
import { formatAmountByRegistry } from "../marketplace.utils";
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
  let registry;

  retirement.credit.project.id === "Moss"
    ? (registry = "MOSS")
    : ([registry] = CreditId.splitProjectId(retirement.credit.project.id));

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
    amount: Number(formatAmountByRegistry(registry, retirement.amount)),
    hasProvenanceDetails: retirement.pool?.id == MOSS_POOL,
    credit: retirement.credit
      ? formatCarbonCredit(retirement.credit)
      : undefined,
  };
}
