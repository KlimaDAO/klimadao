export type GetPurchasesIdPathParams = {
  /**
   * @description ID (transaction hash) of the purchase to retrieve
   * @type string
   */
  id: string;
};

export type GetPurchasesIdQueryParams = {
  /**
   * @description Optional. Desired blockchain network. Default is `polygon` (mainnet).
   * @default 'polygon'
   */
  network: "polygon" | "mumbai";
};

/**
 * @description Successful response with listing details
 */
export type GetPurchasesIdQueryResponse = {
  /**
   * @description ID (transaction hash) of the purchase
   * @type string
   */
  id: string;
  /**
   * @description Quantity of credits purchased
   * @type string
   */
  amount: string;
  /**
   * @type object
   */
  listing: {
    /**
     * @description ID of the listing that was purchased
     * @type string
     */
    id: string;
    /**
     * @description Address of the asset that was purchased
     * @type string
     */
    tokenAddress: string;
    /**
     * @type object
     */
    seller: {
      /**
       * @description Address of the seller
       * @type string
       */
      id: string;
    };
    /**
     * @type object
     */
    project: {
      /**
       * @type string
       */
      country: string;
      /**
       * @type string
       */
      key: string;
      /**
       * @type string
       */
      methodology: string;
      /**
       * @type string
       */
      name: string;
      /**
       * @type string
       */
      projectID: string;
      /**
       * @type string
       */
      vintage: string;
    };
  };
  /**
   * @description Total purchase price (USDC)
   * @type string
   */
  price: string;
};
