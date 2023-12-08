import { Static, Type } from "@sinclair/typebox";
import { NetworkParamModel } from "../../../../models/NetworkParam.model";
import { RecordModel } from "../../../../models/Record.model";

export const params = Type.Object({
  id: Type.String({
    description: "Transaction ID",
    examples: [
      "0xfd59f524162d4ef2f7e5df69c5079ce394ecd6b9cf681d701d426cd221981b17",
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
