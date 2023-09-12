import { Type } from "@sinclair/typebox";
import { COMMON_SCHEMA_URI } from "../app.constants";
import { NetworkParamModel } from "./NetworkParam.model";

/**
 * Common schemas added to fastify at runtime in src/app
 */
export const CommonSchema = Type.Object(
  {
    network: NetworkParamModel,
  },
  { $id: COMMON_SCHEMA_URI }
);
