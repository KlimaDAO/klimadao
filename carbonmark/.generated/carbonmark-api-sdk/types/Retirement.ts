export type Retirement = {
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
