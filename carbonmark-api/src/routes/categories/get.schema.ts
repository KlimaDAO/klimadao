import { Type } from "@sinclair/typebox";
import { CategoryModel } from "../../models/Category.model";
import { NetworkParamModel } from "../../models/NetworkParam.model";
export const Querystring = Type.Object({
  network: Type.Optional(NetworkParamModel),
});
export const schema = {
  summary: "Categories",
  Querystring,
  description:
    "A list of all methodology categories used to delineate every project in the marketplace. A project may belong to one or more of these categories.",
  response: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: Type.Array(CategoryModel),
          examples: [
            [
              {
                id: "Blue Carbon",
              },
              {
                id: "Forestry",
              },
              {
                id: "Other",
              },
            ],
          ],
        },
      },
    },
  },
};
