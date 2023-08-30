export const schema = {
  summary: "List projects",
  description:
    "Retrieve an array of carbon projects filtered by desired query parameters",
  tags: ["Projects"],
  querystring: {
    type: "object",
    properties: {
      country: {
        type: "string",
        description: "Desired country of origin for carbon projects",
      },
      category: {
        type: "string",
        description: "Desired category of carbon projects",
      },
      search: {
        type: "string",
        description:
          "Search carbon project names and descriptions for a string of text",
      },
      vintage: {
        type: "string",
        description: "Desired vintage of carbon projects",
      },
    },
  },
  response: {
    "2xx": {
      description: "Successful response",
      type: "object",
      properties: {
        id: { type: "string" },
        key: { type: "string" },
        projectID: { type: "string" },
        name: { type: "string" },
        methodology: { type: "string" },
        vintage: { type: "string" },
        projectAddress: { type: "string" },
        registry: { type: "string" },
        country: { type: "string" },
        category: { type: "string" },
        price: { type: "string" },
      },
    },
  },
};
