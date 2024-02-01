import type { Def1 } from "./Def1";

export type GetRetirementsIdPathParams = {
  /**
   * @description Retirement transaction hash
   * @type string
   */
  id: string;
};

/**
 * @description Retirement with account and index
 */
export type GetRetirementsIdQueryResponse = {
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
  hash: string;
  /**
   * @type boolean
   */
  hasProvenanceDetails: boolean;
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
   * @type object | undefined
   */
  retireeProfile?: {
    /**
     * @type string
     */
    handle: string;
    /**
     * @type number
     */
    createdAt: number;
    /**
     * @type number
     */
    updatedAt: number;
    /**
     * @type string
     */
    address: string;
    /**
     * @type string
     */
    username: string;
    /**
     * @type string | undefined
     */
    description?: string;
    /**
     * @type string | undefined
     */
    profileImgUrl?: string;
    /**
     * @type number | undefined
     */
    nonce?: number;
  };
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
    /**
     * @type string
     */
    projectId: string;
  };
};

export type GetRetirementsIdQueryParams = {
  network?: Def1;
};
export namespace GetRetirementsIdQuery {
  export type Response = GetRetirementsIdQueryResponse;
  export type PathParams = GetRetirementsIdPathParams;
  export type QueryParams = GetRetirementsIdQueryParams;
}
