import { utils } from "ethers";
import { pick } from "lodash";
import { Record } from "src/models/Record.model";
import { GetProvenanceRecordsQuery } from "../../.generated/types/digitalCarbon.types";

export function formatRecord(
  record:
    | GetProvenanceRecordsQuery["provenanceRecords"][0]
    | GetProvenanceRecordsQuery["provenanceRecords"][0]["priorRecords"][0]
): Record {
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
