import { Type } from "@sinclair/typebox";
export const schema = {
  summary: "Countries",
  description:
    "Retrieve an array containing the countries that carbon projects originate from",
  response: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: Type.Array(
            Type.Object({
              id: Type.String(),
            })
          ),
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
