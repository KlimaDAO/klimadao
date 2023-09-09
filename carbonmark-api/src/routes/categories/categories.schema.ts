import { Type } from "@sinclair/typebox";
import { Category } from "../../models/Category.model";

export const schema = {
  summary: "Categories",
  description:
    "A list of all methodology categories used to delineate every project in the marketplace. A project may belong to one or more of these categories.",
  response: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: Type.Array(Category),
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
