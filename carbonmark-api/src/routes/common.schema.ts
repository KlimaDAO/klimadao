/**
 * Shared schemas are defined in this file, and added to the fastify instance in src/app
 */
import { Type } from "@sinclair/typebox";

const network = Type.Union([Type.Literal("polygon"), Type.Literal("mumbai")], {
  examples: ["polygon", "mumbai"],
  description:
    "Desired blockchain network. Defaults to `polygon` (AKA `mainnet`).",
  default: "polygon",
});

const commonSchema = {
  // Per JSONSchema spec this URI does not need to be hosted. For internal reference only.
  $id: "http://api.carbonmark.com/schemas",
  type: "object",
  definitions: {
    network,
  },
} as const;

/**
 * String constants for schema definition URIs
 * @example schema.querystring.properties.network = { $ref: SchemaRefs.network }
 */
const SchemaRefs = {
  /** Network querystring */
  network: `${commonSchema["$id"]}#/definitions/network`,
} as const;

export { SchemaRefs, commonSchema };
