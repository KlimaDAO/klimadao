import { Static, Type } from "@sinclair/typebox";

const PoolToken = Type.Union(
  [
    Type.Literal("ubo"),
    Type.Literal("nbo"),
    Type.Literal("bct"),
    Type.Literal("nct"),
  ],
  { description: "Lowercase name of pool / pool token e.g. 'bct'" }
);

export const TokenPriceModel = Type.Object({
  // Name of the pool
  poolName: PoolToken,
  // The number of tokens in the pool available for retirement
  supply: Type.String({ description: "Remaining supply in pool" }),
  // The address of the pool / pool token
  poolAddress: Type.String({
    description: "Address of the pool itself, e.g. bct token address",
  }),
  // The address of the project token in the pool
  projectTokenAddress: Type.String({
    description: "Address of the project token in this pool",
  }),
  // If true, the project does not have a selective redemption fee. Each pool has 1 default project.
  isPoolDefault: Type.Boolean({
    description:
      "True if default project for pool and no selective redemption fee applies",
  }),
  // Pool price including any selection fees (for non-default projects), excluding 1% aggregator fee and sushiswap fees
  singleUnitPrice: Type.String({
    description: "formatted USDC.e price for 1 tonne e.g. '0.123456'",
  }),
});

export type TokenPriceT = Static<typeof TokenPriceModel>;
