import { GetHoldingsByWalletQuery } from "../.generated/types/assets.types";

export type Holding = NonNullable<
  GetHoldingsByWalletQuery["accounts"]
>[number]["holdings"][number];
