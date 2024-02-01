import { ProvenanceRecord } from ".generated/carbonmark-api-sdk/types";

export type ProvenanceRecordType = "RETIREMENT" | "TRANSFER" | "ORIGINATION";

/**
 * Provenance Elements indexed by the address of the last sender
 */
export type ProvenanceList = Record<string, ProvenanceRecord[]>;
