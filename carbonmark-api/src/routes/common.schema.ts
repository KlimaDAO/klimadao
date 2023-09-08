import { SchemaOptions, TSchema, Type } from "@sinclair/typebox";

const Nullable = <T extends TSchema>(schema: T, opts?: SchemaOptions) =>
  Type.Union([schema, Type.Null(), Type.Undefined()], opts);

/** Adhere to JSONSchema spec by using a URI */
const COMMON_SCHEMA_URI = "http://api.carbonmark.com/schemas";

const network = Type.Union([Type.Literal("polygon"), Type.Literal("mumbai")], {
  $id: `${COMMON_SCHEMA_URI}/querystring/network`,
  examples: ["polygon", "mumbai"],
  description:
    "Optional. Desired blockchain network. Default is `polygon` (mainnet).",
  default: "polygon",
});

/**
 * Common schemas added to fastify at runtime in src/app
 */
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
 * @example
 * CommonSchemaRefs.querystring.network
 * // { $ref: "http://api.carbonmark.com/schemas/querystring/network" }
 */
const CommonSchemaRefs = {
  querystring: { network: Type.Ref(network) },
} as const;

export { CommonSchemaRefs, Nullable, commonSchema };
