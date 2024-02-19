import { pick } from "lodash";
import { RegistryId } from "src/app.constants";
import { ProvenanceRecord } from "src/models/ProvenanceRecord.model";
import { GetProvenanceRecordsByHashQuery } from "../../.generated/types/digitalCarbon.types";
import { formatAmountByRegistry } from "../marketplace.utils";

/**
 * Format a Record coming from a GQL query into a standardized API response fragment
 * @param credit
 * @returns
 */

type Provenance = NonNullable<
  GetProvenanceRecordsByHashQuery["retires"][0]["provenance"]
>;
type PriorRecord = Provenance["priorRecords"][number];

type RecordType = Provenance | PriorRecord;

export function formatRecord(
  record: RecordType,
  registry: RegistryId
): ProvenanceRecord {
  if (!record) {
    throw new Error("Record is undefined or null");
  }

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
