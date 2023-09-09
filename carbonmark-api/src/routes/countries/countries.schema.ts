import { Type } from "@sinclair/typebox";
import { Country } from "../../models/Country.model";

export const schema = {
  summary: "Countries",
  description:
    "Retrieve an array containing the countries that carbon projects originate from",
  response: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: Type.Array(Country),
            },
          },
          examples: [
            [
              {
                id: "Brazil",
              },
              {
                id: "Bulgaria",
              },
              {
                id: "China",
              },
            ],
          ],
        },
      },
    },
  },
};
