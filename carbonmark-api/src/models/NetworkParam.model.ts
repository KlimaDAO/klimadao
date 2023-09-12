import { Type } from "@sinclair/typebox";
import { COMMON_SCHEMA_URI } from "../app.constants";

export const NetworkParam = Type.Union(
  [Type.Literal("polygon"), Type.Literal("mumbai")],
  {
    $id: `${COMMON_SCHEMA_URI}/querystring/network`,
    examples: ["polygon", "mumbai"],
    description:
      "Optional. Desired blockchain network. Default is `polygon` (mainnet).",
    default: "polygon",
  }
);
