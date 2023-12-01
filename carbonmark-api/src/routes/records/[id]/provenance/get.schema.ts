import { Static, Type } from "@sinclair/typebox";
import { NetworkParamModel } from "../../../../models/NetworkParam.model";
import { RecordModel } from "../../../../models/Record.model";

export const params = Type.Object({
  id: Type.String({
    description: "Transaction ID",
    examples: [
      "0x0044c5a5a6f626b673224a3c0d71e851ad3d5153000000000000000000000000000000000000000006000000",
    ],
  }),
});

export type Params = Static<typeof params>;

const querystring = Type.Object({
  network: Type.Optional(Type.Ref(NetworkParamModel)),
});

export type Querystring = Static<typeof querystring>;

export const schema = {
  summary: "Record details",
  description: "Retrieve a record and its history by its transaction ID",
  tags: ["Records"],
  params,
  querystring,
  response: {
    200: {
      description: "Record with id",
      content: {
        "application/json": {
          schema: Type.Array(RecordModel),
        },
      },
    },
  },
};
