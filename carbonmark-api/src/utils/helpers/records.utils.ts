import { utils } from "ethers";
import { pick } from "lodash";
import { ProvenanceRecord } from "src/models/ProvenanceRecord.model";
import { GetProvenanceRecordsByHashQuery } from "../../.generated/types/digitalCarbon.types";

/**
 * Format a Record coming from a GQL query into a standardized API response fragment
 * @param credit
 * @returns
 */

export function formatRecord(
  record:
    | GetProvenanceRecordsByHashQuery["provenanceRecords"][0]
    | GetProvenanceRecordsByHashQuery["provenanceRecords"][0]["priorRecords"][0]
): ProvenanceRecord {
  return {
    ...pick(record, [
      "id",
      "transactionType",
      "registrySerialNumbers",
      "token",
      "sender",
      "receiver",
    ]),
    createdAt: Number(record.createdAt),
    updatedAt: Number(record.updatedAt),
    originalAmount: Number(utils.formatUnits(record.originalAmount, 18)),
    remainingAmount: Number(utils.formatUnits(record.remainingAmount, 18)),
  };
}
