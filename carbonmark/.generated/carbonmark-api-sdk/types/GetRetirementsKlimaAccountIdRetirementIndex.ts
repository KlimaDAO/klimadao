import type { Def1 } from "./Def1";

export type GetRetirementsKlimaAccountIdRetirementIndexPathParams = {
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
 * @description Retirement with account and index
 */
export type GetRetirementsKlimaAccountIdRetirementIndexQueryResponse = {
  /**
   * @type string | undefined
   */
  id?: string;
  /**
   * @type string | undefined
   */
  bridgeId?: string;
  /**
   * @type number
   */
  amount: number;
  /**
   * @type string
   */
  beneficiaryAddress: string;
  /**
   * @type string | undefined
   */
  beneficiaryName?: string;
  /**
   * @type string | undefined
   */
  retirementMessage?: string;
  /**
   * @type string
   */
  retiringAddress: string;
  /**
   * @type string | undefined
   */
  retiringName?: string;
  /**
   * @type number
   */
  timestamp: number;
  /**
   * @type object | undefined
   */
  credit?: {
    /**
     * @type string | undefined
     */
    id?: string;
    /**
     * @type string | undefined
     */
    bridgeProtocol?: string;
    /**
     * @type number | undefined
     */
    vintage?: number;
    /**
     * @type number
     */
    currentSupply: number;
    /**
     * @type number
     */
    retired: number;
    /**
     * @type number
     */
    crossChainSupply: number;
  };
};

export type GetRetirementsKlimaAccountIdRetirementIndexQueryParams = {
  network?: Def1;
};
