import type { Def1 } from "./Def1";

export type GetRecordsIdProvenancePathParams = {
  /**
   * @description Transaction ID
   * @type string
   */
  id: string;
};

/**
 * @description Record with id
 */
export type GetRecordsIdProvenanceQueryResponse = {
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

export type GetRecordsIdProvenanceQueryParams = {
  network?: Def1;
};
