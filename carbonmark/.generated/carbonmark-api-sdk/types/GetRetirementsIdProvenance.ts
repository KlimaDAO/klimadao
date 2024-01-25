import type { Def1 } from "./Def1";

export type GetRetirementsIdProvenancePathParams = {
  /**
   * @description Retirement transaction hash
   * @type string
   */
  id: string;
};

/**
 * @description Retirement provenance record with account id and retirement index
 */
export type GetRetirementsIdProvenanceQueryResponse = {
  /**
   * @type string
   */
  id: string;
  /**
   * @type string
   */
  transactionType: string;
  /**
   * @type array
   */
  registrySerialNumbers: string[];
  /**
   * @type string
   */
  token: string;
  /**
   * @type string
   */
  sender: string;
  /**
   * @type string
   */
  receiver: string;
  /**
   * @type number
   */
  originalAmount: number;
  /**
   * @type number
   */
  remainingAmount: number;
  /**
   * @type number
   */
  createdAt: number;
  /**
   * @type number
   */
  updatedAt: number;
}[];

export type GetRetirementsIdProvenanceQueryParams =
  | {
      network?: Def1;
    }
  | undefined;
export type GetRetirementsIdProvenanceQuery = {
  Response: GetRetirementsIdProvenanceQueryResponse;
  PathParams: GetRetirementsIdProvenancePathParams;
  QueryParams: GetRetirementsIdProvenanceQueryParams;
};
