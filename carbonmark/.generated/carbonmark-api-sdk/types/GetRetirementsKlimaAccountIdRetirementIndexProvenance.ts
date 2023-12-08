import type { Def1 } from "./Def1";

export type GetRetirementsKlimaAccountIdRetirementIndexProvenancePathParams = {
  /**
   * @description Account ID
   * @type string
   */
  account_id: string;
  /**
   * @description Retirement index
   * @type number
   */
  retirement_index: number;
};

/**
 * @description Retirement provenance record with account id and retirement index
 */
export type GetRetirementsKlimaAccountIdRetirementIndexProvenanceQueryResponse =
  {
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

export type GetRetirementsKlimaAccountIdRetirementIndexProvenanceQueryParams = {
  network?: Def1;
};
