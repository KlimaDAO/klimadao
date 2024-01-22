export type Asset = {
  /**
   * @type string
   */
  id: string;
  /**
   * @type object
   */
  token: {
    /**
     * @type string
     */
    id: string;
    /**
     * @type string
     */
    name: string;
    /**
     * @type string
     */
    symbol: string;
    /**
     * @type number
     */
    decimals: number;
    /**
     * @type string | undefined
     */
    tokenId?: string;
  };
  /**
   * @type string
   */
  amount: string;
};
