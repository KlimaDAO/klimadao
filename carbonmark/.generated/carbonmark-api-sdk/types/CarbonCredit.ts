export type CarbonCredit = {
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
