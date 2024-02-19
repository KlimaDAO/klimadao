export type TokenPrice = {
  /**
   * @description Lowercase name of pool / pool token e.g. 'bct'
   */
  poolName: "ubo" | "nbo" | "bct" | "nct";
  /**
   * @description Remaining supply in pool
   * @type string
   */
  supply: string;
  /**
   * @description Address of the pool itself, e.g. bct token address
   * @type string
   */
  poolAddress: string;
  /**
   * @description Address of the project token in this pool
   * @type string
   */
  projectTokenAddress: string;
  /**
   * @description True if default project for pool and no selective redemption fee applies
   * @type boolean
   */
  isPoolDefault: boolean;
  /**
   * @description formatted USDC.e price for 1 tonne e.g. '0.123456'
   * @type string
   */
  singleUnitPrice: string;
};
