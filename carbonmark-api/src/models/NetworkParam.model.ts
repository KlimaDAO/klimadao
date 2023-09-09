import { Type } from "@sinclair/typebox";

/** Adhere to JSONSchema spec by using a URI */
export const COMMON_SCHEMA_URI = "http://api.carbonmark.com/schemas";

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
