import { Type } from "@sinclair/typebox";
import { DetailedProjectModel } from "../../../models/DetailedProject.model";
import { NetworkParamModel } from "../../../models/NetworkParam.model";
import { CreditId } from "../../../utils/CreditId";

export const Params = Type.Object({
  id: Type.RegEx(CreditId.ValidCreditIdRegex, {
    description: "Project id & vintage",
    examples: ["VCS-191-2008"],
  }),
});

export const QueryString = Type.Object({
  network: Type.Optional(NetworkParamModel),
});

export const schema = {
  summary: "Project details",
  description: "Retrieve a carbon project by its project ID",
  tags: ["Projects"],
  params: Params,
  querystring: QueryString,
  response: {
    200: {
      description: "Project with id",
      content: {
        "application/json": {
          schema: DetailedProjectModel,
        },
      },
    },
  },
};
