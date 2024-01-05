import { AssetsGetHoldingsByWalletQuery } from "../.generated/types/assets.types";

export type Holding = NonNullable<
  AssetsGetHoldingsByWalletQuery["accounts"]
>[number]["holdings"][number];
