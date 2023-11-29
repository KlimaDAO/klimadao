import { Static, Type } from "@sinclair/typebox";
import { NetworkParamModel } from "../../models/NetworkParam.model";
import { VintageModel } from "../../models/Vintage.model";

export const querystring = Type.Object({
  network: Type.Optional(Type.Ref(NetworkParamModel)),
});

export type Querystring = Static<typeof querystring>;

export const schema = {
  summary: "Vintages",
  description: "Retrieve an array of the vintages of available carbon projects",
  querystring,
  response: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: Type.Array(VintageModel),
          examples: [
            [
              "2006",
              "2007",
              "2008",
              "2009",
              "2010",
              "2011",
              "2012",
              "2013",
              "2014",
              "2015",
              "2016",
              "2017",
              "2018",
              "2019",
              "2020",
            ],
          ],
        },
      },
    },
  },
};
