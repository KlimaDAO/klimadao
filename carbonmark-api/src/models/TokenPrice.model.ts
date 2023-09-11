import { Type } from "@sinclair/typebox";

const PoolToken = Type.Union(
  [
    Type.Literal("ubo"),
    Type.Literal("nbo"),
    Type.Literal("bct"),
    Type.Literal("nct"),
  ],
  { description: "Lowercase name of pool / pool token e.g. 'bct'" }
);

export const TokenPrice = Type.Object({
  poolName: PoolToken,
  supply: Type.String({ description: "Remaining supply in pool" }),
  poolAddress: Type.Boolean({
    description: "Address of the pool itself, e.g. bct token address",
  }),
  projectTokenAddress: Type.String({
    description: "Address of the project token in this pool",
  }),
  isPoolDefault: Type.Boolean({
    description:
      "True if default project for pool and no selective redemption fee applies",
  }),
  singleUnitPrice: Type.String({
    description: "formatted USDC price for 1 tonne e.g. '0.123456'",
  }),
});
