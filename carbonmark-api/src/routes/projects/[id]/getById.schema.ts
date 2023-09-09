import { Type } from "@sinclair/typebox";
import { DetailedProject } from "../../../models/DetailedProject.model";
import { CreditId } from "../../../utils/CreditId";

export const Params = Type.Object({
  id: Type.RegEx(CreditId.ValidCreditIdRegex, {
    description: "Project id & vintage",
    examples: ["VCS-191-2008"],
  }),
});

export const schema = {
  summary: "Project details",
  description: "Retrieve a carbon project by its project ID",
  tags: ["Projects"],
  params: Params,
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
