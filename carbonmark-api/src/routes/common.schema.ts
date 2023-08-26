/**
 * Shared schemas are defined in this file, and added to the fastify instance in src/app
 */
import { Type } from "@sinclair/typebox";

/** Adhere to JSONSchema spec by using a URI */
const COMMON_SCHEMA_URI = "http://api.carbonmark.com/schemas";

const network = Type.Union([Type.Literal("polygon"), Type.Literal("mumbai")], {
  $id: `${COMMON_SCHEMA_URI}/querystring/network`,
  examples: ["polygon", "mumbai"],
  description:
    "Optional. Desired blockchain network. Default is `polygon` (AKA `mainnet`).",
  default: "polygon",
});

const commonSchema = Type.Object(
  {
    network,
  },
  {
    $id: COMMON_SCHEMA_URI,
  }
);

/**
 * Ref objects for reuse in external schema definitions
 * @example SchemaRefs.network // { $ref: "#/querystring/network" }
 */
const CommonSchemaRefs = {
  /** Network querystring */
  network: Type.Ref(network),
} as const;

export { CommonSchemaRefs, commonSchema };
