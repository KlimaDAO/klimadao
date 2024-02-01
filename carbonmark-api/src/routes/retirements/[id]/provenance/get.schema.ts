import { Static, Type } from "@sinclair/typebox";
import { NetworkParamModel } from "../../../../models/NetworkParam.model";
import { ProvenanceRecordModel } from "../../../../models/ProvenanceRecord.model";

export const params = Type.Object({
  id: Type.String({
    description: "Retirement transaction hash",
    examples: [
      "0xa049a8354af988a4285eadc5c540590d26d95bca1c6a85c873e32a5c280e7509",
    ],
  }),
});

export type Params = Static<typeof params>;

export const querystring = Type.Object({
  network: Type.Optional(Type.Ref(NetworkParamModel)),
});

export const schema = {
  summary: "Retirement provenance records",
  description: "Retrieve a retirement provenance records",
  tags: ["Records"],
  params,
  querystring,
  response: {
    200: {
      description:
        "Retirement provenance record with account id and retirement index",
      content: {
        "application/json": {
          schema: Type.Array(ProvenanceRecordModel),
        },
      },
    },
  },
};
