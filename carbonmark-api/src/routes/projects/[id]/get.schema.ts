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
  expiresAfter: Type.Optional(
    Type.String({
      description:
        "Only return projects listings that expire after this timestamp (Unix seconds)",
      default: "Current system timestamp.",
      examples: "1620000000",
    })
  ),
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
