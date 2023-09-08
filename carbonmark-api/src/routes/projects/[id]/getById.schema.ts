import { DetailedProject } from "../../../models/DetailedProject.model";

export const schema = {
  summary: "Project details",
  description: "Retrieve a carbon project by its project ID",
  tags: ["Projects"],
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: {
        type: "string",
        description: "Project id & vintage",
        examples: ["VCS-191-2008"],
      },
    },
  },
  response: {
    200: {
      description: "Project with id",
      content: {
        "application/json": {
          schema: DetailedProject,
        },
      },
    },
  },
};
