import { pick } from "lodash";
import { ProvenanceRecord } from "src/models/ProvenanceRecord.model";
import { GetProvenanceRecordsByHashQuery } from "../../.generated/types/digitalCarbon.types";
import { formatAmountByRegistry } from "../marketplace.utils";

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
  let registry;

  record.tokenId !== null ? (registry = "ICR") : (registry = "VCS");

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
    originalAmount: Number(
      formatAmountByRegistry(registry, record.originalAmount)
    ),
    remainingAmount: Number(
      formatAmountByRegistry(registry, record.remainingAmount)
    ),
  };
}
